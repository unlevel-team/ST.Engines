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
 * Actuator CONSTANTS
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

		this.config = config;
		this.CONSTANTS = Actuator_CONSTANTS;
		this.eventEmitter = new EventEmitter();
		this.actuatorEngine = null;
	}

	/**
  * Initialize Actuator
  */


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
   * @returns {object} Actuator options
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
   * 
   * @param {object} options Options object
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
 * SensorEngine_Start event.
 *
 * @event ActuatorEngine#ActuatorEngine_Start
 * @type {object}
 * @property {object} engine - The engine that is started.
 */

/**
 * SensorEngine_Stop event.
 *
 * @event ActuatorEngine#ActuatorEngine_Stop
 * @type {object}
 * @property {object} engine - The engine that is stopped.
 */

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

"use strict";

/**
 * SomeThings Engines System library 
 *  
 * Provides a system with server and node roles...
 * 
 */

/**
 * Engines system constants
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EnginesSystem_CONSTANTS = {

	"Config": {

		"Role_Server": "Server",
		"Role_Node": "Node"

	}

};

/**
 * EnginesSystem
 * 
 * @class
 * @property {object} config - Configuration.
 * 
 */

var EnginesSystem = function () {

	/**
  * @constructs EnginesSystem
  * 
  * @param {object} config Configuration object
  */

	function EnginesSystem(config) {
		_classCallCheck(this, EnginesSystem);

		//		let ngSYS = this;

		this.CONSTANTS = EnginesSystem_CONSTANTS;
		this.config = config;
	}

	/**
  * Initialize
  */


	_createClass(EnginesSystem, [{
		key: "initialize",
		value: function initialize() {

			var ngSYS = this;

			if (ngSYS.config === undefined) {
				throw "Configuration is required.";
			}
		}
	}]);

	return EnginesSystem;
}();

/**
 * Get EnginesSystem
 * 
 * @returns EnginesSystem
 */


function getEnginesSystem(config) {

	var enginesSYS_Hero = require('./enginesSYS_Hero/enginesSYS_Hero.js');
	//	let _getEnginesSystem = enginesSYS_Hero.getEnginesSystem;
	var ngSYS = enginesSYS_Hero.getEnginesSystem(config);

	return ngSYS;
}

var ngsystem_Lib = {
	"EnginesSystem_CONSTANTS": EnginesSystem_CONSTANTS,
	"EnginesSystem": EnginesSystem,

	"getEnginesSystem": getEnginesSystem
};

module.exports = ngsystem_Lib;
//# sourceMappingURL=EnginesSystem.js.map

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
 * Import SensorEngine
 * @ignore
 */
var SensorEngine_Lib = require('./SensorEngine.js').SensorEngine_Lib;

/**
 * Sensor constants
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

		this.config = config;
		this.CONSTANTS = Sensor_CONSTANTS;
		this.eventEmitter = new EventEmitter();
		this.sensorEngine = null;
	}

	/**
  * Initialize Sensor
  */


	_createClass(Sensor, [{
		key: 'initialize',
		value: function initialize() {

			var sensor = this;

			// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
			// Sensor Engine URL
			if (sensor.config.options.sensorEngineURL !== undefined && sensor.config.options.sensorEngineURL !== null) {

				SensorEngine_Lib.initialze_SensorEngine(sensor);

				//			sensor._sensorEngine = null;
				//			
				//			try {
				//				sensor._sensorEngine = require(sensor.config.options.sensorEngineURL);
				//				sensor.sensorEngine = new sensor._sensorEngine(sensor.config);
				//				sensor.sensorEngine.initialize();
				//				
				//			} catch (e) {
				//				// TODO: handle exception
				//				  console.log('<EEE> Sensor.initialize');	// TODO REMOVE DEBUG LOG
				//				  console.log(e);	// TODO REMOVE DEBUG LOG
				//				  console.log(sensor.config);	// TODO REMOVE DEBUG LOG
				//
				//			}
			}
			// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~

			if (sensor.config.options.sensorEngine !== undefined && sensor.config.options.sensorEngine !== null) {}
		}

		/**
   * Get sensor options
   * 
   * @returns {object} Actuator options
   */

	}, {
		key: 'getOptions',
		value: function getOptions() {

			var sensor = this;

			var sensorOptions = {
				"loopTime": sensor.config.loopTime,
				"sensorEngineURL": sensor.config.options.sensorEngineURL

			};

			if (sensor.sensorEngine !== null) {
				sensorOptions.engineOptions = sensor.sensorEngine.getOptions();
			}

			return sensorOptions;
		}

		/**
   * Set sensor options
   * 
   * @param {object} options Options object
   */

	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			var sensor = this;

			if (sensor.sensorEngine !== undefined && sensor.sensorEngine.state === sensor.sensorEngine.CONSTANTS.States.SEstate_Working) {
				throw "Bad sensor state.";
			}

			if (options.loopTime) {
				sensor.config.loopTime = options.loopTime;
			}

			if (options.engineOptions) {
				sensor.sensorEngine.setOptions(options.engineOptions);
			}

			// Emit event SensorOptionsUpdated
			sensor.eventEmitter.emit(sensor.CONSTANTS.Events.SensorOptionsUpdated, { "sensor": sensor });
		}
	}]);

	return Sensor;
}();

module.exports = Sensor;
//# sourceMappingURL=Sensor.js.map

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
 * @event SensorEngine#SensorEngine_Start
 * @type {object}
 * @property {object} engine - The engine that is started.
 */

/**
 * SensorEngine_Stop event.
 *
 * @event SensorEngine#SensorEngine_Stop
 * @type {object}
 * @property {object} engine - The engine that is stopped.
 */

/**
 * Sensor engine library
 * 
 * @namespace SensorEngine_Lib
 */
var SensorEngine_Lib = {

	/**
  * Initialize sensor engine
  * 
  * @function
  * 
  * @param {Sensor} sensor - Sensor object
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
	}

};

/**
 * Sensor Engine
 * 
 * @class
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
   * @fires SensorEngine#SensorEngine_Stop
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

"use strict";

/**
 * SomeThings Engines library
 * 
 * @ignore
 */

/**
 * Import Sensor
 * @ignore
 */

var Sensor = require('./Sensor.js');

/**
 * Import SensorEngine
 * @ignore
 */
var SensorEngine = require('./SensorEngine.js').SensorEngine;

/**
 * Import Actuator
 * @ignore
 */
var Actuator = require('./Actuator.js');

/**
 * Import ActuatorEngine
 * @ignore
 */
var ActuatorEngine = require('./ActuatorEngine.js');

/**
 * Import EnginesSystem_Lib
 * @ignore
 */
var EnginesSystem_Lib = require('./EnginesSystem');

var stNGN_Lib = {

  "Sensor": Sensor,
  "SensorEngine": SensorEngine,

  "Actuator": Actuator,
  "ActuatorEngine": ActuatorEngine,

  "getEnginesSystem": EnginesSystem_Lib.getEnginesSystem

};

module.exports = stNGN_Lib;
//# sourceMappingURL=STEngines.js.map

"use strict";

/*
 SomeThings Engines System library
 
 version Hero

*/

/**
 * Import Sensor
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sensor = require('../Sensor.js');

/**
 * Import Actuator
 * @ignore
 */
var Actuator = require('../Actuator.js');

/**
 * Import EnginesSystem_CONSTANTS
 * @ignore
 */
var EnginesSystem_CONSTANTS = require('../EnginesSystem.js').EnginesSystem_CONSTANTS;

/**
 * Import EnginesSystem
 * @ignore
 */
var EnginesSystem = require('../EnginesSystem.js').EnginesSystem;

/**
 * Engines system constants
 * 
 * <pre>
 * version Hero
 * 
 * </pre>
 */
var NGSystem_Hero_CONSTANTS = {

	"Config": {
		"Version": "Hero",

		"type_Vsensor": "vsensor",
		"type_Vactuator": "vactuator",
		"type_Cylonjs": "cylonjs"

	}
};

/**
 * VActuator
 * 
 * @class
 * @implements Actuator
 */

var VActuator = function (_Actuator) {
	_inherits(VActuator, _Actuator);

	/**
  * @constructs VActuator
  * @param {object} config - Configuration object
  */

	function VActuator(config) {
		_classCallCheck(this, VActuator);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(VActuator).call(this, config));
	}

	return VActuator;
}(Actuator);

/**
 * CylActuator
 * 
 * @class
 * @implements Actuator
 */


var CylActuator = function (_Actuator2) {
	_inherits(CylActuator, _Actuator2);

	/**
  * @constructs CylActuator
  * @param {object} config - Configuration object
  */

	function CylActuator(config) {
		_classCallCheck(this, CylActuator);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CylActuator).call(this, config));
	}

	return CylActuator;
}(Actuator);

/**
 * VSensor
 * 
 * @class
 * @implements Sensor
 */


var VSensor = function (_Sensor) {
	_inherits(VSensor, _Sensor);

	/**
  * @constructs VSensor
  * @param {object} config - Configuration object
  */

	function VSensor(config) {
		_classCallCheck(this, VSensor);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(VSensor).call(this, config));
	}

	return VSensor;
}(Sensor);

/**
 * CylSensor
 * 
 * @class
 * @implements Sensor
 */


var CylSensor = function (_Sensor2) {
	_inherits(CylSensor, _Sensor2);

	/**
  * @constructs CylSensor
  * @param {object} config - Configuration object
  */

	function CylSensor(config) {
		_classCallCheck(this, CylSensor);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CylSensor).call(this, config));
	}

	return CylSensor;
}(Sensor);

/**
 * NGSystem_Hero 
 * 
 * @class
 * @implements EnginesSystem
 */


var NGSystem_Hero = function (_EnginesSystem) {
	_inherits(NGSystem_Hero, _EnginesSystem);

	/**
  * @constructs NGSystem_Hero
  * @param {object} config - Configuration object.
  */

	function NGSystem_Hero(config) {
		_classCallCheck(this, NGSystem_Hero);

		var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(NGSystem_Hero).call(this, config));

		var ngSYS = _this5;

		ngSYS.HeroCONSTANTS = NGSystem_Hero_CONSTANTS;
		ngSYS.CONSTANTS.Config.Version = NGSystem_Hero_CONSTANTS.Config.Version;

		ngSYS.sensorsManager = null;
		ngSYS.sensorsServices = null;

		ngSYS.actuatorsManager = null;
		ngSYS.actuatorsServices = null;

		ngSYS.controlChannel = null;

		return _this5;
	}

	/**
  * Initialize
  */


	_createClass(NGSystem_Hero, [{
		key: 'initialize',
		value: function initialize() {

			_get(Object.getPrototypeOf(NGSystem_Hero.prototype), 'initialize', this).call(this);

			var ngSYS = this;
			var config = ngSYS.config;

			if (config.controlChannel === undefined || config.controlChannel === null) {
				throw "Control channel is required.";
			}

			ngSYS.controlChannel = config.controlChannel;
		}
	}]);

	return NGSystem_Hero;
}(EnginesSystem);

/**
 * Get sensor
 * 
 * @param config
 * @returns {(Sensor|VSensor|CylSensor)}
 */


function getSensor(config) {

	var sensor = null;

	switch (config.type) {

		case EnginesSystem_CONSTANTS.Config.type_Vsensor:
			sensor = new VSensor(config);
			break;

		case EnginesSystem_CONSTANTS.Config.type_Cylonjs:
			sensor = new CylSensor(config);
			break;

		default:
			sensor = new Sensor(config);
			break;
	}

	return sensor;
}

/**
 * Get actuator
 * 
 * @param config
 * @returns {(Actuator|VActuator|CylActuator)}
 */
function getActuator(config) {

	var actuator = null;

	switch (config.type) {

		case NGSystem_Hero_CONSTANTS.Config.type_Vactuator:
			actuator = new VActuator(config);
			break;

		case NGSystem_Hero_CONSTANTS.Config.type_Cylonjs:
			actuator = new CylActuator(config);
			break;

		default:
			actuator = new Actuator(config);
			break;
	}

	return actuator;
}

/**
 * Get EnginesSystem
 * 
 * @param {object} config - Configuration object
 * @returns {EnginesSystem}
 * 
 */
var getEnginesSystem = function getEnginesSystem(config) {

	if (config.role === undefined) {
		throw "role is required.";
	}

	var ngSystem = null;

	switch (config.role) {

		case EnginesSystem_CONSTANTS.Config.Role_Node:

			var NGSYS_Hero_Node = require('./ngsysHero_Node.js');
			ngSystem = new NGSYS_Hero_Node(config);
			break;

		case EnginesSystem_CONSTANTS.Config.Role_Server:

			var NGSYS_Hero_Server = require('./ngsysHero_Server.js').NGSYS_Hero_Server;
			ngSystem = new NGSYS_Hero_Server(config);
			break;

		default:
			throw "Bad Role.";
		//			break;
	}

	return ngSystem;
};

var ngysHero_Lib = {
	"NGSystem_Hero_CONSTANTS": NGSystem_Hero_CONSTANTS,
	"NGSystem_Hero": NGSystem_Hero,

	"getSensor": getSensor,
	"getActuator": getActuator,
	"getEnginesSystem": getEnginesSystem
};

module.exports = ngysHero_Lib;
//# sourceMappingURL=enginesSYS_Hero.js.map

"use strict";

/**
 * Engines System
 * for role Node
 * 
 * 
 * SomeThings Engines System library
 * version Hero
 */

/**
 * Import NGSystem_Hero_Lib
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NGSystem_Hero_Lib = require('./enginesSYS_Hero.js');

/**
 * Import NGSystem_Hero_CONSTANTS
 * @ignore
 */
var NGSystem_Hero_CONSTANTS = NGSystem_Hero_Lib.NGSystem_Hero_CONSTANTS;

/**
 * Import NGSystem_Hero
 * @ignore
 */
var NGSystem_Hero = NGSystem_Hero_Lib.NGSystem_Hero;

/**
 * Import SensorsManager
 * @ignore
 */
var SensorsManager = require('../services/SensorsManager.js').SensorsManager;

/**
 * Import NGSYS_Hero_Node_SensorsSRV
 * @ignore
 */
var NGSYS_Hero_Node_SensorsSRV = require('./ngsysHero_NodeSensorsSRV.js').NGSYS_Hero_Node_SensorsSRV;

/**
 * Import ActuatorsManager
 * @ignore
 */
var ActuatorsManager = require('../services/ActuatorsManager.js').ActuatorsManager;

/**
 * Import NGSYS_Hero_Node_ActuatorsSRV
 * @ignore
 */
var NGSYS_Hero_Node_ActuatorsSRV = require('./ngsysHero_NodeActuatorsSRV.js').NGSYS_Hero_Node_ActuatorsSRV;

/**
 * NGSYS_Hero_Node_SensorsMNG
 * 
 * <pre>
 * Sensors manager
 * for role Node
 * 
 * SomeThings Engines System library
 * version Hero
 * </pre>
 * 
 * @class
 * @implements SensorsManager
 * 
 */

var NGSYS_Hero_Node_SensorsMNG = function (_SensorsManager) {
	_inherits(NGSYS_Hero_Node_SensorsMNG, _SensorsManager);

	/**
  * @constructs NGSYS_Hero_Node_SensorsMNG
  */

	function NGSYS_Hero_Node_SensorsMNG() {
		_classCallCheck(this, NGSYS_Hero_Node_SensorsMNG);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Node_SensorsMNG).call(this));
	}

	/**
  * Add sensor
  * 
  * @param {Sensor} sensor - Sensor object
  */


	_createClass(NGSYS_Hero_Node_SensorsMNG, [{
		key: 'addSensor',
		value: function addSensor(sensor) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_SensorsMNG.prototype), 'addSensor', this).call(this, sensor);

			var smng = this;

			if (sensor.config.type === NGSystem_Hero_CONSTANTS.Config.type_Cylonjs && smng._cylonJS === undefined) {

				// Load CylonJS library
				smng._cylonJS = require('cylon');
			}
		}

		/**
   * Turn off sensors
   */

	}, {
		key: 'turnOffSensors',
		value: function turnOffSensors() {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_SensorsMNG.prototype), 'turnOffSensors', this).call(this);

			var smng = this;

			if (smng._cylonJS !== undefined) {
				smng._cylonJS.halt();
			}
		}
	}]);

	return NGSYS_Hero_Node_SensorsMNG;
}(SensorsManager);

/**
 * NGSYS_Hero_Node_ActuatorsMNG
 * 
 * <pre>
 * Actuators manager
 * for role Node
 * 
 * SomeThings Engines System library
 * version Hero
 * </pre>
 * 
 * @class
 * @implements ActuatorsManager
 * 
 */


