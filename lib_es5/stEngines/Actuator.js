"use strict";

/**
 * Actuator
 * 
 * Generic object for an Actuator
 * 
 * ... the actuator process is manager by the ActutatorEngine
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
 * Import ActuatorEngine library
 * @ignore
 */
var ActuatorEngine_Lib = require('./ActuatorEngine.js').ActuatorEngine_Lib;

/**
 * Actuator CONSTANTS
 * 
 * @memberof st.ngn
 * 
 */
var Actuator_CONSTANTS = {

	"Events": {
		"ActuatorOptionsUpdated": "Actuator Options Updated"
	}

};

/**
 * Actuator
 * 
 * @class
 * @memberof st.ngn
 * 
 * @property {boolean} enabled - Enabled flag.
 * @property {object} config - Configuration.
 * @property {object} eventEmitter - Object for emit events.
 * @property {object} actuatorEngine - Actuator engine.
 * 
 */

var Actuator = function () {

	/**
  * @constructs Actuator
  * 
  * @param {object} config Configuration object
  */

	function Actuator(config) {
		_classCallCheck(this, Actuator);

		var _act = this;

		_act.enabled = false;
		_act.config = config;
		_act.CONSTANTS = Actuator_CONSTANTS;
		_act.eventEmitter = new EventEmitter();
		_act.actuatorEngine = null;
	}

	/**
  * Initialize Actuator
  */


	_createClass(Actuator, [{
		key: 'initialize',
		value: function initialize() {

			var _act = this;
			var _config = _act.config;
			var _configOptions = _config.options;

			if (_config.enabled === true) {
				_act.enabled = true;
			}

			// Only when is enabled
			if (_act.enabled !== true) {
				return;
			}

			// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
			// Actuator Engine URL or stIRI

			if (_configOptions.actuatorEngineURL !== undefined && _configOptions.actuatorEngineURL !== null || _configOptions.engineURI !== undefined) {

				ActuatorEngine_Lib.initialze_ActuatorEngine(_act);
			}
			// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		}

		/**
   * Returns Actuator options
   * 
   * also includes the actuator engine options
   * 
   * @returns {object} Actuator options
   */

	}, {
		key: 'getOptions',
		value: function getOptions() {

			var _act = this;
			var _config = _act.config;
			var _options = _config.options;

			var actOptions = {
				"loopTime": _config.loopTime,
				"engineURI": _options.engineURI,
				"engineURL": _options.engineURL,
				'engineOptions': null
			};

			if (_act.actuatorEngine !== null) {
				// Get engine options in synchro mode...
				actOptions.engineOptions = _act.actuatorEngine.getOptions();
			}

			return actOptions;
		}

		/**
   * Set actuator options
   * 
   * also includes the actuator engine options
   * 
   * @param {object} options Options object
   */

	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			var _act = this;

			if (_act.actuatorEngine && _act.actuatorEngine.state === _act.actuatorEngine.CONSTANTS.States.Working) {
				throw "Bad actuator state.";
			}

			if (options.loopTime) {
				_act.config.loopTime = options.loopTime;
			}

			if (options.engineOptions) {

				// Set engine options in synchro mode...

				//_act.actuatorEngine.setOptions(options.engineOptions);

				_act.actuatorEngine.setOptions({
					'ngnInterface': _act.actuatorEngine,
					'ngnOptions': options.engineOptions,
					'bngnOptions': options
				});
			}

			// Emit event 'ActuatorOptionsUpdated'
			_act.eventEmitter.emit(_act.CONSTANTS.Events.ActuatorOptionsUpdated, { "actuator": _act });
		}
	}]);

	return Actuator;
}();

module.exports = Actuator;
//# sourceMappingURL=Actuator.js.map
