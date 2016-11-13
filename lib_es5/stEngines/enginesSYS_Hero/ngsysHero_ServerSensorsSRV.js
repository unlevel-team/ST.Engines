"use strict";

/**
 * Sensors services
 * for role Server
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

/**
 * Import SensorsServices
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SensorsServices = require('../services/SensorsServices.js').SensorsServices;

/**
 * Sensors Services
 * for role Server
 * 
 * version Hero
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.services.SensorsServices
 * 
 */

var NGSYS_Hero_Server_SensorsSRV = function (_SensorsServices) {
	_inherits(NGSYS_Hero_Server_SensorsSRV, _SensorsServices);

	/**
  * @construct NGSYS_Hero_Server_SensorsSRV
  * 
  * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
  * @param {object} controlChannel - Control channel object
  * @param {NodesManager} nodesManager - Nodes manager object
  */

	function NGSYS_Hero_Server_SensorsSRV(sensorsManager, controlChannel, nodesManager) {
		_classCallCheck(this, NGSYS_Hero_Server_SensorsSRV);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV).call(this, sensorsManager, controlChannel));

		var service = _this;

		service.nodesManager = nodesManager;

		return _this;
	}

	/**
  * Initialize
  */


	_createClass(NGSYS_Hero_Server_SensorsSRV, [{
		key: "initialize",
		value: function initialize() {

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV.prototype), "initialize", this).call(this);

			var service = this;

			if (service.nodesManager === undefined || service.nodesManager === null) {
				throw "Nodes manager is required";
			}

			service._mapControlEventsForNodes(service.nodesManager);
		}

		/**
   * Map control events
   * 
   * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(sensorsManager) {

			var service = this;

			if (sensorsManager === undefined) {
				sensorsManager = service.sensorsManager;
			}
		}

		/**
   * Map control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV.prototype), "_mapControlMessages", this).call(this, socket, {
				"service": service
			});
		}

		/**
   * Unmap control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV.prototype), "_unmapControlMessages", this).call(this, socket, {
				"service": service
			});

			service._mapped = null;
		}

		/**
   * Map control events for nodes
   * 
   * @param {NodesManager} nodesManager - Nodes manager object
   * 
   */

	}, {
		key: "_mapControlEventsForNodes",
		value: function _mapControlEventsForNodes(nodesManager) {

			var service = this;

			if (nodesManager === undefined) {
				nodesManager = service.nodesManager;
			}

			// Map event NodeAdded
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeAdded, function (data) {

				service._event_NodeAdded(data, {
					"service": service
				});
			});

			// Map event NodeDisconnected
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeDisconnected, function (data) {

				service._event_NodeDisconnected(data, {
					"service": service
				});
			});

			// Map event NodeRemoved
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeRemoved, function (data) {

				service._event_NodeRemoved(data, {
					"service": service
				});
			});
		}

		/**
   * Manage sensors from node
   * 
   * @param {Node} stNode - Node object
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

			if (stNode.config.numSensors > 0) {

				// Emit message getSensorsList
				stNode.socket.emit(service.CONSTANTS.Messages.getSensorsList);
			}

			stNode.config._SensorsManaged = true;
		}
	}, {
		key: "_mapNodeControlEvents",
		value: function _mapNodeControlEvents(stNode) {}

		/**
   * Map node control messages
   * 
   * @param {Node} stNode - Node object
   */

	}, {
		key: "_mapNodeControlMessages",
		value: function _mapNodeControlMessages(stNode) {

			var service = this;
			var socket = stNode.socket;

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
   * Unmap node control messages
   * 
   * @param {Node} stNode - Node object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_unmapNodeControlMessages",
		value: function _unmapNodeControlMessages(stNode, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

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
   * Event NodeAdded
   * 
   * @param {object} data - Data object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_event_NodeAdded",
		value: function _event_NodeAdded(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var stNode = data.node;

			console.log('<~*~> ST NGSYS_Hero_Server_SensorsSRV._event_NodeAdded'); // TODO REMOVE DEBUG LOG

			try {
				service.manageSensorsFromNode(stNode);
			} catch (e) {

				// TODO: handle exception
				//			throw "Cannot manage sensors of node. " + e;
				console.log('<~EEE~> ST NGSYS_Hero_Server_SensorsSRV._event_NodeAdded'); // TODO REMOVE DEBUG LOG
				console.log('<~EEE~> Cannot manage sensors of node'); // TODO REMOVE DEBUG LOG
				console.log(e); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Event NodeDisconnected
   * 
   * @param {object} data - Data object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_event_NodeDisconnected",
		value: function _event_NodeDisconnected(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var stNode = data.node;

			service._unmapNodeControlMessages(stNode, { "node": stNode,
				"service": service
			});
		}

		/**
   * Event NodeRemoved
   * 
   * @param {object} data - Data object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_event_NodeRemoved",
		value: function _event_NodeRemoved(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var nodeID = data.nodeID;
			var smng = service.sensorsManager;

			var stSensors = smng.getSensorsByNode(nodeID);

			stSensors.sensors.forEach(function (sensor, _i, _sensors) {

				var sensorSearch = smng.getSensorBy_sysID(sensor.config._sysID);
				if (sensorSearch.stSensor !== null) {
					smng.sensorsList.splice(sensorSearch.position, 1);
				}
			});
		}

		/**
   * Message SensorsList
   * <pre>
   * Server receives message `SensorList` message from node 
   * </pre>
   * 
   * 
   * @protected
   * 
   * @param {object} msg - Message object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_msg_SensorsList",
		value: function _msg_SensorsList(msg, options) {

			var _service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				_service = options.service;
			}

			var _smng = _service.sensorsManager;
			var _node = options.node;
			var _nodeID = _node.config.nodeID;
			var _socket = _node.socket;
			var _data = msg;

			console.log('<*> NGSYS_Hero_Server_SensorsSRV.Messages.SensorsList'); // TODO REMOVE DEBUG LOG

			if (_data.numSensors > 0) {

				_data.sensors.forEach(function (snsDATA, _i) {

					var _snsConfig = {
						"sensorID": snsDATA.sensorID,
						"type": snsDATA.type,

						"_sysID": _nodeID + '.' + snsDATA.sensorID,
						"_refSTNodeID": _nodeID,
						"_controlSocket": _socket
					};

					var _snsOptions = {
						"engine": snsDATA.engine,
						"state": snsDATA.state
					};

					try {

						_smng.addSensorFromNode(_snsConfig, _snsOptions);

						_socket.emit(_service.CONSTANTS.Messages.getSensorOptions, {
							"sensorID": _snsConfig.sensorID
						});
					} catch (e) {

						// TODO: handle exception
						console.log('<~EEE~> NGSYS_Hero_Server_SensorsSRV.Messages.SensorsList'); // TODO REMOVE DEBUG LOG
						console.log('<~EEE~> Cannot add sensor from node.'); // TODO REMOVE DEBUG LOG
						console.log(e); // TODO REMOVE DEBUG LOG
						console.log(_snsConfig); // TODO REMOVE DEBUG LOG
					}
				});
			}
		}

		/**
   * Message SensorOptions
   * 
   * @param {object} msg - Message object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_msg_SensorOptions",
		value: function _msg_SensorOptions(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = msg.sensorID;
			var sensorOptions = msg.options;

			var sensor_sysID = node.config.nodeID + '.' + sensorID;

			console.log('<*> NGSYS_Hero_Server_SensorsSRV.Messages.SensorOptions'); // TODO REMOVE DEBUG LOG
			console.log(' <~~~> ' + sensor_sysID); // TODO REMOVE DEBUG LOG
			console.log(sensorOptions); // TODO REMOVE DEBUG LOG

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
   * 
   * @param {object} msg - Message object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
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

			var sensorID = msg.sensorID;
			var sensor_sysID = node.config.nodeID + '.' + sensorID;

			var response = {
				"sensorID": sensorID
			};

			console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorOptionsUpdated'); // TODO REMOVE DEBUG LOG
			console.log('<~~~> ' + sensor_sysID); // TODO REMOVE DEBUG LOG

			try {

				var sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
				if (sensorSearch.stSensor === null) {
					throw "Sensor not found";
				}

				var sns = sensorSearch.stSensor;

				// Emit message getSensorOptions
				socket.emit(service.CONSTANTS.Messages.getSensorOptions, { "sensorID": sns.config.sensorID });
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
   * 
   * @param {object} msg - Message object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_msg_SensorStarted",
		value: function _msg_SensorStarted(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = msg.sensorID;
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

				engine.state = engine.CONSTANTS.States.Working;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_SensorsSRV.SensorStarted ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message SensorStopped
   * 
   * @param {object} msg - Message object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_msg_SensorStopped",
		value: function _msg_SensorStopped(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = msg.sensorID;
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

				engine.state = engine.CONSTANTS.States.Ready;
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