var NGSYS_Hero_Node_ActuatorsMNG = function (_ActuatorsManager) {
	_inherits(NGSYS_Hero_Node_ActuatorsMNG, _ActuatorsManager);

	/**
  * @constructs NGSYS_Hero_Node_ActuatorsMNG
  */

	function NGSYS_Hero_Node_ActuatorsMNG() {
		_classCallCheck(this, NGSYS_Hero_Node_ActuatorsMNG);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsMNG).call(this));
	}

	/**
  * Adds actuator
  * 
  * @param {Actuator} act - Actuator object
  */


	_createClass(NGSYS_Hero_Node_ActuatorsMNG, [{
		key: 'addActuator',
		value: function addActuator(act) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsMNG.prototype), 'addActuator', this).call(this, act);

			var amng = this;

			if (act.config.type === NGSystem_Hero_CONSTANTS.Config.type_Cylonjs && amng._cylonJS === undefined) {

				// Load CylonJS library
				amng._cylonJS = require('cylon');
			}
		}

		/**
   * Turn off actuators
   */

	}, {
		key: 'turnOffActuators',
		value: function turnOffActuators() {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsMNG.prototype), 'turnOffActuators', this).call(this);

			var amng = this;

			if (amng._cylonJS !== undefined) {
				amng._cylonJS.halt();
			}
		}
	}]);

	return NGSYS_Hero_Node_ActuatorsMNG;
}(ActuatorsManager);

/**
 * NGSYS_Hero_Node
 * 
 * <pre>
 * Engines System
 * for role Node
 * 
 * SomeThings Engines System library
 * version Hero
 * </pre>
 * 
 * 
 * @class
 * @implements NGSystem_Hero
 * 
 */


var NGSYS_Hero_Node = function (_NGSystem_Hero) {
	_inherits(NGSYS_Hero_Node, _NGSystem_Hero);

	/**
  * @constructs NGSYS_Hero_Node
  * 
  * @param {object} config - Configuration object
  */

	function NGSYS_Hero_Node(config) {
		_classCallCheck(this, NGSYS_Hero_Node);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Node).call(this, config));
	}

	/**
  * Initialize
  */


	_createClass(NGSYS_Hero_Node, [{
		key: 'initialize',
		value: function initialize() {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node.prototype), 'initialize', this).call(this);

			var ngSYS = this;
			var config = ngSYS.config;

			if (config.sensors === undefined) {
				throw "Sensors configuration is required.";
			}

			if (config.actuators === undefined) {
				throw "Actuators configuration is required.";
			}

			try {
				ngSYS._init_Sensors();
			} catch (e) {
				// TODO: handle exception
				throw "Cannot initialize Sensors. " + e;
			}

			try {
				ngSYS._init_Actuators();
			} catch (e) {
				// TODO: handle exception
				throw "Cannot initialize Actuators. " + e;
			}
		}

		/**
   * Initialize sensors
   */

	}, {
		key: '_init_Sensors',
		value: function _init_Sensors() {

			var ngSYS = this;
			var config = ngSYS.config;

			ngSYS.sensorsManager = new NGSYS_Hero_Node_SensorsMNG();

			config.sensors.forEach(function (_sns, _i) {
				var sensor = NGSystem_Hero_Lib.getSensor(_sns);

				try {
					sensor.initialize();
					ngSYS.sensorsManager.addSensor(sensor);
				} catch (e) {
					// TODO: handle exception
					throw "Cannot add sensor. " + e;
				}
			});

			ngSYS.sensorsServices = new NGSYS_Hero_Node_SensorsSRV(ngSYS.sensorsManager, ngSYS.controlChannel);

			try {
				ngSYS.sensorsServices.initialize();
			} catch (e) {
				// TODO: handle exception
				throw "Cannot initialize sensors services. " + e;
			}
		}

		/**
   * Initialize actuators
   */

	}, {
		key: '_init_Actuators',
		value: function _init_Actuators() {

			var ngSYS = this;
			var config = ngSYS.config;

			ngSYS.actuatorsManager = new NGSYS_Hero_Node_ActuatorsMNG();

			config.actuators.forEach(function (_act, _i) {
				var actuator = NGSystem_Hero_Lib.getActuator(_act);

				try {
					actuator.initialize();
					ngSYS.actuatorsManager.addActuator(actuator);
				} catch (e) {
					// TODO: handle exception
					throw "Cannot add actuator. " + e;
				}
			});

			ngSYS.actuatorsServices = new NGSYS_Hero_Node_ActuatorsSRV(ngSYS.actuatorsManager, ngSYS.controlChannel);

			try {
				ngSYS.actuatorsServices.initialize();
			} catch (e) {
				// TODO: handle exception
				throw "Cannot initialize actuators services. " + e;
			}
		}
	}]);

	return NGSYS_Hero_Node;
}(NGSystem_Hero);

var ngysHeroNode_Lib = {
	"NGSYS_Hero_Node": NGSYS_Hero_Node
};

module.exports = NGSYS_Hero_Node;
//# sourceMappingURL=ngsysHero_Node.js.map

"use strict";

/**
 * Actuators services
 * for Node role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

/**
 * Import ActuatorsServices
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActuatorsServices = require('../services/ActuatorsServices.js').ActuatorsServices;

/**
 * Actuators Services
 * 
 * <pre>
 * for role Node
 * 
 * version Hero
 * 
 * </pre>
 * 
 * @class
 * @implements ActuatorsServices
 * 
 */

