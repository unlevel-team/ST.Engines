"use strict";

/**
 * Actuator
 * 
 * Generic object for a Sensor
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
 * Import SensorEngine library
 * @ignore
 */
var SensorEngine_Lib = require('./SensorEngine.js').SensorEngine_Lib;

/**
 * Sensor constants
 * 
 * @memberof st.ngn
 */
var Sensor_CONSTANTS = {

	"Events": {
		"SensorOptionsUpdated": "Sensor Options Updated"
	}
};

/**
 * Sensor
 * 
 * @class
 * @memberof st.ngn
 * 
 * @property {boolean} enabled - Enabled flag.
 * @property {object} config - Configuration.
 * @property {object} eventEmitter - Object for emit events.
 * @property {object} sensorEngine - Sensor engine.
 * 
 */

var Sensor = function () {

	/**
  * @constructs Sensor
  * @param {object} config Configuration object
  */

	function Sensor(config) {
		_classCallCheck(this, Sensor);

		var _sensor = this;

		_sensor.enabled = false;
		_sensor.config = config;
		_sensor.CONSTANTS = Sensor_CONSTANTS;
		_sensor.eventEmitter = new EventEmitter();
		_sensor.sensorEngine = null;
	}

	/**
  * Initialize Sensor
  */


	_createClass(Sensor, [{
		key: 'initialize',
		value: function initialize() {

			var _sensor = this;
			var _config = _sensor.config;
			var _configOptions = _config.options;

			if (_config.enabled === true) {
				_sensor.enabled = true;
			}

			// Only when is enabled
			if (_sensor.enabled !== true) {
				return;
			}

			// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
			// Sensor Engine URL
			if (_configOptions.sensorEngineURL !== undefined && _configOptions.sensorEngineURL !== null || _configOptions.engineURI !== undefined) {

				SensorEngine_Lib.initialze_SensorEngine(_sensor);
			}
			// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		}

		/**
   * Get sensor options
   * 
   * @returns {object} Sensor options
   */

	}, {
		key: 'getOptions',
		value: function getOptions() {

			var _sensor = this;
			var _config = _sensor.config;
			var _options = _config.options;

			var _sensorOptions = {
				"loopTime": _config.loopTime,
				"engineURI": _options.engineURI,
				"engineURL": _options.engineURL,
				'engineOptions': null
			};

			if (_sensor.sensorEngine !== null) {
				// Get engine options in synchro mode...
				_sensorOptions.engineOptions = _sensor.sensorEngine.getOptions();
			}

			return _sensorOptions;
		}

		/**
   * Set sensor options
   * 
   * @param {object} options - Options object
   */

	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			var _sensor = this;

			if (_sensor.sensorEngine !== undefined && _sensor.sensorEngine.state === _sensor.sensorEngine.CONSTANTS.States.Working) {
				throw "Bad sensor state.";
			}

			if (options.loopTime !== undefined) {
				_sensor.config.loopTime = options.loopTime;
			}

			if (options.engineOptions !== undefined) {

				// Set engine options in synchro mode...

				//_sensor.sensorEngine.setOptions(options.engineOptions);

				_sensor.sensorEngine.setOptions({
					'ngnInterface': _sensor.sensorEngine,
					'ngnOptions': options.engineOptions,
					'bngnOptions': options
				});
			}

			// Emit event 'SensorOptionsUpdated'
			_sensor.eventEmitter.emit(_sensor.CONSTANTS.Events.SensorOptionsUpdated, { "sensor": _sensor });
		}
	}]);

	return Sensor;
}();

module.exports = Sensor;
//# sourceMappingURL=Sensor.js.map
