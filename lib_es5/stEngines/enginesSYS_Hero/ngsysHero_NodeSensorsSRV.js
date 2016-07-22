"use strict";

/**
 * Sensors services
 * for Node role
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
 * <pre>
 * for role Node
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * @implements SensorsServices
 * 
 */

var NGSYS_Hero_Node_SensorsSRV = function (_SensorsServices) {
	_inherits(NGSYS_Hero_Node_SensorsSRV, _SensorsServices);

	/**
  * 
  * @constructs NGSYS_Hero_Node_SensorsSRV
  * 
  * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
  * @param {object} controlChannel - Control chnnel object
  * 
  */

	function NGSYS_Hero_Node_SensorsSRV(sensorsManager, controlChannel) {
		_classCallCheck(this, NGSYS_Hero_Node_SensorsSRV);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Node_SensorsSRV).call(this, sensorsManager, controlChannel));
	}

	/**
  * Map control events
  * 
  * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
  */


	_createClass(NGSYS_Hero_Node_SensorsSRV, [{
		key: "_mapControlEvents",
		value: function _mapControlEvents(sensorsManager) {

			var service = this;

			if (sensorsManager === undefined) {
				sensorsManager = service.sensorsManager;
			}

			sensorsManager.sensorsList.forEach(function (sensor, _i) {

				try {
					service._mapSensorControlEvents(sensor);
				} catch (e) {
					// TODO: handle exception
					throw "Error mapping sensor control events. " + e;
				}
			});
		}

		/**
   * Map control events for sensors
   * 
   * @param {st.ngn.Sensor} sensor 
   */

	}, {
		key: "_mapSensorControlEvents",
		value: function _mapSensorControlEvents(sensor) {

			var service = this;
			var sensorEngine = sensor.sensorEngine;

			console.log('<*> NGSYS_Hero_Node._mapSensorControlEvents'); // TODO REMOVE DEBUG LOG
			console.log(sensor);

			sensor.eventEmitter.on(sensor.CONSTANTS.Events.SensorOptionsUpdated, function (data) {
				service._event_SensorOptionsUpdated(data, {
					"service": service
				});
			});

			if (sensorEngine !== null) {

				// Map event SensorEngine_Start
				sensorEngine.eventEmitter.on(sensorEngine.CONSTANTS.Events.SensorEngine_Start, function (data) {
					service._event_SensorEngine_Start({
						"data": data,
						"sensor": sensor
					});
				});

				// Map event SensorEngine_Stop
				sensorEngine.eventEmitter.on(sensorEngine.CONSTANTS.Events.SensorEngine_Stop, function (data) {
					service._event_SensorEngine_Stop({
						"data": data,
						"sensor": sensor
					});
				});
			}
		}

		/**
   * Map control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Node_SensorsSRV} [options.service] - Sensors Service object
   * 
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket, options) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_SensorsSRV.prototype), "_mapControlMessages", this).call(this, socket, options);

			var service = this;
			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;

			// Map message getSensorsList
			socket.on(service.CONSTANTS.Messages.getSensorsList, function (msg) {
				service._msg_getSensorsList(msg, {
					"service": service
				});
			});

			// Map message getSensorOptions
			socket.on(service.CONSTANTS.Messages.getSensorOptions, function (msg) {
				service._msg_getSensorOptions(msg, service);
			});

			// Map message setSensorOptions
			socket.on(service.CONSTANTS.Messages.setSensorOptions, function (msg) {
				service._msg_setSensorOptions(msg, service);
			});

			// Map message StartSensor
			socket.on(service.CONSTANTS.Messages.StartSensor, function (msg) {
				service._msg_StartSensor(msg, service);
			});

			// Map message StopSensor
			socket.on(service.CONSTANTS.Messages.StopSensor, function (msg) {
				service._msg_StopSensor(msg, service);
			});

			// Map message TurnOffSensors
			socket.on(service.CONSTANTS.Messages.TurnOffSensors, function (msg) {
				service._msg_TurnOffSensors(msg, service);
			});
		}

		/**
   * Unmap control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Node_SensorsSRV} [options.service] - Sensors Service object
   * 
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket, options) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_SensorsSRV.prototype), "_unmapControlMessages", this).call(this, socket, options);

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			//		socket.removeListener(service.CONSTANTS.Messages.getSensorsList, service._msg_getSensorsList);
			//		socket.removeListener(service.CONSTANTS.Messages.getSensorOptions, service._msg_getSensorOptions);
			//		socket.removeListener(service.CONSTANTS.Messages.setSensorOptions, service._msg_setSensorOptions);
			//		socket.removeListener(service.CONSTANTS.Messages.StartSensor, service._msg_StartSensor);
			//		socket.removeListener(service.CONSTANTS.Messages.StopSensor, service._msg_StopSensor);
			//		socket.removeListener(service.CONSTANTS.Messages.TurnOffSensors, service._msg_TurnOffSensors);

			socket.removeAllListeners(service.CONSTANTS.Messages.getSensorsList);
			socket.removeAllListeners(service.CONSTANTS.Messages.getSensorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.setSensorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.StartSensor);
			socket.removeAllListeners(service.CONSTANTS.Messages.StopSensor);
			socket.removeAllListeners(service.CONSTANTS.Messages.TurnOffSensors);

			service._mapped = null;
		}

		/**
   * Event SensorOptionsUpdated
   */

	}, {
		key: "_event_SensorOptionsUpdated",
		value: function _event_SensorOptionsUpdated(data, options) {

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var socket = service.controlChannel.socket;
			var sensor = data.sensor;

			// Emit message SensorOptionsUpdated
			socket.emit(service.CONSTANTS.Messages.SensorOptionsUpdated, {
				"sensorID": sensor.config.id
			});
		}

		/**
   * Event SensorEngine_Start
   */

	}, {
		key: "_event_SensorEngine_Start",
		value: function _event_SensorEngine_Start(data) {

			var service = this;
			var socket = service.controlChannel.socket;

			var sensor = data.sensor;

			// Emit message SensorStarted
			socket.emit(service.CONSTANTS.Messages.SensorStarted, {
				"sensorID": sensor.config.id
			});
		}

		/**
   * Event SensorEngine_Stop
   */

	}, {
		key: "_event_SensorEngine_Stop",
		value: function _event_SensorEngine_Stop(data) {

			var service = this;
			var socket = service.controlChannel.socket;

			var sensor = data.sensor;

			// Emit message SensorStarted
			socket.emit(service.CONSTANTS.Messages.SensorStopped, {
				"sensorID": sensor.config.id
			});
		}

		/**
   * Message getSensorsList
   */

	}, {
		key: "_msg_getSensorsList",
		value: function _msg_getSensorsList(msg, options) {

			if (options === undefined) {
				options = {};
			}

			var _service = this;

			if (options.service !== undefined) {
				_service = options.service;
			}

			var _smng = _service.sensorsManager;
			var _socket = _service.controlChannel.socket;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorsList'); // TODO REMOVE DEBUG LOG

			var _response = {};
			_response.numSensors = _smng.sensorsList.length;
			_response.sensors = [];

			// Only for enabled
			var _sensorsEnabled = _smng.sensorsList.filter(function (_sensor, _i) {

				if (_sensor.enabled === true) {
					return true;
				}

				return false;
			});

			_sensorsEnabled.forEach(function (_sns, _i) {

				var _sensor = {
					"sensorID": _sns.config.id,
					"type": _sns.config.type,
					"engine": "not defined",
					"state": "config"
				};

				if (_sns.sensorEngine !== null) {
					if (_sns.sensorEngine.name !== undefined) {
						_sensor.engine = _sns.sensorEngine.name;
					}
					_sensor.state = _sns.sensorEngine.state;
				}

				_response.sensors.push(_sensor);
			});

			// Emit message SensorsList
			_socket.emit(_service.CONSTANTS.Messages.SensorsList, _response);
		}

		/**
   * Message getSensorOptions
   */

	}, {
		key: "_msg_getSensorOptions",
		value: function _msg_getSensorOptions(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;
			var socket = service.controlChannel.socket;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorOptions'); // TODO REMOVE DEBUG LO

			var sensorID = msg.sensorID;

			var response = {
				"sensorID": sensorID
			};

			try {

				var sensorSearch = smng.getSensorByID(sensorID);
				if (sensorSearch.STsensor === null) {
					throw "Sensor not found.";
				}

				var sensor = sensorSearch.STsensor;

				response.options = sensor.getOptions();

				// Emit message SensorOptions
				socket.emit(service.CONSTANTS.Messages.SensorOptions, response);
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message setSensorOptions
   */

	}, {
		key: "_msg_setSensorOptions",
		value: function _msg_setSensorOptions(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.setSensorOptions'); // TODO REMOVE DEBUG LO
			console.log(msg); // TODO REMOVE DEBUG LO

			var sensorID = msg.sensorID;
			var options = msg.options;

			var response = {
				"sensorID": sensorID
			};

			try {

				var sensorSearch = smng.getSensorByID(sensorID);
				if (sensorSearch.STsensor === null) {
					throw "Sensor not found.";
				}

				var sensor = sensorSearch.STsensor;

				sensor.setOptions(options);
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.setSensorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message StartSensor
   */

	}, {
		key: "_msg_StartSensor",
		value: function _msg_StartSensor(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.StartSensor'); // TODO REMOVE DEBUG LOG
			console.log(msg); // TODO REMOVE DEBUG LOG
			//		  console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				var _sensorSearch = smng.getSensorByID(msg.sensorID);

				if (_sensorSearch.STsensor !== null) {
					_sensorSearch.STsensor.sensorEngine.startEngine();
					response.result = "OK";
				} else {
					console.log("Not found!!!"); // TODO REMOVE DEBUG LOG
					throw "Sensor not found.";
				}
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.StartSensor ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}

			//			msg.result = response.result;
		}

		/**
   * Message StopSensor
   */

	}, {
		key: "_msg_StopSensor",
		value: function _msg_StopSensor(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.StopSensor'); // TODO REMOVE DEBUG LOG
			console.log(msg); // TODO REMOVE DEBUG LOG
			//		console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				var _sensorSearch = smng.getSensorByID(msg.sensorID);

				if (_sensorSearch.STsensor !== null) {
					_sensorSearch.STsensor.sensorEngine.stopEngine();
					response.result = "OK";
				} else {
					throw "Sensor not found.";
				}
			} catch (e) {

				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;
				console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.StopSensor ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message TurnOffSensors
   */

	}, {
		key: "_msg_TurnOffSensors",
		value: function _msg_TurnOffSensors(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.TurnOffSensors'); // TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				smng.turnOffSensors();
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.TurnOffSensors ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}
	}]);

	return NGSYS_Hero_Node_SensorsSRV;
}(SensorsServices);

var _Lib = {
	"NGSYS_Hero_Node_SensorsSRV": NGSYS_Hero_Node_SensorsSRV
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_NodeSensorsSRV.js.map
