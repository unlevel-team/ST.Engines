"use strict";

/*
 SomeThings Engines System library
 
 version Hero
 for Server

*/

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sensor = require('../Sensor.js');
var SensorEngine = require('../SensorEngine.js');

var NGSystem_Hero_Lib = require('./enginesSYS_Hero.js');
var NGSystem_Hero_CONSTANTS = NGSystem_Hero_Lib.NGSystem_Hero_CONSTANTS;
var NGSystem_Hero = NGSystem_Hero_Lib.NGSystem_Hero;

var SensorsManager_CONSTANTS = require('../services/SensorsManager.js').CONSTANTS;
var SensorsManager = require('../services/SensorsManager.js').SensorsManager;

/**
 * SnsEngineRef
 * 
 * Sensor Engine
 * for role Server
 */

var SnsEngineRef = function (_SensorEngine) {
	_inherits(SnsEngineRef, _SensorEngine);

	function SnsEngineRef(config) {
		_classCallCheck(this, SnsEngineRef);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(SnsEngineRef).call(this, config));
	}

	_createClass(SnsEngineRef, [{
		key: 'initialize',
		value: function initialize() {
			// Overrides parent method...
		}
	}]);

	return SnsEngineRef;
}(SensorEngine);

/**
 * SensorRef
 * 
 * Sensor
 * for role Server
 */


var SensorRef = function (_Sensor) {
	_inherits(SensorRef, _Sensor);

	function SensorRef(config) {
		_classCallCheck(this, SensorRef);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(SensorRef).call(this, config));
	}

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
				stSensor.config._controlSocket.emit(SensorsManager_CONSTANTS.Messages.StartSensor, request);

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
				stSensor.config._controlSocket.emit(SensorsManager_CONSTANTS.Messages.StopSensor, request);
				resolve(request);
			});
		}

		/**
   * Set sensor options
   */

	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			var stSensor = this;
			var socket = stSensor.socket;

			console.log('<*> ST SensorRef.setOptions'); // TODO REMOVE DEBUG LOG
			console.log(options); // TODO REMOVE DEBUG LOG

			// Emit message setSensorOptions
			socket.emit(SensorsManager_CONSTANTS.Messages.setSensorOptions, { "sensorID": stSensor.config.sensorID, "options": options });
		}
	}]);

	return SensorRef;
}(Sensor);

/**
 * NGSYS_Hero_Server_SensorsMNG
 * 
 * Sensors manager
 * for role Server
 * 
 * SomeThings Engines System library
 * version Hero
 */


var NGSYS_Hero_Server_SensorsMNG = function (_SensorsManager) {
	_inherits(NGSYS_Hero_Server_SensorsMNG, _SensorsManager);

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

			_i = smngr.sensorList.map(function (x) {
				return x.config._sysID;
			}).indexOf(sensorID);
			if (_i !== -1) {
				sensor = smngr.sensorList[_i];
			}

			return {
				"stSensor": sensor,
				"position": _i
			};
		}

		/**
   * Returns Sensors searched by nodeID
   */

	}, {
		key: 'getSensorsByNode',
		value: function getSensorsByNode(nodeID) {

			var smngr = this;

			var sensors = smngr.sensorList.filter(function (sensor, _i, _sensors) {

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
   * @sensor Sensor object
   */

	}, {
		key: 'addSensor',
		value: function addSensor(sensor) {

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_SensorsMNG.prototype), 'addSensor', this).call(this, sensor);

			var smng = this;
		}
	}]);

	return NGSYS_Hero_Server_SensorsMNG;
}(SensorsManager);

/**
 * NGSYS_Hero_Server
 */


var NGSYS_Hero_Server = function (_NGSystem_Hero) {
	_inherits(NGSYS_Hero_Server, _NGSystem_Hero);

	function NGSYS_Hero_Server(config) {
		_classCallCheck(this, NGSYS_Hero_Server);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Server).call(this, config));
	}

	_createClass(NGSYS_Hero_Server, [{
		key: 'initialize',
		value: function initialize() {

			_get(Object.getPrototypeOf(NGSYS_Hero_Server.prototype), 'initialize', this).call(this);

			var ngSYS = this;
			var _config = ngSYS.config;

			//		comSYS._service = new COMSys_Morse_Srv_Node(comSYS);
		}
	}]);

	return NGSYS_Hero_Server;
}(NGSystem_Hero);

var _Lib = {
	"NGSYS_Hero_Server": NGSYS_Hero_Server
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_Server.js.map
