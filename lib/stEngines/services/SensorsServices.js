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
class SensorServices {
	
	constructor(sensorsManager) {
		
		let ssrv = this;
		
		ssrv.CONSTANTS = SensorsServices_CONSTANTS;
		ssrv.sensorsManager = sensorsManager;
		
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
		
		let comSYS = service.comSYS;
		let config = comSYS.config;
		
		
		if (config._mapped !== undefined && 
				config._mapped === true) {
			throw "control messages already mapped.";
		}
		
		if (socket === undefined) {
			socket = config.controlChannel.socket;
		}		
		
		socket.on("disconnect", function(data) {
			service._unmapControlMessages(socket);
		});
		
		config._mapped = true;
		
	}
	
	
}


let _lib = {
		
	"SensorsServices_CONSTANTS": SensorsServices_CONSTANTS,
	"SensorServices": SensorServices
			
};



module.exports = _lib;