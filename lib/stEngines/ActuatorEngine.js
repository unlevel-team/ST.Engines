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
 * 
 * @memberof st.ngn
 */
const ActuatorEngine_CONSTANTS = {
		
	"States" : {
		"Config" : "config",
		"Ready" : "ready",
		"Working" : "working",
		"Stop" : "stop"
	},
	
	
	"Events" : {
		"MainLoop_Tick" : "Main Loop Tick",
		"MainLoop_Stop" : "Main Loop Stop",
		
		"ActuatorEngine_Start" : "AE start",
		"ActuatorEngine_Stop" : "AE stop",

		
		"ActuatorData" : "Actuator Data"
		
	}
		
};



/**
 * ActuatorEngine_Start event.
 *
 * @event st.ngn.ActuatorEngine#ActuatorEngine_Start
 * @memberof st.ngn.ActuatorEngine
 * @type {object}
 * @property {st.ngn.ActuatorEngine} engine - The engine that is started.
 */

/**
 * ActuatorEngine_Stop event.
 *
 * @event st.ngn.ActuatorEngine#ActuatorEngine_Stop
 * @memberof st.ngn.ActuatorEngine
 * @type {object}
 * @property {st.ngn.ActuatorEngine} engine - The engine that is stopped.
 */



/**
 * Actuator engine library
 * 
 * @namespace ActuatorEngine_Lib
 * @memberof st.ngn
 */
let ActuatorEngine_Lib = {
	
	/**
	 * Initialize actuator engine
	 * 
	 * @function
	 * @memberof st.ngn.ActuatorEngine_Lib
	 * 
	 * @param {st.ngn.Actuator} act - Actuator object
	 */
	"initialze_ActuatorEngine" : function (act) {
		
		
		let _options = act.config.options;
		let _actConfig = act.config;

		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Actuator Engine URL 
		if (_options.actuatorEngineURL !== undefined && 
				_options.actuatorEngineURL !== null) {
			
			act._actuatorEngine = null;
			
			try {
				act._actuatorEngine = require(_options.actuatorEngineURL);
				act.actuatorEngine = new act._actuatorEngine(_actConfig);
				act.actuatorEngine.initialize();
				
			} catch (e) {
				// TODO: handle exception
				  console.log('<EEE> Actuator.initialize');	// TODO REMOVE DEBUG LOG
				  console.log(e);	// TODO REMOVE DEBUG LOG
			}
		} 
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
		
		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Engine URI (stURI format) 
		//
		// Try new methods for load engines
		// 
		if (_options.engineURI !== undefined && 
				_options.engineURI !== null && 
				act.actuatorEngine === null) {
			
			
			let _BaseEngines_Lib = require('./baseEngines/stBaseNGN.js').BaseEngines_Lib;
			
			// console.log('<~i~> SensorEngine_Lib.initialze_ActuatorEngine');	// TODO: REMOVE DEBUG LOG
			// console.log(act);	// TODO: REMOVE DEBUG LOG

			
			try {
				
				act.actuatorEngine = _BaseEngines_Lib.initialize_Engine({
					'engineOptions': _options,
					'bngnOptions': _actConfig
				});
				
				act.actuatorEngine.initialize();

				
			} catch (_e) {
				// TODO: handle exception
				
				console.log('<EEE> ActuatorEngine_Lib.initialze_ActuatorEngine');	// TODO: REMOVE DEBUG LOG
				console.log(' <~> _BaseEngines_Lib.initialize_Engine');	// TODO: REMOVE DEBUG LOG

				console.log(_e);	// TODO: REMOVE DEBUG LOG
				
			}
		}
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
	}
	
};


/**
 * Actuator Engine
 * 
 * @class
 * @memberof st.ngn
 * 
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
		
		let _actEngine = this;
		_actEngine.config = config;
		_actEngine._mainLoop = null;
		
		_actEngine.CONSTANTS = ActuatorEngine_CONSTANTS;
		_actEngine.state = _actEngine.CONSTANTS.States.Config;
		
		
		_actEngine.eventEmitter = new EventEmitter();

	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		
		let actuatorEngine = this;
		
		actuatorEngine.eventEmitter.on( actuatorEngine.CONSTANTS.Events.MainLoop_Stop, function() {
			clearInterval( actuatorEngine._mainLoop );
			actuatorEngine.state = actuatorEngine.CONSTANTS.States.Ready;
		});
		
		actuatorEngine.state = actuatorEngine.CONSTANTS.States.Ready;
	}
	
	
	/**
	 * Main loop
	 */
	mainLoop() {
	  let actuatorEngine = this;
	  
	  if ( actuatorEngine.state !== actuatorEngine.CONSTANTS.States.Ready ) {
		  throw "Bad state";
	  }
	  
	  actuatorEngine.state = actuatorEngine.CONSTANTS.States.Working;
	  
	  actuatorEngine._mainLoop = setInterval(() => {
		  if (actuatorEngine.state === actuatorEngine.CONSTANTS.States.Working) {
			  actuatorEngine.eventEmitter.emit(actuatorEngine.CONSTANTS.Events.MainLoop_Tick);
		  } else {
			  actuatorEngine.eventEmitter.emit(actuatorEngine.CONSTANTS.Events.MainLoop_Stop);
		  }
	  }, actuatorEngine.config.loopTime);
	  
	}
	
	/**
	 * Stop main loop
	 * 
	 * @fires st.ngn.ActuatorEngine#ActuatorEngine_Stop
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
	 * Set options
	 * @abstract 
	 * @param {object} options - Options object.
	 */	
	setOptions(options) {
		
	}
	
}


let _lib = {
		"ActuatorEngine" : ActuatorEngine,
		"ActuatorEngine_Lib" : ActuatorEngine_Lib
			
	};


module.exports = _lib;

