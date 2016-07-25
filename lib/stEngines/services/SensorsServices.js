"use strict";

/*
 SomeThings Sensors services library

*/


/**
 * Sensor list message
 * 
 * @typedef {Object} SensorList_MSG
 * @memberof st.ngn.services.SensorsServices
 * @type Object
 * @protected
 * 
 * @property {number} numSensors - Number of sensors
 * @property {object[]} sensors - Sensors list
 * @property {string} sensors.sensorID - Sensor ID
 * @property {string} sensors.type - Sensor type
 * @property {string} sensors.engine - Sensor engine type
 * @property {string} sensors.state - Sensor engine state
 * 
 * 
 */




/**
 * Sensors services constants
 * 
 * @memberof st.ngn.services
 * 
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
 * <pre>
 * manages the control messages related to sensors
 * </pre>
 * 
 * @class
 * 
 * @memberof st.ngn.services
 */
class SensorsServices {
	
	/**
	 * 
	 * @constructs SensorsServices
	 * 
	 * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
	 * @param {object} controlChannel - Control channel object
	 */
	constructor(sensorsManager, controlChannel) {
		
		let ssrv = this;
		
		ssrv.CONSTANTS = SensorsServices_CONSTANTS;
		ssrv.sensorsManager = sensorsManager;
		ssrv.controlChannel = controlChannel;
		
	}
	
	
	/**
	 * Initilize
	 */
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
			service._mapControlMessages(
					service.controlChannel.socket,
					{
						"service" : service
					});
		} catch (e) {
			// TODO: handle exception
			throw "Error mapping control messages. " + e;

		}

	}
	
	
	/**
	 * Map control events
	 * 
	 * @param {SensorsManager} sensorsManager - Sensors manager object.
	 */
	_mapControlEvents(sensorsManager) {
		
		let service = this;
		
		if (sensorsManager === undefined) {
			sensorsManager = service.sensorsManager;
		}
		
	}
	
	
	/**
	 * Map control messages
	 * 
	 * @param {object} socket - Socket object
	 * @param {object} options - Options object
	 * @param {SensorsServices} [options.service] - Sensors Service object
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
			try {
				service._unmapControlMessages(socket,
						{
							"service" : service
						});
			} catch (e) {
				// TODO: handle exception
				
			}

		});
		
		service._mapped = true;
		
	}
	
	
	/**
	 * Unmap control messages
	 * 
	 * @param {object} socket - Socket object
	 * @param {object} options - Options object
	 * @param {SensorsServices} [options.service] - Sensors Service object
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
		
	"SensorsServices_CONSTANTS": SensorsServices_CONSTANTS,
	"SensorsServices": SensorsServices
			
};



module.exports = _lib;