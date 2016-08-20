"use strict";

/**
 * Base Engine
 * 
 * Generic object for an engine
 * 
 * 
 * # SimpleLoop {loopTime}
 * # CounterLoop {loopTime, ticks, loopNum}
 * 
 */


/**
 * Import EventEmitter
 * @ignore
 */
let EventEmitter = require('events').EventEmitter;



/**
 * BaseEngine CONSTANTS
 * 
 * @memberof st.ngn.baseEngines.BaseEngine
 */
const BaseEngine_CONSTANTS = {
		
	"States" : {
		"Config" : "config",
		"Ready" : "ready",
		"Working" : "working",
		"Stop" : "stop"
	},
	
	
	"Events" : {
		"MainLoop_Tick" : "Main Loop Tick",
		"MainLoop_Stop" : "Main Loop Stop",
		
		"Engine_Start" : "NGN start",
		"Engine_Stop" : "NGN stop",

		
		"EngineData" : "NGN Data"
		
	}
		
};



/**
 * BaseEngine configuration object.
 * 
 * @typedef {Object} Config
 * @memberof st.ngn.baseEngines.BaseEngine
 * 
 * @type Object
 * @property {number} loopTime - The time in miliseconds for main loop.
 * 
 */



/**
 * Engine_Start event.
 *
 * @event st.ngn.baseEngines.BaseEngine#Engine_Start
 * @memberof st.ngn.baseEngines.BaseEngine
 * @type {object}
 * @property {st.ngn.BaseEngine} engine - The engine that is started.
 */

/**
 * Engine_Stop event.
 *
 * @event st.ngn.baseEngines.BaseEngine#Engine_Stop
 * @memberof st.ngn.baseEngines.BaseEngine
 * @type {object}
 * @property {st.ngn.BaseEngine} engine - The engine that is stopped.
 */

/**
 * MainLoop_Tick event.
 *
 * @event st.ngn.baseEngines.BaseEngine#MainLoop_Tick
 * @memberof st.ngn.baseEngines.BaseEngine
 * @type {object}
 */

/**
 * MainLoop_Stop event.
 *
 * @event st.ngn.baseEngines.BaseEngine#MainLoop_Stop
 * @memberof st.ngn.baseEngines.BaseEngine
 * @type {object}
 */




/**
 * Base Engine
 * <pre>
 * 'Base engines' are the most internal 'core pattern' of an engine
 * 
 * Provides different states ('config', 'ready', 'working', 'stopped')
 * The simplest 'core pattern' is an infinite loop with some time interval (non-precise clock)...
 *  
 *  
 * </pre>
 * 
 * @class
 * @memberof st.ngn.baseEngines
 * 
 * @property {object} config - Configuration.
 * @property {object} _mainLoop - Main loop reference object.
 * @property {String} state - State.
 * @property {object} eventEmitter - Object for emit events.
 * 
 * 
 */
class BaseEngine {
	
	/**
	 * @constructs BaseEngine
	 * 
	 * @param {st.ngn.baseEngines.BaseEngine.Config} config Configuration object
	 */
	constructor(config) {
		
		let _baseEngine = this;
		
		_baseEngine.config = config;
		_baseEngine._mainLoop = null;
		
		_baseEngine.CONSTANTS = BaseEngine_CONSTANTS;
		_baseEngine.state = _baseEngine.CONSTANTS.States.Config;
		
		
		_baseEngine.eventEmitter = new EventEmitter();

	}
	
	
	
