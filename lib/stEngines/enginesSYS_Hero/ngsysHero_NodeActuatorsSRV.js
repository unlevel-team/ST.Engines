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
let ActuatorsServices = require('../services/ActuatorsServices.js').ActuatorsServices;


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
class NGSYS_Hero_Node_ActuatorsSRV extends ActuatorsServices {
	
	/**
	 * @constructs NGSYS_Hero_Node_ActuatorsSRV
	 * 
	 * @param {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager object
	 * @param {object} controlChannel - Control channel object
	 * 
	 */
	constructor(actuatorsManager, controlChannel) {
		
		super(actuatorsManager, controlChannel);
	}

	
	/**
	 * Map control events
	 * 
	 * @param {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager object
	 */
	_mapControlEvents(actuatorsManager) {
		
		let service = this;
		
		if (actuatorsManager === undefined) {
			actuatorsManager = service.actuatorsManager;
		}
		
		
		actuatorsManager.actuatorsList.forEach(function(actuator, _i) {
			service._mapActuatorControlEvents(actuator);
		});
		
	}
	
	
	/**
	 * Map control events for actuators
	 * 
	 * @param {st.ngn.Actuator} actuator 
	 */
	_mapActuatorControlEvents(actuator) {
		
		let service = this;
		
		let actuatorEngine = actuator.actuatorEngine;
		
		
		console.log('<*> NGSYS_Hero_Node._mapActuatorControlEvents');	// TODO REMOVE DEBUG LOG
		console.log(actuator);
		
		
		// Map event ActuatorOptionsUpdated
		actuator.eventEmitter.on(actuator.CONSTANTS.Events.ActuatorOptionsUpdated, 
				
				function(data) {
					service._event_ActuatorOptionsUpdated(data,
							{
								"service" : service
							});
				}
				
		);
		
		if (actuatorEngine !== null) {
			
			// Map event ActuatorEngine_Start
			actuatorEngine.eventEmitter.on(
					actuatorEngine.CONSTANTS.Events.ActuatorEngine_Start, 
					function(data){
						service._event_ActuatorEngine_Start({
							"data": data,
							"actuator": actuator
						});
					}
			);
			
			// Map event ActuatorEngine_Stop
			actuatorEngine.eventEmitter.on(
					actuatorEngine.CONSTANTS.Events.ActuatorEngine_Stop, 
					function(data){
						service._event_ActuatorEngine_Stop({
							"data": data,
							"actuator": actuator
						});
					}
			);
			
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
	_mapControlMessages(socket, options) {
		
		super._mapControlMessages(socket, options);
		
		let service = this;
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let amng = service.actuatorsManager;
		
		
		// Map message getActuatorsList
		socket.on(service.CONSTANTS.Messages.getActuatorsList, 
				
			function(msg) {
				service._msg_getActuatorsList(msg, {
					"service": service
				});
			}
		);
		
		// Map message getActuatorOptions
		socket.on(service.CONSTANTS.Messages.getActuatorOptions, 
				
			function(msg) {
				service._msg_getActuatorOptions(msg, service);
			}				
		);
		
		// Map message setActuatorOptions
		socket.on(service.CONSTANTS.Messages.setActuatorOptions, 
				
			function(msg) {
				service._msg_setActuatorOptions(msg, service);
			}				
		);
		
		// Map message StartActuator
		socket.on(service.CONSTANTS.Messages.StartActuator, 
			
			function(msg) {
				service._msg_StartActuator(msg, service);
			}	
		);
		
		// Map message StopActuator
		socket.on(service.CONSTANTS.Messages.StopActuator, 
			
			function(msg) {
				service._msg_StopActuator(msg, service);
			}	
		);
		
		// Map message TurnOffActuators
		socket.on(service.CONSTANTS.Messages.TurnOffActuators, 
				
			function(msg) {
				service._msg_TurnOffActuators(msg, service);
			}	
		);
		
	}
	
	
	/**
	 * Unmap control messages
	 * 
	 * @param {object} socket - Socket object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Node_ActuatorsSRV} [options.service] - Actuators Service object
	 *
	 */
	_unmapControlMessages(socket, options) {
		
		super._unmapControlMessages(socket, options);
		
		let service = this;
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
	_event_ActuatorOptionsUpdated(data, options) {
		
		let service = this;
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let socket = service.controlChannel.socket;
		
		let actuator = data.actuator;
		
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
	_event_ActuatorEngine_Start(data) {
		
		let service = this;
		let socket = service.controlChannel.socket;
		
		let actuator = data.actuator;
		
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
	_event_ActuatorEngine_Stop(data) {
		
		let service = this;
		let socket = service.controlChannel.socket;
		
		let actuator = data.actuator;
		
		// Emit message ActuatorStarted
		socket.emit(service.CONSTANTS.Messages.ActuatorStopped, {
			"actuatorID": actuator.config.id
		});
		
	}
	
	
	/**
	 * Message getActuatorsList
	 */
	_msg_getActuatorsList(msg, options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _service = this;

		if (options.service !== undefined) {
			_service  = options.service;
		}
		
		let _amng = _service.actuatorsManager;
		let _socket = _service.controlChannel.socket;
		
		console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorsList');	// TODO REMOVE DEBUG LOG
	  
		let _response = {};
		_response.numActuators = _amng.actuatorsList.length;
		_response.actuators = [];
		
		// Only for enabled
		let _actuatorsEnabled = _amng.actuatorsList.filter(function(_actuator, _i) {
			
			if (_actuator.enabled === true) {
				return true;
			}
			
			return false;
		});
	  
		
		_actuatorsEnabled.forEach(function(act_, _i) {
	  	
			let _actuator = {
				"actuatorID" : act_.config.id,
				"type" : act_.config.type,
				"engine": "not defined",
				"state" : "config"
			};
			
			
			if (act_.actuatorEngine !== null) {
				if (act_.actuatorEngine.name !== undefined) {
					_actuator.engine = act_.actuatorEngine.name;
				}
				_actuator.state = act_.actuatorEngine.state;
			}
			
			
			_response.actuators.push( _actuator );
		});
	  
	  
		// Emit message ActuatorsList
		_socket.emit( _service.CONSTANTS.Messages.ActuatorsList, _response );
	
	}
	
	
	/**
	 * Message getActuatorOptions
	 */
	_msg_getActuatorOptions(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
		let amng = service.actuatorsManager;
		let socket = service.controlChannel.socket;
		
		console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorOptions');	// TODO REMOVE DEBUG LO
		  
		let actuatorID = msg.actuatorID;
		  
		let response = {
		  "actuatorID" : actuatorID
		};
		  
		try {
			  
			let actuatorSearch = amng.getActuatorByID(actuatorID);
			if(actuatorSearch.STactuator === null){
				throw "Actuator not found.";
			}
			
			let actuator = actuatorSearch.STactuator;
			  
			response.options = actuator.getOptions();
			 
			// Emit message ActuatorOptions
			socket.emit(service.CONSTANTS.Messages.ActuatorOptions, response);
	
		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

			console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorOptions ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message setActuatorOptions
	 */
	_msg_setActuatorOptions(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
		let amng = service.actuatorsManager;
			
		console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.setActuatorOptions');	// TODO REMOVE DEBUG LO
		console.log(msg);	// TODO REMOVE DEBUG LO

		let actuatorID = msg.actuatorID;
		let options = msg.options;
		  
		let response = {
				"actuatorID" : actuatorID
		};
		  
		try {
		 
			let actuatorSearch = amng.getActuatorByID(actuatorID);
			if(actuatorSearch.STactuator === null){
				throw "Actuator not found.";
			}
			
			let actuator = actuatorSearch.STactuator;
			
			actuator.setOptions(options);
			  
		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

			console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.setActuatorOptions ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message StartActuator
	 */
	_msg_StartActuator(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
		let amng = service.actuatorsManager;

		
		console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.StartActuator');	// TODO REMOVE DEBUG LOG
		console.log(msg);	// TODO REMOVE DEBUG LOG
//		  console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

		let response = {};
		response.result = null;
	  
		try {
		
			let _actuatorSearch = amng.getActuatorByID(msg.actuatorID);
		  
			if (_actuatorSearch.STactuator !== null) {
				_actuatorSearch.STactuator.actuatorEngine.startEngine();
				response.result = "OK";
			} else {
				console.log("Not found!!!");	// TODO REMOVE DEBUG LOG
				throw "Actuator not found.";  
			}

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;
			
			console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.StartActuator ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
//			msg.result = response.result;
		
	}
	
	
	/**
	 * Message StopActuator
	 */
	_msg_StopActuator(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
		let amng = service.actuatorsManager;
		
		console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.StopActuator');	// TODO REMOVE DEBUG LOG
		console.log(msg);	// TODO REMOVE DEBUG LOG
//		console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG
		  
		let response = {};
		response.result = null;
		  
		try {
			
		  let _actuatorSearch = amng.getActuatorByID(msg.actuatorID);
			  
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
			console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.StopActuator ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message TurnOffActuators
	 */
	_msg_TurnOffActuators(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
		let amng = service.actuatorsManager;
		
		console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.TurnOffActuators');	// TODO REMOVE DEBUG LOG
	  
		let response = {};
		response.result = null;
	  
		try {
		
			amng.turnOffActuators();

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

			console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.TurnOffActuators ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
}



let _Lib = {
		"NGSYS_Hero_Node_ActuatorsSRV" : NGSYS_Hero_Node_ActuatorsSRV
	};


module.exports = _Lib;
