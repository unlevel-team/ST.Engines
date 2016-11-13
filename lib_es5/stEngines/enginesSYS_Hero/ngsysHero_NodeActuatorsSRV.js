"use strict";

/**
 * Actuators services
 * for Node role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

/**
 * Import ActuatorsServices
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActuatorsServices = require('../services/ActuatorsServices.js').ActuatorsServices;

/**
 * Actuators Services
 * 
 * <pre>
 * for role Node
 * 
 * version Hero
 * 
 * </pre>
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.services.ActuatorsServices
 * 
 */

var NGSYS_Hero_Node_ActuatorsSRV = function (_ActuatorsServices) {
	_inherits(NGSYS_Hero_Node_ActuatorsSRV, _ActuatorsServices);

	/**
  * @constructs NGSYS_Hero_Node_ActuatorsSRV
  * 
  * @param {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager object
  * @param {object} controlChannel - Control channel object
  * 
  */

	function NGSYS_Hero_Node_ActuatorsSRV(actuatorsManager, controlChannel) {
		_classCallCheck(this, NGSYS_Hero_Node_ActuatorsSRV);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsSRV).call(this, actuatorsManager, controlChannel));
	}

	/**
  * Map control events
  * 
  * @param {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager object
  */


	_createClass(NGSYS_Hero_Node_ActuatorsSRV, [{
		key: "_mapControlEvents",
		value: function _mapControlEvents(actuatorsManager) {

			var service = this;

			if (actuatorsManager === undefined) {
				actuatorsManager = service.actuatorsManager;
			}

			actuatorsManager.actuatorsList.forEach(function (actuator, _i) {
				service._mapActuatorControlEvents(actuator);
			});
		}

		/**
   * Map control events for actuators
   * 
   * @param {st.ngn.Actuator} actuator 
   */

	}, {
		key: "_mapActuatorControlEvents",
		value: function _mapActuatorControlEvents(actuator) {

			var service = this;

			var actuatorEngine = actuator.actuatorEngine;

			// console.log('<*> NGSYS_Hero_Node._mapActuatorControlEvents');	// TODO REMOVE DEBUG LOG
			// console.log(actuator.config);

			// Map event ActuatorOptionsUpdated
			actuator.eventEmitter.on(actuator.CONSTANTS.Events.ActuatorOptionsUpdated, function (data) {
				service._event_ActuatorOptionsUpdated(data, {
					"service": service
				});
			});

			if (actuatorEngine !== null) {

				// Map event ActuatorEngine_Start
				actuatorEngine.eventEmitter.on(actuatorEngine.CONSTANTS.Events.Engine_Start, function (data) {
					service._event_ActuatorEngine_Start({
						"data": data,
						"actuator": actuator
					});
				});

				// Map event ActuatorEngine_Stop
				actuatorEngine.eventEmitter.on(actuatorEngine.CONSTANTS.Events.Engine_Stop, function (data) {
					service._event_ActuatorEngine_Stop({
						"data": data,
						"actuator": actuator
					});
				});
			}
		}

		/**
   * Map control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Node_ActuatorsSRV} [options.service] - Actuators Service object
   * 
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket, options) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsSRV.prototype), "_mapControlMessages", this).call(this, socket, options);

			var _service = this;
			if (options.service !== undefined) {
				_service = options.service;
			}

			var _amng = _service.actuatorsManager;

			// Map message getActuatorsList
			socket.on(_service.CONSTANTS.Messages.getActuatorsList, function (_msg) {
				_service._msg_getActuatorsList({
					'msg': _msg,
					'service': _service
				});
			});

			// Map message getActuatorOptions
			socket.on(_service.CONSTANTS.Messages.getActuatorOptions, function (_msg) {
				_service._msg_getActuatorOptions({
					'msg': _msg,
					'service': _service
				});
			});

			// Map message setActuatorOptions
			socket.on(_service.CONSTANTS.Messages.setActuatorOptions, function (_msg) {
				_service._msg_setActuatorOptions({
					'msg': _msg,
					'service': _service
				});
			});

			// Map message StartActuator
			socket.on(_service.CONSTANTS.Messages.StartActuator, function (_msg) {
				_service._msg_StartActuator({
					'msg': _msg,
					'service': _service
				});
			});

			// Map message StopActuator
			socket.on(_service.CONSTANTS.Messages.StopActuator, function (_msg) {
				_service._msg_StopActuator({
					'msg': _msg,
					'service': _service
				});
			});

			// Map message TurnOffActuators
			socket.on(_service.CONSTANTS.Messages.TurnOffActuators, function (_msg) {
				_service._msg_TurnOffActuators({
					'msg': _msg,
					'service': _service
				});
			});
		}

		/**
   * Unmap control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Node_ActuatorsSRV} [options.service] - Actuators Service object
   *
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket, options) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsSRV.prototype), "_unmapControlMessages", this).call(this, socket, options);

			var service = this;
			if (options.service !== undefined) {
				service = options.service;
			}

			//		socket.removeListener(service.CONSTANTS.Messages.getActuatorsList, service._msg_getActuatorsList);
			//		socket.removeListener(service.CONSTANTS.Messages.getActuatorOptions, service._msg_getActuatorOptions);
			//		socket.removeListener(service.CONSTANTS.Messages.setActuatorOptions, service._msg_setActuatorOptions);
			//		socket.removeListener(service.CONSTANTS.Messages.StartActuator, service._msg_StartActuator);
			//		socket.removeListener(service.CONSTANTS.Messages.StopActuator, service._msg_StopActuator);
			//		socket.removeListener(service.CONSTANTS.Messages.TurnOffActuators, service._msg_TurnOffActuators);

			socket.removeAllListeners(service.CONSTANTS.Messages.getActuatorsList);
			socket.removeAllListeners(service.CONSTANTS.Messages.getActuatorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.setActuatorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.StartActuator);
			socket.removeAllListeners(service.CONSTANTS.Messages.StopActuator);
			socket.removeAllListeners(service.CONSTANTS.Messages.TurnOffActuators);

			service._mapped = null;
		}

		/**
   * Event ActuatorOptionsUpdated
   * 	
   * @param {object} data - Data object
   * @param {object} options - Options object
   * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Node_ActuatorsSRV} [options.service] - Actuators Service object
   * 
   */

	}, {
		key: "_event_ActuatorOptionsUpdated",
		value: function _event_ActuatorOptionsUpdated(data, options) {

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var socket = service.controlChannel.socket;

			var actuator = data.actuator;

			// Emit message ActuatorOptionsUpdated
			socket.emit(service.CONSTANTS.Messages.ActuatorOptionsUpdated, {
				"actuatorID": actuator.config.id
			});
		}

		/**
   * Event ActuatorEngine_Start
   * 
   * @param {object} data - Data object
   * 
   */

	}, {
		key: "_event_ActuatorEngine_Start",
		value: function _event_ActuatorEngine_Start(data) {

			var service = this;
			var socket = service.controlChannel.socket;

			var actuator = data.actuator;

			// Emit message ActuatorStarted
			socket.emit(service.CONSTANTS.Messages.ActuatorStarted, {
				"actuatorID": actuator.config.id
			});
		}

		/**
   * Event ActuatorEngine_Stop
   * 
   * @param {object} data - Data object
   * 
   */

	}, {
		key: "_event_ActuatorEngine_Stop",
		value: function _event_ActuatorEngine_Stop(data) {

			var service = this;
			var socket = service.controlChannel.socket;

			var actuator = data.actuator;

			// Emit message ActuatorStarted
			socket.emit(service.CONSTANTS.Messages.ActuatorStopped, {
				"actuatorID": actuator.config.id
			});
		}

		/**
   * Message getActuatorsList
   */

	}, {
		key: "_msg_getActuatorsList",
		value: function _msg_getActuatorsList(options) {

			if (options === undefined) {
				options = {};
			}

			var _service = this;
			if (options.service !== undefined) {
				_service = options.service;
			}

			var _msg = options.msg;

			var _amng = _service.actuatorsManager;
			var _socket = _service.controlChannel.socket;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorsList'); // TODO REMOVE DEBUG LOG

			var _response = {};
			_response.numActuators = _amng.actuatorsList.length;
			_response.actuators = [];

			// Only for enabled
			var _actuatorsEnabled = _amng.actuatorsList.filter(function (_actuator, _i) {

				if (_actuator.enabled === true) {
					return true;
				}

				return false;
			});

			_actuatorsEnabled.forEach(function (_act, _i) {

				var _actuator = {
					"actuatorID": _act.config.id,
					"type": _act.config.type,
					"engine": "not defined",
					"state": "config"
				};

				if (_act.actuatorEngine !== null) {
					if (_act.actuatorEngine.name !== undefined) {
						_actuator.engine = _act.actuatorEngine.name;
					}
					_actuator.state = _act.actuatorEngine.state;
				}

				_response.actuators.push(_actuator);
			});

			// Emit message ActuatorsList
			_socket.emit(_service.CONSTANTS.Messages.ActuatorsList, _response);
		}

		/**
   * Message getActuatorOptions
   */

	}, {
		key: "_msg_getActuatorOptions",
		value: function _msg_getActuatorOptions(options) {

			if (options === undefined) {
				options = {};
			}

			var _service = this;
			if (options.service !== undefined) {
				_service = options.service;
			}

			var _msg = options.msg;

			var _amng = _service.actuatorsManager;
			var _socket = _service.controlChannel.socket;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorOptions'); // TODO REMOVE DEBUG LO

			var _actuatorID = _msg.actuatorID;

			var _response = {
				"actuatorID": _actuatorID
			};

			try {

				var _actuatorSearch = _amng.getActuatorByID(_actuatorID);
				if (_actuatorSearch.STactuator === null) {
					throw "Actuator not found.";
				}

				var _actuator = _actuatorSearch.STactuator;

				_response.options = _actuator.getOptions();

				// Emit message ActuatorOptions
				_socket.emit(_service.CONSTANTS.Messages.ActuatorOptions, _response);
			} catch (_e) {
				// TODO: handle exception
				_response.result = "ERROR";
				_response.error = _e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(_response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message setActuatorOptions
   */

	}, {
		key: "_msg_setActuatorOptions",
		value: function _msg_setActuatorOptions(options) {

			if (options === undefined) {
				options = {};
			}

			var _service = this;
			if (options.service !== undefined) {
				_service = options.service;
			}

			var _msg = options.msg;

			var _amng = _service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.setActuatorOptions'); // TODO REMOVE DEBUG LO
			console.log(_msg); // TODO REMOVE DEBUG LO

			var _actuatorID = _msg.actuatorID;
			var _options = _msg.options;

			var _response = {
				'actuatorID': _actuatorID
			};

			try {

				var _actuatorSearch = _amng.getActuatorByID(_actuatorID);
				if (_actuatorSearch.STactuator === null) {
					throw "Actuator not found.";
				}

				var _actuator = _actuatorSearch.STactuator;

				_actuator.setOptions(_options);
			} catch (_e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = _e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.setActuatorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(_response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message StartActuator
   */

	}, {
		key: "_msg_StartActuator",
		value: function _msg_StartActuator(options) {

			if (options === undefined) {
				options = {};
			}

			var _service = this;
			if (options.service !== undefined) {
				_service = options.service;
			}

			var _msg = options.msg;

			var _amng = _service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.StartActuator'); // TODO REMOVE DEBUG LOG
			console.log(_msg); // TODO REMOVE DEBUG LOG
			//		  console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

			var _response = {};
			_response.result = null;

			try {

				var _actuatorSearch = _amng.getActuatorByID(_msg.actuatorID);

				if (_actuatorSearch.STactuator !== null) {

					// _actuatorSearch.STactuator.actuatorEngine.startEngine();

					_actuatorSearch.STactuator.actuatorEngine.startEngine({
						'ngnInterface': _actuatorSearch.STactuator.actuatorEngine
					});
				} else {
					throw "Actuator not found.";
				}
			} catch (_e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = _e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.StartActuator ERROR'); // TODO REMOVE DEBUG LOG
				console.log(_response); // TODO REMOVE DEBUG LOG
			}

			//			msg.result = response.result;
		}

		/**
   * Message StopActuator
   */

	}, {
		key: "_msg_StopActuator",
		value: function _msg_StopActuator(options) {

			if (options === undefined) {
				options = {};
			}

			var _service = this;
			if (options.service !== undefined) {
				_service = options.service;
			}

			var _msg = options.msg;

			var _amng = _service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.StopActuator'); // TODO REMOVE DEBUG LOG
			console.log(_msg); // TODO REMOVE DEBUG LOG
			//		console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

			var _response = {};
			_response.result = null;

			try {

				var _actuatorSearch = _amng.getActuatorByID(_msg.actuatorID);

				if (_actuatorSearch.STactuator !== null) {

					// _actuatorSearch.STactuator.actuatorEngine.stopEngine();

					_actuatorSearch.STactuator.actuatorEngine.stopEngine({
						'ngnInterface': _actuatorSearch.STactuator.actuatorEngine
					});
				} else {
					throw "Actuator not found.";
				}
			} catch (_e) {

				// TODO: handle exception
				_response.result = "ERROR";
				_response.error = _e;
				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.StopActuator ERROR'); // TODO REMOVE DEBUG LOG
				console.log(_response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message TurnOffActuators
   */

	}, {
		key: "_msg_TurnOffActuators",
		value: function _msg_TurnOffActuators(options) {

			if (options === undefined) {
				options = {};
			}

			var _service = this;
			if (options.service !== undefined) {
				_service = options.service;
			}

			var _msg = options.msg;

			var _amng = _service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.TurnOffActuators'); // TODO REMOVE DEBUG LOG

			var _response = {};
			_response.result = null;

			try {

				_amng.turnOffActuators();
			} catch (_e) {
				// TODO: handle exception
				_response.result = "ERROR";
				_response.error = _e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.TurnOffActuators ERROR'); // TODO REMOVE DEBUG LOG
				console.log(_response); // TODO REMOVE DEBUG LOG
			}
		}
	}]);

	return NGSYS_Hero_Node_ActuatorsSRV;
}(ActuatorsServices);

var _Lib = {
	"NGSYS_Hero_Node_ActuatorsSRV": NGSYS_Hero_Node_ActuatorsSRV
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_NodeActuatorsSRV.js.map
