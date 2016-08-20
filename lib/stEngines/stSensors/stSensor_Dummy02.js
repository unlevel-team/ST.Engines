"use strict";

/**
 * ST Sensor Dummy02
 * 
 * 
 * Sensor for made some tests..
 * 
 * 
 * 
 * 
 * 
 * 
 */


/**
 * ST Sensor Dummy02
 * 
 * @class
 * @memberof st.ngn
 * 
 */
class STSensor_Dummy02 {
	
	
	/**
	 * @constructs STSensor_Dummy02
	 * 
	 * @param {object} config - Configuration object
	 */
	constructor(config) {
		
		if (config === undefined) {
			config = {};
		}
		
		
		let _snsEngine = this;
		
		_snsEngine._config  = config;
		_snsEngine.eventEmitter = null;
		
		
		_snsEngine.name = "STSensor_Dummy02";
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
		let EventEmitter = require('events').EventEmitter;

		_snsEngine.eventEmitter = new EventEmitter(); 
		
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
			throw 'Engine interface is required.';
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
		if (stSensor.state === stSensor.CONSTANTS.States.SEstate_Working) {
			throw "Bad sensor state.";
		}
		*/
		
		let _snsOptions = stSensor._options;
		
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
			throw 'Engine interface is required.';
		}
		let _ngnInterface = options.ngnInterface;
		
		let _snsEngine = _ngnInterface.custom_engine;
		_snsEngine.setOptions({
			'sensor': _snsEngine,
			'options': options.ngnOptions
		});

		
	}
	
	
	
	
}



function _get_NGNInterface (options) {
	
	if (options === undefined ||
			options === null) {
		options = {};
	}
	
	if (options.st === undefined) {
		throw 'SomeThings library no fonud';
	}
	let _st = options.st;
	
	
	let _snsDummy02 = new STSensor_Dummy02(options.config);

	let _ngnInterface = {
		'name': _snsDummy02.name,
		'type': 'sensor',
		'eventEmmiter': _snsDummy02.eventEmitter,
		
		'custom_engine': _snsDummy02,
		'getOptions': _snsDummy02._getOptions,
		'setOptions': _snsDummy02._setOptions
	
	};

	
}


let _lib = {
	'get_NGNInterface': _get_NGNInterface
};


module.exports = _lib;

