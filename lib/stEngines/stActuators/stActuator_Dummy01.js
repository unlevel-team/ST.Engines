"use strict";

/**
 * ST Actuator Dummy01
 * 
 * <pre>
 * Actuator for made some tests..
 * 
 * </pre>
 * 
 * 
 */


/**
 * STActuator_Dummy01 configuration object.
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
 * ST Actuator Dummy01
 * 
 * @class
 * @memberof st.ngn
 * 
 */
class STActuator_Dummy01 {
	
	
	/**
	 * @constructs STActuator_Dummy01
	 * 
	 * @param {object} options - Options object
	 * @param {st.ngn.STActuator_Dummy01.Config} options.config - Configuration object
	 */
	constructor(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _config = {};
		if (options.config === undefined) {
			_config = options.config;
		}
		
		
		let _actEngine = this;
		
		_actEngine._config  = _config;
		_actEngine.eventEmitter = null;
		
		
		_actEngine.name = "STActuator_Dummy01";
		_actEngine._lastTime = null;
		_actEngine._ticks = 0;
		
		_actEngine._options = {
			'showTime': true,
			'showDeltaTime': true,
			'ticks': 3
		};


	}

	
	initialize() {
		
		let _actEngine = this;

		
		/** 
		 * Import EventEmitter
		 * @ignore
		 */
		let _EventEmitter = require('events').EventEmitter;
		_actEngine.eventEmitter = new _EventEmitter(); 
		
		let _config = _actEngine._config
		let _options = _actEngine._options;
		
		if (_config.showTime === false) {
			_options.showTime = false;
		}
		
		if (_config.showDeltaTime === false) {
			_options.showDeltaTime = false;
		}

		if (_config.ticks !== undefined) {
			_options.ticks = _config.ticks;
		}

	
		_actEngine._mapEngineEvents();
	}
	
	
	_mapEngineEvents(options) {
		
		if (options === undefined) {
			options = {};
		}

		
		let _actEngine = this;
		if (options.engine !== undefined) {
			_actEngine = options.engine;
		}
		
		_actEngine.eventEmitter.on('Main Loop Tick', function(_data) {
			
			_actEngine._event_MainLoopTick({
				'engine': _actEngine,
				'data': _data
			});
			
		});


	}
	
	
	_event_MainLoopTick(options) {
		
		let _actEngine = this;
		if (options.engine !== undefined) {
			_actEngine = options.engine;
		}
		
		let _options = _actEngine._options;
		
		let _data = options.data;
		
		
		console.log('<~i~> STActuator_Dummy01 (_event_MainLoopTick):');	// TODO REMOVE DEBUG LOG

		
		_actEngine._ticks++;
		
		if (_actEngine._ticks >= _options.ticks) {
			
			_actEngine._ticks = 0;
			_actEngine._lastTime = new Date().getTime();
			
			console.log('<~i~> STActuator_Dummy01 (info):');	// TODO REMOVE DEBUG LOG

		  
			if (_options.showTime === true) {
				console.log(' <~~~> Time: ' + _actEngine._lastTime);	// TODO REMOVE DEBUG LOG
			}
			
			if (_options.showDeltaTime === true) {
				if (_actEngine._deltaTimeRef !== undefined) {
					let _deltaTime = _actEngine._lastTime - _actEngine._deltaTimeRef;
					console.log(' <~~~> DetalTime: ' + _deltaTime );	// TODO REMOVE DEBUG LOG
				}
				_actEngine._deltaTimeRef = _actEngine._lastTime;
			}
			
		}
		
	}
	
	
	/**
	 * Get options of engine
	 * 
	 * @param {object} options - Options
	 * @param {object} [options.actuator] - Actuator object
	 */
	getOptions(options) {
		
		let _actEngine = this;
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.actuator !== undefined) {
			_actEngine = options.actuator;
		}
		
		return _actEngine._options;
		
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
		
		let _actEngine = _ngnInterface.custom_engine;
		return _actEngine.getOptions({
			'actuator': _actEngine
		});

	}
	
	
	/**
	 * Set options
	 * 
	 * @param {object} options - Options object
	 * @param {object} [options.actuator] - Actuator object
	 * @param {object} options.options - Options object
	 * @param {number} [options.options.ticks] - Ticks 
	 * @param {boolean} [options.options.showTime] - Show time
	 * @param {boolean} [options.options.showDeltaTime] - Show delta time 
	 */
	setOptions(options) {
		
		let _actEngine = this;
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.actuator !== undefined) {
			_actEngine = options.actuator;
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
		
		let _snsOptions = _actEngine._options;
		
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
		
		let _actEngine = _ngnInterface.custom_engine;
		_actEngine.setOptions({
			'actuator': _actEngine,
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
	
	// console.log('<~i~> STActuator_Dummy01 (_get_NGNInterface):');	// TODO REMOVE DEBUG LOG
	// console.log(options);	// TODO REMOVE DEBUG LOG
	// console.log(options.config.config.bngnOptions);	// TODO REMOVE DEBUG LOG

	// Set custom options
	let _customOptions = [
		{
			'name': 'ticks',
			'type': 'number',
			'description': 'Number of ticks to wait...'
		},
		{
			'name': 'showTime',
			'type': 'boolean',
			'alias': 'Show time',
			'description': 'Show time or not'
		},
		{
			'name': 'showDeltaTime',
			'type': 'boolean',
			'alias': 'Show delta time',
			'description': 'Show delta time or not'
		}
	];
	
	
	let _actDummy01 = new STActuator_Dummy01(options.config);
	_actDummy01.initialize();

	let _ngnInterface = {
		'name': _actDummy01.name,
		'type': 'actuator',
		'eventEmitter': _actDummy01.eventEmitter,

		'baseNGN': 'SimpleLoop',
		
		'custom_engine': _actDummy01,
		'custom_options': _customOptions,
		'getOptions': _actDummy01._getOptions,
		'setOptions': _actDummy01._setOptions
	
	};

	
	return _ngnInterface;
	
}


let _lib = {
	'get_NGNInterface': _get_NGNInterface
};


module.exports = _lib;