var NGSYS_Hero_Node_ActuatorsSRV = function (_ActuatorsServices) {
	_inherits(NGSYS_Hero_Node_ActuatorsSRV, _ActuatorsServices);

	/**
  * @constructs NGSYS_Hero_Node_ActuatorsSRV
  * 
  * @param {ActuatorsManager} actuatorsManager - Actuators manager object
  * @param {object} controlChannel - Control channel object
  * 
  */

	function NGSYS_Hero_Node_ActuatorsSRV(actuatorsManager, controlChannel) {
		_classCallCheck(this, NGSYS_Hero_Node_ActuatorsSRV);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsSRV).call(this, actuatorsManager, controlChannel));
	}

	/**
  * Map control events
  * 
  * @param {ActuatorsManager} actuatorsManager - Actuators manager object
  */


	_createClass(NGSYS_Hero_Node_ActuatorsSRV, [{
		key: '_mapControlEvents',
		value: function _mapControlEvents(actuatorsManager) {

			var service = this;

			if (actuatorsManager === undefined) {
				actuatorsManager = service.actuatorsManager;
			}

			actuatorsManager.actuatorsList.forEach(function (actuator, _i) {
				service._mapActuatorControlEvents(actuator);
			});
		}

		/**
   * Map control events for actuators
   * 
   * @param {Actuator} actuator 
   */

	}, {
		key: '_mapActuatorControlEvents',
		value: function _mapActuatorControlEvents(actuator) {

			var service = this;

			var actuatorEngine = actuator.actuatorEngine;

			console.log('<*> NGSYS_Hero_Node._mapActuatorControlEvents'); // TODO REMOVE DEBUG LOG
			console.log(actuator);

			// Map event ActuatorOptionsUpdated
			actuator.eventEmitter.on(actuator.CONSTANTS.Events.ActuatorOptionsUpdated, function (data) {
				service._event_ActuatorOptionsUpdated(data, {
					"service": service
				});
			});

			if (actuatorEngine !== null) {

				// Map event ActuatorEngine_Start
				actuatorEngine.eventEmitter.on(actuatorEngine.CONSTANTS.Events.ActuatorEngine_Start, function (data) {
					service._event_ActuatorEngine_Start({
						"data": data,
						"actuator": actuator
					});
				});

				// Map event ActuatorEngine_Stop
				actuatorEngine.eventEmitter.on(actuatorEngine.CONSTANTS.Events.ActuatorEngine_Stop, function (data) {
					service._event_ActuatorEngine_Stop({
						"data": data,
						"actuator": actuator
					});
				});
			}
		}

		/**
   * Map control messages
   * 
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Node_ActuatorsSRV} [options.service] - Actuators Service object
   * 
   */

	}, {
		key: '_mapControlMessages',
		value: function _mapControlMessages(socket, options) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsSRV.prototype), '_mapControlMessages', this).call(this, socket, options);

			var service = this;
			if (options.service !== undefined) {
				service = options.service;
			}

			var amng = service.actuatorsManager;

			// Map message getActuatorsList
			socket.on(service.CONSTANTS.Messages.getActuatorsList, function (msg) {
				service._msg_getActuatorsList(msg, service);
			});

			// Map message getActuatorOptions
			socket.on(service.CONSTANTS.Messages.getActuatorOptions, function (msg) {
				service._msg_getActuatorOptions(msg, service);
			});

			// Map message setActuatorOptions
			socket.on(service.CONSTANTS.Messages.setActuatorOptions, function (msg) {
				service._msg_setActuatorOptions(msg, service);
			});

			// Map message StartActuator
			socket.on(service.CONSTANTS.Messages.StartActuator, function (msg) {
				service._msg_StartActuator(msg, service);
			});

			// Map message StopActuator
			socket.on(service.CONSTANTS.Messages.StopActuator, function (msg) {
				service._msg_StopActuator(msg, service);
			});

			// Map message TurnOffActuators
			socket.on(service.CONSTANTS.Messages.TurnOffActuators, function (msg) {
				service._msg_TurnOffActuators(msg, service);
			});
		}

		/**
   * Unmap control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Node_ActuatorsSRV} [options.service] - Actuators Service object
   *
   */

	}, {
		key: '_unmapControlMessages',
		value: function _unmapControlMessages(socket, options) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_ActuatorsSRV.prototype), '_unmapControlMessages', this).call(this, socket, options);

			var service = this;
			if (options.service !== undefined) {
				service = options.service;
			}

			//		socket.removeListener(service.CONSTANTS.Messages.getActuatorsList, service._msg_getActuatorsList);
			//		socket.removeListener(service.CONSTANTS.Messages.getActuatorOptions, service._msg_getActuatorOptions);
			//		socket.removeListener(service.CONSTANTS.Messages.setActuatorOptions, service._msg_setActuatorOptions);
			//		socket.removeListener(service.CONSTANTS.Messages.StartActuator, service._msg_StartActuator);
			//		socket.removeListener(service.CONSTANTS.Messages.StopActuator, service._msg_StopActuator);
			//		socket.removeListener(service.CONSTANTS.Messages.TurnOffActuators, service._msg_TurnOffActuators);

			socket.removeAllListeners(service.CONSTANTS.Messages.getActuatorsList);
			socket.removeAllListeners(service.CONSTANTS.Messages.getActuatorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.setActuatorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.StartActuator);
			socket.removeAllListeners(service.CONSTANTS.Messages.StopActuator);
			socket.removeAllListeners(service.CONSTANTS.Messages.TurnOffActuators);

			service._mapped = null;
		}

		/**
   * Event ActuatorOptionsUpdated
   * 	
   * @param {object} data - Data object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Node_ActuatorsSRV} [options.service] - Actuators Service object
   * 
   */

	}, {
		key: '_event_ActuatorOptionsUpdated',
		value: function _event_ActuatorOptionsUpdated(data, options) {

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var socket = service.controlChannel.socket;

			var actuator = data.actuator;

			// Emit message ActuatorOptionsUpdated
			socket.emit(service.CONSTANTS.Messages.ActuatorOptionsUpdated, {
				"actuatorID": actuator.config.id
			});
		}

		/**
   * Event ActuatorEngine_Start
   * 
   * @param {object} data - Data object
   * 
   */

	}, {
		key: '_event_ActuatorEngine_Start',
		value: function _event_ActuatorEngine_Start(data) {

			var service = this;
			var socket = service.controlChannel.socket;

			var actuator = data.actuator;

			// Emit message ActuatorStarted
			socket.emit(service.CONSTANTS.Messages.ActuatorStarted, {
				"actuatorID": actuator.config.id
			});
		}

		/**
   * Event ActuatorEngine_Stop
   * 
   * @param {object} data - Data object
   * 
   */

	}, {
		key: '_event_ActuatorEngine_Stop',
		value: function _event_ActuatorEngine_Stop(data) {

			var service = this;
			var socket = service.controlChannel.socket;

			var actuator = data.actuator;

			// Emit message ActuatorStarted
			socket.emit(service.CONSTANTS.Messages.ActuatorStopped, {
				"actuatorID": actuator.config.id
			});
		}

		/**
   * Message getActuatorsList
   */

	}, {
		key: '_msg_getActuatorsList',
		value: function _msg_getActuatorsList(msg, service) {

			if (service === undefined) {
				service = this;
			}
			var amng = service.actuatorsManager;
			var socket = service.controlChannel.socket;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorsList'); // TODO REMOVE DEBUG LOG

			var response = {};
			response.numActuators = amng.actuatorsList.length;
			response.actuators = [];

			amng.actuatorsList.forEach(function (act_, _i) {

				var actuator = {
					"actuatorID": act_.config.id,
					"type": act_.config.type,
					"state": act_.config.state
				};

				response.actuators.push(actuator);
			});

			// Emit message ActuatorsList
			socket.emit(service.CONSTANTS.Messages.ActuatorsList, response);
		}

		/**
   * Message getActuatorOptions
   */

	}, {
		key: '_msg_getActuatorOptions',
		value: function _msg_getActuatorOptions(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var amng = service.actuatorsManager;
			var socket = service.controlChannel.socket;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorOptions'); // TODO REMOVE DEBUG LO

			var actuatorID = msg.actuatorID;

			var response = {
				"actuatorID": actuatorID
			};

			try {

				var actuatorSearch = amng.getActuatorByID(actuatorID);
				if (actuatorSearch.STactuator === null) {
					throw "Actuator not found.";
				}

				var actuator = actuatorSearch.STactuator;

				response.options = actuator.getOptions();

				// Emit message ActuatorOptions
				socket.emit(service.CONSTANTS.Messages.ActuatorOptions, response);
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.getActuatorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message setActuatorOptions
   */

	}, {
		key: '_msg_setActuatorOptions',
		value: function _msg_setActuatorOptions(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var amng = service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.setActuatorOptions'); // TODO REMOVE DEBUG LO
			console.log(msg); // TODO REMOVE DEBUG LO

			var actuatorID = msg.actuatorID;
			var options = msg.options;

			var response = {
				"actuatorID": actuatorID
			};

			try {

				var actuatorSearch = amng.getActuatorByID(actuatorID);
				if (actuatorSearch.STactuator === null) {
					throw "Actuator not found.";
				}

				var actuator = actuatorSearch.STactuator;

				actuator.setOptions(options);
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.setActuatorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message StartActuator
   */

	}, {
		key: '_msg_StartActuator',
		value: function _msg_StartActuator(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var amng = service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.StartActuator'); // TODO REMOVE DEBUG LOG
			console.log(msg); // TODO REMOVE DEBUG LOG
			//		  console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				var _actuatorSearch = amng.getActuatorByID(msg.actuatorID);

				if (_actuatorSearch.STactuator !== null) {
					_actuatorSearch.STactuator.actuatorEngine.startEngine();
					response.result = "OK";
				} else {
					console.log("Not found!!!"); // TODO REMOVE DEBUG LOG
					throw "Actuator not found.";
				}
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.StartActuator ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}

			//			msg.result = response.result;
		}

		/**
   * Message StopActuator
   */

	}, {
		key: '_msg_StopActuator',
		value: function _msg_StopActuator(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var amng = service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.StopActuator'); // TODO REMOVE DEBUG LOG
			console.log(msg); // TODO REMOVE DEBUG LOG
			//		console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				var _actuatorSearch = amng.getActuatorByID(msg.actuatorID);

				if (_actuatorSearch.STactuator !== null) {
					_actuatorSearch.STactuator.actuatorEngine.stopEngine();
					response.result = "OK";
				} else {
					throw "Actuator not found.";
				}
			} catch (e) {

				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;
				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.StopActuator ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message TurnOffActuators
   */

	}, {
		key: '_msg_TurnOffActuators',
		value: function _msg_TurnOffActuators(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var amng = service.actuatorsManager;

			console.log('<*> NGSYS_Hero_Node_ActuatorsSRV.Messages.TurnOffActuators'); // TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				amng.turnOffActuators();
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_ActuatorsSRV.Messages.TurnOffActuators ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}
	}]);

	return NGSYS_Hero_Node_ActuatorsSRV;
}(ActuatorsServices);

var _Lib = {
	"NGSYS_Hero_Node_ActuatorsSRV": NGSYS_Hero_Node_ActuatorsSRV
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_NodeActuatorsSRV.js.map

"use strict";

/**
 * Sensors services
 * for Node role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

/**
 * Import SensorsServices
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SensorsServices = require('../services/SensorsServices.js').SensorsServices;

/**
 * Sensors Services
 * for role Node
 * 
 * version Hero
 * 
 * @class
 * @implements SensorsServices
 * 
 */

var NGSYS_Hero_Node_SensorsSRV = function (_SensorsServices) {
	_inherits(NGSYS_Hero_Node_SensorsSRV, _SensorsServices);

	/**
  * 
  * @constructs NGSYS_Hero_Node_SensorsSRV
  * 
  * @param {SensorsManager} sensorsManager - Sensors manager object
  * @param {object} controlChannel - Control chnnel object
  * 
  */

	function NGSYS_Hero_Node_SensorsSRV(sensorsManager, controlChannel) {
		_classCallCheck(this, NGSYS_Hero_Node_SensorsSRV);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Node_SensorsSRV).call(this, sensorsManager, controlChannel));
	}

	/**
  * Map control events
  * 
  * @param {SensorsManager} sensorsManager - Sensors manager object
  */


	_createClass(NGSYS_Hero_Node_SensorsSRV, [{
		key: "_mapControlEvents",
		value: function _mapControlEvents(sensorsManager) {

			var service = this;

			if (sensorsManager === undefined) {
				sensorsManager = service.sensorsManager;
			}

			sensorsManager.sensorsList.forEach(function (sensor, _i) {

				try {
					service._mapSensorControlEvents(sensor);
				} catch (e) {
					// TODO: handle exception
					throw "Error mapping sensor control events. " + e;
				}
			});
		}

		/**
   * Map control events for sensors
   * 
   * @param {Sensor} sensor 
   */

	}, {
		key: "_mapSensorControlEvents",
		value: function _mapSensorControlEvents(sensor) {

			var service = this;
			var sensorEngine = sensor.sensorEngine;

			console.log('<*> NGSYS_Hero_Node._mapSensorControlEvents'); // TODO REMOVE DEBUG LOG
			console.log(sensor);

			sensor.eventEmitter.on(sensor.CONSTANTS.Events.SensorOptionsUpdated, function (data) {
				service._event_SensorOptionsUpdated(data, {
					"service": service
				});
			});

			if (sensorEngine !== null) {

				// Map event SensorEngine_Start
				sensorEngine.eventEmitter.on(sensorEngine.CONSTANTS.Events.SensorEngine_Start, function (data) {
					service._event_SensorEngine_Start({
						"data": data,
						"sensor": sensor
					});
				});

				// Map event SensorEngine_Stop
				sensorEngine.eventEmitter.on(sensorEngine.CONSTANTS.Events.SensorEngine_Stop, function (data) {
					service._event_SensorEngine_Stop({
						"data": data,
						"sensor": sensor
					});
				});
			}
		}

		/**
   * Map control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Node_SensorsSRV} [options.service] - Sensors Service object
   * 
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket, options) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_SensorsSRV.prototype), "_mapControlMessages", this).call(this, socket, options);

			var service = this;
			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;

			// Map message getSensorsList
			socket.on(service.CONSTANTS.Messages.getSensorsList, function (msg) {
				service._msg_getSensorsList(msg, service);
			});

			// Map message getSensorOptions
			socket.on(service.CONSTANTS.Messages.getSensorOptions, function (msg) {
				service._msg_getSensorOptions(msg, service);
			});

			// Map message setSensorOptions
			socket.on(service.CONSTANTS.Messages.setSensorOptions, function (msg) {
				service._msg_setSensorOptions(msg, service);
			});

			// Map message StartSensor
			socket.on(service.CONSTANTS.Messages.StartSensor, function (msg) {
				service._msg_StartSensor(msg, service);
			});

			// Map message StopSensor
			socket.on(service.CONSTANTS.Messages.StopSensor, function (msg) {
				service._msg_StopSensor(msg, service);
			});

			// Map message TurnOffSensors
			socket.on(service.CONSTANTS.Messages.TurnOffSensors, function (msg) {
				service._msg_TurnOffSensors(msg, service);
			});
		}

		/**
   * Unmap control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Node_SensorsSRV} [options.service] - Sensors Service object
   * 
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket, options) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Node_SensorsSRV.prototype), "_unmapControlMessages", this).call(this, socket, options);

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			//		socket.removeListener(service.CONSTANTS.Messages.getSensorsList, service._msg_getSensorsList);
			//		socket.removeListener(service.CONSTANTS.Messages.getSensorOptions, service._msg_getSensorOptions);
			//		socket.removeListener(service.CONSTANTS.Messages.setSensorOptions, service._msg_setSensorOptions);
			//		socket.removeListener(service.CONSTANTS.Messages.StartSensor, service._msg_StartSensor);
			//		socket.removeListener(service.CONSTANTS.Messages.StopSensor, service._msg_StopSensor);
			//		socket.removeListener(service.CONSTANTS.Messages.TurnOffSensors, service._msg_TurnOffSensors);

			socket.removeAllListeners(service.CONSTANTS.Messages.getSensorsList);
			socket.removeAllListeners(service.CONSTANTS.Messages.getSensorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.setSensorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.StartSensor);
			socket.removeAllListeners(service.CONSTANTS.Messages.StopSensor);
			socket.removeAllListeners(service.CONSTANTS.Messages.TurnOffSensors);

			service._mapped = null;
		}

		/**
   * Event SensorOptionsUpdated
   */

	}, {
		key: "_event_SensorOptionsUpdated",
		value: function _event_SensorOptionsUpdated(data, options) {

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var socket = service.controlChannel.socket;
			var sensor = data.sensor;

			// Emit message SensorOptionsUpdated
			socket.emit(service.CONSTANTS.Messages.SensorOptionsUpdated, {
				"sensorID": sensor.config.id
			});
		}

		/**
   * Event SensorEngine_Start
   */

	}, {
		key: "_event_SensorEngine_Start",
		value: function _event_SensorEngine_Start(data) {

			var service = this;
			var socket = service.controlChannel.socket;

			var sensor = data.sensor;

			// Emit message SensorStarted
			socket.emit(service.CONSTANTS.Messages.SensorStarted, {
				"sensorID": sensor.config.id
			});
		}

		/**
   * Event SensorEngine_Stop
   */

	}, {
		key: "_event_SensorEngine_Stop",
		value: function _event_SensorEngine_Stop(data) {

			var service = this;
			var socket = service.controlChannel.socket;

			var sensor = data.sensor;

			// Emit message SensorStarted
			socket.emit(service.CONSTANTS.Messages.SensorStopped, {
				"sensorID": sensor.config.id
			});
		}

		/**
   * Message getSensorsList
   */

	}, {
		key: "_msg_getSensorsList",
		value: function _msg_getSensorsList(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;
			var socket = service.controlChannel.socket;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorsList'); // TODO REMOVE DEBUG LOG

			var response = {};
			response.numSensors = smng.sensorsList.length;
			response.sensors = [];

			smng.sensorsList.forEach(function (sns_, _i) {

				var sensor = {
					"sensorID": sns_.config.id,
					"type": sns_.config.type,
					"state": sns_.config.state
				};

				response.sensors.push(sensor);
			});

			// Emit message SensorsList
			socket.emit(service.CONSTANTS.Messages.SensorsList, response);
		}

		/**
   * Message getSensorOptions
   */

	}, {
		key: "_msg_getSensorOptions",
		value: function _msg_getSensorOptions(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;
			var socket = service.controlChannel.socket;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorOptions'); // TODO REMOVE DEBUG LO

			var sensorID = msg.sensorID;

			var response = {
				"sensorID": sensorID
			};

			try {

				var sensorSearch = smng.getSensorByID(sensorID);
				if (sensorSearch.STsensor === null) {
					throw "Sensor not found.";
				}

				var sensor = sensorSearch.STsensor;

				response.options = sensor.getOptions();

				// Emit message SensorOptions
				socket.emit(service.CONSTANTS.Messages.SensorOptions, response);
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message setSensorOptions
   */

	}, {
		key: "_msg_setSensorOptions",
		value: function _msg_setSensorOptions(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.setSensorOptions'); // TODO REMOVE DEBUG LO
			console.log(msg); // TODO REMOVE DEBUG LO

			var sensorID = msg.sensorID;
			var options = msg.options;

			var response = {
				"sensorID": sensorID
			};

			try {

				var sensorSearch = smng.getSensorByID(sensorID);
				if (sensorSearch.STsensor === null) {
					throw "Sensor not found.";
				}

				var sensor = sensorSearch.STsensor;

				sensor.setOptions(options);
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.setSensorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message StartSensor
   */

	}, {
		key: "_msg_StartSensor",
		value: function _msg_StartSensor(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.StartSensor'); // TODO REMOVE DEBUG LOG
			console.log(msg); // TODO REMOVE DEBUG LOG
			//		  console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				var _sensorSearch = smng.getSensorByID(msg.sensorID);

				if (_sensorSearch.STsensor !== null) {
					_sensorSearch.STsensor.sensorEngine.startEngine();
					response.result = "OK";
				} else {
					console.log("Not found!!!"); // TODO REMOVE DEBUG LOG
					throw "Sensor not found.";
				}
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.StartSensor ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}

			//			msg.result = response.result;
		}

		/**
   * Message StopSensor
   */

	}, {
		key: "_msg_StopSensor",
		value: function _msg_StopSensor(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.StopSensor'); // TODO REMOVE DEBUG LOG
			console.log(msg); // TODO REMOVE DEBUG LOG
			//		console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				var _sensorSearch = smng.getSensorByID(msg.sensorID);

				if (_sensorSearch.STsensor !== null) {
					_sensorSearch.STsensor.sensorEngine.stopEngine();
					response.result = "OK";
				} else {
					throw "Sensor not found.";
				}
			} catch (e) {

				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;
				console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.StopSensor ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message TurnOffSensors
   */

	}, {
		key: "_msg_TurnOffSensors",
		value: function _msg_TurnOffSensors(msg, service) {

			if (service === undefined) {
				service = this;
			}

			var smng = service.sensorsManager;

			console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.TurnOffSensors'); // TODO REMOVE DEBUG LOG

			var response = {};
			response.result = null;

			try {

				smng.turnOffSensors();
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.TurnOffSensors ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}
	}]);

	return NGSYS_Hero_Node_SensorsSRV;
}(SensorsServices);

var _Lib = {
	"NGSYS_Hero_Node_SensorsSRV": NGSYS_Hero_Node_SensorsSRV
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_NodeSensorsSRV.js.map

"use strict";

/**
 * Engines system services
 * for Node role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

/**
 * Import NGSYS_Hero_Services
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NGSYS_Hero_Services = require('./ngsysHero_Services.js');

/**
 * Engines system services
 * 
 * <pre>
 * for role Node
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @implements NGSYS_Hero_Services
 */

var NGSYS_Hero_NodeServices = function (_NGSYS_Hero_Services) {
	_inherits(NGSYS_Hero_NodeServices, _NGSYS_Hero_Services);

	/**
  * @constructs NGSYS_Hero_NodeServices
  * @param {EnginesSystem} ngSYS - Engines system object
  */

	function NGSYS_Hero_NodeServices(ngSYS) {
		_classCallCheck(this, NGSYS_Hero_NodeServices);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_NodeServices).call(this, ngSYS));
	}

	/**
  * Initialize
  */


	_createClass(NGSYS_Hero_NodeServices, [{
		key: "initialize",
		value: function initialize() {

			_get(Object.getPrototypeOf(NGSYS_Hero_NodeServices.prototype), "initialize", this).call(this);
		}

		/**
   * Map control events
   * 
   * @param {EnginesSystem} ngSYS - Engines system object
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(ngSYS) {

			_get(Object.getPrototypeOf(NGSYS_Hero_NodeServices.prototype), "_mapControlEvents", this).call(this, ngSYS);

			var service = this;

			if (ngSYS === undefined) {
				ngSYS = service.ngSYS;
			}
		}

		/**
   * Map control messages
   * 
   * @param {object} socket - Socket object
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket) {

			_get(Object.getPrototypeOf(NGSYS_Hero_NodeServices.prototype), "_mapControlMessages", this).call(this, socket);

			var service = this;

			var comSYS = service.comSYS;
			var config = comSYS.config;

			if (socket === undefined) {
				socket = config.controlChannel.socket;
			}
		}
	}]);

	return NGSYS_Hero_NodeServices;
}(NGSYS_Hero_Services);

var _Lib = {
	"NGSYS_Hero_NodeServices": NGSYS_Hero_NodeServices
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_NodeServices.js.map

"use strict";

/*
 SomeThings Engines System library
 
 version Hero
 for Server

*/

/**
 * Import Sensor
 * @ignore
 */

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sensor = require('../Sensor.js');

/**
 * Import SensorEngine
 * @ignore
 */
var SensorEngine = require('../SensorEngine.js').SensorEngine;

/**
 * Import SensorsManager_CONSTANTS
 * @ignore
 */
var SensorsManager_CONSTANTS = require('../services/SensorsManager.js').CONSTANTS;

/**
 * Import SensorsManager
 * @ignore
 */
var SensorsManager = require('../services/SensorsManager.js').SensorsManager;

/**
 * Import SensorsServices_CONSTANTS
 * @ignore
 */
var SensorsServices_CONSTANTS = require('../services/SensorsServices.js').SensorsServices_CONSTANTS;

/**
 * Import NGSYS_Hero_Server_SensorsSRV
 * @ignore
 */
var NGSYS_Hero_Server_SensorsSRV = require('./ngsysHero_ServerSensorsSRV.js').NGSYS_Hero_Server_SensorsSRV;

/**
 * Import Actuator
 * @ignore
 */
var Actuator = require('../Actuator.js');

/**
 * Import ActuatorEngine
 * @ignore
 */
var ActuatorEngine = require('../ActuatorEngine.js');

/**
 * Import ActuatorsManager_CONSTANTS
 * @ignore
 */
var ActuatorsManager_CONSTANTS = require('../services/ActuatorsManager.js').CONSTANTS;

/**
 * Import ActuatorsManager
 * @ignore
 */
var ActuatorsManager = require('../services/ActuatorsManager.js').ActuatorsManager;

/**
 * Import ActuatorsServices_CONSTANTS
 * @ignore
 */
var ActuatorsServices_CONSTANTS = require('../services/ActuatorsServices.js').ActuatorsServices_CONSTANTS;

/**
 * Import NGSYS_Hero_Server_ActuatorsSRV
 * @ignore
 */
var NGSYS_Hero_Server_ActuatorsSRV = require('./ngsysHero_ServerActuatorsSRV.js').NGSYS_Hero_Server_ActuatorsSRV;

/**
 * Import NGSystem_Hero_Lib
 * @ignore
 */
var NGSystem_Hero_Lib = require('./enginesSYS_Hero.js');

/**
 * Import NGSystem_Hero_CONSTANTS
 * @ignore
 */
var NGSystem_Hero_CONSTANTS = NGSystem_Hero_Lib.NGSystem_Hero_CONSTANTS;

/**
 * Import NGSystem_Hero
 * @ignore
 */
var NGSystem_Hero = NGSystem_Hero_Lib.NGSystem_Hero;

/**
 * Sensor engine reference
 * 
 * <pre>
 * Sensor Engine
 * for role Server
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @implements SensorEngine
 */

var SnsEngineRef = function (_SensorEngine) {
	_inherits(SnsEngineRef, _SensorEngine);

	/**
  * @constructs SnsEngineRef
  * 
  * @param {object} config - Configuration object
  */

	function SnsEngineRef(config) {
		_classCallCheck(this, SnsEngineRef);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(SnsEngineRef).call(this, config));
	}

	/**
  * Initialize
  * 
  * @override
  */


	_createClass(SnsEngineRef, [{
		key: 'initialize',
		value: function initialize() {}
		// Overrides parent method...


		/**
   * Main loop
   * 
   * @override
   */

	}, {
		key: 'mainLoop',
		value: function mainLoop() {
			// Overrides parent method...
		}
	}]);

	return SnsEngineRef;
}(SensorEngine);

/**
 * Sensor reference
 * 
 * <pre>
 * Sensor
 * for role Server
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @implements Sensor
 */


var SensorRef = function (_Sensor) {
	_inherits(SensorRef, _Sensor);

	/**
  * @constructs SensorRef
  * 
  * @param {object} config - Configuration object
 
  */

	function SensorRef(config) {
		_classCallCheck(this, SensorRef);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(SensorRef).call(this, config));
	}

	/**
  * Initialize
  */


	_createClass(SensorRef, [{
		key: 'initialize',
		value: function initialize() {

			var sensor = this;

			// initialize sensor engine
			sensor.sensorEngine = new SnsEngineRef(sensor.config.sensorEngine);
		}

		/**
   * Start sensor
   */

	}, {
		key: 'start',
		value: function start() {

			var stSensor = this;

			return new Promise(function (resolve, reject) {

				var request = {
					"sensorID": stSensor.config.sensorID,
					"result": null

				};

				// Emit message StartSensor
				stSensor.config._controlSocket.emit(SensorsServices_CONSTANTS.Messages.StartSensor, request);

				resolve(request);
			});
		}

		/**
   * Stop sensor
   */

	}, {
		key: 'stop',
		value: function stop() {

			var stSensor = this;

			return new Promise(function (resolve, reject) {

				var request = {
					"sensorID": stSensor.config.sensorID,
					"result": null

				};

				// Emit message StopSensor
				stSensor.config._controlSocket.emit(SensorsServices_CONSTANTS.Messages.StopSensor, request);
				resolve(request);
			});
		}

		/**
   * Set sensor options
   * 
   * @param {object} options - Options object
   */

	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			var stSensor = this;
			var socket = stSensor.config._controlSocket;

			console.log('<*> ST SensorRef.setOptions'); // TODO REMOVE DEBUG LOG
			console.log(options); // TODO REMOVE DEBUG LOG

			try {
				// Emit message setSensorOptions
				socket.emit(SensorsServices_CONSTANTS.Messages.setSensorOptions, { "sensorID": stSensor.config.sensorID, "options": options });
			} catch (e) {
				// TODO: handle exception
				throw "Cannot send message setSensorOptions. " + e;
			}
		}
	}]);

	return SensorRef;
}(Sensor);

/**
 * Sensors manager
 * 
 * <pre>
 * for role Server
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @implements SensorsManager
 */


var NGSYS_Hero_Server_SensorsMNG = function (_SensorsManager) {
	_inherits(NGSYS_Hero_Server_SensorsMNG, _SensorsManager);

	/**
  * @constructs NGSYS_Hero_Server_SensorsMNG
  */

	function NGSYS_Hero_Server_SensorsMNG() {
		_classCallCheck(this, NGSYS_Hero_Server_SensorsMNG);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Server_SensorsMNG).call(this));
	}

	/**
  * Returns Sensor searched by sysID
  */


	_createClass(NGSYS_Hero_Server_SensorsMNG, [{
		key: 'getSensorBy_sysID',
		value: function getSensorBy_sysID(sensorID) {

			var smngr = this;

			var sensor = null;
			var _i = 0;

			_i = smngr.sensorsList.map(function (x) {
				return x.config._sysID;
			}).indexOf(sensorID);
			if (_i !== -1) {
				sensor = smngr.sensorsList[_i];
			}

			return {
				"stSensor": sensor,
				"position": _i
			};
		}

		/**
   * Returns Sensors searched by nodeID
   * @param nodeID 
   */

	}, {
		key: 'getSensorsByNode',
		value: function getSensorsByNode(nodeID) {

			var smngr = this;

			var sensors = smngr.sensorsList.filter(function (sensor, _i, _sensors) {

				if (sensor.config._refSTNodeID === nodeID) {
					return true;
				}
			});

			return {
				"numSensors": sensors.length,
				"sensors": sensors
			};
		}

		/**
   * Add sensor
   * 
   * @param sensor SensorRef object
   */

	}, {
		key: 'addSensor',
		value: function addSensor(sensor) {

			var smng = this;

			var sensorSearch = smng.getSensorBy_sysID(sensor.config._sysID);

			if (sensorSearch.stSensor !== null) {
				throw "Sensor sysID already exists.";
			}

			smng.sensorsList.push(sensor);

			// Emit message SensorAdded
			smng.eventEmitter.emit(smng.CONSTANTS.Events.SensorAdded, sensor);
		}

		/**
   * Add sensor from node
   * 
   * @param config Configuration object
   */

	}, {
		key: 'addSensorFromNode',
		value: function addSensorFromNode(config, options) {

			var smng = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.sensorsManager !== undefined) {
				smng = options.sensorsManager;
			}

			var sensor = new SensorRef(config);
			sensor.initialize();

			try {
				smng.addSensor(sensor);
			} catch (e) {
				// TODO: handle exception
				throw "Cannot add sensor. " + e;
			}
		}

		/**
   * Turn off sensors of node
   */

	}, {
		key: 'turnOffSensorsOfNode',
		value: function turnOffSensorsOfNode(nodeID) {

			var smng = this;
			//		let _nodeID = nodeID;

			var sensorsSearch = smng.getSensorsByNode(nodeID);

			if (sensorsSearch.sensors !== null) {

				// Emit message TurnOffSensors
				sensorsSearch.sensors[0].config._controlSocket.emit(SensorsServices_CONSTANTS.Messages.TurnOffSensors);
			} else {
				console.log(' <~> Node not found!!!'); // TODO REMOVE DEBUG LOG
			}
		}
	}]);

	return NGSYS_Hero_Server_SensorsMNG;
}(SensorsManager);

/**
 * Actuator engine reference
 * 
 * <pre>
 * Actuator Engine
 * for role Server
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @implements ActuatorEngine
 * 
 */


var ActEngineRef = function (_ActuatorEngine) {
	_inherits(ActEngineRef, _ActuatorEngine);

	/**
  * @constructs ActEngineRef
  */

	function ActEngineRef(config) {
		_classCallCheck(this, ActEngineRef);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ActEngineRef).call(this, config));
	}

	/**
  * Initialize
  */


	_createClass(ActEngineRef, [{
		key: 'initialize',
		value: function initialize() {}
		// Overrides parent method...


		/**
   * MainLoop
   */

	}, {
		key: 'mainLoop',
		value: function mainLoop() {
			// Overrides parent method...
		}
	}]);

	return ActEngineRef;
}(ActuatorEngine);

