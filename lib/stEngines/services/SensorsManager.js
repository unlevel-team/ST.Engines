"use strict";

/**
 * SensorsManager
 * 
 * Generic manager for Sensors
 * 
 */


let EventEmitter = require('events').EventEmitter;


/**
 * SensorsManager CONSTANTS
 */
const SensorsManager_CONSTANTS = {
		
	"Events" : {
		"SensorAdded" : "Sensor added",
		"SensorOptionsUpdated" : "Sensor Options Updated"
	}
};




/**
 * Sensors Manager
 */
class SensorsManager {
	
	constructor() {
		
		this.sensorsList = [];
		this.eventEmitter = new EventEmitter();
		
		this.CONSTANTS = SensorsManager_CONSTANTS;
		
	}
	
	
	/**
	 * Add sensor
	 * 
	 * @sensor Sensor object
	 */
	addSensor(sensor) {
		
		let smng = this;
		
		let sensorSearch = smng.getSensorByID(sensor.config.id);
		
		if (sensorSearch.STsensor !== null) {
			throw "Sensor ID already exists.";
		}
		
		smng.sensorsList.push(sensor);
		
		// Emit message SensorAdded
		smng.eventEmitter.emit(smng.CONSTANTS.Events.SensorAdded, sensor);
	
	}
	
	
	/**
	 * Returns Sensor searched by ID
	 */
	getSensorByID(sensorID) {

		let smng = this;
		
		let sensor = null;
		let _i = 0;
		
		_i = smng.sensorsList.map(function(x) {return x.config.id; }).indexOf(sensorID);
		if (_i !== -1) {
			sensor = smng.sensorsList[_i];
		}
		
		return {
			"STsensor": sensor,
			"position": _i
		};
	}
	
	
	/**
	 * Turn off sensors
	 */
	turnOffSensors() {
		
		let smng = this;
		let snsList = smng.sensorsList;
		
		snsList.forEach(function(sns_, _i) {
			if ( sns_.sensorEngine !== null ) {
				sns_.sensorEngine.stopEngine();
			}
		});
		
		console.log('<*> SensorsManager.turnOffSensors');	// TODO REMOVE DEBUG LOG
	}
	
	
}



let SensorsManager_Lib = {
		"SensorsManager" : SensorsManager,
		"CONSTANTS" : SensorsManager_CONSTANTS
		
	};

module.exports = SensorsManager_Lib;