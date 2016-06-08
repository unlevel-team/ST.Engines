"use strict";

/**
 * Actuators services
 * for Node role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

let ActuatorsServices = require('../services/ActuatorsServices.js').ActuatorsServices;


/**
 * Sensors Services
 */
class NGSYS_Hero_Node_ActuatorsSRV extends ActuatorsServices {
	
	constructor(actuatorsManager, controlChannel) {
		
		super(actuatorsManager, controlChannel);
	}

	
	/**
	 * Map control events
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
	 */
	_mapActuatorControlEvents(actuator) {
		
		let service = this;
		
		let actuatorEngine = actuator.actuatorEngine;
		
		
		console.log('<*> NGSYS_Hero_Node._mapActuatorControlEvents');	// TODO REMOVE DEBUG LOG
		console.log(actuator);
		
		actuator.eventEmitter.on(actuator.CONSTANTS.Events.ActuatorOptionsUpdated, service._event_ActuatorOptionsUpdated);
		
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
	 */
	_mapControlMessages(socket) {
		
		super._mapControlMessages(socket);
		
		let service = this;
		let amng = service.actuatorsManager;
		
		
		// Map message getActuatorsList
		socket.on(service.CONSTANTS.Messages.getActuatorsList, 
				
			function(msg) {
				service._msg_getActuatorsList(msg, service);
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
	 */
	_unmapControlMessages(socket) {
		
		super._unmapControlMessages(socket);
		
		let service = this;
		
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
	_event_ActuatorOptionsUpdated(data) {
		
		let service = this;
		let socket = service.controlChannel.socket;
		
		let actuator = data.actuator;
		
		// Emit message ActuatorOptionsUpdated
		socket.emit(service.CONSTANTS.Messages.ActuatorOptionsUpdated, {
			"actuatorID": actuator.config.id
		});
		
	}
	
	
	/**
	 * Event ActuatorEngine_Start
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
	_msg_getActuatorsList(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		let amng = service.actuatorsManager;
		let socket = service.controlChannel.socket;
		
		console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorsList');	// TODO REMOVE DEBUG LOG
	  
		let response = {};
		response.numActuators = amng.actuatorsList.length;
		response.actuators = [];
	  
		amng.actuatorsList.forEach(function(act_, _i) {
	  	
			let actuator = {
				"actuatorID" : act_.config.id,
				"type" : act_.config.type,
				"state" : act_.config.state
			};
			
			response.actuators.push( actuator );
		});
	  
	  
		// Emit message ActuatorsList
		socket.emit( service.CONSTANTS.Messages.ActuatorsList, response );
	
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
		console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LO

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