	/**
	 * Initialize
	 * <pre>
	 * When an engine is initialized the state changes to 'ready'
	 * </pre>
	 * 
	 */
	initialize() {
		
		let _baseEngine = this;
		
		// Map event MainLoop_Stop
		_baseEngine.eventEmitter.on( _baseEngine.CONSTANTS.Events.Stop, function() {
			clearInterval( _baseEngine._mainLoop );
			_baseEngine.state = _baseEngine.CONSTANTS.States.Ready;
		});
		
		_baseEngine.state = _baseEngine.CONSTANTS.States.Ready;
	}
	
	
	/**
	 * Main loop
	 * <pre>
	 * Starts engine 'main loop'.
	 * 
	 * The engine state changes to 'working'
	 * </pre>
	 * 
	 */
	_mainLoop() {
		
	  let _baseEngine = this;
	  
	  if ( _baseEngine.state !== _baseEngine.CONSTANTS.States.Ready ) {
		  throw "Bad state";
	  }
	  
	  _baseEngine.state = _baseEngine.CONSTANTS.States.Working;
	  
	  _baseEngine._mainLoop = setInterval(() => {
		  if (_baseEngine.state === _baseEngine.CONSTANTS.States.Working) {
			  
			  // Emit event MainLoop_Tick
			  _baseEngine.eventEmitter.emit(_baseEngine.CONSTANTS.Events.MainLoop_Tick);
		  } else {
			  
			  // Emit event MainLoop_Stop
			  _baseEngine.eventEmitter.emit(_baseEngine.CONSTANTS.Events.MainLoop_Stop);
		  }
	  }, _baseEngine.config.loopTime);
	  
	}
	
	
	/**
	 * Stop main loop
	 * <pre>
	 * Stops the engine 'main loop'.
	 * 
	 * This asynchronous operation is done firing the event 'MainLoop_Stop'
	 * 
	 * </pre>
	 * 
	 */
	_stopMainLoop() {
		let _baseEngine = this;
		
		// Emit event MainLoop_Stop
		_baseEngine.eventEmitter.emit(_baseEngine.CONSTANTS.Events.MainLoop_Stop);	
	}
	
	
	/**
	 * Start engine
	 * <pre>
	 * The engine could start the 'main loop' only when is 'ready' or 'stopped'.
	 * 
	 * When the engine is started the event 'Engine_Start' is emited.
	 * </pre>
	 * 
	 * 
	 * @throws Exception
	 * @fires st.ngn.baseEngines.BaseEngine#Engine_Start
	 * 
	 * @param {object} options - Options object
	 * @param {st.ngn.baseEngines.BaseEngine} [options.engine] - Engine reference
	 * 
	 */
	startEngine(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngn = this;
		if (options.engine !== undefined) {
			_ngn = options.engine;
		}
		
		// Check engine state
		switch (_ngn.state) {
			case _ngn.CONSTANTS.States.Ready:
			case _ngn.CONSTANTS.States.Stop:
				break;
	
			default:
				throw "Bad engine state.";
				// break;
		}
		
		try {
			_ngn._mainLoop();
		} catch (e) {
			throw 'Error in mainLoop. ' + e;
		}
		
		// Emit event 'Engine_Start'
		_ngn.eventEmitter.emit( _ngn.CONSTANTS.Events.Engine_Start );

		
	}
	
	
	/**
	 * Stop engine
	 * <pre>
	 * The engine could stop the 'main loop' only when is 'working'.
	 * 
	 * When the engine is stopped the event 'Engine_Stop' is emited.
	 * </pre>
	 * 
	 * @throws Exception
	 * @fires st.ngn.baseEngines.BaseEngine#Engine_Stop
	 * 
	 * @param {object} options - Options object
	 * @param {st.ngn.baseEngines.BaseEngine} [options.engine] - Engine reference
	 * 
	 * 
	 */
	stopEngine(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngn = this;
		if (options.engine !== undefined) {
			_ngn = options.engine;
		}
		
		if (_ngn.state !== _ngn.CONSTANTS.States.Working) {
			throw "Bad engine state.";
		}

		try {
			_ngn._stopMainLoop();
		} catch (e) {
			throw 'Error in stopMainLoop. ' + e;
		}
		
		// Emit event Engine_Stop 
		// for MainLoop_Stop
		_ngn.eventEmitter.emit( _ngn.CONSTANTS.Events.Engine_Stop );
		
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
	"BaseEngine" : BaseEngine
};


module.exports = _lib;


