"use strict";

/*
 SomeThings Engines System library
 
 version Hero
 for Server

*/

let Sensor = require('../Sensor.js');
let SensorEngine = require('../SensorEngine.js');

let SensorsManager_CONSTANTS = require('../services/SensorsManager.js').CONSTANTS;
let SensorsManager = require('../services/SensorsManager.js').SensorsManager;
let NGSYS_Hero_Server_SensorsSRV = require('./ngsysHero_ServerSensorsSRV.js').NGSYS_Hero_Server_SensorsSRV;


let Actuator = require('../Actuator.js');
let ActuatorEngine = require('../ActuatorEngine.js');

let ActuatorsManager_CONSTANTS = require('../services/ActuatorsManager.js').CONSTANTS;
let ActuatorsManager = require('../services/ActuatorsManager.js').ActuatorsManager;
let NGSYS_Hero_Server_ActuatorsSRV = require('./ngsysHero_ServerActuatorsSRV.js').NGSYS_Hero_Server_ActuatorsSRV;


let NGSystem_Hero_Lib = require('./enginesSYS_Hero.js');
let NGSystem_Hero_CONSTANTS = NGSystem_Hero_Lib.NGSystem_Hero_CONSTANTS;
let NGSystem_Hero = NGSystem_Hero_Lib.NGSystem_Hero;



/**
 * SnsEngineRef
 * 
 * Sensor Engine
 * for role Server
 */
class SnsEngineRef extends SensorEngine {
	
	constructor(config) {
		
		super(config);
	}
	
	initialize() {
		// Overrides parent method...
	}
	
	mainLoop() {
		// Overrides parent method...
	}
	
}


/**
 * SensorRef
 * 
 * Sensor
 * for role Server
 */
class SensorRef extends Sensor {
	
	constructor(config) {
		
		super(config);
		
		
	}
	
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
			stSensor.config._controlSocket.emit(SensorsManager_CONSTANTS.Messages.StartSensor , request);

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
			stSensor.config._controlSocket.emit(SensorsManager_CONSTANTS.Messages.StopSensor , request);
			resolve(request);
		});
	}
	
	
	/**
	 * Set sensor options
	 */
	setOptions(options){
		
		let stSensor = this;
		let socket = stSensor.socket;
		
		console.log('<*> ST SensorRef.setOptions');	// TODO REMOVE DEBUG LOG
		console.log(options);	// TODO REMOVE DEBUG LOG

		// Emit message setSensorOptions
		socket.emit(SensorsManager_CONSTANTS.Messages.setSensorOptions,
				{"sensorID" : stSensor.config.sensorID, "options" : options});


		
	}
	
	
}


/**
 * NGSYS_Hero_Server_SensorsMNG
 * 
 * Sensors manager
 * for role Server
 */
class NGSYS_Hero_Server_SensorsMNG extends SensorsManager {
	
	
	constructor() {
		
		super();
	}
	
	
	/**
	 * Returns Sensor searched by sysID
	 */
	getSensorBy_sysID(sensorID) {

		let smngr = this;

		let sensor = null;
		let _i = 0;


		_i = smngr.sensorsList.map(function(x) {return x.config._sysID; }).indexOf(sensorID);
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
	 * @param sensor Sensor object
	 */
	addSensor(sensor) {
		
		super.addSensor(sensor);
	
		let smng = this;
		
	}
	
	
}


/**
 * ActEngineRef
 * 
 * Actuator Engine
 * for role Server
 */
class ActEngineRef extends ActuatorEngine {
	
	constructor(config) {
		
		super(config);
	}
	
	initialize() {
		// Overrides parent method...
	}
	
	mainLoop() {
		// Overrides parent method...
	}
	
}


/**
 * ActuatorRef
 * 
 * Actuator
 * for role Server
 */
class ActuatorRef extends Actuator {
	
	constructor(config) {
		
		super(config);
		
		
	}
	
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
				"sensorID" : stActuator.config.sensorID,
				"result" : null

			};

			// Emit message StartActuator
			stActuator.config._controlSocket.emit(ActuatorsManager_CONSTANTS.Messages.StartActuator , request);

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
			stActuator.config._controlSocket.emit(ActuatorsManager_CONSTANTS.Messages.StopActuator , request);
			resolve(request);
		});
	}
	
	
	/**
	 * Set actuator options
	 */
	setOptions(options){
		
		let stActuator = this;
		let socket = stActuator.socket;
		
		console.log('<*> ST ActuatorRef.setOptions');	// TODO REMOVE DEBUG LOG
		console.log(options);	// TODO REMOVE DEBUG LOG

		// Emit message setActuatorOptions
		socket.emit(ActuatorsManager_CONSTANTS.Messages.setActuatorOptions,
				{"actuatorID" : stActuator.config.actuatorID, "options" : options});


		
	}
}



/**
 * NGSYS_Hero_Server_ActuatorsMNG
 * 
 * Actuators manager
 * for role Server
 */
class NGSYS_Hero_Server_ActuatorsMNG extends ActuatorsManager {
	
	
	constructor() {
		
		super();
	}
	
	
	/**
	 * Returns Actuator searched by sysID
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
	 * @param nodeID 
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
	 * Turn off actuators of node
	 */
	turnOffActuatorsOfNode(nodeID) {
		
		let amngr = this;
//		let _nodeID = nodeID;
		
		console.log('<*> ST ActuatorsManager.turnOffActuatorsOfNode');	// TODO REMOVE DEBUG LOG
		console.log(nodeID);	// TODO REMOVE DEBUG LOG

		let actuatorsSearch = amngr.getActuatorsByNode(nodeID);
		
		if (actuatorsSearch.actuators !== null) {
			
			console.log(' <~> Emit message');	// TODO REMOVE DEBUG LOG
			
			// Emit message TurnOffActuators
			actuatorsSearch.actuators[0].config._controlSocket.emit(amngr.CONSTANTS.Messages.TurnOffActuators);
			
		} else {
			console.log(' <~> Node not found!!!');	// TODO REMOVE DEBUG LOG
		}
	
	}
	
}


/**
 * NGSYS_Hero_Server
 * 
 * Engine system
 * for role Server
 */
class NGSYS_Hero_Server extends NGSystem_Hero {
	
	constructor(config) {
		
		super(config);
		
		let ngSYS = this;
		
		ngSYS.nodesManager = null;
		ngSYS._scs_RouteEngines = null;
	
	}
	
	
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
		
//		comSYS._service = new COMSys_Morse_Srv_Node(comSYS);
		
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
	
	
	
	addEnginesFromNode(stNode) {
		

	}
	
	
	/**
	 * Get Server Control Services routes
	 * for engines
	 * 
	 */
	getSCSRoutes() {
		
		let ngSYS = this;
		let scs_RouteEngines = ngSYS._scs_RouteEngines;
		
		if (scs_RouteEngines === null) {
			
			let SCS_RouteEngines = require('./scs_routes/SCS_RouteEngines.js');
		
			scs_RouteEngines = new SCS_RouteEngines(ngSYS.sensorsManager, ngSYS.actuatorsManager);
			
			scs_RouteEngines.initialize();
			scs_RouteEngines.mapServiceRoutes();
			
		}
		
		return scs_RouteEngines;
	
	}
	
	
}




let _Lib = {
		"NGSYS_Hero_Server" : NGSYS_Hero_Server
};


module.exports = _Lib;
