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
let Sensor = require('../Sensor.js');

/**
 * Import SensorEngine
 * @ignore
 */
let SensorEngine = require('../SensorEngine.js').SensorEngine;

/**
 * Import SensorsManager_CONSTANTS
 * @ignore
 */
let SensorsManager_CONSTANTS = require('../services/SensorsManager.js').CONSTANTS;

/**
 * Import SensorsManager
 * @ignore
 */
let SensorsManager = require('../services/SensorsManager.js').SensorsManager;

/**
 * Import SensorsServices_CONSTANTS
 * @ignore
 */
let SensorsServices_CONSTANTS = require('../services/SensorsServices.js').SensorsServices_CONSTANTS;

/**
 * Import NGSYS_Hero_Server_SensorsSRV
 * @ignore
 */
let NGSYS_Hero_Server_SensorsSRV = require('./ngsysHero_ServerSensorsSRV.js').NGSYS_Hero_Server_SensorsSRV;


/**
 * Import Actuator
 * @ignore
 */
let Actuator = require('../Actuator.js');

/**
 * Import ActuatorEngine
 * @ignore
 */
let ActuatorEngine = require('../ActuatorEngine.js').ActuatorEngine;

/**
 * Import ActuatorsManager_CONSTANTS
 * @ignore
 */
let ActuatorsManager_CONSTANTS = require('../services/ActuatorsManager.js').CONSTANTS;

/**
 * Import ActuatorsManager
 * @ignore
 */
let ActuatorsManager = require('../services/ActuatorsManager.js').ActuatorsManager;

/**
 * Import ActuatorsServices_CONSTANTS
 * @ignore
 */
let ActuatorsServices_CONSTANTS = require('../services/ActuatorsServices.js').ActuatorsServices_CONSTANTS;

/**
 * Import NGSYS_Hero_Server_ActuatorsSRV
 * @ignore
 */
let NGSYS_Hero_Server_ActuatorsSRV = require('./ngsysHero_ServerActuatorsSRV.js').NGSYS_Hero_Server_ActuatorsSRV;


/**
 * Import NGSystem_Hero_Lib
 * @ignore
 */
let NGSystem_Hero_Lib = require('./enginesSYS_Hero.js');

/**
 * Import NGSystem_Hero_CONSTANTS
 * @ignore
 */
let NGSystem_Hero_CONSTANTS = NGSystem_Hero_Lib.NGSystem_Hero_CONSTANTS;

/**
 * Import NGSystem_Hero
 * @ignore
 */
let NGSystem_Hero = NGSystem_Hero_Lib.NGSystem_Hero;



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
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.SensorEngine
 */
class SnsEngineRef extends SensorEngine {
	
	/**
	 * @constructs SnsEngineRef
	 * 
	 * @param {object} config - Configuration object
	 */
	constructor(config) {
		
		super(config);
	}
	
	/**
	 * Initialize
	 * 
	 * @override
	 */
	initialize() {
		// Overrides parent method...
	}
	
	
	/**
	 * Main loop
	 * 
	 * @override
	 */
	mainLoop() {
		// Overrides parent method...
	}
	
}


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
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.Sensor
 */
class SensorRef extends Sensor {
	
	/**
	 * @constructs SensorRef
	 * 
	 * @param {object} config - Configuration object

	 */
	constructor(config) {
		
		super(config);
	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		
		let sensor = this;
		
		// initialize sensor engine
		sensor.sensorEngine = new SnsEngineRef( sensor.config.sensorEngine );
	}
	
	
	/**
	 * Start sensor
	 */
	start() {

		let stSensor = this;

		return new Promise(function(resolve, reject) {

			let request = {
				"sensorID" : stSensor.config.sensorID,
				"result" : null

			};

			// Emit message StartSensor
			stSensor.config._controlSocket.emit(SensorsServices_CONSTANTS.Messages.StartSensor , request);

			resolve(request);

		});

	}
	
	
	/**
	 * Stop sensor
	 */
	stop() {

		let stSensor = this;

		return new Promise(function(resolve, reject) {

			let request = {
				"sensorID" : stSensor.config.sensorID,
				"result" : null

			};

			// Emit message StopSensor
			stSensor.config._controlSocket.emit(SensorsServices_CONSTANTS.Messages.StopSensor , request);
			resolve(request);
		});
	}
	
	
	/**
	 * Set sensor options
	 * 
	 * @param {object} options - Options object
	 */
	setOptions(options){
		
		let stSensor = this;
		let socket = stSensor.config._controlSocket;
		
		console.log('<*> ST SensorRef.setOptions');	// TODO REMOVE DEBUG LOG
		console.log(options);	// TODO REMOVE DEBUG LOG


		try {
			// Emit message setSensorOptions
			socket.emit(SensorsServices_CONSTANTS.Messages.setSensorOptions,
				{"sensorID" : stSensor.config.sensorID, "options" : options});
		} catch (e) {
			// TODO: handle exception
			throw "Cannot send message setSensorOptions. " + e;
		}
		
	}
	
	
}


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
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.services.SensorsManager
 */
