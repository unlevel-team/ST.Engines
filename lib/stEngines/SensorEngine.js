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
		"SEstate_Config" : "config",
		"SEstate_Ready" : "ready",
		"SEstate_Working" : "working",
		"SEstate_Stop" : "stop"
	},
	
	
	"Events" : {
		"MainLoop_Tick" : "Main Loop",
		"MainLoop_Stop" : "Main Loop Stop",
		
		"SensorEngine_Start" : "SE start",
		"SensorEngine_Stop" : "SE stop",
		
		"SensorData" : "Sensor Data"
		
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
				  console.log('<EEE> SensorEngine_Lib.initialze_SensorEngine');	// TODO REMOVE DEBUG LOG
				  console.log(e);	// TODO REMOVE DEBUG LOG
				  console.log(sensor.config);	// TODO REMOVE DEBUG LOG

			}
		} 
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Sensor Engine URI (stURI format) 
		if (sensor.config.options.sensorEngineURI !== undefined && 
				sensor.config.options.sensorEngineURI !== null) {
			
			let net_Services = require("st.network").get_Services();
			let net_NETServices = net_Services.get_NetServices();
			let NETservices_Lib = net_NETServices.NETservices_Lib;
			
			try {
				
				let stURI_DATA = NETservices_Lib.parse_stURI( sensor.config.options.sensorEngineURI );
				
				console.log('<~i~> SensorEngine_Lib.initialze_SensorEngine');	// TODO REMOVE DEBUG LOG
				console.log(' <~> NETservices_Lib.parse_stURI');	// TODO REMOVE DEBUG LOG
				console.log(stURI_DATA);	// TODO REMOVE DEBUG LOG
				
			} catch (e) {
				// TODO: handle exception
				
				console.log('<EEE> SensorEngine_Lib.initialze_SensorEngine');	// TODO REMOVE DEBUG LOG
				console.log(' <~> NETservices_Lib.parse_stURI');	// TODO REMOVE DEBUG LOG

				console.log(e);	// TODO REMOVE DEBUG LOG
				console.log(sensor.config.options.sensorEngineURI);	// TODO REMOVE DEBUG LOG
				
			}
		}
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
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
		
		
		_snsEngine.state = this.CONSTANTS.States.SEstate_Config;
		
		
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
			sensorEngine.state = sensorEngine.CONSTANTS.States.SEstate_Ready;
		});
		
		sensorEngine.state = sensorEngine.CONSTANTS.States.SEstate_Ready;
	}
	
	
	/**
	 * Main loop
	 */
	mainLoop() {
		
	  let sensorEngine = this;
	  
	  if ( sensorEngine.state !== sensorEngine.CONSTANTS.States.SEstate_Ready ) {
		  throw "Bad state";
	  }
	  
	  sensorEngine.state = sensorEngine.CONSTANTS.States.SEstate_Working;
	  
	  sensorEngine._mainLoop = setInterval(() => {
		  if (sensorEngine.state === sensorEngine.CONSTANTS.States.SEstate_Working) {
			  
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
	 * @fires st.ngn.SensorEngine#SensorEngine_Stop
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
	 * @abstract 
	 * @param {object} options Options object.
	 */	
	setOptions(options) {
		
	}
	
}



let _lib = {
	"SensorEngine" : SensorEngine,
	"SensorEngine_Lib" : SensorEngine_Lib
		
};


module.exports = _lib;
