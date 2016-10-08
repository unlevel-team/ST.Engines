"use strict";

/**
 * Actuator
 * 
 * Generic object for an Actuator
 * 
 * ... the actuator process is manager by the ActutatorEngine
 * 
 * @ignore
 */


/**
 * Import EventEmitter
 * @ignore
 */
let EventEmitter = require('events').EventEmitter;


/**
 * Import ActuatorEngine library
 * @ignore
 */
let ActuatorEngine_Lib = require('./ActuatorEngine.js').ActuatorEngine_Lib;


/**
 * Actuator CONSTANTS
 * 
 * @memberof st.ngn
 * 
 */
const Actuator_CONSTANTS = {

	"Events" : {
		"ActuatorOptionsUpdated" : "Actuator Options Updated"
	}

};



/**
 * Actuator
 * 
 * @class
 * @memberof st.ngn
 * 
 * @property {boolean} enabled - Enabled flag.
 * @property {object} config - Configuration.
 * @property {object} eventEmitter - Object for emit events.
 * @property {object} actuatorEngine - Actuator engine.
 * 
 */
class Actuator {
	
	/**
	 * @constructs Actuator
	 * 
	 * @param {object} config Configuration object
	 */
	constructor(config) {
		
		let _act = this;
		
		_act.enabled = false;
		_act.config = config;
		_act.CONSTANTS = Actuator_CONSTANTS;
		_act.eventEmitter = new EventEmitter();
		_act.actuatorEngine = null;

	}
	
	/**
	 * Initialize Actuator
	 */
	initialize() {
		
		let _act = this;
		let _config = _act.config;
		let _configOptions = _config.options;
		
		
		if (_config.enabled === true) {
			_act.enabled = true;
		}
		
		// Only when is enabled
		if (_act.enabled !== true) {
			return;
		}
		
		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Actuator Engine URL or stIRI
		
		if ( (_configOptions.actuatorEngineURL !== undefined && 
				_configOptions.actuatorEngineURL !== null) || 
				(_configOptions.engineIRI !== undefined) ) {
			
			ActuatorEngine_Lib.initialze_ActuatorEngine(_act);

		} 
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~

	}
	
	
	/**
	 * Returns Actuator options
	 * 
	 * also includes the actuator engine options
	 * 
	 * @returns {object} Actuator options
	 */
	getOptions() {
		
		let _act = this;
		let _config = _act.config;
		let _options = _config.options;
		
		
		let actOptions = {
			"loopTime" : _config.loopTime,
			"engineIRI": _options.engineIRI,
			"engineURL": _options.engineURL,
			'engineOptions': null
		};
		
		
		if ( _act.actuatorEngine !== null ) {
			// Get engine options in synchro mode...
			actOptions.engineOptions = _act.actuatorEngine.getOptions();
		}
		
		return actOptions;
	}
	
	
	/**
	 * Set actuator options
	 * 
	 * also includes the actuator engine options
	 * 
	 * @param {object} options Options object
	 */
	setOptions(options){
		
		let _act = this;
		
		if (_act.actuatorEngine && 
				_act.actuatorEngine.state === _act.actuatorEngine.CONSTANTS.States.Working) {
			throw "Bad actuator state.";
		}
		
		if (options.loopTime) {
			_act.config.loopTime = options.loopTime;
		}
		
		if (options.engineOptions) {
			
			// Set engine options in synchro mode...
			
			//_act.actuatorEngine.setOptions(options.engineOptions);
			 
			_act.actuatorEngine.setOptions({
				 'ngnInterface': _act.actuatorEngine,
				 'ngnOptions': options.engineOptions,
				 'bngnOptions': options
			 });
			 
		}
		
		// Emit event 'ActuatorOptionsUpdated'
		_act.eventEmitter.emit(_act.CONSTANTS.Events.ActuatorOptionsUpdated, {"actuator": _act});
		
	}
	
}



module.exports = Actuator;
