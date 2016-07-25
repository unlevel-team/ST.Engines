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
		"State_Config": "config",
		"State_Ready": "ready",
		"State_Working": "working",
		"State_Stop": "stop"
	},

	"Events": {
		"MainLoop_Tick": "Main Loop",
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

		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Actuator Engine URL
		if (act.config.options.actuatorEngineURL !== undefined && act.config.options.actuatorEngineURL !== null) {

			act._actuatorEngine = null;

			try {
				act._actuatorEngine = require(act.config.options.actuatorEngineURL);
				act.actuatorEngine = new act._actuatorEngine(act.config);
				act.actuatorEngine.initialize();
			} catch (e) {
				// TODO: handle exception
				console.log('<EEE> Actuator.initialize'); // TODO REMOVE DEBUG LOG
				console.log(e); // TODO REMOVE DEBUG LOG
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
		_actEngine.state = _actEngine.CONSTANTS.States.State_Config;

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
				actuatorEngine.state = actuatorEngine.CONSTANTS.States.State_Ready;
			});

			actuatorEngine.state = actuatorEngine.CONSTANTS.States.State_Ready;
		}

		/**
   * Main loop
   */

	}, {
		key: "mainLoop",
		value: function mainLoop() {
			var actuatorEngine = this;

			if (actuatorEngine.state !== actuatorEngine.CONSTANTS.States.State_Ready) {
				throw "Bad state";
			}

			actuatorEngine.state = actuatorEngine.CONSTANTS.States.State_Working;

			actuatorEngine._mainLoop = setInterval(function () {
				if (actuatorEngine.state === actuatorEngine.CONSTANTS.States.State_Working) {
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
   * @abstract 
   * @param {object} options Options object.
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
