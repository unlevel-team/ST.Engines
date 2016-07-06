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
		
		this.config = config;
		this.CONSTANTS = Actuator_CONSTANTS;
		this.eventEmitter = new EventEmitter();
		this.actuatorEngine = null;

	}
	
	/**
	 * Initialize Actuator
	 */
	initialize() {
		
		let act = this;
		
		
		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Actuator Engine URL 
		if (act.config.options.actuatorEngineURL !== undefined && 
				act.config.options.actuatorEngineURL !== null) {
			
			ActuatorEngine_Lib.initialze_ActuatorEngine(act);

			
//			act._actuatorEngine = null;
//			
//			try {
//				act._actuatorEngine = require(act.config.options.actuatorEngineURL);
//				act.actuatorEngine = new act._actuatorEngine(act.config);
//				act.actuatorEngine.initialize();
//				
//			} catch (e) {
//				// TODO: handle exception
//				  console.log('<EEE> Actuator.initialize');	// TODO REMOVE DEBUG LOG
//				  console.log(e);	// TODO REMOVE DEBUG LOG
//			}
			
			
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
		
		let act = this;
		
		let actOptions = {
			"loopTime" : act.config.loopTime,
			"actuatorEngineURL": act.config.options.actuatorEngineURL
				
		};
		
		if ( act.actuatorEngine !== null ) {
			actOptions.engineOptions = act.actuatorEngine.getOptions();
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
		
		let act = this;
		
		if (act.actuatorEngine && 
				act.actuatorEngine.state === act.actuatorEngine.CONSTANTS.States.State_Working) {
			throw "Bad actuator state.";
		}
		
		if (options.loopTime) {
			act.config.loopTime = options.loopTime;
		}
		
		if (options.engineOptions) {
			act.actuatorEngine.setOptions(options.engineOptions);
		}
		
		act.eventEmitter.emit(act.CONSTANTS.Events.ActuatorOptionsUpdated, {"actuator": act});
	}
	
}



module.exports = Actuator;
