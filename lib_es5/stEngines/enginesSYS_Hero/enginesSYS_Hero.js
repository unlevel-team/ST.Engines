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
