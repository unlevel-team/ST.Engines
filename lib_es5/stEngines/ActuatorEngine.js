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
 * Actuator Engine
 * 
 * @class
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

		this.config = config;
		this._mainLoop = null;

		this.state = ActuatorEngine_CONSTANTS.States.State_Config;

		this.CONSTANTS = ActuatorEngine_CONSTANTS;

		this.eventEmitter = new EventEmitter();
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

module.exports = ActuatorEngine;
//# sourceMappingURL=ActuatorEngine.js.map
