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
		if ( (_configOptions.sensorEngineURL !== undefined && 
				_configOptions.sensorEngineURL !== null) || 
				(_configOptions.engineIRI !== undefined) ) {
			
			
			SensorEngine_Lib.initialze_SensorEngine(_sensor);
			
			
		} 
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
		if (_configOptions.sensorEngine !== undefined && 
				_configOptions.sensorEngine !== null) {
			
			
		}
		
		
	}
	
	
	/**
	 * Get sensor options
	 * 
	 * @returns {object} Sensor options
	 */
	getOptions() {
		
		let _sensor = this;
		
		let _sensorOptions = {
			"loopTime" : _sensor.config.loopTime,
			"sensorEngineURL": _sensor.config.options.sensorEngineURL,
			'engineOptions': null

		};
		
		
		if ( _sensor.sensorEngine !== null ) {
			// Get engine options in synchro mode...
			 _sensorOptions.engineOptions = _sensor.sensorEngine.getOptions();
		}
		
		
		return _sensorOptions;
		
	}
	
	
	/**
	 * Set sensor options
	 * 
	 * @param {object} options - Options object
	 */
	setOptions(options){
		
		let _sensor = this;
		
		if (_sensor.sensorEngine !== undefined && 
				_sensor.sensorEngine.state === _sensor.sensorEngine.CONSTANTS.States.Working) {
			throw "Bad sensor state.";
		}
		
		if (options.loopTime !== undefined) {
			_sensor.config.loopTime = options.loopTime;
		}
		
		if (options.engineOptions !== undefined) {
			
			// Set engine options in synchro mode...
			
			//_sensor.sensorEngine.setOptions(options.engineOptions);
			 
			 _sensor.sensorEngine.setOptions({
				 'ngnInterface': _sensor.sensorEngine,
				 'ngnOptions': options.engineOptions,
				 'bngnOptions': options
			 });
			 
		}
		
		_sensor.eventEmitter.emit(_sensor.CONSTANTS.Events.SensorOptionsUpdated, {"sensor": _sensor});

	}
	
	
}



module.exports = Sensor;
