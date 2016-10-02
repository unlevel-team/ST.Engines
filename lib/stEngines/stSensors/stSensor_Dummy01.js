"use strict";

/**
 * ST Sensor Dummy01
 * 
 * <pre>
 * Sensor for made some tests..
 * 
 * </pre>
 * 
 * 
 */


/**
 * STSensor_Dummy01 configuration object.
 * 
 * @typedef {Object} Config
 * @memberof st.ngn.STSensor_Dummy01
 * 
 * @type Object
 * @property {boolean} showTime - Show current time.
 * @property {boolean} showDeltaTime - Show time interval time.
 * @property {number} ticks - Number of 'ticks' interval.
 * 
 * 
 */


/**
 * ST Sensor Dummy01
 * 
 * @class
 * @memberof st.ngn
 * 
 */
class STSensor_Dummy01 {
	
	
	/**
	 * @constructs STSensor_Dummy01
	 * 
	 * @param {object} options - Options object
	 * @param {st.ngn.STSensor_Dummy01.Config} options.config - Configuration object
	 */
	constructor(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _config = {};
		if (options.config === undefined) {
			_config = options.config;
		}
		
		
		let _snsEngine = this;
		
		_snsEngine._config  = _config;
		_snsEngine.eventEmitter = null;
		
		
		_snsEngine.name = "STSensor_Dummy01";
		_snsEngine._lastTime = null;
		_snsEngine._ticks = 0;
		
		_snsEngine._options = {
			'showTime': true,
			'showDeltaTime': true,
			'ticks': 3
		};


	}

	
	initialize() {
		
		let _snsEngine = this;

		
		/** 
		 * Import EventEmitter
		 * @ignore
		 */
		let _EventEmitter = require('events').EventEmitter;
		_snsEngine.eventEmitter = new _EventEmitter(); 
		
		let _config = _snsEngine._config
		let _options = _snsEngine._options;
		
		if (_config.showTime === false) {
			_options.showTime = false;
		}
		
		if (_config.showDeltaTime === false) {
			_options.showDeltaTime = false;
		}

		if (_config.ticks !== undefined) {
			_options.ticks = _config.ticks;
		}

	
		_snsEngine._mapEngineEvents();
	}
	
	
	_mapEngineEvents(options) {
		
		if (options === undefined) {
			options = {};
		}

		
		let _snsEngine = this;
		if (options.engine !== undefined) {
			_snsEngine = options.engine;
		}
		
		_snsEngine.eventEmitter.on('Main Loop Tick', function(_data) {
			
			_snsEngine._event_MainLoopTick({
				'engine': _snsEngine,
				'data': _data
			});
			
		});


	}
	
	
	_event_MainLoopTick(options) {
		
		let _snsEngine = this;
		if (options.engine !== undefined) {
			_snsEngine = options.engine;
		}
		
		let _options = _snsEngine._options;
		
		let _data = options.data;
		
		
		console.log('<~i~> STSensor_Dummy01 (_event_MainLoopTick):');	// TODO REMOVE DEBUG LOG

		
		_snsEngine._ticks++;
		
		if (_snsEngine._ticks >= _options.ticks) {
			
			_snsEngine._ticks = 0;
			_snsEngine._lastTime = new Date().getTime();
			
			console.log('<~i~> STSensor_Dummy01 (info):');	// TODO REMOVE DEBUG LOG

		  
			if (_options.showTime === true) {
				console.log(' <~~~> Time: ' + _snsEngine._lastTime);	// TODO REMOVE DEBUG LOG
			}
			
			if (_options.showDeltaTime === true) {
				if (_snsEngine._deltaTimeRef !== undefined) {
					let _deltaTime = _snsEngine._lastTime - _snsEngine._deltaTimeRef;
					console.log(' <~~~> DetalTime: ' + _deltaTime );	// TODO REMOVE DEBUG LOG
				}
				_snsEngine._deltaTimeRef = _snsEngine._lastTime;
			}
			
		}
		
	}
	
	
	/**
	 * Get options of engine
	 * 
	 * @param {object} options - Options
	 * @param {object} [options.sensor] - Sensor object
	 */
	getOptions(options) {
		
		let _snsEngine = this;
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.sensor !== undefined) {
			_snsEngine = options.sensor;
		}
		
