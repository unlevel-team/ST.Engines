"use strict";

/**
 * Sensors services
 * for Node sever
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SensorsServices = require('../services/SensorsServices.js').SensorsServices;

/**
 * Sensors Services
 */

var NGSYS_Hero_Server_SensorsSRV = function (_SensorsServices) {
	_inherits(NGSYS_Hero_Server_SensorsSRV, _SensorsServices);

	function NGSYS_Hero_Server_SensorsSRV(sensorsManager, controlChannel) {
		_classCallCheck(this, NGSYS_Hero_Server_SensorsSRV);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV).call(this, sensorsManager, controlChannel));
	}

	/**
  * Map control events
  */


	_createClass(NGSYS_Hero_Server_SensorsSRV, [{
		key: "_mapControlEvents",
		value: function _mapControlEvents(sensorsManager) {

			var service = this;

			if (sensorsManager === undefined) {
				sensorsManager = service.sensorsManager;
			}
		}

		/**
   * Map control messages
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV.prototype), "_mapControlMessages", this).call(this, socket);

			var service = this;
			var smng = service.sensorsManager;
		}

		/**
   * Unmap control messages
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV.prototype), "_unmapControlMessages", this).call(this, socket);

			var service = this;

			service._mapped = null;
		}

		/**
   * Manage sensors from node
   */

	}, {
		key: "manageSensorsFromNode",
		value: function manageSensorsFromNode(stNode) {

			if (stNode.config._SensorsManaged !== undefined) {
				throw "This node is already managed.";
			}

			var service = this;

			service._mapNodeControlEvents(stNode);
			service._mapNodeControlMessages(stNode);

			stNode.config._SensorsManaged = true;
		}
	}, {
		key: "_mapNodeControlEvents",
		value: function _mapNodeControlEvents(stNode) {}

		/**
   * Map node control messages
   */

	}, {
		key: "_mapNodeControlMessages",
		value: function _mapNodeControlMessages(stNode) {

			var service = this;
			var socket = stNode.socket;

			// Map event disconnect
			socket.on("disconnect", function (msg) {
				service._unmapNodeControlMessages(stNode, { "node": stNode,
					"service": service
				});
			});

			// Map message SensorsList
			socket.on(service.CONSTANTS.Messages.SensorsList, function (msg) {
				service._msg_SensorsList(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message SensorOptions
			socket.on(service.CONSTANTS.Messages.SensorOptions, function (msg) {
				service._msg_SensorOptions(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message SensorOptionsUpdated
			socket.on(service.CONSTANTS.Messages.SensorOptionsUpdated, function (msg) {
				service._msg_SensorOptionsUpdated(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message SensorStarted
			socket.on(service.CONSTANTS.Messages.SensorStarted, function (msg) {
				service._msg_SensorStarted(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message SensorStopped
			socket.on(service.CONSTANTS.Messages.SensorStopped, function (msg) {
				service._msg_SensorStopped(msg, { "node": stNode,
					"service": service
				});
			});
		}

		/**
   * Umap node control messages
   */

	}, {
		key: "_unmapNodeControlMessages",
		value: function _unmapNodeControlMessages(stNode, options) {

			var service = this;

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			socket.removeAllListeners(service.CONSTANTS.Messages.SensorsList);
			socket.removeAllListeners(service.CONSTANTS.Messages.SensorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.SensorOptionsUpdated);
			socket.removeAllListeners(service.CONSTANTS.Messages.SensorStarted);
			socket.removeAllListeners(service.CONSTANTS.Messages.SensorStopped);
		}

		/**
   * Message SensorsList
   */

	}, {
		key: "_msg_SensorsList",
		value: function _msg_SensorsList(msg, options) {

			var service = this;

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;
			var data = options.data;

			console.log('<*> NGSYS_Hero_Server_SensorsSRV.Messages.SensorsList'); // TODO REMOVE DEBUG LOG

			if (data.numSensors > 0) {

				data.sensors.forEach(function (snsDATA, _i) {

					snsDATA._sysID = node.config.nodeID + '.' + snsDATA.sensorID;
					snsDATA._refSTNodeID = node.config.nodeID;

					//				snsDATA._nodeEvents = node.eventEmitter;
					snsDATA._controlSocket = socket;

					smng.addSensor(snsDATA);
				});
			}
		}

		/**
   * Message SensorOptions
   */

	}, {
		key: "_msg_SensorOptions",
		value: function _msg_SensorOptions(msg, options) {

			var service = this;

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = msg.sensorID;
			var sensorOptions = msg.options;

			console.log('<*> NGSYS_Hero_Server_SensorsSRV.Messages.SensorOptions'); // TODO REMOVE DEBUG LOG

			var sensor_sysID = node.config.nodeID + '.' + sensorID;

			var response = {
				"sensorID": sensorID
			};

			try {

				var sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
				if (sensorSearch.stSensor === null) {
					throw "Sensor not found";
				}

				var sns = sensorSearch.stSensor;

				sns.options = sensorOptions;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message SensorOptionsUpdated
   */

	}, {
		key: "_msg_SensorOptionsUpdated",
		value: function _msg_SensorOptionsUpdated(msg, options) {

			var service = this;

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = options.sensorID;
			var sensor_sysID = node.config.nodeID + '.' + sensorID;

			var response = {
				"sensorID": sensorID
			};

			console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorOptionsUpdated'); // TODO REMOVE DEBUG LOG
			console.log(options); // TODO REMOVE DEBUG LOG

			try {

				var sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
				if (sensorSearch.stSensor === null) {
					throw "Sensor not found";
				}

				var sns = sensorSearch.stSensor;

				smng.getOptionsOfSensor(sns);
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorOptionsUpdated ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message SensorStarted
   */

	}, {
		key: "_msg_SensorStarted",
		value: function _msg_SensorStarted(msg, options) {

			var service = this;

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = options.sensorID;
			var sensor_sysID = node.config.nodeID + '.' + sensorID;

			console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorStarted'); // TODO REMOVE DEBUG LOG
			console.log('<~~~> ' + sensor_sysID); // TODO REMOVE DEBUG LOG

			var response = {
				"sensorID": sensorID
			};

			try {

				var sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
				if (sensorSearch.stSensor === null) {
					throw "Sensor not found";
				}

				var sns = sensorSearch.stSensor;
				var engine = sns.sensorEngine;

				engine.state = engine.CONSTANTS.States.SEstate_Working;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorOptionsUpdated ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message SensorStopped
   */

	}, {
		key: "_msg_SensorStopped",
		value: function _msg_SensorStopped(msg, options) {

			var service = this;

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = options.sensorID;
			var sensor_sysID = node.config.nodeID + '.' + sensorID;

			console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorStopped'); // TODO REMOVE DEBUG LOG
			console.log(' <~~~> ' + sensor_sysID); // TODO REMOVE DEBUG LOG

			var response = {
				"sensorID": sensorID
			};

			try {

				var sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
				if (sensorSearch.stSensor === null) {
					throw "Sensor not found";
				}

				var sns = sensorSearch.stSensor;
				var engine = sns.sensorEngine;

				engine.state = engine.CONSTANTS.States.SEstate_Ready;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorStopped ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}
	}]);

	return NGSYS_Hero_Server_SensorsSRV;
}(SensorsServices);

var _Lib = {
	"NGSYS_Hero_Server_SensorsSRV": NGSYS_Hero_Server_SensorsSRV
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_ServerSensorsSRV.js.map
