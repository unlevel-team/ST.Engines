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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STActuator_Dummy01 = function () {

	/**
  * @constructs STActuator_Dummy01
  * 
  * @param {object} options - Options object
  * @param {st.ngn.STActuator_Dummy01.Config} options.config - Configuration object
  */

	function STActuator_Dummy01(options) {
		_classCallCheck(this, STActuator_Dummy01);

		if (options === undefined) {
			options = {};
		}

		var _config = {};
		if (options.config === undefined) {
			_config = options.config;
		}

		var _actEngine = this;

		_actEngine._config = _config;
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

	_createClass(STActuator_Dummy01, [{
		key: "initialize",
		value: function initialize() {

			var _actEngine = this;

			/** 
    * Import EventEmitter
    * @ignore
    */
			var _EventEmitter = require('events').EventEmitter;
			_actEngine.eventEmitter = new _EventEmitter();

			var _config = _actEngine._config;
			var _options = _actEngine._options;

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
	}, {
		key: "_mapEngineEvents",
		value: function _mapEngineEvents(options) {

			if (options === undefined) {
				options = {};
			}

			var _actEngine = this;
			if (options.engine !== undefined) {
				_actEngine = options.engine;
			}

			_actEngine.eventEmitter.on('Main Loop Tick', function (_data) {

				_actEngine._event_MainLoopTick({
					'engine': _actEngine,
					'data': _data
				});
			});
		}
	}, {
		key: "_event_MainLoopTick",
		value: function _event_MainLoopTick(options) {

			var _actEngine = this;
			if (options.engine !== undefined) {
				_actEngine = options.engine;
			}

			var _options = _actEngine._options;

			var _data = options.data;

			console.log('<~i~> STActuator_Dummy01 (_event_MainLoopTick):'); // TODO REMOVE DEBUG LOG

			_actEngine._ticks++;

			if (_actEngine._ticks >= _options.ticks) {

				_actEngine._ticks = 0;
				_actEngine._lastTime = new Date().getTime();

				console.log('<~i~> STActuator_Dummy01 (info):'); // TODO REMOVE DEBUG LOG

				if (_options.showTime === true) {
					console.log(' <~~~> Time: ' + _actEngine._lastTime); // TODO REMOVE DEBUG LOG
				}

				if (_options.showDeltaTime === true) {
					if (_actEngine._deltaTimeRef !== undefined) {
						var _deltaTime = _actEngine._lastTime - _actEngine._deltaTimeRef;
						console.log(' <~~~> DetalTime: ' + _deltaTime); // TODO REMOVE DEBUG LOG
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

	}, {
		key: "getOptions",
		value: function getOptions(options) {

			var _actEngine = this;

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

			var _actEngine = _ngnInterface.custom_engine;
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

	}, {
		key: "setOptions",
		value: function setOptions(options) {

			var _actEngine = this;

			if (options === undefined) {
				options = {};
			}

			if (options.actuator !== undefined) {
				_actEngine = options.actuator;
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

			var _snsOptions = _actEngine._options;

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

			var _actEngine = _ngnInterface.custom_engine;
			_actEngine.setOptions({
				'actuator': _actEngine,
				'options': options.ngnOptions
			});
		}
	}]);

	return STActuator_Dummy01;
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

	// console.log('<~i~> STActuator_Dummy01 (_get_NGNInterface):');	// TODO REMOVE DEBUG LOG
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

	var _actDummy01 = new STActuator_Dummy01(options.config);
	_actDummy01.initialize();

	var _ngnInterface = {
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

var _lib = {
	'get_NGNInterface': _get_NGNInterface
};

module.exports = _lib;
//# sourceMappingURL=stActuator_Dummy01.js.map
