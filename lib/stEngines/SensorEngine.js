"use strict";

/**
 * SensorEngine
 * 
 * Generic process for a Sensor
 * 
 */


/**
 * Import EventEmitter
 * @ignore
 */
let EventEmitter = require('events').EventEmitter;


/**
 * SensorEngine CONSTANTS
 * 
 * @memberof st.ngn
 * 
 */
const SensorEngine_CONSTANTS = {
		
	"States" : {
		"Config" : "config",
		"Ready" : "ready",
		"Working" : "working",
		"Stop" : "stop"
	},
	
	
	"Events" : {
		"MainLoop_Tick" : "Main Loop",
		"MainLoop_Stop" : "Main Loop Stop",
		
		"SensorEngine_Start" : "SE start",
		"SensorEngine_Stop" : "SE stop",
		
		"SensorData" : "Sensor Data",
		
		
		"Engine_Start" : "NGN start",
		"Engine_Stop" : "NGN stop",

		
		"EngineData" : "NGN Data"
		
	}
		
};



/**
 * SensorEngine_Start event.
 *
 * @event st.ngn.SensorEngine#SensorEngine_Start
 * @memberof st.ngn.SensorEngine
 * @type {object}
 * @property {st.ngn.SensorEngine} engine - The engine that is started.
 */

/**
 * SensorEngine_Stop event.
 *
 * @event st.ngn.SensorEngine#SensorEngine_Stop
 * @memberof st.ngn.SensorEngine
 * @type {object}
 * @property {st.ngn.SensorEngine} engine - The engine that is stopped.
 */




/**
 * Sensor engine library
 * 
 * @namespace SensorEngine_Lib
 * @memberof st.ngn
 */
let SensorEngine_Lib = {
		
		
	/**
	 * Initialize sensor engine
	 * 
	 * @function
	 * @memberof st.ngn.SensorEngine_Lib
	 * 
	 * @param {st.ngn.Sensor} sensor - Sensor object
	 * 
	 */
	"initialze_SensorEngine" : function (sensor) {
		
		let _sensorConfig = sensor.config;
		let _options = _sensorConfig.options;
		
		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Sensor Engine URL 
		if (_options.sensorEngineURL !== undefined && 
				_options.sensorEngineURL !== null) {
			
			sensor._sensorEngine = null;
			
			try {
				sensor._sensorEngine = require(_options.sensorEngineURL);
				sensor.sensorEngine = new sensor._sensorEngine(_sensorConfig);
				sensor.sensorEngine.initialize();
				
			} catch (e) {
				// TODO: handle exception
				  console.log('<EEE> SensorEngine_Lib.initialze_SensorEngine');	// TODO: REMOVE DEBUG LOG
				  console.log(e);	// TODO: REMOVE DEBUG LOG
				  console.log(sensor.config);	// TODO: REMOVE DEBUG LOG

			}
			
		} 
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Engine IRI (stIRI format) 
		//
		// Try new methods for load engines
		// 
		if (_options.engineIRI !== undefined && 
				_options.engineIRI !== null && 
				sensor.sensorEngine === null) {
			
			
			let _BaseEngines_Lib = require('./baseEngines/stBaseNGN.js').BaseEngines_Lib;
			
			console.log('<~i~> SensorEngine_Lib.initialze_SensorEngine');	// TODO: REMOVE DEBUG LOG
			console.log(sensor);	// TODO: REMOVE DEBUG LOG

			
			try {
				
				sensor.sensorEngine = _BaseEngines_Lib.initialize_Engine({
					'engineOptions': _options
				});
				
				sensor.sensorEngine.initialize();

				
			} catch (e) {
				// TODO: handle exception
				
				console.log('<EEE> SensorEngine_Lib.initialze_SensorEngine');	// TODO: REMOVE DEBUG LOG
				console.log(' <~> _BaseEngines_Lib.initialize_Engine');	// TODO: REMOVE DEBUG LOG

				console.log(e);	// TODO: REMOVE DEBUG LOG
				
			}
		}
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
	},
	
	
	/**
	 * Get sensor engine
	 * 
	 * @function
	 * @memberof st.ngn.SensorEngine_Lib
	 * 
	 * 
	 * @param {object} options - Options object
	 * @param {st.ngn.Sensor} sensor - Sensor object
	 * 
	 */
	'get_SensorEngine': function(options) {
		
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.config === undefined) {
			throw 'config option is required.';
		}
		let _config = options.config;
		
		let _baseNGN = null;
		if (options.baseNGN !== undefined) {
			_baseNGN = options.baseNGN;
		}
		
		let _sensorEngine = null;
		
		
		if (_baseNGN !== null) {
			
			let _baseEngines_Lib = require('./baseEngines/stBaseNGN.js').BaseEngines_Lib;
			
			try {
				_sensorEngine = _baseEngines_Lib.get_BaseEngine({
					'name': _baseNGN
				});

			} catch (e) {
				// TODO: handle exception
				
				
			}
			
			
			
		} else {	// For no baseNGN
			_sensorEngine = new SensorEngine(_config);
			
		}
		
		return _sensorEngine;
	}
	
};


