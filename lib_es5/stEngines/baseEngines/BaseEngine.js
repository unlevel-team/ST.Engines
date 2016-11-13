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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = require('events').EventEmitter;

/**
 * BaseEngine CONSTANTS
 * 
 * @memberof st.ngn.baseEngines.BaseEngine
 */
var BaseEngine_CONSTANTS = {

	"States": {
		"Config": "config",
		"Ready": "ready",
		"Working": "working",
		"Stop": "stop"
	},

	"Events": {
		"MainLoop_Tick": "Main Loop Tick",
		"MainLoop_Stop": "Main Loop Stop",

		"Engine_Start": "NGN start",
		"Engine_Stop": "NGN stop",

		"EngineData": "NGN Data"

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

var BaseEngine = function () {

	/**
  * @constructs BaseEngine
  * 
  * @param {st.ngn.baseEngines.BaseEngine.Config} config Configuration object
  */

	function BaseEngine(config) {
		_classCallCheck(this, BaseEngine);

		var _baseEngine = this;

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
  * @throws {Exception}
  * 
  */


	_createClass(BaseEngine, [{
		key: "initialize",
		value: function initialize(options) {

			if (options === undefined) {
				options = {};
			}

			var _baseEngine = this;
			if (options.engine !== undefined) {
				_baseEngine = options.engine;
			}

			var _config = _baseEngine.config;
			if (_config.loopTime === undefined) {
				throw 'loopTime is required.';
			}

			// Map event MainLoop_Stop
			_baseEngine.eventEmitter.on(_baseEngine.CONSTANTS.Events.MainLoop_Stop, function () {
				clearInterval(_baseEngine._mainLoop);
				_baseEngine.state = _baseEngine.CONSTANTS.States.Ready;
			});

			_baseEngine.state = _baseEngine.CONSTANTS.States.Ready;
		}

		/**
   * Start main loop
   * <pre>
   * Starts engine 'main loop'.
   * 
   * The engine state changes to 'working'...
   * ... and with 'loopTime' intervals fires 'MainLoop_Tick' event
   * </pre>
   * 
   */

	}, {
		key: "_startMainLoop",
		value: function _startMainLoop(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngn = this;
			if (options.engine !== undefined) {
				_ngn = options.engine;
			}

			var _config = _ngn.config;

			if (_config.loopTime === undefined) {
				throw "Bad loopTime";
			}

			if (_ngn.state !== _ngn.CONSTANTS.States.Ready) {
				throw "Bad state";
			}

			_ngn.state = _ngn.CONSTANTS.States.Working;

			_ngn._mainLoop = setInterval(function () {
				if (_ngn.state === _ngn.CONSTANTS.States.Working) {

					// Emit event MainLoop_Tick
					_ngn.eventEmitter.emit(_ngn.CONSTANTS.Events.MainLoop_Tick);
				} else {

					// Emit event MainLoop_Stop
					_ngn.eventEmitter.emit(_ngn.CONSTANTS.Events.MainLoop_Stop);
				}
			}, _config.loopTime);
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

	}, {
		key: "_stopMainLoop",
		value: function _stopMainLoop(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngn = this;
			if (options.engine !== undefined) {
				_ngn = options.engine;
			}

			// Emit event MainLoop_Stop
			_ngn.eventEmitter.emit(_ngn.CONSTANTS.Events.MainLoop_Stop);
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

	}, {
		key: "startEngine",
		value: function startEngine(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngn = this;
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
				_ngn._startMainLoop({
					'engine': _ngn
				});
			} catch (e) {
				throw 'Error in mainLoop. ' + e;
			}

			// Emit event 'Engine_Start'
			_ngn.eventEmitter.emit(_ngn.CONSTANTS.Events.Engine_Start);
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

	}, {
		key: "stopEngine",
		value: function stopEngine(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngn = this;
			if (options.engine !== undefined) {
				_ngn = options.engine;
			}

			if (_ngn.state !== _ngn.CONSTANTS.States.Working) {
				throw "Bad engine state.";
			}

			try {
				_ngn._stopMainLoop({
					'engine': _ngn
				});
			} catch (e) {
				throw 'Error in stopMainLoop. ' + e;
			}

			// Emit event Engine_Stop
			// for MainLoop_Stop
			_ngn.eventEmitter.emit(_ngn.CONSTANTS.Events.Engine_Stop);
		}

		/**
   * Get options
   * @abstract 
   * @return {object} Options object
   */

	}, {
		key: "getOptions",
		value: function getOptions() {

			if (options === undefined) {
				options = {};
			}

			var _ngn = this;
			if (options.engine !== undefined) {
				_ngn = options.engine;
			}

			var _config = _ngn.config;

			var _options = {
				'loopTime': _config.loopTime
			};

			return _options;
		}

		/**
   * Set options
   * @abstract 
   * @param {object} options - Options object.
   */

	}, {
		key: "setOptions",
		value: function setOptions(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngn = this;
			if (options.engine !== undefined) {
				_ngn = options.engine;
			}

			var _config = _ngn.config;

			if (options.loopTime !== undefined) {
				_config.loopTime = options.loopTime;
			}
		}
	}]);

	return BaseEngine;
}();

var _lib = {
	"BaseEngine": BaseEngine
};

module.exports = _lib;
//# sourceMappingURL=BaseEngine.js.map
