"use strict";

/**
 * ActuatorEngine
 * 
 * Generic process for an Actuator
 * 
 * @ignore
 */

/**
 * Import EventEmitter
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = require('events').EventEmitter;

/**
 * ActuatorEngine CONSTANTS
 * 
 * @memberof st.ngn
 */
var ActuatorEngine_CONSTANTS = {

	"States": {
		"Config": "config",
		"Ready": "ready",
		"Working": "working",
		"Stop": "stop"
	},

	"Events": {
		"MainLoop_Tick": "Main Loop Tick",
		"MainLoop_Stop": "Main Loop Stop",

		"ActuatorEngine_Start": "AE start",
		"ActuatorEngine_Stop": "AE stop",

		"ActuatorData": "Actuator Data"

	}

};

/**
 * ActuatorEngine_Start event.
 *
 * @event st.ngn.ActuatorEngine#ActuatorEngine_Start
 * @memberof st.ngn.ActuatorEngine
 * @type {object}
 * @property {st.ngn.ActuatorEngine} engine - The engine that is started.
 */

/**
 * ActuatorEngine_Stop event.
 *
 * @event st.ngn.ActuatorEngine#ActuatorEngine_Stop
 * @memberof st.ngn.ActuatorEngine
 * @type {object}
 * @property {st.ngn.ActuatorEngine} engine - The engine that is stopped.
 */

/**
 * Actuator engine library
 * 
 * @namespace ActuatorEngine_Lib
 * @memberof st.ngn
 */
var ActuatorEngine_Lib = {

	/**
  * Initialize actuator engine
  * 
  * @function
  * @memberof st.ngn.ActuatorEngine_Lib
  * 
  * @param {st.ngn.Actuator} act - Actuator object
  */
	"initialze_ActuatorEngine": function initialze_ActuatorEngine(act) {

		var _options = act.config.options;
		var _actConfig = act.config;

		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Actuator Engine URL
		if (_options.actuatorEngineURL !== undefined && _options.actuatorEngineURL !== null) {

			act._actuatorEngine = null;

			try {
				act._actuatorEngine = require(_options.actuatorEngineURL);
				act.actuatorEngine = new act._actuatorEngine(_actConfig);
				act.actuatorEngine.initialize();
			} catch (e) {
				// TODO: handle exception
				console.log('<EEE> Actuator.initialize'); // TODO REMOVE DEBUG LOG
				console.log(e); // TODO REMOVE DEBUG LOG
			}
		}
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~

		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Engine URI (stURI format)
		//
		// Try new methods for load engines
		//
		if (_options.engineURI !== undefined && _options.engineURI !== null && act.actuatorEngine === null) {

			var _BaseEngines_Lib = require('./baseEngines/stBaseNGN.js').BaseEngines_Lib;

			// console.log('<~i~> SensorEngine_Lib.initialze_ActuatorEngine');	// TODO: REMOVE DEBUG LOG
			// console.log(act);	// TODO: REMOVE DEBUG LOG

			try {

				act.actuatorEngine = _BaseEngines_Lib.initialize_Engine({
					'engineOptions': _options,
					'bngnOptions': _actConfig
				});

				act.actuatorEngine.initialize();
			} catch (_e) {
				// TODO: handle exception

				console.log('<EEE> ActuatorEngine_Lib.initialze_ActuatorEngine'); // TODO: REMOVE DEBUG LOG
				console.log(' <~> _BaseEngines_Lib.initialize_Engine'); // TODO: REMOVE DEBUG LOG

				console.log(_e); // TODO: REMOVE DEBUG LOG
			}
		}
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
	}

};

/**
 * Actuator Engine
 * 
 * @class
 * @memberof st.ngn
 * 
 * @property {object} config - Configuration.
 * @property {object} _mainLoop - Main loop reference object.
 * @property {String} state - State.
 * @property {object} eventEmitter - Object for emit events.
 * 
 */

var ActuatorEngine = function () {

	/**
  * @constructs ActuatorEngine
  * 
  * @param {object} config ActuatorEngine object
  */

	function ActuatorEngine(config) {
		_classCallCheck(this, ActuatorEngine);

		var _actEngine = this;
		_actEngine.config = config;
		_actEngine._mainLoop = null;

		_actEngine.CONSTANTS = ActuatorEngine_CONSTANTS;
		_actEngine.state = _actEngine.CONSTANTS.States.Config;

		_actEngine.eventEmitter = new EventEmitter();
	}

	/**
  * Initialize
  */


	_createClass(ActuatorEngine, [{
		key: "initialize",
		value: function initialize() {

			var actuatorEngine = this;

			actuatorEngine.eventEmitter.on(actuatorEngine.CONSTANTS.Events.MainLoop_Stop, function () {
				clearInterval(actuatorEngine._mainLoop);
				actuatorEngine.state = actuatorEngine.CONSTANTS.States.Ready;
			});

			actuatorEngine.state = actuatorEngine.CONSTANTS.States.Ready;
		}

		/**
   * Main loop
   */

	}, {
		key: "mainLoop",
		value: function mainLoop() {
			var actuatorEngine = this;

			if (actuatorEngine.state !== actuatorEngine.CONSTANTS.States.Ready) {
				throw "Bad state";
			}

			actuatorEngine.state = actuatorEngine.CONSTANTS.States.Working;

			actuatorEngine._mainLoop = setInterval(function () {
				if (actuatorEngine.state === actuatorEngine.CONSTANTS.States.Working) {
					actuatorEngine.eventEmitter.emit(actuatorEngine.CONSTANTS.Events.MainLoop_Tick);
				} else {
					actuatorEngine.eventEmitter.emit(actuatorEngine.CONSTANTS.Events.MainLoop_Stop);
				}
			}, actuatorEngine.config.loopTime);
		}

		/**
   * Stop main loop
   * 
   * @fires st.ngn.ActuatorEngine#ActuatorEngine_Stop
   */

	}, {
		key: "stopMainLoop",
		value: function stopMainLoop() {
			var actuatorEngine = this;
			actuatorEngine.eventEmitter.emit(actuatorEngine.CONSTANTS.Events.MainLoop_Stop);
		}

		/**
   * Start engine
   * @abstract 
   */

	}, {
		key: "startEngine",
		value: function startEngine() {}

		/**
   * Stop engine
   * @abstract 
   */

	}, {
		key: "stopEngine",
		value: function stopEngine() {}

		/**
   * Get options
   * @abstract 
   * @return {object} Options object
   */

	}, {
		key: "getOptions",
		value: function getOptions() {
			return {};
		}

		/**
   * Set options
   * @abstract 
   * @param {object} options - Options object.
   */

	}, {
		key: "setOptions",
		value: function setOptions(options) {}
	}]);

	return ActuatorEngine;
}();

var _lib = {
	"ActuatorEngine": ActuatorEngine,
	"ActuatorEngine_Lib": ActuatorEngine_Lib

};

module.exports = _lib;
//# sourceMappingURL=ActuatorEngine.js.map
