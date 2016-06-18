"use strict";

/**
 * Actuator
 * 
 * Generic object for an Actuator
 * 
 * ... the actuator process is manager by the ActutatorEngine
 * 
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = require('events').EventEmitter;

/**
 * Actuator CONSTANTS
 */
var Actuator_CONSTANTS = {

	"Events": {
		"ActuatorOptionsUpdated": "Actuator Options Updated"
	}

};

/**
 * Actuator
 */

var Actuator = function () {
	function Actuator(config) {
		_classCallCheck(this, Actuator);

		this.config = config;
		this.CONSTANTS = Actuator_CONSTANTS;
		this.eventEmitter = new EventEmitter();
		this.actuatorEngine = null;
	}

	_createClass(Actuator, [{
		key: "initialize",
		value: function initialize() {

			var act = this;

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

		/**
   * Returns Actuator options
   * 
   * also includes the actuator engine options
   * 
   */

	}, {
		key: "getOptions",
		value: function getOptions() {

			var act = this;

			var actOptions = {
				"loopTime": act.config.loopTime,
				"actuatorEngineURL": act.config.options.actuatorEngineURL

			};

			if (act.actuatorEngine !== null) {
				actOptions.engineOptions = act.actuatorEngine.getOptions();
			}

			return actOptions;
		}

		/**
   * Set actuator options
   * 
   * also includes the actuator engine options
   */

	}, {
		key: "setOptions",
		value: function setOptions(options) {

			var act = this;

			if (act.actuatorEngine && act.actuatorEngine.state === act.actuatorEngine.CONSTANTS.States.State_Working) {
				throw "Bad actuator state.";
			}

			if (options.loopTime) {
				act.config.loopTime = options.loopTime;
			}

			if (options.engineOptions) {
				act.actuatorEngine.setOptions(options.engineOptions);
			}

			act.eventEmitter.emit(act.CONSTANTS.Events.ActuatorOptionsUpdated, { "actuator": act });
		}
	}]);

	return Actuator;
}();

module.exports = Actuator;
//# sourceMappingURL=Actuator.js.map