		return _snsEngine._options;
		
	}
	
	
	/**
	 * Get options of engine using the interface
	 * 
	 * @param {object} options - Options
	 * @param {object} options.ngnInterface - Engine interface
	 */
	_getOptions(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.ngnInterface === undefined) {
			throw 'ngnInterface is required.';
		}
		let _ngnInterface = options.ngnInterface;
		
		let _snsEngine = _ngnInterface.custom_engine;
		return _snsEngine.getOptions({
			'sensor': _snsEngine
		});

	}
	
	
	/**
	 * Set options
	 * 
	 * @param {object} options - Options object
	 * @param {object} [options.sensor] - Sensor object
	 * @param {object} options.options - Options object
	 * @param {number} [options.options.ticks] - Ticks 
	 * @param {boolean} [options.options.showTime] - Show time
	 * @param {boolean} [options.options.showDeltaTime] - Show delta time 
	 */
	setOptions(options) {
		
		let _snsEngine = this;
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.sensor !== undefined) {
			_snsEngine = options.sensor;
		}

		let _options = {};
		if (options.options !== undefined) {
			_options = options.options;
		}
		
		/*
		if (stSensor.state === stSensor.CONSTANTS.States.Working) {
			throw "Bad sensor state.";
		}
		*/
		
		let _snsOptions = _snsEngine._options;
		
		if (_options.ticks) {
			_snsOptions.ticks = _options.ticks;
		}
		
		if (_options.showTime !== undefined) {
			_snsOptions.showTime = _options.showTime;
		}
		
		if (_options.showDeltaTime !== undefined) {
			_snsOptions.showDeltaTime = _options.showDeltaTime;
		}
		
	}

	
	/**
	 * Set options using the interface
	 * 
	 * @param {object} options - Options
	 * @param {object} options.ngnInterface - Engine interface
	 * @param {object} options.ngnOptions - Engine options
	 */
	_setOptions(options) {

		if (options === undefined) {
			options = {};
		}
		
		if (options.ngnInterface === undefined) {
			throw 'ngnInterface options is required.';
		}
		let _ngnInterface = options.ngnInterface;
		
		let _snsEngine = _ngnInterface.custom_engine;
		_snsEngine.setOptions({
			'sensor': _snsEngine,
			'options': options.ngnOptions
		});

		
	}
	
	
	
	
}


/**
 * Returns an engine interface for use with ST library
 * 
 * <pre>
 * - The library should return a method named 'get_NGNInterface'
 * </pre>
 * 
 * @param {Object} options - options
 * @param {Object} options.config - Configuration 
 * 
 * @returns {st.ngn.baseEngines.EngineInterface}
 */
function _get_NGNInterface (options) {
	
	if (options === undefined ||
			options === null) {
		options = {};
	}
	
	
	/*
	// reference library for specific methods... 
	
	if (options.st === undefined) {
		throw 'SomeThings library no fonud';
	}
	let _st = options.st;
	*/
	
	console.log('<~i~> STSensor_Dummy01 (_get_NGNInterface):');	// TODO REMOVE DEBUG LOG
	console.log(options);	// TODO REMOVE DEBUG LOG
	console.log(options.config.config.bngnOptions);	// TODO REMOVE DEBUG LOG

	
	let _snsDummy01 = new STSensor_Dummy01(options.config);
	_snsDummy01.initialize();

	let _ngnInterface = {
		'name': _snsDummy01.name,
		'type': 'sensor',
		'eventEmitter': _snsDummy01.eventEmitter,

		'baseNGN': 'SimpleLoop',
		
		'custom_engine': _snsDummy01,
		'getOptions': _snsDummy01._getOptions,
		'setOptions': _snsDummy01._setOptions
	
	};

	
	return _ngnInterface;
	
}


let _lib = {
	'get_NGNInterface': _get_NGNInterface
};


module.exports = _lib;

