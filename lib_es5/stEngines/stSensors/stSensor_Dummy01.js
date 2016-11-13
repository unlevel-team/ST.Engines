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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STSensor_Dummy01 = function () {

	/**
  * @constructs STSensor_Dummy01
  * 
  * @param {object} options - Options object
  * @param {st.ngn.STSensor_Dummy01.Config} options.config - Configuration object
  */

	function STSensor_Dummy01(options) {
		_classCallCheck(this, STSensor_Dummy01);

		if (options === undefined) {
			options = {};
		}

		var _config = {};
		if (options.config === undefined) {
			_config = options.config;
		}

		var _snsEngine = this;

		_snsEngine._config = _config;
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

	_createClass(STSensor_Dummy01, [{
		key: "initialize",
		value: function initialize() {

			var _snsEngine = this;

			/** 
    * Import EventEmitter
    * @ignore
    */
			var _EventEmitter = require('events').EventEmitter;
			_snsEngine.eventEmitter = new _EventEmitter();

			var _config = _snsEngine._config;
			var _options = _snsEngine._options;

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
	}, {
		key: "_mapEngineEvents",
		value: function _mapEngineEvents(options) {

			if (options === undefined) {
				options = {};
			}

			var _snsEngine = this;
			if (options.engine !== undefined) {
				_snsEngine = options.engine;
			}

			_snsEngine.eventEmitter.on('Main Loop Tick', function (_data) {

				_snsEngine._event_MainLoopTick({
					'engine': _snsEngine,
					'data': _data
				});
			});
		}
	}, {
		key: "_event_MainLoopTick",
		value: function _event_MainLoopTick(options) {

			var _snsEngine = this;
			if (options.engine !== undefined) {
				_snsEngine = options.engine;
			}

			var _options = _snsEngine._options;

			var _data = options.data;

			console.log('<~i~> STSensor_Dummy01 (_event_MainLoopTick):'); // TODO REMOVE DEBUG LOG

			_snsEngine._ticks++;

			if (_snsEngine._ticks >= _options.ticks) {

				_snsEngine._ticks = 0;
				_snsEngine._lastTime = new Date().getTime();

				console.log('<~i~> STSensor_Dummy01 (info):'); // TODO REMOVE DEBUG LOG

				if (_options.showTime === true) {
					console.log(' <~~~> Time: ' + _snsEngine._lastTime); // TODO REMOVE DEBUG LOG
				}

				if (_options.showDeltaTime === true) {
					if (_snsEngine._deltaTimeRef !== undefined) {
						var _deltaTime = _snsEngine._lastTime - _snsEngine._deltaTimeRef;
						console.log(' <~~~> DetalTime: ' + _deltaTime); // TODO REMOVE DEBUG LOG
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

	}, {
		key: "getOptions",
		value: function getOptions(options) {

			var _snsEngine = this;

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

	}, {
		key: "_getOptions",
		value: function _getOptions(options) {

			if (options === undefined) {
				options = {};
			}

			if (options.ngnInterface === undefined) {
				throw 'ngnInterface is required.';
			}
			var _ngnInterface = options.ngnInterface;

			var _snsEngine = _ngnInterface.custom_engine;
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

	}, {
		key: "setOptions",
		value: function setOptions(options) {

			var _snsEngine = this;

			if (options === undefined) {
				options = {};
			}

			if (options.sensor !== undefined) {
				_snsEngine = options.sensor;
			}

			var _options = {};
			if (options.options !== undefined) {
				_options = options.options;
			}

			/*
   if (stSensor.state === stSensor.CONSTANTS.States.Working) {
   	throw "Bad sensor state.";
   }
   */

			var _snsOptions = _snsEngine._options;

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

	}, {
		key: "_setOptions",
		value: function _setOptions(options) {

			if (options === undefined) {
				options = {};
			}

			if (options.ngnInterface === undefined) {
				throw 'ngnInterface options is required.';
			}
			var _ngnInterface = options.ngnInterface;

			var _snsEngine = _ngnInterface.custom_engine;
			_snsEngine.setOptions({
				'sensor': _snsEngine,
				'options': options.ngnOptions
			});
		}
	}]);

	return STSensor_Dummy01;
}();

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


function _get_NGNInterface(options) {

	if (options === undefined || options === null) {
		options = {};
	}

	/*
 // reference library for specific methods... 
 
 if (options.st === undefined) {
 	throw 'SomeThings library no fonud';
 }
 let _st = options.st;
 */

	// console.log('<~i~> STSensor_Dummy01 (_get_NGNInterface):');	// TODO REMOVE DEBUG LOG
	// console.log(options);	// TODO REMOVE DEBUG LOG
	// console.log(options.config.config.bngnOptions);	// TODO REMOVE DEBUG LOG

	// Set custom options
	var _customOptions = [{
		'name': 'ticks',
		'type': 'number',
		'description': 'Number of ticks to wait...'
	}, {
		'name': 'showTime',
		'type': 'boolean',
		'alias': 'Show time',
		'description': 'Show time or not'
	}, {
		'name': 'showDeltaTime',
		'type': 'boolean',
		'alias': 'Show delta time',
		'description': 'Show delta time or not'
	}];

	var _snsDummy01 = new STSensor_Dummy01(options.config);
	_snsDummy01.initialize();

	var _ngnInterface = {
		'name': _snsDummy01.name,
		'type': 'sensor',
		'eventEmitter': _snsDummy01.eventEmitter,

		'baseNGN': 'SimpleLoop',

		'custom_engine': _snsDummy01,
		'custom_options': _customOptions,
		'getOptions': _snsDummy01._getOptions,
		'setOptions': _snsDummy01._setOptions

	};

	return _ngnInterface;
}

var _lib = {
	'get_NGNInterface': _get_NGNInterface
};

module.exports = _lib;
//# sourceMappingURL=stSensor_Dummy01.js.map
