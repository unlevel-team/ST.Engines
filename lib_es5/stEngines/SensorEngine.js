"use strict";

/**
 * SensorEngine
 * 
 * Generic process for a Sensor
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
 * SensorEngine CONSTANTS
 * 
 * @memberof st.ngn
 * 
 */
var SensorEngine_CONSTANTS = {

	"States": {
		"SEstate_Config": "config",
		"SEstate_Ready": "ready",
		"SEstate_Working": "working",
		"SEstate_Stop": "stop"
	},

	"Events": {
		"MainLoop_Tick": "Main Loop",
		"MainLoop_Stop": "Main Loop Stop",

		"SensorEngine_Start": "SE start",
		"SensorEngine_Stop": "SE stop",

		"SensorData": "Sensor Data"

	}

};

/**
 * SensorEngine_Start event.
 *
 * @event st.ngn.SensorEngine#SensorEngine_Start
 * @memberof st.ngn.SensorEngine
 * @type {object}
 * @property {st.ngn.SensorEngine} engine - The engine that is started.
 */

/**
 * SensorEngine_Stop event.
 *
 * @event st.ngn.SensorEngine#SensorEngine_Stop
 * @memberof st.ngn.SensorEngine
 * @type {object}
 * @property {st.ngn.SensorEngine} engine - The engine that is stopped.
 */

/**
 * Sensor engine library
 * 
 * @namespace SensorEngine_Lib
 * @memberof st.ngn
 */
var SensorEngine_Lib = {

	/**
  * Initialize sensor engine
  * 
  * @function
  * @memberof st.ngn.SensorEngine_Lib
  * 
  * @param {st.ngn.Sensor} sensor - Sensor object
  * 
  */
	"initialze_SensorEngine": function initialze_SensorEngine(sensor) {

		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Sensor Engine URL
		if (sensor.config.options.sensorEngineURL !== undefined && sensor.config.options.sensorEngineURL !== null) {

			sensor._sensorEngine = null;

			try {
				sensor._sensorEngine = require(sensor.config.options.sensorEngineURL);
				sensor.sensorEngine = new sensor._sensorEngine(sensor.config);
				sensor.sensorEngine.initialize();
			} catch (e) {
				// TODO: handle exception
				console.log('<EEE> SensorEngine_Lib.initialze_SensorEngine'); // TODO REMOVE DEBUG LOG
				console.log(e); // TODO REMOVE DEBUG LOG
				console.log(sensor.config); // TODO REMOVE DEBUG LOG
			}
		}
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~

		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Sensor Engine URI (stURI format)
		if (sensor.config.options.sensorEngineURI !== undefined && sensor.config.options.sensorEngineURI !== null) {

			var net_Services = require("st.network").get_Services();
			var net_NETServices = net_Services.get_NetServices();
			var NETservices_Lib = net_NETServices.NETservices_Lib;

			try {

				var stURI_DATA = NETservices_Lib.parse_stURI(sensor.config.options.sensorEngineURI);

				console.log('<~i~> SensorEngine_Lib.initialze_SensorEngine'); // TODO REMOVE DEBUG LOG
				console.log(' <~> NETservices_Lib.parse_stURI'); // TODO REMOVE DEBUG LOG
				console.log(stURI_DATA); // TODO REMOVE DEBUG LOG
			} catch (e) {
				// TODO: handle exception

				console.log('<EEE> SensorEngine_Lib.initialze_SensorEngine'); // TODO REMOVE DEBUG LOG
				console.log(' <~> NETservices_Lib.parse_stURI'); // TODO REMOVE DEBUG LOG

				console.log(e); // TODO REMOVE DEBUG LOG
				console.log(sensor.config.options.sensorEngineURI); // TODO REMOVE DEBUG LOG
			}
		}
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
	}

};

/**
 * Sensor Engine
 * 
 * @class
 * @memberof st.ngn
 * 
 * @property {object} config - Configuration.
 * @property {object} _mainLoop - Main loop reference object.
 * @property {String} state - State.
 * @property {object} eventEmitter - Object for emit events.
 * 
 * 
 */

var SensorEngine = function () {

	/**
  * @constructs SensorEngine
  * 
  * @param {object} config Configuration object
  */

	function SensorEngine(config) {
		_classCallCheck(this, SensorEngine);

		this.config = config;
		this._mainLoop = null;

		this.CONSTANTS = SensorEngine_CONSTANTS;

		this.state = this.CONSTANTS.States.SEstate_Config;

		this.eventEmitter = new EventEmitter();
	}

	/**
  * Initialize
  */


	_createClass(SensorEngine, [{
		key: "initialize",
		value: function initialize() {

			var sensorEngine = this;

			// Map event MainLoop_Stop
			sensorEngine.eventEmitter.on(sensorEngine.CONSTANTS.Events.MainLoop_Stop, function () {
				clearInterval(sensorEngine._mainLoop);
				sensorEngine.state = sensorEngine.CONSTANTS.States.SEstate_Ready;
			});

			sensorEngine.state = sensorEngine.CONSTANTS.States.SEstate_Ready;
		}

		/**
   * Main loop
   */

	}, {
		key: "mainLoop",
		value: function mainLoop() {

			var sensorEngine = this;

			if (sensorEngine.state !== sensorEngine.CONSTANTS.States.SEstate_Ready) {
				throw "Bad state";
			}

			sensorEngine.state = sensorEngine.CONSTANTS.States.SEstate_Working;

			sensorEngine._mainLoop = setInterval(function () {
				if (sensorEngine.state === sensorEngine.CONSTANTS.States.SEstate_Working) {

					// Emit event MainLoop_Tick
					sensorEngine.eventEmitter.emit(sensorEngine.CONSTANTS.Events.MainLoop_Tick);
				} else {

					// Emit event MainLoop_Stop
					sensorEngine.eventEmitter.emit(sensorEngine.CONSTANTS.Events.MainLoop_Stop);
				}
			}, sensorEngine.config.loopTime);
		}

		/**
   * Stop main loop
   * 
   * @fires st.ngn.SensorEngine#SensorEngine_Stop
   */

	}, {
		key: "stopMainLoop",
		value: function stopMainLoop() {
			var sensorEngine = this;
			sensorEngine.eventEmitter.emit(sensorEngine.CONSTANTS.Events.MainLoop_Stop); // Emit event MainLoop_Stop
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

	return SensorEngine;
}();

var _lib = {
	"SensorEngine": SensorEngine,
	"SensorEngine_Lib": SensorEngine_Lib

};

module.exports = _lib;
//# sourceMappingURL=SensorEngine.js.map