class NGSYS_Hero_Server_SensorsMNG extends SensorsManager {
	
	/**
	 * @constructs NGSYS_Hero_Server_SensorsMNG
	 */
	constructor() {
		
		super();
	}
	
	
	/**
	 * Returns Sensor searched by sysID
	 * 
	 * @param {string} sysID - Sensor sysID
	 */
	getSensorBy_sysID(sysID) {

		let smngr = this;

		let sensor = null;
		let _i = 0;


		_i = smngr.sensorsList.map(function(x) {return x.config._sysID; }).indexOf(sysID);
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
	 * @param {string} nodeID - Node ID 
	 */
	getSensorsByNode(nodeID) {

		let smngr = this;
		
		let sensors = smngr.sensorsList.filter(function(sensor, _i, _sensors) {

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
	 * @param {st.ngn.ngnSYS_Hero.SensorRef} sensor - SensorRef object
	 */
	addSensor(sensor) {
		
		let smng = this;
		
		let sensorSearch = smng.getSensorBy_sysID(sensor.config._sysID);
		
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
	 * @param {object} config - Configuration object
	 * @param {object} options - Options object
	 * @param {st.ngn.services.SensorsManager} [options.sensorsManager] - Sensors manager
	 * @param {string} options.engine - Engine name
	 */
	addSensorFromNode(config, options) {
		
		let _smng = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}

		if (options.sensorsManager !== undefined ) {
			_smng = options.sensorsManager;
		}
		
		let _sensor = new SensorRef(config);
		_sensor.initialize();
		
		if (options.engine !== undefined) {
			_sensor.sensorEngine.name = options.engine;
		}
		
		try {
			_smng.addSensor(_sensor);
		} catch (e) {
			// TODO: handle exception
			throw "Cannot add sensor. " + e;
		}
		
	}
	
	
	/**
	 * Turn off sensors of node
	 * 
	 * @param {string} nodeID - Node ID
	 * 
	 */
	turnOffSensorsOfNode(nodeID) {
		
		let smng = this;
//		let _nodeID = nodeID;
		

		let sensorsSearch = smng.getSensorsByNode(nodeID);
		
		if (sensorsSearch.sensors !== null) {
			
			// Emit message TurnOffSensors
			sensorsSearch.sensors[0].config._controlSocket.emit(SensorsServices_CONSTANTS.Messages.TurnOffSensors);
			
		} else {
			console.log(' <~> Node not found!!!');	// TODO REMOVE DEBUG LOG
		}
	
	}
	
}


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
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.ActuatorEngine
 * 
 */
class ActEngineRef extends ActuatorEngine {
	
	/**
	 * @constructs ActEngineRef
	 */
	constructor(config) {
		super(config);
	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		// Overrides parent method...
	}
	
	
	/**
	 * MainLoop
	 */
	mainLoop() {
		// Overrides parent method...
	}
	
}


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
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.Actuator
 * 
 */
class ActuatorRef extends Actuator {
	
	/**
	 * @constructs ActuatorRef
	 */
	constructor(config) {
		
		super(config);
		
		
	}
	
	/**
	 * Initialize
	 */
	initialize() {
		
		let actuator = this;
		
		// initialize actuator engine
		actuator.actuatorEngine = new ActEngineRef( actuator.config.actuatorEngine );
	}
	

	/**
	 * Start actuator
	 */
	start() {

		let stActuator = this;

		return new Promise(function(resolve, reject) {

			let request = {
				"actuatorID" : stActuator.config.actuatorID,
				"result" : null

			};

			// Emit message StartActuator
			stActuator.config._controlSocket.emit(ActuatorsServices_CONSTANTS.Messages.StartActuator , request);

			resolve(request);

		});

	}
	
	
	/**
	 * Stop actuator
	 */
	stop() {

		let stActuator = this;

		return new Promise(function(resolve, reject) {

			let request = {
				"actuatorID" : stActuator.config.actuatorID,
				"result" : null

			};

			// Emit message StopActuator
			stActuator.config._controlSocket.emit(ActuatorsServices_CONSTANTS.Messages.StopActuator , request);
			resolve(request);
		});
		
	}
	
	
	/**
	 * Set actuator options
	 * 
	 * @param {object} options - Options object.
	 */
	setOptions(options){
		
		let stActuator = this;
		let socket = stActuator.config._controlSocket;
		
		console.log('<*> ST ActuatorRef.setOptions');	// TODO REMOVE DEBUG LOG
		console.log(options);	// TODO REMOVE DEBUG LOG

		// Emit message setActuatorOptions
		socket.emit(ActuatorsServices_CONSTANTS.Messages.setActuatorOptions,
				{"actuatorID" : stActuator.config.actuatorID, "options" : options});


		
	}
}


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
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.services.ActuatorsManager
 * 
 */
class NGSYS_Hero_Server_ActuatorsMNG extends ActuatorsManager {
	
	/**
	 * @constructs NGSYS_Hero_Server_ActuatorsMNG
	 */
	constructor() {
		
		super();
	}
	
	
	/**
	 * Returns Actuator searched by sysID
	 * 
	 * @param {string} actuatorID - Actuator ID
	 */
	getActuatorBy_sysID(actuatorID) {

		let amng = this;

		let actuator = null;
		let _i = 0;


		_i = amng.actuatorsList.map(function(x) {return x.config._sysID; }).indexOf(actuatorID);
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
	 * @param {string} nodeID - Node ID
	 */
	getActuatorsByNode(nodeID) {

		let smngr = this;
		
		let actuators = smngr.actuatorsList.filter(function(actuator, _i, _actuators) {

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
	 * @param {st.ngn.ngnSYS_Hero.ActuatorRef} actuator - ActuatorRef object
	 */
	addActuator(actuator) {
		
		let amng = this;
		
		let actuatorSearch = amng.getActuatorBy_sysID(actuator.config._sysID);
		
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
	 * @param {object} config - Configuration object
	 * @param {object} options - Options object
	 * @param {st.ngn.services.ActuatorsManager} [options.actuatorsManager] - Actuators manager
	 * @param {string} options.engine - Engine name
	 * 
	 */
	addActuatorFromNode(config, options) {
		
		let _amng = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}

		if (options.actuatorsManager !== undefined ) {
			_amng = options.actuatorsManager;
		}
		
		let _actuator = new ActuatorRef(config);
		_actuator.initialize();
		
		if (options.engine !== undefined) {
			_actuator.actuatorEngine.name = options.engine;
		}
		
		
		try {
			_amng.addActuator(_actuator);
		} catch (e) {
			// TODO: handle exception
			throw "Cannot add actuator. " + e;
		}
		
	}
	
	
	/**
	 * Turn off actuators of node
	 * 
	 * @param {string} nodeID - Node ID
	 */
	turnOffActuatorsOfNode(nodeID) {
		
		let amngr = this;
//		let _nodeID = nodeID;
		
		let actuatorsSearch = amngr.getActuatorsByNode(nodeID);
		
		if (actuatorsSearch.actuators !== null) {
			
			// Emit message TurnOffActuators
			actuatorsSearch.actuators[0].config._controlSocket.emit(ActuatorsServices_CONSTANTS.Messages.TurnOffActuators);
			
		} else {
			console.log(' <~> Node not found!!!');	// TODO REMOVE DEBUG LOG
		}
	
	}
	
}


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
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.ngnSYS_Hero.NGSystem_Hero
 */
class NGSYS_Hero_Server extends NGSystem_Hero {
	
	/**
	 * @constructs NGSYS_Hero_Server
	 */
	constructor(config) {
		
		super(config);
		
		let ngSYS = this;
		
		ngSYS.nodesManager = null;
		ngSYS._scs_RouteEngines = null;
	
	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		
		super.initialize();
		
		let ngSYS = this;
		let config = ngSYS.config;
		
		
		if (config.nodesManager === undefined ||
				config.nodesManager === null) {
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
	_init_Nodes() {
		
		let ngSYS = this;
		let config = ngSYS.config;
		let nodesManager = ngSYS.nodesManager;
	
	}
	
	
	/**
	 * Initialize sensors
	 */
	_init_Sensors() {
		
		let ngSYS = this;
		let config = ngSYS.config;
		
		
		ngSYS.sensorsManager = new NGSYS_Hero_Server_SensorsMNG();
		
		ngSYS.sensorsServices = new NGSYS_Hero_Server_SensorsSRV(
				ngSYS.sensorsManager, 
				ngSYS.controlChannel,
				ngSYS.nodesManager
				);
		
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
	_init_Actuators() {
		
		let ngSYS = this;
		let config = ngSYS.config;
		
		
		ngSYS.actuatorsManager = new NGSYS_Hero_Server_ActuatorsMNG();
		
		ngSYS.actuatorsServices = new NGSYS_Hero_Server_ActuatorsSRV(
				ngSYS.actuatorsManager, 
				ngSYS.controlChannel,
				ngSYS.nodesManager
				);
		
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
	getSCSRoutes(options) {
		
		let ngSYS = this;
		
		if (options === undefined || 
				options === null) {
			options = {};
		}
		
		if (options.ngSYS !== undefined) {
			ngSYS = options.ngSYS;
		}
		
		
		
		if (ngSYS._scs_RouteEngines === null) {
			
			let SCS_RouteEngines = require('./scs_Routes/SCS_RouteEngines.js');
		
			try {
				ngSYS._scs_RouteEngines = new SCS_RouteEngines(ngSYS.sensorsManager, ngSYS.actuatorsManager);
			} catch (e) {
				// TODO: handle exception
				throw "Error in route engines." + e;
			}
			
			
		}
		
		return ngSYS._scs_RouteEngines;
	
	}
	
	
}




let _Lib = {
		"NGSYS_Hero_Server" : NGSYS_Hero_Server
};


module.exports = _Lib;
