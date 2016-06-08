"use strict";

/*
 SomeThings Sensors services library

*/


const SensorsServices_CONSTANTS = {
		
	"Messages" : {
		
		"getSensorsList" : "Get Sensors List",
		"SensorsList" : "Sensors List",
		"getSensorInfo" : "Get Sensor Info",
		"SensorInfo" : "Sensor Info",
		"getSensorOptions" : "Get Sensor Options",
		"SensorOptions" : "Sensor Options",
		"setSensorOptions" : "Set Sensor Options",
		"SensorOptionsUpdated" : "Sensor Options Updated",
		
		"StartSensor" : "StartSensor",
		"SensorStarted" : "SensorStarted",
		"StopSensor" : "StopSensor",
		"SensorStopped" : "SensorStopped",
		
		"TurnOffSensors" : "TurnOffSensors"

	}
		
};


/**
 * Sensors Services
 * 
 * manages the control messages related to sensors
 * 
 */
class SensorsServices {
	
	constructor(sensorsManager, controlChannel) {
		
		let ssrv = this;
		
		ssrv.CONSTANTS = SensorsServices_CONSTANTS;
		ssrv.sensorsManager = sensorsManager;
		ssrv.controlChannel = controlChannel;
		
	}
	
	
	initialize() {
		
		let service = this;
		
		if (service.sensorsManager === undefined ||
				service.sensorsManager === null) {
			throw "Sensors manager is required";
		}
		
		if (service.controlChannel === undefined ||
				service.controlChannel === null) {
			throw "Control channel is required";
		}
		
		
		try {
			service._mapControlEvents(service.sensorsManager);
		} catch (e) {
			// TODO: handle exception
			throw "Error mapping control events. " + e;
		}
		
		
		try {
			service._mapControlMessages(service.controlChannel.socket);
		} catch (e) {
			// TODO: handle exception
			throw "Error mapping control messages. " + e;

		}

	}
	
	
	/**
	 * Map control events
	 */
	_mapControlEvents(sensorsManager) {
		
		let service = this;
		
		if (sensorsManager === undefined) {
			sensorsManager = service.sensorsManager;
		}
		
	}
	
	
	/**
	 * Map control messages
	 */
	_mapControlMessages(socket) {
		
		let service = this;
		let smng = service.sensorsManager;
		
		
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
		
	"SensorsServices_CONSTANTS": SensorsServices_CONSTANTS,
	"SensorsServices": SensorsServices
			
};



module.exports = _lib;