/**
 * Actuator reference
 * 
 * <pre>
 * Actuator
 * for role Server
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @implements Actuator
 * 
 */


var ActuatorRef = function (_Actuator) {
	_inherits(ActuatorRef, _Actuator);

	/**
  * @constructs ActuatorRef
  */

	function ActuatorRef(config) {
		_classCallCheck(this, ActuatorRef);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ActuatorRef).call(this, config));
	}

	/**
  * Initialize
  */


	_createClass(ActuatorRef, [{
		key: 'initialize',
		value: function initialize() {

			var actuator = this;

			// initialize actuator engine
			actuator.actuatorEngine = new ActEngineRef(actuator.config.actuatorEngine);
		}

		/**
   * Start actuator
   */

	}, {
		key: 'start',
		value: function start() {

			var stActuator = this;

			return new Promise(function (resolve, reject) {

				var request = {
					"actuatorID": stActuator.config.actuatorID,
					"result": null

				};

				// Emit message StartActuator
				stActuator.config._controlSocket.emit(ActuatorsServices_CONSTANTS.Messages.StartActuator, request);

				resolve(request);
			});
		}

		/**
   * Stop actuator
   */

	}, {
		key: 'stop',
		value: function stop() {

			var stActuator = this;

			return new Promise(function (resolve, reject) {

				var request = {
					"actuatorID": stActuator.config.actuatorID,
					"result": null

				};

				// Emit message StopActuator
				stActuator.config._controlSocket.emit(ActuatorsServices_CONSTANTS.Messages.StopActuator, request);
				resolve(request);
			});
		}

		/**
   * Set actuator options
   * 
   * @param {object} options - Options object.
   */

	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			var stActuator = this;
			var socket = stActuator.config._controlSocket;

			console.log('<*> ST ActuatorRef.setOptions'); // TODO REMOVE DEBUG LOG
			console.log(options); // TODO REMOVE DEBUG LOG

			// Emit message setActuatorOptions
			socket.emit(ActuatorsServices_CONSTANTS.Messages.setActuatorOptions, { "actuatorID": stActuator.config.actuatorID, "options": options });
		}
	}]);

	return ActuatorRef;
}(Actuator);

/**
 * Actuators manager
 * 
 * <pre>
 * for role Server
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @implements ActuatorsManager
 * 
 */


var NGSYS_Hero_Server_ActuatorsMNG = function (_ActuatorsManager) {
	_inherits(NGSYS_Hero_Server_ActuatorsMNG, _ActuatorsManager);

	/**
  * @constructs NGSYS_Hero_Server_ActuatorsMNG
  */

	function NGSYS_Hero_Server_ActuatorsMNG() {
		_classCallCheck(this, NGSYS_Hero_Server_ActuatorsMNG);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Server_ActuatorsMNG).call(this));
	}

	/**
  * Returns Actuator searched by sysID
  */


	_createClass(NGSYS_Hero_Server_ActuatorsMNG, [{
		key: 'getActuatorBy_sysID',
		value: function getActuatorBy_sysID(actuatorID) {

			var amng = this;

			var actuator = null;
			var _i = 0;

			_i = amng.actuatorsList.map(function (x) {
				return x.config._sysID;
			}).indexOf(actuatorID);
			if (_i !== -1) {
				actuator = amng.actuatorsList[_i];
			}

			return {
				"stActuator": actuator,
				"position": _i
			};
		}

		/**
   * Returns Actuators searched by nodeID
   * @param nodeID 
   */

	}, {
		key: 'getActuatorsByNode',
		value: function getActuatorsByNode(nodeID) {

			var smngr = this;

			var actuators = smngr.actuatorsList.filter(function (actuator, _i, _actuators) {

				if (actuator.config._refSTNodeID === nodeID) {
					return true;
				}
			});

			return {
				"numActuators": actuators.length,
				"actuators": actuators
			};
		}

		/**
   * Add actuator
   * 
   * @param actuator ActuatorRef object
   */

	}, {
		key: 'addActuator',
		value: function addActuator(actuator) {

			var amng = this;

			var actuatorSearch = amng.getActuatorBy_sysID(actuator.config._sysID);

			if (actuatorSearch.stActuator !== null) {
				throw "Actuator ID already exists.";
			}

			amng.actuatorsList.push(actuator);

			// Emit message ActuatorAdded
			amng.eventEmitter.emit(amng.CONSTANTS.Events.ActuatorAdded, actuator);
		}

		/**
   * Add actuator from node
   * 
   * @param config Configuration object
   */

	}, {
		key: 'addActuatorFromNode',
		value: function addActuatorFromNode(config, options) {

			var amng = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.actuatorsManager !== undefined) {
				amng = options.actuatorsManager;
			}

			var actuator = new ActuatorRef(config);
			actuator.initialize();

			try {
				amng.addActuator(actuator);
			} catch (e) {
				// TODO: handle exception
				throw "Cannot add actuator. " + e;
			}
		}

		/**
   * Turn off actuators of node
   */

	}, {
		key: 'turnOffActuatorsOfNode',
		value: function turnOffActuatorsOfNode(nodeID) {

			var amngr = this;
			//		let _nodeID = nodeID;

			var actuatorsSearch = amngr.getActuatorsByNode(nodeID);

			if (actuatorsSearch.actuators !== null) {

				// Emit message TurnOffActuators
				actuatorsSearch.actuators[0].config._controlSocket.emit(ActuatorsServices_CONSTANTS.Messages.TurnOffActuators);
			} else {
				console.log(' <~> Node not found!!!'); // TODO REMOVE DEBUG LOG
			}
		}
	}]);

	return NGSYS_Hero_Server_ActuatorsMNG;
}(ActuatorsManager);

/**
 * Engines system
 * 
 * <pre>
 * for role Server
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @implements NGSystem_Hero
 */


var NGSYS_Hero_Server = function (_NGSystem_Hero) {
	_inherits(NGSYS_Hero_Server, _NGSystem_Hero);

	/**
  * @constructs NGSYS_Hero_Server
  */

	function NGSYS_Hero_Server(config) {
		_classCallCheck(this, NGSYS_Hero_Server);

		var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Server).call(this, config));

		var ngSYS = _this7;

		ngSYS.nodesManager = null;
		ngSYS._scs_RouteEngines = null;

		return _this7;
	}

	/**
  * Initialize
  */


	_createClass(NGSYS_Hero_Server, [{
		key: 'initialize',
		value: function initialize() {

			_get(Object.getPrototypeOf(NGSYS_Hero_Server.prototype), 'initialize', this).call(this);

			var ngSYS = this;
			var config = ngSYS.config;

			if (config.nodesManager === undefined || config.nodesManager === null) {
				throw "Nodes manager is required.";
			}

			ngSYS.nodesManager = config.nodesManager;

			try {
				ngSYS._init_Nodes();
			} catch (e) {
				// TODO: handle exception
				throw "Cannot initialize Nodes. " + e;
			}

			try {
				ngSYS._init_Sensors();
			} catch (e) {
				// TODO: handle exception
				throw "Cannot initialize Sensors. " + e;
			}

			try {
				ngSYS._init_Actuators();
			} catch (e) {
				// TODO: handle exception
				throw "Cannot initialize Actuators. " + e;
			}
		}

		/**
   * Initialize nodes
   */

	}, {
		key: '_init_Nodes',
		value: function _init_Nodes() {

			var ngSYS = this;
			var config = ngSYS.config;
			var nodesManager = ngSYS.nodesManager;
		}

		/**
   * Initialize sensors
   */

	}, {
		key: '_init_Sensors',
		value: function _init_Sensors() {

			var ngSYS = this;
			var config = ngSYS.config;

			ngSYS.sensorsManager = new NGSYS_Hero_Server_SensorsMNG();

			ngSYS.sensorsServices = new NGSYS_Hero_Server_SensorsSRV(ngSYS.sensorsManager, ngSYS.controlChannel, ngSYS.nodesManager);

			try {
				ngSYS.sensorsServices.initialize();
			} catch (e) {
				// TODO: handle exception
				throw "Cannot initialize sensors services. " + e;
			}
		}

		/**
   * Initialize actuators
   */

	}, {
		key: '_init_Actuators',
		value: function _init_Actuators() {

			var ngSYS = this;
			var config = ngSYS.config;

			ngSYS.actuatorsManager = new NGSYS_Hero_Server_ActuatorsMNG();

			ngSYS.actuatorsServices = new NGSYS_Hero_Server_ActuatorsSRV(ngSYS.actuatorsManager, ngSYS.controlChannel, ngSYS.nodesManager);

			try {
				ngSYS.actuatorsServices.initialize();
			} catch (e) {
				// TODO: handle exception
				throw "Cannot initialize actuators services. " + e;
			}
		}

		/**
   * Get Server Control Services routes
   * for engines
   * 
   * @param {object} options - Options object
   * 
   */

	}, {
		key: 'getSCSRoutes',
		value: function getSCSRoutes(options) {

			var ngSYS = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.ngSYS !== undefined) {
				ngSYS = options.ngSYS;
			}

			if (ngSYS._scs_RouteEngines === null) {

				var SCS_RouteEngines = require('./scs_Routes/SCS_RouteEngines.js');

				try {
					ngSYS._scs_RouteEngines = new SCS_RouteEngines(ngSYS.sensorsManager, ngSYS.actuatorsManager);
				} catch (e) {
					// TODO: handle exception
					throw "Error in route engines." + e;
				}
			}

			return ngSYS._scs_RouteEngines;
		}
	}]);

	return NGSYS_Hero_Server;
}(NGSystem_Hero);

