"use strict";

/*
 SomeThings Actuators services library

 
*/


/**
 * ActuatorsServices CONSTANTS
 * 
 * @memberof st.ngn.services
 * 
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
 * @class
 * @memberof st.ngn.services
 * 
 * @property {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager.
 * @property {object} controlChannel - Object for control channel.
 * 
 */
class ActuatorsServices {
	
	/**
	 * 
	 * 
	 * @constructs ActuatorsServices
	 * 
	 * @param {ActuatorsManager} actuatorsManager - Actuators manager
	 * @param {object} controlChannel - Control channel object
	 */
	constructor(actuatorsManager, controlChannel) {
		
		let ssrv = this;
		
		ssrv.CONSTANTS = ActuatorsServices_CONSTANTS;
		ssrv.actuatorsManager = actuatorsManager;
		ssrv.controlChannel = controlChannel;
		
	}
	
	
	/**
	 * Initialize
	 */
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
		service._mapControlMessages(
				service.controlChannel.socket,
				{
					"service" : service
				});

	}
	
	
	/**
	 * Map control events
	 */
	_mapControlEvents(actuatorsManager) {
		
	}
	
	
	/**
	 * Map control messages
	 * 
	 * 
	 * @param {object} socket - Socket object
	 * @param {object} options - Options object
	 * @param {st.ngn.services.ActuatorsServices} [options.service] - Actuators Service object
	 * 
	 */
	_mapControlMessages(socket, options) {
		
		let service = this;
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		if (service._mapped !== undefined && 
				service._mapped === true) {
			throw "control messages already mapped.";
		}
		
		if (socket === undefined) {
			socket = service.controlChannel.socket;
		}
		
		socket.on("connect", function(data) {
			if (service._mapped !== true) {
				service._mapControlMessages(socket,
					{
						"service" : service
					});
			}
		});
		
		socket.on("disconnect", function(data) {
			service._unmapControlMessages(socket,
				{
					"service" : service
				});
		});
		
		service._mapped = true;
		
	}
	
	
	/**
	 * Unmap control messages
	 * 
	 * @param {object} socket - Socket object
	 * @param {object} options - Options object
	 * @param {st.ngn.services.ActuatorsServices} [options.service] - Actuators Service object
	 */
	_unmapControlMessages(socket, options) {
		
		let service = this;
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
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
	