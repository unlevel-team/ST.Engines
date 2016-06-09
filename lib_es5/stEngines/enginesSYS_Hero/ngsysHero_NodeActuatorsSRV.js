"use strict";

/**
 * Actuators services
 * for Node role
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

var ActuatorsServices = require('../services/ActuatorsServices.js').ActuatorsServices;

/**
 * Sensors Services
 */

var NGSYS_Hero_Node_ActuatorsSRV = function (_ActuatorsServices) {
	_inherits(NGSYS_Hero_Node_ActuatorsSRV, _ActuatorsServices);

	function NGSYS_Hero_Node_ActuatorsSRV(actuatorsManager, controlChannel) {
		_classCallCheck(this, NGSYS_Hero_Node_ActuatorsSRV);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsSRV).call(this, actuatorsManager, controlChannel));
	}

	/**
  * Map control events
  */


	_createClass(NGSYS_Hero_Node_ActuatorsSRV, [{
		key: '_mapControlEvents',
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
   */

	}, {
		key: '_mapActuatorControlEvents',
		value: function _mapActuatorControlEvents(actuator) {

			var service = this;

			var actuatorEngine = actuator.actuatorEngine;

			console.log('<*> NGSYS_Hero_Node._mapActuatorControlEvents'); // TODO REMOVE DEBUG LOG
			console.log(actuator);

			actuator.eventEmitter.on(actuator.CONSTANTS.Events.ActuatorOptionsUpdated, service._event_ActuatorOptionsUpdated);

			if (actuatorEngine !== null) {

				// Map event ActuatorEngine_Start
				actuatorEngine.eventEmitter.on(actuatorEngine.CONSTANTS.Events.ActuatorEngine_Start, function (data) {
					service._event_ActuatorEngine_Start({
						"data": data,
						"actuator": actuator
					});
				});

				// Map event ActuatorEngine_Stop
				actuatorEngine.eventEmitter.on(actuatorEngine.CONSTANTS.Events.ActuatorEngine_Stop, function (data) {
					service._event_ActuatorEngine_Stop({
						"data": data,
						"actuator": actuator
					});
				});
			}
		}

		/**
   * Map control messages
   */

	}, {
		key: '_mapControlMessages',
		value: function _mapControlMessages(socket) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsSRV.prototype), '_mapControlMessages', this).call(this, socket);

			var service = this;
			var amng = service.actuatorsManager;

			// Map message getActuatorsList
			socket.on(service.CONSTANTS.Messages.getActuatorsList, function (msg) {
				service._msg_getActuatorsList(msg, service);
			});

			// Map message getActuatorOptions
			socket.on(service.CONSTANTS.Messages.getActuatorOptions, function (msg) {
				service._msg_getActuatorOptions(msg, service);
			});

			// Map message setActuatorOptions
			socket.on(service.CONSTANTS.Messages.setActuatorOptions, function (msg) {
				service._msg_setActuatorOptions(msg, service);
			});

			// Map message StartActuator
			socket.on(service.CONSTANTS.Messages.StartActuator, function (msg) {
				service._msg_StartActuator(msg, service);
			});

			// Map message StopActuator
			socket.on(service.CONSTANTS.Messages.StopActuator, function (msg) {
				service._msg_StopActuator(msg, service);
			});

			// Map message TurnOffActuators
			socket.on(service.CONSTANTS.Messages.TurnOffActuators, function (msg) {
				service._msg_TurnOffActuators(msg, service);
			});
		}

		/**
   * Unmap control messages
   */

	}, {
		key: '_unmapControlMessages',
		value: function _unmapControlMessages(socket) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsSRV.prototype), '_unmapControlMessages', this).call(this, socket);

			var service = this;

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
   */

	}, {
		key: '_event_ActuatorOptionsUpdated',
		value: function _event_ActuatorOptionsUpdated(data) {

			var service = this;
			var socket = service.controlChannel.socket;

			var actuator = data.actuator;

			// Emit message ActuatorOptionsUpdated
			socket.emit(service.CONSTANTS.Messages.ActuatorOptionsUpdated, {
				"actuatorID": actuator.config.id
			});
		}

		/**
   * Event ActuatorEngine_Start
   */

	}, {
		key: '_event_ActuatorEngine_Start',
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
   */

	}, {
		key: '_event_ActuatorEngine_Stop',
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
		key: '_msg_getActuatorsList',
		value: function _msg_getActuatorsList(msg, service) {

			if (service === undefined) {
				service = this;
			}
			var amng = service.actuatorsManager;
			var socket = service.controlChannel.socket;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorsList'); // TODO REMOVE DEBUG LOG

			var response = {};
			response.numActuators = amng.actuatorsList.length;
			response.actuators = [];

			amng.actuatorsList.forEach(function (act_, _i) {

				var actuator = {
					"actuatorID": act_.config.id,
					"type": act_.config.type,
					"state": act_.config.state
				};

				response.actuators.push(actuator);
			});

			// Emit message ActuatorsList
			socket.emit(service.CONSTANTS.Messages.ActuatorsList, response);
		}

		/**
   * Message getActuatorOptions
   */

	}, {
		key: '_msg_getActuatorOptions',
		value: function _msg_getActuatorOptions(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var amng = service.actuatorsManager;
			var socket = service.controlChannel.socket;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorOptions'); // TODO REMOVE DEBUG LO

			var actuatorID = msg.actuatorID;

			var response = {
				"actuatorID": actuatorID
			};

			try {

				var actuatorSearch = amng.getActuatorByID(actuatorID);
				if (actuatorSearch.STactuator === null) {
					throw "Actuator not found.";
				}

				var actuator = actuatorSearch.STactuator;

				response.options = actuator.getOptions();

				// Emit message ActuatorOptions
				socket.emit(service.CONSTANTS.Messages.ActuatorOptions, response);
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message setActuatorOptions
   */

	}, {
		key: '_msg_setActuatorOptions',
		value: function _msg_setActuatorOptions(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var amng = service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.setActuatorOptions'); // TODO REMOVE DEBUG LO
			console.log(' <~> ' + msg); // TODO REMOVE DEBUG LO

			var actuatorID = msg.actuatorID;
			var options = msg.options;

			var response = {
				"actuatorID": actuatorID
			};

			try {

				var actuatorSearch = amng.getActuatorByID(actuatorID);
				if (actuatorSearch.STactuator === null) {
					throw "Actuator not found.";
				}

				var actuator = actuatorSearch.STactuator;

				actuator.setOptions(options);
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.setActuatorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message StartActuator
   */

	}, {
		key: '_msg_StartActuator',
		value: function _msg_StartActuator(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var amng = service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.StartActuator'); // TODO REMOVE DEBUG LOG
			console.log(msg); // TODO REMOVE DEBUG LOG
			//		  console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				var _actuatorSearch = amng.getActuatorByID(msg.actuatorID);

				if (_actuatorSearch.STactuator !== null) {
					_actuatorSearch.STactuator.actuatorEngine.startEngine();
					response.result = "OK";
				} else {
					console.log("Not found!!!"); // TODO REMOVE DEBUG LOG
					throw "Actuator not found.";
				}
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.StartActuator ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}

			//			msg.result = response.result;
		}

		/**
   * Message StopActuator
   */

	}, {
		key: '_msg_StopActuator',
		value: function _msg_StopActuator(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var amng = service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.StopActuator'); // TODO REMOVE DEBUG LOG
			console.log(msg); // TODO REMOVE DEBUG LOG
			//		console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				var _actuatorSearch = amng.getActuatorByID(msg.actuatorID);

				if (_actuatorSearch.STactuator !== null) {
					_actuatorSearch.STactuator.actuatorEngine.stopEngine();
					response.result = "OK";
				} else {
					throw "Actuator not found.";
				}
			} catch (e) {

				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;
				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.StopActuator ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message TurnOffActuators
   */

	}, {
		key: '_msg_TurnOffActuators',
		value: function _msg_TurnOffActuators(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var amng = service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.TurnOffActuators'); // TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				amng.turnOffActuators();
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.TurnOffActuators ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
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
