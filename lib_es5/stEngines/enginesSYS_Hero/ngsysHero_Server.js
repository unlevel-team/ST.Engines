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
var SensorEngine = require('../SensorEngine.js');

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
