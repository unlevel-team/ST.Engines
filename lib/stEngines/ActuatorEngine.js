"use strict";

/**
 * ActuatorEngine
 * 
 * Generic process for an Actuator
 * 
 * @ignore
 */

/**
 * Import EventEmitter
 * @ignore
 */
let EventEmitter = require('events').EventEmitter;



/**
 * ActuatorEngine CONSTANTS
 */
const ActuatorEngine_CONSTANTS = {
		
	"States" : {
		"State_Config" : "config",
		"State_Ready" : "ready",
		"State_Working" : "working",
		"State_Stop" : "stop"
	},
	
	
	"Events" : {
		"MainLoop_Tick" : "Main Loop",
		"MainLoop_Stop" : "Main Loop Stop",
		
		"ActuatorEngine_Start" : "AE start",
		"ActuatorEngine_Stop" : "AE stop",

		
		"ActuatorData" : "Actuator Data"
		
	}
		
};



/**
 * ActuatorEngine_Start event.
 *
 * @event ActuatorEngine#ActuatorEngine_Start
 * @type {object}
 * @property {object} engine - The engine that is started.
 */

/**
 * ActuatorEngine_Stop event.
 *
 * @event ActuatorEngine#ActuatorEngine_Stop
 * @type {object}
 * @property {object} engine - The engine that is stopped.
 */



/**
 * Actuator engine library
 * 
 * @namespace ActuatorEngine_Lib
 */
let ActuatorEngine_Lib = {
	
	/**
	 * Initialize actuator engine
	 * 
	 * @function
	 * 
	 * @param {Actuator} act - Actuator object
	 */
	"initialze_ActuatorEngine" : function (act) {
		
		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Actuator Engine URL 
		if (act.config.options.actuatorEngineURL !== undefined && 
				act.config.options.actuatorEngineURL !== null) {
			
			act._actuatorEngine = null;
			
			try {
				act._actuatorEngine = require(act.config.options.actuatorEngineURL);
				act.actuatorEngine = new act._actuatorEngine(act.config);
				act.actuatorEngine.initialize();
				
			} catch (e) {
				// TODO: handle exception
				  console.log('<EEE> Actuator.initialize');	// TODO REMOVE DEBUG LOG
				  console.log(e);	// TODO REMOVE DEBUG LOG
			}
		} 
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
	}
	
};


/**
 * Actuator Engine
 * 
 * @class
 * @property {object} config - Configuration.
 * @property {object} _mainLoop - Main loop reference object.
 * @property {String} state - State.
 * @property {object} eventEmitter - Object for emit events.
 * 
 */
class ActuatorEngine {
	
	/**
	 * @constructs ActuatorEngine
	 * 
	 * @param {object} config ActuatorEngine object
	 */
	constructor(config) {
		
		this.config = config;
		this._mainLoop = null;
		
		this.state = ActuatorEngine_CONSTANTS.States.State_Config;

		
		this.CONSTANTS = ActuatorEngine_CONSTANTS;
		
		this.eventEmitter = new EventEmitter();

	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		
		let actuatorEngine = this;
		
		actuatorEngine.eventEmitter.on( actuatorEngine.CONSTANTS.Events.MainLoop_Stop, function() {
			clearInterval( actuatorEngine._mainLoop );
			actuatorEngine.state = actuatorEngine.CONSTANTS.States.State_Ready;
		});
		
		actuatorEngine.state = actuatorEngine.CONSTANTS.States.State_Ready;
	}
	
	
	/**
	 * Main loop
	 */
	mainLoop() {
	  let actuatorEngine = this;
	  
	  if ( actuatorEngine.state !== actuatorEngine.CONSTANTS.States.State_Ready ) {
		  throw "Bad state";
	  }
	  
	  actuatorEngine.state = actuatorEngine.CONSTANTS.States.State_Working;
	  
	  actuatorEngine._mainLoop = setInterval(() => {
		  if (actuatorEngine.state === actuatorEngine.CONSTANTS.States.State_Working) {
			  actuatorEngine.eventEmitter.emit(actuatorEngine.CONSTANTS.Events.MainLoop_Tick);
		  } else {
			  actuatorEngine.eventEmitter.emit(actuatorEngine.CONSTANTS.Events.MainLoop_Stop);
		  }
	  }, actuatorEngine.config.loopTime);
	  
	}
	
	/**
	 * Stop main loop
	 */
	stopMainLoop() {
		let actuatorEngine = this;
		actuatorEngine.eventEmitter.emit(actuatorEngine.CONSTANTS.Events.MainLoop_Stop);
	}
	
	
	/**
	 * Start engine
	 * @abstract 
	 */
	startEngine() {
		
		
	}
	
	/**
	 * Stop engine
	 * @abstract 
	 */	
	stopEngine() {
		
	}
	
	/**
	 * Get options
	 * @abstract 
	 * @return {object} Options object
	 */	
	getOptions() {
		return {};
	}
	
	/**
	 * @abstract 
	 * @param {object} options Options object.
	 */	
	setOptions(options) {
		
	}
}

let _lib = {
		"ActuatorEngine" : ActuatorEngine,
		"ActuatorEngine_Lib" : ActuatorEngine_Lib
			
	};


module.exports = _lib;

