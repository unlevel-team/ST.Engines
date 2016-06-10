"use strict";

/*
 SomeThings Engines System library
 
 version Hero
 for Server

*/

let Sensor = require('../Sensor.js');
let SensorEngine = require('../SensorEngine.js');

let NGSystem_Hero_Lib = require('./enginesSYS_Hero.js');
let NGSystem_Hero_CONSTANTS = NGSystem_Hero_Lib.NGSystem_Hero_CONSTANTS;
let NGSystem_Hero = NGSystem_Hero_Lib.NGSystem_Hero;

let SensorsManager_CONSTANTS = require('../services/SensorsManager.js').CONSTANTS;
let SensorsManager = require('../services/SensorsManager.js').SensorsManager;


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
 * 
 * SomeThings Engines System library
 * version Hero
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


		_i = smngr.sensorList.map(function(x) {return x.config._sysID; }).indexOf(sensorID);
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
	getSensorsByNode(nodeID) {

		let smngr = this;

		let sensors = smngr.sensorList.filter(function(sensor, _i, _sensors) {

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
	addSensor(sensor) {
		
		super.addSensor(sensor);
	
		let smng = this;
		
	}
	
	
	
	
}


/**
 * NGSYS_Hero_Server
 */
class NGSYS_Hero_Server extends NGSystem_Hero {
	
	constructor(config) {
		
		super(config);
	}
	
	
	initialize() {
		
		super.initialize();
		
		let ngSYS = this;
		let _config = ngSYS.config;
		
//		comSYS._service = new COMSys_Morse_Srv_Node(comSYS);
	}
	
	
	
}



let _Lib = {
		"NGSYS_Hero_Server" : NGSYS_Hero_Server
};


module.exports = _Lib;
