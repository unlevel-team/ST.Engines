"use strict";

/**
 * Counter Loop engine
 * 
 * 
 */


/**
 * Import SimpleLoop
 * @ignore
 */
let SimpleLoop = require('./SimpleLoop.js').SimpleLoop;


/**
 * CounterLoop configuration object.
 * 
 * @typedef {Object} Config
 * @memberof st.ngn.baseEngines.CounterLoop
 * @implements st.ngn.baseEngines.SimpleLoop
 * 
 * @type Object
 * @property {number} ticks - Main loop ticks for counter.
 * @property {number} maxLoopNum - Maximum number of loops to count.
 */



/**
 * LoopCount event.
 *
 * @event st.ngn.baseEngines.CounterLoop#LoopCount
 * @memberof st.ngn.baseEngines.CounterLoop
 * @type {object}
 * 
 * @property {number} loopNum - The number of loops.
 * @property {st.ngn.BaseEngine} engine - The engine of the counter loop.
 * 
 */


/**
 * BaseEngine CONSTANTS
 * 
 * @memberof st.ngn.baseEngines.CounterLoop
 */

const CounterLoop_CONSTANTS = {
	'Events' : {
		'CounterLoop': 'counterLoop',
		'CounterMax': 'counterMax'

		
	}	
};


/**
 * CounterLoop
 * <pre>
 * 
 * </pre>
 * 
 * 
 * @class
 * @memberof st.ngn.baseEngines
 * @implements st.ngn.baseEngines.SimpleLoop
 * 
 * @property {number} _loopNum - Number of loops
 * @property {number} _tickNum - Number of ticks
 * 
 */
class CounterLoop extends SimpleLoop {

	/**
	 * 
	 * @constructs CounterLoop
	 * 
	 * @param {st.ngn.baseEngines.CounterLoop.Config} config - Configuration object
	 */
	constructor(config) {
		
		super(config);
		
		let _ngn = this;
		
		_ngn._loopNum = 0;
		_ngn._tickNum = 0;
		
		_ngn._CONSTANTS = CounterLoop_CONSTANTS;
		

	}
	
	
	
	initialize() {
		
		super.initialize();
		
		let _ngn = this;
		
		// Map event MainLoop_Tick
		_ngn.eventEmitter.on( _baseEngine.CONSTANTS.Events.MainLoop_Tick, function(data) {
			
			_ngn._processEngineTick({
				'engine': _ngn
			});
		});

	}
	
	
	_processEngineTick(options) {
		
		if (options === undefined) {
			options = {};
		}

		let _ngn = this;
		if (options.engine !== null) {
			_ngn = options.engine;
		}
		
		let _ngnConfig = _ngn.config;
		
		if (_ngn._tickNum < _ngnConfig.ticks) {
				_ngn._tickNum++;
		} else {
			_ngn._tickNum = 0;
			
			  
			if (_ngn._loopNum < _ngnConfig.maxLoopNum) {
				_ngn._loopNum++;
				
				// Emit event CounterLoop
				_ngn.eventEmitter.emit(	_ngn._CONSTANTS.Events.CounterLoop,
						{
							'loopNum': _ngn._loopNum,
							'engine': _ngn
						});

			} else {
				_ngn._loopNum = 0;
				
				// Emit event CounterMax
				_ngn.eventEmitter.emit(	_ngn._CONSTANTS.Events.CounterMax,
						{
							'maxLoopNum': _ngnConfig.maxLoopNum,
							'engine': _ngn
						});

			}
		}
		
	}
	
	
	
}


let _lib = {
	"CounterLoop" : CounterLoop
		
};


module.exports = _lib;

