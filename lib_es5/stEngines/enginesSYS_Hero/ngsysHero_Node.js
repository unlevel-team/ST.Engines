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
