"use strict";

/*
 SomeThings Actuators services library

*/


/**
 * ActuatorsServices CONSTANTS
 */
const ActuatorsServices_CONSTANTS = {
	
	"Messages" : {
		
		"getActuatorsList" : "Get Actuators List",
		"ActuatorsList" : "Actuators List",
		"getActuatorInfo" : "Get Actuator Info",
		"ActuatorInfo" : "Actuator Info",
		"getActuatorOptions" : "Get Actuator Options",
		"setActuatorOptions" : "Set Actuator Options",
		"ActuatorOptions" : "Actuator Options",
		"ActuatorOptionsUpdated" : "Actuator Options Updated",

		
		"StartActuator" : "StartActuator",
		"ActuatorStarted" : "ActuatorStarted",
		"StopActuator" : "StopActuator",
		"ActuatorStopped" : "ActuatorStopped",
		
		"TurnOffActuators" : "TurnOffActuators"
	}

};


/**
 * Actuators Services
 * 
 * manages the control messages related to actuators
 * 
 */
class ActuatorsServices {
	
	constructor(actuatorsManager, controlChannel) {
		
		let ssrv = this;
		
		ssrv.CONSTANTS = ActuatorsServices_CONSTANTS;
		ssrv.actuatorsManager = actuatorsManager;
		ssrv.controlChannel = controlChannel;
		
	}
	
	
	initialize() {
		
		let service = this;
		
		if (service.actuatorsManager === undefined ||
				service.actuatorsManager === null) {
			throw "Actuators manager is required";
		}
		
		if (service.controlChannel === undefined ||
				service.controlChannel === null) {
			throw "Control channel is required";
		}
		
		service._mapControlEvents(service.actuatorsManager);
		service._mapControlMessages(service.controlChannel.socket);

	}
	
	
	/**
	 * Map control events
	 */
	_mapControlEvents(sensorsManager) {
		
	}
	
	
	/**
	 * Map control messages
	 */
	_mapControlMessages(socket) {
		
		let service = this;
		
		if (service._mapped !== undefined && 
				service._mapped === true) {
			throw "control messages already mapped.";
		}
		
		if (socket === undefined) {
			socket = service.controlChannel.socket;
		}		
		
		socket.on("disconnect", function(data) {
			service._unmapControlMessages(socket);
		});
		
		service._mapped = true;
		
	}
	
	
	/**
	 * Unmap control messages
	 */
	_unmapControlMessages(socket) {
		
		let service = this;
		
		if (service._mapped === undefined || 
				service._mapped !== true) {
			throw "control messages not already mapped.";
		}
		
		if (socket === undefined) {
			socket = service.controlChannel.socket;
		}	
	}
	
}


let _lib = {
	
	"ActuatorsServices_CONSTANTS": ActuatorsServices_CONSTANTS,
	"ActuatorsServices": ActuatorsServices
};


module.exports = _lib;
	