"use strict";

/**
 * Actuator
 * 
 * Generic object for a Sensor
 * 
 * @ignore
 */

/**
 * Import EventEmitter
 * @ignore
 */
let EventEmitter = require('events').EventEmitter;

/**
 * Sensor constants
 */
const Sensor_CONSTANTS = {
	
	"Events" : {
		"SensorOptionsUpdated" : "Sensor Options Updated"
	}
};


/**
 * Sensor
 * 
 * @class
 * @property {object} config - Configuration.
 * @property {object} eventEmitter - Object for emit events.
 * @property {object} sensorEngine - Sensor engine.
 * 
 */
class Sensor {
	
	/**
	 * @constructs Sensor
	 * @param {object} config Configuration object
	 */
	constructor(config) {
		
		this.config = config;
		this.CONSTANTS = Sensor_CONSTANTS;
		this.eventEmitter = new EventEmitter();
		this.sensorEngine = null;

	}
	
	
	/**
	 * Initialize Sensor
	 */
	initialize() {
		
		let sensor = this;
		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Sensor Engine URL 
		if (sensor.config.options.sensorEngineURL !== undefined && 
				sensor.config.options.sensorEngineURL !== null) {
			
			sensor._sensorEngine = null;
			
			try {
				sensor._sensorEngine = require(sensor.config.options.sensorEngineURL);
				sensor.sensorEngine = new sensor._sensorEngine(sensor.config);
				sensor.sensorEngine.initialize();
				
			} catch (e) {
				// TODO: handle exception
				  console.log('<EEE> Sensor.initialize');	// TODO REMOVE DEBUG LOG
				  console.log(e);	// TODO REMOVE DEBUG LOG
				  console.log(sensor.config);	// TODO REMOVE DEBUG LOG

			}
		} 
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
		if (sensor.config.options.sensorEngine !== undefined && 
				sensor.config.options.sensorEngine !== null) {
			
			
		}
		
		
	}
	
	
	/**
	 * Get sensor options
	 * 
	 * @returns {object} Actuator options
	 */
	getOptions(){
		
		let sensor = this;
		
		let sensorOptions = {
				"loopTime" : sensor.config.loopTime,
				"sensorEngineURL": sensor.config.options.sensorEngineURL
				
		};
		
		if ( sensor.sensorEngine !== null ) {
			sensorOptions.engineOptions = sensor.sensorEngine.getOptions();
		}
		
		
		return sensorOptions;
	}
	
	
	/**
	 * Set sensor options
	 * 
	 * @param {object} options Options object
	 */
	setOptions(options){
		
		let sensor = this;
		
		if (sensor.sensorEngine !== undefined && 
				sensor.sensorEngine.state === sensor.sensorEngine.CONSTANTS.States.SEstate_Working) {
			throw "Bad sensor state.";
		}
		
		if (options.loopTime) {
			sensor.config.loopTime = options.loopTime;
		}
		
		if (options.engineOptions) {
			sensor.sensorEngine.setOptions(options.engineOptions);
		}
		
		// Emit event SensorOptionsUpdated
		sensor.eventEmitter.emit(sensor.CONSTANTS.Events.SensorOptionsUpdated, {"sensor": sensor});
	
	}
	
	
}



module.exports = Sensor;
