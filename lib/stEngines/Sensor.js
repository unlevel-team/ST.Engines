"use strict";

/**
 * Actuator
 * 
 * Generic object for a Sensor
 * 
 */



/**
 * Import EventEmitter
 * @ignore
 */
let EventEmitter = require('events').EventEmitter;

/**
 * Import SensorEngine library
 * @ignore
 */
let SensorEngine_Lib = require('./SensorEngine.js').SensorEngine_Lib;



/**
 * Sensor constants
 * 
 * @memberof st.ngn
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
 * @memberof st.ngn
 * 
 * @property {boolean} enabled - Enabled flag.
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
		
		let _sensor = this;
		
		_sensor.enabled = false;
		_sensor.config = config;
		_sensor.CONSTANTS = Sensor_CONSTANTS;
		_sensor.eventEmitter = new EventEmitter();
		_sensor.sensorEngine = null;

	}
	
	
	/**
	 * Initialize Sensor
	 */
	initialize() {
		
		let _sensor = this;
		let _config = _sensor.config;
		let _configOptions = _config.options;
		
		
		if (_config.enabled === true) {
			_sensor.enabled = true;
		}
		
		// Only when is enabled
		if (_sensor.enabled !== true) {
			return;
		}
		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Sensor Engine URL 
		if (_configOptions.sensorEngineURL !== undefined && 
				_configOptions.sensorEngineURL !== null) {
			
			
			SensorEngine_Lib.initialze_SensorEngine(_sensor);
			
			
//			sensor._sensorEngine = null;
//			
//			try {
//				sensor._sensorEngine = require(sensor.config.options.sensorEngineURL);
//				sensor.sensorEngine = new sensor._sensorEngine(sensor.config);
//				sensor.sensorEngine.initialize();
//				
//			} catch (e) {
//				// TODO: handle exception
//				  console.log('<EEE> Sensor.initialize');	// TODO REMOVE DEBUG LOG
//				  console.log(e);	// TODO REMOVE DEBUG LOG
//				  console.log(sensor.config);	// TODO REMOVE DEBUG LOG
//
//			}
			
			
		} 
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
		if (_configOptions.sensorEngine !== undefined && 
				_configOptions.sensorEngine !== null) {
			
			
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