/**
 * Sensor Engine
 * 
 * @class
 * @memberof st.ngn
 * 
 * @property {object} config - Configuration.
 * @property {object} _mainLoop - Main loop reference object.
 * @property {String} state - State.
 * @property {object} eventEmitter - Object for emit events.
 * 
 * 
 */
class SensorEngine {
	
	/**
	 * @constructs SensorEngine
	 * 
	 * @param {object} config Configuration object
	 */
	constructor(config) {
		
		let _snsEngine = this;
		
		_snsEngine.config = config;
		_snsEngine._mainLoop = null;
		
		_snsEngine.CONSTANTS = SensorEngine_CONSTANTS;
		_snsEngine.state = _snsEngine.CONSTANTS.States.Config;
		
		
		_snsEngine.eventEmitter = new EventEmitter();

	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		
		let sensorEngine = this;
		
		// Map event MainLoop_Stop
		sensorEngine.eventEmitter.on( sensorEngine.CONSTANTS.Events.MainLoop_Stop, function() {
			clearInterval( sensorEngine._mainLoop );
			sensorEngine.state = sensorEngine.CONSTANTS.States.Ready;
		});
		
		sensorEngine.state = sensorEngine.CONSTANTS.States.Ready;
	}
	
	
	/**
	 * Main loop
	 */
	mainLoop() {
		
	  let sensorEngine = this;
	  
	  if ( sensorEngine.state !== sensorEngine.CONSTANTS.States.Ready ) {
		  throw "Bad state";
	  }
	  
	  sensorEngine.state = sensorEngine.CONSTANTS.States.Working;
	  
	  sensorEngine._mainLoop = setInterval(() => {
		  if (sensorEngine.state === sensorEngine.CONSTANTS.States.Working) {
			  
			  // Emit event MainLoop_Tick
			  sensorEngine.eventEmitter.emit(sensorEngine.CONSTANTS.Events.MainLoop_Tick);
		  } else {
			  
			  // Emit event MainLoop_Stop
			  sensorEngine.eventEmitter.emit(sensorEngine.CONSTANTS.Events.MainLoop_Stop);
		  }
	  }, sensorEngine.config.loopTime);
	  
	}
	
	
	/**
	 * Stop main loop
	 * 
	 * @fires st.ngn.SensorEngine#MainLoop_Stop
	 */
	stopMainLoop() {
		let sensorEngine = this;
		sensorEngine.eventEmitter.emit(sensorEngine.CONSTANTS.Events.MainLoop_Stop);	// Emit event MainLoop_Stop
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
	"SensorEngine" : SensorEngine,
	"SensorEngine_Lib" : SensorEngine_Lib
		
};


module.exports = _lib;
