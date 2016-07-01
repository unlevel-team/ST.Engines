"use strict";

/**
 * SensorsManager
 * 
 * Generic manager for Sensors
 * 
 */


/**
 * Import EventEmitter
 * @ignore
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
 * The result object.
 * 
 * @typedef {Object} SearchResult
 * @memberof SensorsManager
 * @type Object
 * @property {(Sensor|null)} STsensor - The Sensor object, may be null.
 * @property {number} position - The position in list.
 * 
 */

/**
 * Sensors Manager
 * 
 * @class
 * @property {Sensor[]} sensorsList - List of Sensors.
 * @property {object} eventEmitter - Object for emit events.
 * 
 */
class SensorsManager {
	
	/**
	 * @constructs SensorsManager
	 */
	constructor() {
		
		this.sensorsList = [];
		this.eventEmitter = new EventEmitter();
		
		this.CONSTANTS = SensorsManager_CONSTANTS;
		
	}
	
	
	/**
	 * Add sensor
	 * 
	 * @param {Sensor} sensor - The Sensor object
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
	 * 
	 * @param {String} sensorID - Sensor ID
	 * @returns {SensorsManager.SearchResult} result - Result object
	 *  
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