var _Lib = {
	"NGSYS_Hero_Server": NGSYS_Hero_Server
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_Server.js.map

"use strict";

/**
 * Actuators services
 * for Server role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

/**
 * Import ActuatorsServices
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActuatorsServices = require('../services/ActuatorsServices.js').ActuatorsServices;

/**
 * Actuators Services 
 * 
 * @class
 * @property {NodesManager} nodesManager - Nodes manager object.
 * @property {object} eventEmitter - Object for emit events.
 * 
 */

var NGSYS_Hero_Server_ActuatorsSRV = function (_ActuatorsServices) {
	_inherits(NGSYS_Hero_Server_ActuatorsSRV, _ActuatorsServices);

	function NGSYS_Hero_Server_ActuatorsSRV(actuatorsManager, controlChannel, nodesManager) {
		_classCallCheck(this, NGSYS_Hero_Server_ActuatorsSRV);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Server_ActuatorsSRV).call(this, actuatorsManager, controlChannel));

		var service = _this;

		service.nodesManager = nodesManager;

		//		service._mapControlEvents(actuatorsManager);

		return _this;
	}

	_createClass(NGSYS_Hero_Server_ActuatorsSRV, [{
		key: "initialize",
		value: function initialize() {

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_ActuatorsSRV.prototype), "initialize", this).call(this);

			var service = this;

			if (service.nodesManager === undefined || service.nodesManager === null) {
				throw "Nodes manager is required";
			}

			service._mapControlEventsForNodes(service.nodesManager);
		}
	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(actuatorsManager) {

			var service = this;

			if (actuatorsManager === undefined) {
				actuatorsManager = service.actuatorsManager;
			}

			//		actuatorsManager.actuatorsList.forEach(function(actuator, _i) {
			//			service._mapActuatorControlEvents(actuator);
			//		});
		}

		/**
   * Map control events for nodes
   */

	}, {
		key: "_mapControlEventsForNodes",
		value: function _mapControlEventsForNodes(nodesManager) {

			var service = this;

			if (nodesManager === undefined) {
				nodesManager = service.nodesManager;
			}

			// Map event NodeAdded
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeAdded, function (data) {

				service._event_NodeAdded(data, {
					"service": service
				});
			});

			// Map event NodeDisconnected
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeDisconnected, function (data) {

				service._event_NodeDisconnected(data, {
					"service": service
				});
			});

			// Map event NodeRemoved
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeRemoved, function (data) {

				service._event_NodeRemoved(data, {
					"service": service
				});
			});
		}

		/**
   * Map control messages
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_ActuatorsSRV.prototype), "_mapControlMessages", this).call(this, socket, {
				"service": service
			});
		}

		/**
   * Unmap control messages
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_ActuatorsSRV.prototype), "_unmapControlMessages", this).call(this, socket, {
				"service": service
			});

			service._mapped = null;
		}

		/**
   * Manage actuators from node
   * 
   * @param stNode Node object
   */

	}, {
		key: "manageActuatorsFromNode",
		value: function manageActuatorsFromNode(stNode) {

			if (stNode.config._ActuatorsManaged !== undefined) {
				throw "This node is already managed.";
			}

			var service = this;

			service._mapNodeControlEvents(stNode);
			service._mapNodeControlMessages(stNode);

			if (stNode.config.numActuators > 0) {

				// Emit message getActuatorsList
				stNode.socket.emit(service.CONSTANTS.Messages.getActuatorsList);
			}

			stNode.config._ActuatorsManaged = true;
		}
	}, {
		key: "_mapNodeControlEvents",
		value: function _mapNodeControlEvents(stNode) {}

		/**
   * Map node control messages
   * 
   * @param stNode Node object
   */

	}, {
		key: "_mapNodeControlMessages",
		value: function _mapNodeControlMessages(stNode) {

			var service = this;
			var socket = stNode.socket;

			// Map event disconnect
			socket.on("disconnect", function (msg) {
				service._unmapNodeControlMessages(stNode, { "node": stNode,
					"service": service
				});
			});

			// Map message ActuatorsList
			socket.on(service.CONSTANTS.Messages.ActuatorsList, function (msg) {
				service._msg_ActuatorsList(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message ActuatorOptions
			socket.on(service.CONSTANTS.Messages.ActuatorOptions, function (msg) {
				service._msg_ActuatorOptions(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message ActuatorOptionsUpdated
			socket.on(service.CONSTANTS.Messages.ActuatorOptionsUpdated, function (msg) {
				service._msg_ActuatorOptionsUpdated(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message ActuatorStarted
			socket.on(service.CONSTANTS.Messages.ActuatorStarted, function (msg) {
				service._msg_ActuatorStarted(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message ActuatorStopped
			socket.on(service.CONSTANTS.Messages.ActuatorStopped, function (msg) {
				service._msg_ActuatorStopped(msg, { "node": stNode,
					"service": service
				});
			});
		}

		/**
   * Unmap node control messages
   * 
   * @param stNode Node object
   * @param options Options object
   */

	}, {
		key: "_unmapNodeControlMessages",
		value: function _unmapNodeControlMessages(stNode, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var node = options.node;
			var socket = node.socket;

			socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorsList);
			socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorOptionsUpdated);
			socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorStarted);
			socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorStopped);
		}

		/**
   * Event NodeAdded
   */

	}, {
		key: "_event_NodeAdded",
		value: function _event_NodeAdded(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var stNode = data.node;

			try {
				service.manageActuatorsFromNode(stNode);
			} catch (e) {
				// TODO: handle exception
				throw "Cannot manage actuators of node. " + e;
			}
		}

		/**
   * Event NodeDisconnected
   */

	}, {
		key: "_event_NodeDisconnected",
		value: function _event_NodeDisconnected(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var stNode = data.node;

			service._unmapNodeControlMessages(stNode, { "node": stNode,
				"service": service
			});
		}

		/**
   * Event NodeRemoved
   */

	}, {
		key: "_event_NodeRemoved",
		value: function _event_NodeRemoved(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var nodeID = data.nodeID;
			var amng = service.actuatorsManager;

			var stActuators = amng.getActuatorsByNode(nodeID);

			stActuators.actuators.forEach(function (actuator, _i, _actuators) {

				var actuatorSearch = amng.getActuatorBy_sysID(actuator.config._sysID);
				if (actuatorSearch.stActuator !== null) {
					amng.actuatorsList.splice(actuatorSearch.position, 1);
				}
			});
		}

		/**
   * Message ActuatorsList
   */

	}, {
		key: "_msg_ActuatorsList",
		value: function _msg_ActuatorsList(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var amng = service.actuatorsManager;
			var node = options.node;
			var socket = node.socket;
			var data = msg;

			console.log('<*> NGSYS_Hero_Server_ActuatorsSRV.Messages.ActuatorsList'); // TODO REMOVE DEBUG LOG

			if (data.numActuators > 0) {

				data.actuators.forEach(function (actDATA, _i) {

					actDATA._sysID = node.config.nodeID + '.' + actDATA.actuatorID;
					actDATA._refSTNodeID = node.config.nodeID;

					//				actDATA._nodeEvents = node.eventEmitter;
					actDATA._controlSocket = socket;

					try {

						amng.addActuatorFromNode(actDATA);

						// Emit message getActuatorOptions
						socket.emit(service.CONSTANTS.Messages.getActuatorOptions, { "actuatorID": actDATA.actuatorID });
					} catch (e) {

						// TODO: handle exception
						console.log('<~EEE~> NGSYS_Hero_Server_ActuatorsSRV.Messages.ActuatorsList'); // TODO REMOVE DEBUG LOG
						console.log('<~EEE~> Cannot add actuator from node.'); // TODO REMOVE DEBUG LOG
						console.log(e); // TODO REMOVE DEBUG LOG
						console.log(actDATA); // TODO REMOVE DEBUG LOG
					}
				});
			}
		}

		/**
   * Message ActuatorOptions
   */

	}, {
		key: "_msg_ActuatorOptions",
		value: function _msg_ActuatorOptions(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var amng = service.actuatorsManager;
			var node = options.node;
			var socket = node.socket;

			var actuatorID = msg.actuatorID;
			var actuatorOptions = msg.options;

			var actuator_sysID = node.config.nodeID + '.' + actuatorID;

			console.log('<*> NGSYS_Hero_Server_ActuatorsSRV.Messages.ActuatorOptions'); // TODO REMOVE DEBUG LOG
			console.log(' <~~~> ' + actuator_sysID); // TODO REMOVE DEBUG LOG
			console.log(actuatorOptions); // TODO REMOVE DEBUG LOG

			var response = {
				"actuatorID": actuatorID
			};

			try {

				var actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
				if (actuatorSearch.stActuator === null) {
					throw "Actuator not found";
				}

				var act = actuatorSearch.stActuator;

				act.options = actuatorOptions;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message ActuatorOptionsUpdated
   */

	}, {
		key: "_msg_ActuatorOptionsUpdated",
		value: function _msg_ActuatorOptionsUpdated(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var amng = service.actuatorsManager;
			var node = options.node;
			var socket = node.socket;

			var actuatorID = msg.actuatorID;
			var actuator_sysID = node.config.nodeID + '.' + actuatorID;

			var response = {
				"actuatorID": actuatorID
			};

			console.log('<*> ST NGSYS_Hero_Server_ActuatorsSRV.ActuatorOptionsUpdated'); // TODO REMOVE DEBUG LOG
			console.log(options); // TODO REMOVE DEBUG LOG

			try {

				var actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
				if (actuatorSearch.stActuator === null) {
					throw "Actuator not found";
				}

				var act = actuatorSearch.stActuator;

				// Emit message getActuatorOptions
				socket.emit(service.CONSTANTS.Messages.getActuatorOptions, { "actuatorID": act.config.actuatorID });
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorOptionsUpdated ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message ActuatorStarted
   */

	}, {
		key: "_msg_ActuatorStarted",
		value: function _msg_ActuatorStarted(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var amng = service.actuatorsManager;
			var node = options.node;
			var socket = node.socket;

			var actuatorID = msg.actuatorID;
			var actuator_sysID = node.config.nodeID + '.' + actuatorID;

			console.log('<*> ST NGSYS_Hero_Server_ActuatorsSRV.ActuatorStarted'); // TODO REMOVE DEBUG LOG
			console.log('<~~~> ' + actuator_sysID); // TODO REMOVE DEBUG LOG

			var response = {
				"actuatorID": actuatorID
			};

			try {

				var actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
				if (actuatorSearch.stActuator === null) {
					throw "Actuator not found";
				}

				var act = actuatorSearch.stActuator;
				var engine = act.actuatorEngine;

				engine.state = engine.CONSTANTS.States.SEstate_Working;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorOptionsUpdated ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message ActuatorStopped
   */

	}, {
		key: "_msg_ActuatorStopped",
		value: function _msg_ActuatorStopped(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var amng = service.actuatorsManager;
			var node = options.node;
			var socket = node.socket;

			var actuatorID = msg.actuatorID;
			var actuator_sysID = node.config.nodeID + '.' + actuatorID;

			console.log('<*> ST NGSYS_Hero_Server_ActuatorsSRV.ActuatorStopped'); // TODO REMOVE DEBUG LOG
			console.log(' <~~~> ' + actuator_sysID); // TODO REMOVE DEBUG LOG

			var response = {
				"actuatorID": actuatorID
			};

			try {

				var actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
				if (actuatorSearch.stActuator === null) {
					throw "Actuator not found";
				}

				var act = actuatorSearch.stActuator;
				var engine = act.actuatorEngine;

				engine.state = engine.CONSTANTS.States.SEstate_Ready;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorStopped ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}
	}]);

	return NGSYS_Hero_Server_ActuatorsSRV;
}(ActuatorsServices);

var _Lib = {
	"NGSYS_Hero_Server_ActuatorsSRV": NGSYS_Hero_Server_ActuatorsSRV
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_ServerActuatorsSRV.js.map

"use strict";

/**
 * Sensors services
 * for role Server
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

/**
 * Import SensorsServices
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SensorsServices = require('../services/SensorsServices.js').SensorsServices;

/**
 * Sensors Services
 * for role Server
 * 
 * version Hero
 * 
 * @class
 * @implements SensorsServices
 * 
 */

var NGSYS_Hero_Server_SensorsSRV = function (_SensorsServices) {
	_inherits(NGSYS_Hero_Server_SensorsSRV, _SensorsServices);

	/**
  * @construct NGSYS_Hero_Server_SensorsSRV
  * 
  * @param {SensorsManager} sensorsManager - Sensors manager object
  * @param {object} controlChannel - Control channel object
  * @param {object} nodesManager - Nodes manager object
  */

	function NGSYS_Hero_Server_SensorsSRV(sensorsManager, controlChannel, nodesManager) {
		_classCallCheck(this, NGSYS_Hero_Server_SensorsSRV);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV).call(this, sensorsManager, controlChannel));

		var service = _this;

		service.nodesManager = nodesManager;

		return _this;
	}

	/**
  * Initialize
  */


	_createClass(NGSYS_Hero_Server_SensorsSRV, [{
		key: "initialize",
		value: function initialize() {

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV.prototype), "initialize", this).call(this);

			var service = this;

			if (service.nodesManager === undefined || service.nodesManager === null) {
				throw "Nodes manager is required";
			}

			service._mapControlEventsForNodes(service.nodesManager);
		}

		/**
   * Map control events
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(sensorsManager) {

			var service = this;

			if (sensorsManager === undefined) {
				sensorsManager = service.sensorsManager;
			}
		}

		/**
   * Map control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV.prototype), "_mapControlMessages", this).call(this, socket, {
				"service": service
			});
		}

		/**
   * Unmap control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_SensorsSRV.prototype), "_unmapControlMessages", this).call(this, socket, {
				"service": service
			});

			service._mapped = null;
		}

		/**
   * Map control events for nodes
   * 
   * @param {object} nodesManager - Nodes manager object
   */

	}, {
		key: "_mapControlEventsForNodes",
		value: function _mapControlEventsForNodes(nodesManager) {

			var service = this;

			if (nodesManager === undefined) {
				nodesManager = service.nodesManager;
			}

			// Map event NodeAdded
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeAdded, function (data) {

				service._event_NodeAdded(data, {
					"service": service
				});
			});

			// Map event NodeDisconnected
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeDisconnected, function (data) {

				service._event_NodeDisconnected(data, {
					"service": service
				});
			});

			// Map event NodeRemoved
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeRemoved, function (data) {

				service._event_NodeRemoved(data, {
					"service": service
				});
			});
		}

		/**
   * Manage sensors from node
   * 
   * @param {object} stNode - Node object
   */

	}, {
		key: "manageSensorsFromNode",
		value: function manageSensorsFromNode(stNode) {

			if (stNode.config._SensorsManaged !== undefined) {
				throw "This node is already managed.";
			}

			var service = this;

			service._mapNodeControlEvents(stNode);
			service._mapNodeControlMessages(stNode);

			if (stNode.config.numSensors > 0) {

				// Emit message getSensorsList
				stNode.socket.emit(service.CONSTANTS.Messages.getSensorsList);
			}

			stNode.config._SensorsManaged = true;
		}
	}, {
		key: "_mapNodeControlEvents",
		value: function _mapNodeControlEvents(stNode) {}

		/**
   * Map node control messages
   * 
   * @param {object} stNode - Node object
   */

	}, {
		key: "_mapNodeControlMessages",
		value: function _mapNodeControlMessages(stNode) {

			var service = this;
			var socket = stNode.socket;

			// Map message SensorsList
			socket.on(service.CONSTANTS.Messages.SensorsList, function (msg) {
				service._msg_SensorsList(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message SensorOptions
			socket.on(service.CONSTANTS.Messages.SensorOptions, function (msg) {
				service._msg_SensorOptions(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message SensorOptionsUpdated
			socket.on(service.CONSTANTS.Messages.SensorOptionsUpdated, function (msg) {
				service._msg_SensorOptionsUpdated(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message SensorStarted
			socket.on(service.CONSTANTS.Messages.SensorStarted, function (msg) {
				service._msg_SensorStarted(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message SensorStopped
			socket.on(service.CONSTANTS.Messages.SensorStopped, function (msg) {
				service._msg_SensorStopped(msg, { "node": stNode,
					"service": service
				});
			});
		}

		/**
   * Unmap node control messages
   * 
   * @param {object} stNode - Node object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_unmapNodeControlMessages",
		value: function _unmapNodeControlMessages(stNode, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			socket.removeAllListeners(service.CONSTANTS.Messages.SensorsList);
			socket.removeAllListeners(service.CONSTANTS.Messages.SensorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.SensorOptionsUpdated);
			socket.removeAllListeners(service.CONSTANTS.Messages.SensorStarted);
			socket.removeAllListeners(service.CONSTANTS.Messages.SensorStopped);
		}

		/**
   * Event NodeAdded
   * 
   * @param {object} data - Data object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_event_NodeAdded",
		value: function _event_NodeAdded(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var stNode = data.node;

			console.log('<~*~> ST NGSYS_Hero_Server_SensorsSRV._event_NodeAdded'); // TODO REMOVE DEBUG LOG

			try {
				service.manageSensorsFromNode(stNode);
			} catch (e) {

				// TODO: handle exception
				//			throw "Cannot manage sensors of node. " + e;
				console.log('<~EEE~> ST NGSYS_Hero_Server_SensorsSRV._event_NodeAdded'); // TODO REMOVE DEBUG LOG
				console.log('<~EEE~> Cannot manage sensors of node'); // TODO REMOVE DEBUG LOG
				console.log(e); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Event NodeDisconnected
   * 
   * @param {object} data - Data object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_event_NodeDisconnected",
		value: function _event_NodeDisconnected(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var stNode = data.node;

			service._unmapNodeControlMessages(stNode, { "node": stNode,
				"service": service
			});
		}

		/**
   * Event NodeRemoved
   * 
   * @param {object} data - Data object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_event_NodeRemoved",
		value: function _event_NodeRemoved(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var nodeID = data.nodeID;
			var smng = service.sensorsManager;

			var stSensors = smng.getSensorsByNode(nodeID);

			stSensors.sensors.forEach(function (sensor, _i, _sensors) {

				var sensorSearch = smng.getSensorBy_sysID(sensor.config._sysID);
				if (sensorSearch.stSensor !== null) {
					smng.sensorsList.splice(sensorSearch.position, 1);
				}
			});
		}

		/**
   * Message SensorsList
   * 
   * @param {object} msg - Message object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_msg_SensorsList",
		value: function _msg_SensorsList(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;
			var data = msg;

			console.log('<*> NGSYS_Hero_Server_SensorsSRV.Messages.SensorsList'); // TODO REMOVE DEBUG LOG

			if (data.numSensors > 0) {

				data.sensors.forEach(function (snsDATA, _i) {

					snsDATA._sysID = node.config.nodeID + '.' + snsDATA.sensorID;
					snsDATA._refSTNodeID = node.config.nodeID;

					//				snsDATA._nodeEvents = node.eventEmitter;
					snsDATA._controlSocket = socket;

					try {

						smng.addSensorFromNode(snsDATA);

						socket.emit(service.CONSTANTS.Messages.getSensorOptions, {
							"sensorID": snsDATA.sensorID
						});
					} catch (e) {

						// TODO: handle exception
						console.log('<~EEE~> NGSYS_Hero_Server_SensorsSRV.Messages.SensorsList'); // TODO REMOVE DEBUG LOG
						console.log('<~EEE~> Cannot add sensor from node.'); // TODO REMOVE DEBUG LOG
						console.log(e); // TODO REMOVE DEBUG LOG
						console.log(snsDATA); // TODO REMOVE DEBUG LOG
					}
				});
			}
		}

		/**
   * Message SensorOptions
   * 
   * @param {object} msg - Message object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_msg_SensorOptions",
		value: function _msg_SensorOptions(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = msg.sensorID;
			var sensorOptions = msg.options;

			var sensor_sysID = node.config.nodeID + '.' + sensorID;

			console.log('<*> NGSYS_Hero_Server_SensorsSRV.Messages.SensorOptions'); // TODO REMOVE DEBUG LOG
			console.log(' <~~~> ' + sensor_sysID); // TODO REMOVE DEBUG LOG
			console.log(sensorOptions); // TODO REMOVE DEBUG LOG

			var response = {
				"sensorID": sensorID
			};

			try {

				var sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
				if (sensorSearch.stSensor === null) {
					throw "Sensor not found";
				}

				var sns = sensorSearch.stSensor;

				sns.options = sensorOptions;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message SensorOptionsUpdated
   * 
   * @param {object} msg - Message object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_msg_SensorOptionsUpdated",
		value: function _msg_SensorOptionsUpdated(msg, options) {

			var service = this;

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = msg.sensorID;
			var sensor_sysID = node.config.nodeID + '.' + sensorID;

			var response = {
				"sensorID": sensorID
			};

			console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorOptionsUpdated'); // TODO REMOVE DEBUG LOG
			console.log('<~~~> ' + sensor_sysID); // TODO REMOVE DEBUG LOG

			try {

				var sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
				if (sensorSearch.stSensor === null) {
					throw "Sensor not found";
				}

				var sns = sensorSearch.stSensor;

				// Emit message getSensorOptions
				socket.emit(service.CONSTANTS.Messages.getSensorOptions, { "sensorID": sns.config.sensorID });
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorOptionsUpdated ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message SensorStarted
   * 
   * @param {object} msg - Message object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_msg_SensorStarted",
		value: function _msg_SensorStarted(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = msg.sensorID;
			var sensor_sysID = node.config.nodeID + '.' + sensorID;

			console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorStarted'); // TODO REMOVE DEBUG LOG
			console.log('<~~~> ' + sensor_sysID); // TODO REMOVE DEBUG LOG

			var response = {
				"sensorID": sensorID
			};

			try {

				var sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
				if (sensorSearch.stSensor === null) {
					throw "Sensor not found";
				}

				var sns = sensorSearch.stSensor;
				var engine = sns.sensorEngine;

				engine.state = engine.CONSTANTS.States.SEstate_Working;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_SensorsSRV.SensorStarted ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message SensorStopped
   * 
   * @param {object} msg - Message object
   * @param {object} options - Options object
   * @param {NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
   */

	}, {
		key: "_msg_SensorStopped",
		value: function _msg_SensorStopped(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var smng = service.sensorsManager;
			var node = options.node;
			var socket = node.socket;

			var sensorID = msg.sensorID;
			var sensor_sysID = node.config.nodeID + '.' + sensorID;

			console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorStopped'); // TODO REMOVE DEBUG LOG
			console.log(' <~~~> ' + sensor_sysID); // TODO REMOVE DEBUG LOG

			var response = {
				"sensorID": sensorID
			};

			try {

				var sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
				if (sensorSearch.stSensor === null) {
					throw "Sensor not found";
				}

				var sns = sensorSearch.stSensor;
				var engine = sns.sensorEngine;

				engine.state = engine.CONSTANTS.States.SEstate_Ready;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorStopped ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}
	}]);

	return NGSYS_Hero_Server_SensorsSRV;
}(SensorsServices);

var _Lib = {
	"NGSYS_Hero_Server_SensorsSRV": NGSYS_Hero_Server_SensorsSRV
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_ServerSensorsSRV.js.map

"use strict";

/*
 SomeThings Engines System library

 Services
 
 version Hero
*/

/**
 * Engine system services
 * 
 * <pre>
 * version Hero
 * </pre>
 * 
 * @class
 * @property {EnginesSystem} ngSYS - Engines system object
 * 
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NGSYS_Hero_Services = function () {

	/**
  * @constructs NGSYS_Hero_Services
  * 
  * @param {EnginesSystem} ngSYS - Engines system object
  */

	function NGSYS_Hero_Services(ngSYS) {
		_classCallCheck(this, NGSYS_Hero_Services);

		this.ngSYS = ngSYS;
		this.CONSTANTS = ngSYS.CONSTANTS;
	}

	/**
  * Initialize
  */


	_createClass(NGSYS_Hero_Services, [{
		key: "initialize",
		value: function initialize() {

			var service = this;
			service._mapControlEvents();
			service._mapControlMessages();
		}

		/**
   * Map control events
   * 
   * @param {EnginesSystem} ngSYS - Engines system object
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(ngSYS) {

			var service = this;

			if (ngSYS === undefined) {
				ngSYS = service.ngSYS;
			}
		}

		/**
   * Map control messages
   * 
   * @param {object} socket - Socket object
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket) {

			var service = this;

			var comSYS = service.comSYS;
			var config = comSYS.config;

			if (config._mapped !== undefined && config._mapped === true) {
				throw "control messages already mapped.";
			}

			if (socket === undefined) {
				socket = config.controlChannel.socket;
			}

			socket.on("disconnect", function (data) {
				service._unmapControlMessages(socket);
			});

			config._mapped = true;
		}

		/**
   * Unmap control messages
   * 
   * @param {object} socket - Socket object
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket) {

			var service = this;

			var comSYS = service.comSYS;
			var config = comSYS.config;

			if (config._mapped === undefined || config._mapped !== true) {
				throw "control messages not already mapped.";
			}
		}
	}]);

	return NGSYS_Hero_Services;
}();

var _Lib = {

	"NGSYS_Hero_Services": NGSYS_Hero_Services

};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_Services.js.map

"use strict";

/**
 * ActuatorsManager
 * 
 * Generic manager for Actuators
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
 * ActuatorsManager CONSTANTS
 */
var ActuatorsManager_CONSTANTS = {

	"Events": {
		"ActuatorAdded": "Actuator Added"
	}

};

/**
 * The result object.
 * 
 * @typedef {Object} SearchResult
 * @memberof ActuatorsManager
 * @type Object
 * @property {(Actuator|null)} STactuator - The Actuator object, may be null.
 * @property {number} position - The position in list.
 * 
 */

/**
 * Actuators manager
 * 
 * @class
 * @property {Actuator[]} actuatorsList - List of Actuators.
 * @property {object} eventEmitter - Object for emit events.
 */

var ActuatorsManager = function () {

	/**
  * @constructs ActuatorsManager
  */

	function ActuatorsManager() {
		_classCallCheck(this, ActuatorsManager);

		this.actuatorsList = [];
		this.eventEmitter = new EventEmitter();

		this.CONSTANTS = ActuatorsManager_CONSTANTS;
	}

	/**
  * Adds actuator
  * 
  * @param {Actuator} act - Actuator object
  */


	_createClass(ActuatorsManager, [{
		key: "addActuator",
		value: function addActuator(act) {

			var amng = this;

			var actSearch = amng.getActuatorByID(act.config.id);

			if (actSearch.STactuator !== null) {
				throw "Actuator ID already exists.";
			}

			amng.actuatorsList.push(act);

			// Emit message ActuatorAdded
			amng.eventEmitter.emit(amng.CONSTANTS.Events.ActuatorAdded, act);
		}

		/**
   * Returns Actuator searched by ID
   * 
   * @param {string} actuatorID - Actuator ID
   * @returns {ActuatorsManager.SearchResult} result - Result object
   */

	}, {
		key: "getActuatorByID",
		value: function getActuatorByID(actuatorID) {

			var amng = this;
			var actuator = null;
			var _i = 0;

			_i = amng.actuatorsList.map(function (x) {
				return x.config.id;
			}).indexOf(actuatorID);
			if (_i !== -1) {
				actuator = amng.actuatorsList[_i];
			}

			return {
				"STactuator": actuator,
				"position": _i
			};
		}

		/**
   * Turn off actuators
   */

	}, {
		key: "turnOffActuators",
		value: function turnOffActuators() {

			var amng = this;
			var actList = amng.actuatorsList;

			actList.forEach(function (act_, _i) {
				if (act_.actuatorEngine !== null) {
					act_.actuatorEngine.stopEngine();
				}
			});

			console.log('<*> ActuatorsManager.turnOffActuators'); // TODO REMOVE DEBUG LOG
		}
	}]);

	return ActuatorsManager;
}();

var _Lib = {
	"ActuatorsManager_CONSTANTS": ActuatorsManager_CONSTANTS,
	"ActuatorsManager": ActuatorsManager
};

module.exports = _Lib;
//# sourceMappingURL=ActuatorsManager.js.map

"use strict";

/*
 SomeThings Actuators services library

 
*/

/**
 * ActuatorsServices CONSTANTS
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActuatorsServices_CONSTANTS = {

	"Messages": {

		"getActuatorsList": "Get Actuators List",
		"ActuatorsList": "Actuators List",
		"getActuatorInfo": "Get Actuator Info",
		"ActuatorInfo": "Actuator Info",
		"getActuatorOptions": "Get Actuator Options",
		"setActuatorOptions": "Set Actuator Options",
		"ActuatorOptions": "Actuator Options",
		"ActuatorOptionsUpdated": "Actuator Options Updated",

		"StartActuator": "StartActuator",
		"ActuatorStarted": "ActuatorStarted",
		"StopActuator": "StopActuator",
		"ActuatorStopped": "ActuatorStopped",

		"TurnOffActuators": "TurnOffActuators"
	}

};

/**
 * Actuators Services
 * 
 * manages the control messages related to actuators
 * 
 * @class
 * @property {ActuatorsManager} actuatorsManager - Actuators manager.
 * @property {object} controlChannel - Object for control channel.
 * 
 */

var ActuatorsServices = function () {

	/**
  * @constructs ActuatorsServices
  * 
  * @param {ActuatorsManager} actuatorsManager - Actuators manager
  * @param {object} controlChannel - Control channel object
  */

	function ActuatorsServices(actuatorsManager, controlChannel) {
		_classCallCheck(this, ActuatorsServices);

		var ssrv = this;

		ssrv.CONSTANTS = ActuatorsServices_CONSTANTS;
		ssrv.actuatorsManager = actuatorsManager;
		ssrv.controlChannel = controlChannel;
	}

	/**
  * Initialize
  */


	_createClass(ActuatorsServices, [{
		key: "initialize",
		value: function initialize() {

			var service = this;

			if (service.actuatorsManager === undefined || service.actuatorsManager === null) {
				throw "Actuators manager is required";
			}

			if (service.controlChannel === undefined || service.controlChannel === null) {
				throw "Control channel is required";
			}

			service._mapControlEvents(service.actuatorsManager);
			service._mapControlMessages(service.controlChannel.socket, {
				"service": service
			});
		}

		/**
   * Map control events
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(actuatorsManager) {}

		/**
   * Map control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {ActuatorsServices} [options.service] - Actuators Service object
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket, options) {

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			if (service._mapped !== undefined && service._mapped === true) {
				throw "control messages already mapped.";
			}

			if (socket === undefined) {
				socket = service.controlChannel.socket;
			}

			socket.on("connect", function (data) {
				if (service._mapped !== true) {
					service._mapControlMessages(socket, {
						"service": service
					});
				}
			});

			socket.on("disconnect", function (data) {
				service._unmapControlMessages(socket, {
					"service": service
				});
			});

			service._mapped = true;
		}

		/**
   * Unmap control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {ActuatorsServices} [options.service] - Actuators Service object
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket, options) {

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			if (service._mapped === undefined || service._mapped !== true) {
				throw "control messages not already mapped.";
			}

			if (socket === undefined) {
				socket = service.controlChannel.socket;
			}
		}
	}]);

	return ActuatorsServices;
}();

var _lib = {

	"ActuatorsServices_CONSTANTS": ActuatorsServices_CONSTANTS,
	"ActuatorsServices": ActuatorsServices
};

module.exports = _lib;
//# sourceMappingURL=ActuatorsServices.js.map

"use strict";

/**
 * SensorsManager
 * 
 * Generic manager for Sensors
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
 * SensorsManager CONSTANTS
 */
var SensorsManager_CONSTANTS = {

	"Events": {
		"SensorAdded": "Sensor added",
		"SensorOptionsUpdated": "Sensor Options Updated"
	}
};

/**
 * The result object.
 * 
 * @typedef {Object} SearchResult
 * @memberof SensorsManager
 * @type Object
 * @property {(Sensor|null)} STsensor - The Sensor object, may be null.
 * @property {number} position - The position in list.
 * 
 */

/**
 * Sensors Manager
 * 
 * @class
 * @property {Sensor[]} sensorsList - List of Sensors.
 * @property {object} eventEmitter - Object for emit events.
 * 
 */

var SensorsManager = function () {

	/**
  * @constructs SensorsManager
  */

	function SensorsManager() {
		_classCallCheck(this, SensorsManager);

		this.sensorsList = [];
		this.eventEmitter = new EventEmitter();

		this.CONSTANTS = SensorsManager_CONSTANTS;
	}

	/**
  * Add sensor
  * 
  * @param {Sensor} sensor - The Sensor object
  */


	_createClass(SensorsManager, [{
		key: "addSensor",
		value: function addSensor(sensor) {

			var smng = this;

			var sensorSearch = smng.getSensorByID(sensor.config.id);

			if (sensorSearch.STsensor !== null) {
				throw "Sensor ID already exists.";
			}

			smng.sensorsList.push(sensor);

			// Emit message SensorAdded
			smng.eventEmitter.emit(smng.CONSTANTS.Events.SensorAdded, sensor);
		}

		/**
   * Returns Sensor searched by ID
   * 
   * @param {String} sensorID - Sensor ID
   * @returns {SensorsManager.SearchResult} result - Result object
   *  
   */

	}, {
		key: "getSensorByID",
		value: function getSensorByID(sensorID) {

			var smng = this;

			var sensor = null;
			var _i = 0;

			_i = smng.sensorsList.map(function (x) {
				return x.config.id;
			}).indexOf(sensorID);
			if (_i !== -1) {
				sensor = smng.sensorsList[_i];
			}

			return {
				"STsensor": sensor,
				"position": _i
			};
		}

		/**
   * Turn off sensors
   */

	}, {
		key: "turnOffSensors",
		value: function turnOffSensors() {

			var smng = this;
			var snsList = smng.sensorsList;

			snsList.forEach(function (sns_, _i) {
				if (sns_.sensorEngine !== null) {
					sns_.sensorEngine.stopEngine();
				}
			});

			console.log('<*> SensorsManager.turnOffSensors'); // TODO REMOVE DEBUG LOG
		}
	}]);

	return SensorsManager;
}();

var SensorsManager_Lib = {
	"SensorsManager": SensorsManager,
	"CONSTANTS": SensorsManager_CONSTANTS

};

module.exports = SensorsManager_Lib;
//# sourceMappingURL=SensorsManager.js.map

"use strict";

/*
 SomeThings Sensors services library

*/

/**
 * Sensors services constants
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SensorsServices_CONSTANTS = {

	"Messages": {

		"getSensorsList": "Get Sensors List",
		"SensorsList": "Sensors List",
		"getSensorInfo": "Get Sensor Info",
		"SensorInfo": "Sensor Info",
		"getSensorOptions": "Get Sensor Options",
		"SensorOptions": "Sensor Options",
		"setSensorOptions": "Set Sensor Options",
		"SensorOptionsUpdated": "Sensor Options Updated",

		"StartSensor": "StartSensor",
		"SensorStarted": "SensorStarted",
		"StopSensor": "StopSensor",
		"SensorStopped": "SensorStopped",

		"TurnOffSensors": "TurnOffSensors"

	}

};

/**
 * Sensors Services
 * 
 * <pre>
 * manages the control messages related to sensors
 * </pre>
 * 
 * @class
 */

var SensorsServices = function () {

	/**
  * 
  * @constructs SensorsServices
  * 
  * @param {SensorsManager} sensorsManager - Sensors manager object
  * @param {object} controlChannel - Control channel object
  */

	function SensorsServices(sensorsManager, controlChannel) {
		_classCallCheck(this, SensorsServices);

		var ssrv = this;

		ssrv.CONSTANTS = SensorsServices_CONSTANTS;
		ssrv.sensorsManager = sensorsManager;
		ssrv.controlChannel = controlChannel;
	}

	/**
  * Initilize
  */


	_createClass(SensorsServices, [{
		key: "initialize",
		value: function initialize() {

			var service = this;

			if (service.sensorsManager === undefined || service.sensorsManager === null) {
				throw "Sensors manager is required";
			}

			if (service.controlChannel === undefined || service.controlChannel === null) {
				throw "Control channel is required";
			}

			try {
				service._mapControlEvents(service.sensorsManager);
			} catch (e) {
				// TODO: handle exception
				throw "Error mapping control events. " + e;
			}

			try {
				service._mapControlMessages(service.controlChannel.socket, {
					"service": service
				});
			} catch (e) {
				// TODO: handle exception
				throw "Error mapping control messages. " + e;
			}
		}

		/**
   * Map control events
   * 
   * @param {SensorsManager} sensorsManager - Sensors manager object.
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(sensorsManager) {

			var service = this;

			if (sensorsManager === undefined) {
				sensorsManager = service.sensorsManager;
			}
		}

		/**
   * Map control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {SensorsServices} [options.service] - Sensors Service object
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket, options) {

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			if (service._mapped !== undefined && service._mapped === true) {
				throw "control messages already mapped.";
			}

			if (socket === undefined) {
				socket = service.controlChannel.socket;
			}

			socket.on("connect", function (data) {
				if (service._mapped !== true) {
					service._mapControlMessages(socket, {
						"service": service
					});
				}
			});

			socket.on("disconnect", function (data) {
				service._unmapControlMessages(socket, {
					"service": service
				});
			});

			service._mapped = true;
		}

		/**
   * Unmap control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {SensorsServices} [options.service] - Sensors Service object
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket, options) {

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			if (service._mapped === undefined || service._mapped !== true) {
				throw "control messages not already mapped.";
			}

			if (socket === undefined) {
				socket = service.controlChannel.socket;
			}
		}
	}]);

	return SensorsServices;
}();

var _lib = {

	"SensorsServices_CONSTANTS": SensorsServices_CONSTANTS,
	"SensorsServices": SensorsServices

};

module.exports = _lib;
//# sourceMappingURL=SensorsServices.js.map

"use strict";

/*
 SomeThings Engines services library

*/

/**
 * Import ActuatorsManager
 * @ignore
 */

var ActuatorsManager = require('./ActuatorsManager.js');

/**
 * Import SensorsManager
 * @ignore
 */
var SensorsManager = require('./SensorsManager.js');

var stNGNservices_Lib = {

  "ActuatorsManager": ActuatorsManager,
  "SensorsManager": SensorsManager

};

module.exports = stNGNservices_Lib;
//# sourceMappingURL=stNGNServices_lib.js.map

"use strict";

/**
 * Import EventEmitter
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;

/**
 * Import ActuatorEngine
 * @ignore
 */
var ActuatorEngine = require('../ActuatorEngine.js');

/**
 * ST Actuator Dummy01
 * 
 * <pre>
 * Actuator for tests
 * </pre>
 * 
 * @class
 * @implements ActuatorEngine
 * 
 */

var STActuator_Dummy01 = function (_ActuatorEngine) {
	_inherits(STActuator_Dummy01, _ActuatorEngine);

	/**
  * @constructs STActuator_Dummy01
  * 
  * @param {object} config - Configuration object
  */

	function STActuator_Dummy01(config) {
		_classCallCheck(this, STActuator_Dummy01);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(STActuator_Dummy01).call(this, config));

		_this._lastTime = null;
		_this._lastActuatorDATA = {
			"time": null,
			"data": null
		};
		return _this;
	}

	/**
  * Initialize
  */


	_createClass(STActuator_Dummy01, [{
		key: 'initialize',
		value: function initialize() {

			var stActuator = this;
			var actOptions = stActuator.config.options;

			stActuator._ticks = 0;

			// Map event MainLoop_Tick
			stActuator.eventEmitter.on(stActuator.CONSTANTS.Events.MainLoop_Tick, function () {

				stActuator._ticks++;

				if (stActuator._ticks >= actOptions.ticks) {

					stActuator._ticks = 0;
					stActuator._lastTime = new Date().getTime();

					if (actOptions.showTime) {
						console.log(' <~~~> Time: ' + stActuator._lastTime); // TODO REMOVE DEBUG LOG
					}

					if (actOptions.showDeltaTime) {
						if (stActuator._deltaTimeRef !== undefined) {
							var deltaTime = stActuator._lastTime - stActuator._deltaTimeRef;
							console.log(' <~~~> DetalTime: ' + deltaTime); // TODO REMOVE DEBUG LOG
						}
						stActuator._deltaTimeRef = stActuator._lastTime;
					}
				}
			});

			// Map event ActuatorData
			stActuator.eventEmitter.on(stActuator.CONSTANTS.Events.ActuatorData, function (data) {
				stActuator._event_ActuatorData(data);
			});

			_get(Object.getPrototypeOf(STActuator_Dummy01.prototype), 'initialize', this).call(this);
		}

		/**
   * Start engine
   */

	}, {
		key: 'startEngine',
		value: function startEngine() {

			var stActuator = this;
			stActuator.mainLoop();

			stActuator.eventEmitter.emit(stActuator.CONSTANTS.Events.ActuatorEngine_Start);
		}

		/**
   * Stop engine
   */

	}, {
		key: 'stopEngine',
		value: function stopEngine() {

			var stActuator = this;
			stActuator.stopMainLoop();

			// MainLoop_Stop
			stActuator.eventEmitter.emit(stActuator.CONSTANTS.Events.ActuatorEngine_Stop);
		}

		/**
   * Get options
   */

	}, {
		key: 'getOptions',
		value: function getOptions() {

			var stActuator = this;
			var actOptions = stActuator.config.options;

			var options = {
				"ticks": actOptions.ticks,
				"showTime": actOptions.showTime,
				"showDeltaTime": actOptions.showDeltaTime
			};

			return options;
		}

		/**
   * Set options
   */

	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			var stActuator = this;

			if (stActuator.state === stActuator.CONSTANTS.States.State_Working) {
				throw "Bad actuator state.";
			}

			var actOptions = stActuator.config.options;

			if (options.ticks) {
				actOptions.ticks = options.ticks;
			}

			if (options.showTime !== undefined) {
				actOptions.showTime = options.showTime;
			}

			if (options.showDeltaTime !== undefined) {
				actOptions.showDeltaTime = options.showDeltaTime;
			}
		}

		/**
   * Event ActuatorData
   */

	}, {
		key: '_event_ActuatorData',
		value: function _event_ActuatorData(data) {

			var stActuator = this;

			stActuator._lastActuatorDATA.data = data;
			stActuator._lastActuatorDATA.time = new Date().getTime();

			console.log('<*> STActuator_Dummy01.Events.ActuatorData'); // TODO REMOVE DEBUG LOG
			console.log(stActuator._lastActuatorDATA); // TODO REMOVE DEBUG LOG
		}
	}]);

	return STActuator_Dummy01;
}(ActuatorEngine);

module.exports = STActuator_Dummy01;
//# sourceMappingURL=stActuator_Dummy01.js.map

"use strict";

/**
 * ST Sensor Dummy01
 * 
 * 
 * Sensor for made some tests..
 * 
 * 
 * 
 * 
 * 
 * 
 */

/*
 * Example of well implemented node engine in node-red
 * @see http://nodered.org/docs/creating-nodes/first-node
 * 
 
 module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("lower-case",LowerCaseNode);
}
 
 */

/**
 * Import SensorEngine
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SensorEngine = require('../SensorEngine.js').SensorEngine;

/** 
 * Import EventEmitter
 * @ignore
 */
var EventEmitter = require('events').EventEmitter;

/**
 * ST Sensor Dummy01
 * 
 * @class
 * @implements SensorEngine
 */

var STSensor_Dummy01 = function (_SensorEngine) {
	_inherits(STSensor_Dummy01, _SensorEngine);

	/**
  * @constructs STSensor_Dummy01
  * 
  * @param {object} config - Configuration object
  */

	function STSensor_Dummy01(config) {
		_classCallCheck(this, STSensor_Dummy01);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(STSensor_Dummy01).call(this, config));

		_this._lastTime = null;
		return _this;
	}

	/**
  * Initialize
  */


	_createClass(STSensor_Dummy01, [{
		key: 'initialize',
		value: function initialize() {

			var stSensor = this;
			stSensor._ticks = 0;

			// Map event MainLoop_Tick
			stSensor.eventEmitter.on(stSensor.CONSTANTS.Events.MainLoop_Tick, function () {

				stSensor._ticks++;
				if (stSensor._ticks >= stSensor.config.options.ticks) {

					stSensor._ticks = 0;

					// Emit event SensorData
					stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, { "ticks": stSensor.config.options.ticks });

					console.log('<*> STSensor_Dummy01.Events.SensorData'); // TODO REMOVE DEBUG LOG

					stSensor._lastTime = new Date().getTime();

					if (stSensor.config.options.showTime) {
						console.log(' <~~~> Time: ' + stSensor._lastTime); // TODO REMOVE DEBUG LOG
					}

					if (stSensor.config.options.showDeltaTime) {

						if (stSensor._deltaTimeRef !== undefined) {
							var deltaTime = stSensor._lastTime - stSensor._deltaTimeRef;
							console.log(' <~~~> DetalTime: ' + deltaTime); // TODO REMOVE DEBUG LOG
						}

						stSensor._deltaTimeRef = stSensor._lastTime;
					}
				}
			});

			_get(Object.getPrototypeOf(STSensor_Dummy01.prototype), 'initialize', this).call(this);
		}

		/**
   * Start engine
   * 
   * @fires SensorEngine#SensorEngine_Start
   * 
   */

	}, {
		key: 'startEngine',
		value: function startEngine() {

			var stSensor = this;

			stSensor.mainLoop();

			// Emit event SensorEngine_Start
			stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorEngine_Start);
		}

		/**
   * Stop engine
   * 
   * @fires SensorEngine#SensorEngine_Stop
   * 
   */

	}, {
		key: 'stopEngine',
		value: function stopEngine() {

			var stSensor = this;

			stSensor.stopMainLoop();

			// Emit event SensorEngine_Stop
			// for MainLoop_Stop
			stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorEngine_Stop);
		}

		/**
   * Get options
   * 
   * @override
   */

	}, {
		key: 'getOptions',
		value: function getOptions() {

			var stSensor = this;
			var snsOptions = stSensor.config.options;

			var options = {
				"ticks": snsOptions.ticks,
				"showTime": snsOptions.showTime,
				"showDeltaTime": snsOptions.showDeltaTime
			};

			return options;
		}

		/**
   * Set options
   * 
   * @param {object} options - Options object
   * @param {number} [options.ticks] - Ticks 
   * @param {boolean} [options.showTime] - Show time
   * @param {boolean} [options.showDeltaTime] - Show delta time 
   */

	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			var stSensor = this;

			if (stSensor.state === stSensor.CONSTANTS.States.SEstate_Working) {
				throw "Bad sensor state.";
			}

			var actOptions = stSensor.config.options;

			if (options.ticks) {
				actOptions.ticks = options.ticks;
			}

			if (options.showTime !== undefined) {
				actOptions.showTime = options.showTime;
			}

			if (options.showDeltaTime !== undefined) {
				actOptions.showDeltaTime = options.showDeltaTime;
			}
		}
	}]);

	return STSensor_Dummy01;
}(SensorEngine);

module.exports = STSensor_Dummy01;
//# sourceMappingURL=stSensor_Dummy01.js.map

"use strict";

/**
 * import SensorEngine
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SensorEngine = require('../SensorEngine.js').SensorEngine;

/**
 * import EventEmitter
 * @ignore
 */
var EventEmitter = require('events').EventEmitter;

/**
 * import Cylon
 * @ignore
 */
var Cylon = require('cylon');

/**
 * ST Sensor Keyboard
 * 
 * <pre>
 * Sensor for tests.
 * Uses Cylon library.
 * </pre>
 * 
 * @class
 * @implements SensorEngine
 * 
 */

var STSensor_Keyboard = function (_SensorEngine) {
	_inherits(STSensor_Keyboard, _SensorEngine);

	/**
  * @constructs STSensor_Keyboard
  * 
  * @param {object} config - Configuration object
  */

	function STSensor_Keyboard(config) {
		_classCallCheck(this, STSensor_Keyboard);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(STSensor_Keyboard).call(this, config));

		_this._CylonRobot = null;
		_this._CylonRobotState = "stop";

		return _this;
	}

	/**
  * Initialize
  */


	_createClass(STSensor_Keyboard, [{
		key: 'initialize',
		value: function initialize() {

			var stSensor = this;

			stSensor._CylonRobot = Cylon.robot({

				connections: {
					keyboard: { adaptor: 'keyboard' }
				},

				devices: {
					keyboard: { driver: 'keyboard' }
				},

				work: function work(my) {

					//			 
					//		    my.keyboard.on('a', function(key) {
					//		      stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, {"key":"a"});
					//		    });
					//		    my.keyboard.on('b', function(key) {
					//			      stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, {"key":"b"});
					//		    });

					my.keyboard.on("up", function () {
						if (stSensor._CylonRobotState !== "working") {
							return;
						}
						console.log("UP!");
						stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, { "key": "up" });
					});

					my.keyboard.on("down", function () {
						if (stSensor._CylonRobotState !== "working") {
							return;
						}
						console.log("DOWN!");
						stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, { "key": "down" });
					});

					my.keyboard.on("left", function () {
						if (stSensor._CylonRobotState !== "working") {
							return;
						}
						console.log("LEFT!");
						stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, { "key": "left" });
					});

					my.keyboard.on("RIGHT", function () {
						if (stSensor._CylonRobotState !== "working") {
							return;
						}
						console.log("RIGHT!");
						stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, { "key": "RIGHT" });
					});
				}

			});

			_get(Object.getPrototypeOf(STSensor_Keyboard.prototype), 'initialize', this).call(this);
			this._CylonRobotState = "ready";
		}

		/**
   * Start engine
   */

	}, {
		key: 'startEngine',
		value: function startEngine() {
			if (this._CylonRobotState === "ready") {
				this._CylonRobot.start();
			}

			this._CylonRobotState = "working";
			this.eventEmitter.emit(this.CONSTANTS.Events.SensorEngine_Start);
		}

		/**
   * Stop engine
   */

	}, {
		key: 'stopEngine',
		value: function stopEngine() {
			//		this._CylonRobot.halt();
			//		Cylon.halt();
			this._CylonRobotState = "stop";
			this.eventEmitter.emit(this.CONSTANTS.Events.SensorEngine_Stop);
		}
	}]);

	return STSensor_Keyboard;
}(SensorEngine);

module.exports = STSensor_Keyboard;
//# sourceMappingURL=stSensor_Keyboard.js.map

"use strict";

/**
 * import express
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');

/**
 * import bodyParser
 * @ignore
 */
var bodyParser = require('body-parser');

/**
 * Routes for Actuators
 * 
 * @class
 * 
 * @property {object} expressRoute - Express route object
 * @property {number} messages - Messages counter
 * @property {ActuatorsManager} actuatorsManager - Actuators manager object
 * 
 */

var SCS_RouteActuators = function () {

	/**
  * @constructs SCS_RouteActuators
  * 
  * @param {ActuatorsManager} actuatorsManager - Actuators manager object
  */

	function SCS_RouteActuators(actuatorsManager) {
		_classCallCheck(this, SCS_RouteActuators);

		this.expressRoute = null;
		this.messages = 0;
		this.actuatorsManager = actuatorsManager;

		this.mapServiceRoutes();
	}

	/**
  * Map service routes
  */


	_createClass(SCS_RouteActuators, [{
		key: 'mapServiceRoutes',
		value: function mapServiceRoutes() {

			var routerActuators = this;

			routerActuators.expressRoute = express.Router();

			// create application/json parser
			var jsonParser = bodyParser.json();

			// middleware that is specific to this router
			routerActuators.expressRoute.use(function messageCount(req, res, next) {
				routerActuators.messages++;

				//			res.setHeader('Content-Type', 'text/html');
				//			res.write('ST Server Nodes <br />', 'utf8')

				res.setHeader('Content-Type', 'application/json');
				next();
			});

			// define the home page route
			routerActuators.expressRoute.get('/', function (req, res) {
				//			res.write('Messages received: ' + routerActuators.messages + '<br />');
				//			res.end();
				var _response = {
					"context": "ST Server Actuators",
					"action": "Default",
					"messagesReceived": routerActuators.messages

				};
				res.jsonp(_response);
				res.end();
			});

			// List of Actuators
			routerActuators.expressRoute.get('/list/', function (req, res) {

				var _response = {
					"context": "ST Server Actuators",
					"action": "list",
					"numberOfActuators": 0,
					"actuators": []
				};

				var _i = 0;
				for (_i = 0; _i < routerActuators.actuatorsManager.actuatorsList.length; _i++) {
					var actuator = routerActuators.actuatorsManager.actuatorsList[_i];

					var actuatorData = {
						"actuatorID": actuator.config.actuatorID,
						"type": actuator.config.type,
						"_sysID": actuator.config._sysID
					};
					_response.actuators.push(actuatorData);
				}

				_response.numberOfActuators = routerActuators.actuatorsManager.actuatorsList.length;

				res.jsonp(_response);
				res.end();
			});

			// Get Actuator options
			routerActuators.expressRoute.get('/:actuatorID/options', function (req, res) {

				console.log(' <*> SeverControlService Get Actuator Options'); // TODO REMOVE DEBUG LOG

				var amngr = routerActuators.actuatorsManager;
				var actuatorID = req.params.actuatorID;

				var _response = {
					"context": "ST Server Actuators",
					"action": "Get Options of Actuator",
					"actuatorID": actuatorID
				};

				try {

					var actuatorSearch = amngr.getActuatorBy_sysID(actuatorID);
					if (actuatorSearch.stActuator === null) {
						throw "Actuator not found";
					}

					var stActuator = actuatorSearch.stActuator;

					_response.options = stActuator.options;
				} catch (e) {
					// TODO: handle exception

					_response.response = 'Something happends...';
					_response.error = e;
				}

				res.jsonp(_response);
				res.end();
			});

			// Set Actuator options
			routerActuators.expressRoute.post('/:actuatorID/options', jsonParser, function (req, res) {

				console.log(' <*> SeverControlService Set Actuator Options'); // TODO REMOVE DEBUG LOG

				var amngr = routerActuators.actuatorsManager;
				var actuatorID = req.params.actuatorID;

				var options = req.body.options;

				var _response = {
					"context": "ST Server Actuators",
					"action": "Set Options of Actuator",
					"actuatorID": actuatorID,
					"options": options
				};

				try {

					var actuatorSearch = amngr.getActuatorBy_sysID(actuatorID);
					if (actuatorSearch.stActuator === null) {
						throw "Actuator not found";
					}

					var stActuator = actuatorSearch.stActuator;
					stActuator.setOptions(options);
				} catch (e) {
					// TODO: handle exception

					_response.response = 'Something happends...';
					_response.error = e;
				}

				res.jsonp(_response);
				res.end();
			});

			// Start Actuator
			routerActuators.expressRoute.get('/:actuatorID/start', function (req, res) {

				console.log(' <*> SeverControlService Actuator Start'); // TODO REMOVE DEBUG LOG

				var amngr = routerActuators.actuatorsManager;
				var actuatorID = req.params.actuatorID;

				var _response = {
					"context": "ST Server Actuators",
					"action": "Start",
					"actuatorID": req.params.actuatorID,
					"response": "test"
				};

				try {

					var actuatorSearch = amngr.getActuatorBy_sysID(actuatorID);
					if (actuatorSearch.stActuator !== null) {
						actuatorSearch.stActuator.start().then(function (value) {
							console.log(value); // TODO REMOVE DEBUG LOG
							console.log(' <*> Actuator Started'); // TODO REMOVE DEBUG LOG
						}, function (reason) {});
					} else {
						_response.response = 'Actuator not found.';
					}
				} catch (e) {
					// TODO: handle exception

					_response.response = 'Something happends...';
					_response.error = e.message;
				}

				res.jsonp(_response);
				res.end();
			});

			// Stop Actuator
			routerActuators.expressRoute.get('/:actuatorID/stop', function (req, res) {

				console.log(' <*> SeverControlService Actuator Stop'); // TODO REMOVE DEBUG LOG

				var amngr = routerActuators.actuatorsManager;
				var actuatorID = req.params.actuatorID;

				var _response = {
					"context": "ST Server Actuators",
					"action": "Stop",
					"actuatorID": req.params.actuatorID,
					"response": "test"
				};

				try {

					var actuatorSearch = amngr.getActuatorBy_sysID(actuatorID);
					if (actuatorSearch.stActuator !== null) {
						actuatorSearch.stActuator.stop().then(function (value) {
							console.log(value); // TODO REMOVE DEBUG LOG
							console.log(' <*> Actuator Stopped'); // TODO REMOVE DEBUG LOG
						}, function (reason) {
							console.log(reason); // TODO REMOVE DEBUG LOG
						});
					} else {
							_response.response = 'Actuator not found.';
						}
				} catch (e) {
					// TODO: handle exception

					_response.response = 'Something happends...';
					_response.error = e.message;
				}

				res.jsonp(_response);
				res.end();
			});

			// Turn off Actuators of Node
			routerActuators.expressRoute.get('/:nodeID/turnOffActuators', function (req, res) {

				console.log(' <*> SeverControlService Actuators turnOffActuators'); // TODO REMOVE DEBUG LOG

				var _response = {
					"context": "ST Server Actuators",
					"action": "Turn off actuators",
					"sensorID": req.params.nodeID,
					"response": "test"
				};

				try {

					routerActuators.actuatorsManager.turnOffActuatorsOfNode(req.params.nodeID);
				} catch (e) {
					// TODO: handle exception

					_response.response = 'Something happends...';
					_response.error = e.message;
				}

				res.jsonp(_response);
				res.end();
			});
		}
	}]);

	return SCS_RouteActuators;
}();

module.exports = SCS_RouteActuators;
//# sourceMappingURL=SCS_RouteActuators.js.map

"use strict";

/**
 * import express
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');

/**
 * import SCS_RouteSensors
 * @ignore
 */
var SCS_RouteSensors = require('./SCS_RouteSensors.js');

/**
 * import SCS_RouteActuators
 * @ignore
 */
var SCS_RouteActuators = require('./SCS_RouteActuators.js');

/**
 * Routes for Engines
 * 
 * <pre>
 * Use with Server control service
 * </pre>
 * 
 * @class 
 * @property {object} expressRoute - Express route object
 * @property {number} messages - Messages counter
 * @property {SensorsManager} sensorsManager - Sensors manager object
 * @property {ActuatorsManager} actuatorsManager - Actuators manager object
 * @property {object} routesforSersors - Express route object for Sensors
 * @property {object} routesforActuators - Express route object for Sensors
 * 
 */

var SCS_RouteEngines = function () {

	/**
  * @constructs SCS_RouteEngines
  * 
  * @param {SensorsManager} sensorsManager - Sensors manager object
  * @param {ActuatorsManager} actuatorsManager - Actuators manager object
  */

	function SCS_RouteEngines(sensorsManager, actuatorsManager) {
		_classCallCheck(this, SCS_RouteEngines);

		var scs_Routes = this;

		scs_Routes.expressRoute = null;
		scs_Routes.messages = 0;

		scs_Routes.sensorsManager = sensorsManager;
		scs_Routes.actuatorsManager = actuatorsManager;

		scs_Routes.routesforSersors = null;
		scs_Routes.routesforActuators = null;

		scs_Routes.initialize();
		scs_Routes.mapServiceRoutes();
	}

	/**
  * Initialize
  */


	_createClass(SCS_RouteEngines, [{
		key: 'initialize',
		value: function initialize() {

			var scs_Routes = this;

			if (scs_Routes.expressRoute !== null) {
				throw "Already initialized";
			}

			scs_Routes.expressRoute = express.Router();

			scs_Routes.routesforSersors = new SCS_RouteSensors(scs_Routes.sensorsManager);
			scs_Routes.routesforActuators = new SCS_RouteActuators(scs_Routes.actuatorsManager);
		}

		/**
   * Map service routes
   */

	}, {
		key: 'mapServiceRoutes',
		value: function mapServiceRoutes() {

			var routerNet = this;

			if (routerNet.expressRoute === null) {
				throw "Not initialized";
			}

			routerNet.expressRoute.use('/Sensors', routerNet.routesforSersors.expressRoute);
			routerNet.expressRoute.use('/Actuators', routerNet.routesforActuators.expressRoute);
		}
	}]);

	return SCS_RouteEngines;
}();

module.exports = SCS_RouteEngines;
//# sourceMappingURL=SCS_RouteEngines.js.map

"use strict";

/**
 * import express
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');

/**
 * import bodyParser
 * @ignore
 */
var bodyParser = require('body-parser');

/**
 * Routes for Sensors
 * 
 * @class
 * @property {object} expressRoute - Express route object
 * @property {number} messages - Messages counter
 * @property {SensorsManager} sensorsManager - Sensors manager object
 */

var SCS_RouteSensors = function () {

	/**
  * @constructs SCS_RouteSensors
  * 
  * @param {SensorsManager} sensorsManager - Sensors manager object
  */

	function SCS_RouteSensors(sensorsManager) {
		_classCallCheck(this, SCS_RouteSensors);

		this.expressRoute = null;
		this.messages = 0;
		this.sensorsManager = sensorsManager;

		this.mapServiceRoutes();
	}

	/**
  * Map service routes
  */


	_createClass(SCS_RouteSensors, [{
		key: 'mapServiceRoutes',
		value: function mapServiceRoutes() {

			var routerSensors = this;
			routerSensors.expressRoute = express.Router();

			// create application/json parser
			var jsonParser = bodyParser.json();

			// middleware that is specific to this router
			routerSensors.expressRoute.use(function messageCount(req, res, next) {
				routerSensors.messages++;

				//			res.setHeader('Content-Type', 'text/html');
				//			res.write('ST Server Nodes <br />', 'utf8')

				res.setHeader('Content-Type', 'application/json');
				next();
			});

			// define the home page route
			routerSensors.expressRoute.get('/', function (req, res) {

				//			res.write('Messages received: ' + routerNodes.messages + '<br />');
				//			res.end();

				var _response = {
					"context": "ST Server Sensors",
					"action": "Default",
					"messagesReceived": routerSensors.messages

				};

				res.jsonp(_response);
				res.end();
			});

			// List of Sensors
			routerSensors.expressRoute.get('/list/', function (req, res) {

				var smngr = routerSensors.sensorsManager;

				var _response = {
					"context": "ST Server Sensors",
					"action": "List",
					"numberOfSensors": 0,
					"sensors": []
				};

				smngr.sensorsList.forEach(function (sns_, _i) {
					var sensorData = {
						"sensorID": sns_.config.sensorID,
						"type": sns_.config.type,
						"_sysID": sns_.config._sysID
					};
					_response.sensors.push(sensorData);
				});

				_response.numberOfSensors = routerSensors.sensorsManager.sensorsList.length;

				res.jsonp(_response);
				res.end();
			});

			// Get Sensor options
			routerSensors.expressRoute.get('/:sensorID/options', function (req, res) {

				console.log(' <*> SeverControlService Get Sensor Options'); // TODO REMOVE DEBUG LOG

				var smngr = routerSensors.sensorsManager;
				var sensorID = req.params.sensorID;

				var _response = {
					"context": "ST Server Sensors",
					"action": "Get Options of Sensor",
					"sensorID": sensorID
				};

				try {

					var sensorSearch = smngr.getSensorBy_sysID(sensorID);
					if (sensorSearch.stSensor === null) {
						throw "Sensor not found";
					}

					var stSensor = sensorSearch.stSensor;

					_response.options = stSensor.options;
				} catch (e) {
					// TODO: handle exception

					_response.response = 'Something happends...';
					_response.error = e;
				}

				res.jsonp(_response);
				res.end();
			});

			// Set Sensor options
			routerSensors.expressRoute.post('/:sensorID/options', jsonParser, function (req, res) {

				console.log(' <*> SeverControlService Set Sensor Options'); // TODO REMOVE DEBUG LOG

				var smngr = routerSensors.sensorsManager;
				var sensorID = req.params.sensorID;

				var options = req.body.options;

				var _response = {
					"context": "ST Server Sensors",
					"action": "Set Options of Sensor",
					"sensorID": sensorID,
					"options": options
				};

				try {

					var sensorSearch = smngr.getSensorBy_sysID(sensorID);
					if (sensorSearch.stSensor === null) {
						throw "Sensor not found";
					}

					var stSensor = sensorSearch.stSensor;

					stSensor.setOptions(options);
				} catch (e) {
					// TODO: handle exception

					_response.response = 'Something happends...';
					_response.error = e;
				}

				res.jsonp(_response);
				res.end();
			});

			// Start Sensor
			routerSensors.expressRoute.get('/:sensorID/start', function (req, res) {

				console.log(' <*> SeverControlService Sensor Start'); // TODO REMOVE DEBUG LOG

				var smngr = routerSensors.sensorsManager;
				var sensorID = req.params.sensorID;

				var _response = {
					"context": "ST Server Sensors",
					"action": "Start",
					"sensorID": sensorID,
					"response": "test"
				};

				try {

					var sensorSearch = smngr.getSensorBy_sysID(sensorID);
					if (sensorSearch.stSensor !== null) {
						sensorSearch.stSensor.start().then(function (value) {
							console.log(value); // TODO REMOVE DEBUG LOG
							console.log(' <*> Sensor Started'); // TODO REMOVE DEBUG LOG
						}, function (reason) {});
					} else {
						_response.response = 'Sensor not found.';
					}
				} catch (e) {
					// TODO: handle exception

					_response.response = 'Something happends...';
					_response.error = e;
				}

				res.jsonp(_response);
				res.end();
			});

			// Stop Sensor
			routerSensors.expressRoute.get('/:sensorID/stop', function (req, res) {

				console.log(' <*> SeverControlService Sensor Stop'); // TODO REMOVE DEBUG LOG

				var smngr = routerSensors.sensorsManager;
				var sensorID = req.params.sensorID;

				var _response = {
					"context": "ST Server Sensors",
					"action": "Stop",
					"sensorID": sensorID,
					"response": "test"
				};

				try {

					var sensorSearch = smngr.getSensorBy_sysID(sensorID);
					if (sensorSearch.stSensor !== null) {
						sensorSearch.stSensor.stop().then(function (value) {
							console.log(value); // TODO REMOVE DEBUG LOG
							console.log(' <*> Sensor Stopped'); // TODO REMOVE DEBUG LOG
						}, function (reason) {});
					} else {
						_response.response = 'Sensor not found.';
					}
				} catch (e) {
					// TODO: handle exception

					_response.response = 'Something happends...';
					_response.error = e;
				}

				res.jsonp(_response);
				res.end();
			});

			// Turn off Sensors of Node
			routerSensors.expressRoute.get('/:nodeID/turnOffSensors', function (req, res) {

				console.log(' <*> SeverControlService Sensors turnOffSensors'); // TODO REMOVE DEBUG LOG

				var smngr = routerSensors.sensorsManager;
				var nodeID = req.params.nodeID;

				var _response = {
					"context": "ST Server Sensors",
					"action": "Turn off sensors",
					"sensorID": nodeID,
					"response": "test"
				};

				try {
					smngr.turnOffSensorsOfNode(nodeID);
				} catch (e) {
					// TODO: handle exception
					_response.response = 'Something happends...';
					_response.error = e;
				}

				res.jsonp(_response);
				res.end();
			});
		}
	}]);

	return SCS_RouteSensors;
}();

module.exports = SCS_RouteSensors;
//# sourceMappingURL=SCS_RouteSensors.js.map
