"use strict";



let SensorsManager = require('../services/stNGNServices_lib').SensorsManager;
let SensorServices = require('../services/SensorsServices.js').SensorServices;

let ActuatorsManager = require('../services/stNGNServices_lib').ActuatorsManager;



let NGSYS_Hero_Services = require('./ngsysHero_Services.js');



class NGSYS_Hero_Node_SensorsSRV extends SensorServices {
	
	constructor(sensorsManager) {
		
		super(sensorsManager);
		
	}
}



/**
 * NGSYS_Hero_NodeServices
 */
class NGSYS_Hero_NodeServices extends NGSYS_Hero_Services {
	
	constructor(ngSYS) {
		
		super(ngSYS);
	}
	
	
	initialize() {
		
		super.initialize();
		
		
		
	}
	
	
	/**
	 * Map control events
	 */
	_mapControlEvents(ngSYS) {
		
		super._mapControlEvents(ngSYS);
		
		let service = this;
		
		if (ngSYS === undefined) {
			ngSYS = service.ngSYS;
		}
		
		
		
		
	}
	
	
	/**
	 * Map control messages
	 */
	_mapControlMessages(socket) {
		
		super._mapControlMessages(socket);
		
		let service = this;
		
		let comSYS = service.comSYS;
		let config = comSYS.config;
		
		if (socket === undefined) {
			socket = config.controlChannel.socket;
		}

		
		
	}
	
	
	/**
	 * Unmap control messages
	 */
	_unmapControlMessages(socket) {
		
		super._unmapControlMessages(socket);
		
		let service = this;
		
		let comSYS = service.comSYS;
		let config = comSYS.config;
		
		
		
		
		config._mapped = null;
		
	}
	
	
	/**
	 * Message getSensorsList
	 */
	_msg_getSensorsList(msg) {
		
		let service = this;
		let smng = service.ngSYS.sensorsManager;
		
		console.log('<*> NGSYS_Hero_NodeServices.Messages.getSensorsList');	// TODO REMOVE DEBUG LOG
	  
		let response = {};
		response.numSensors = smng.sensorList.length;
		response.sensors = [];
	  
		smng.sensorList.forEach(function(sns_, _i) {
	  	
			let sensor = {
				"sensorID" : sns_.config.id,
				"type" : sns_.config.type,
				"state" : sns_.config.state
			};
			
			response.sensors.push( sensor );
		});
	  
	  
		// Emit message SensorsList
		smng.nodeCtrlSrv.socket.emit( smng.CONSTANTS.Messages.SensorsList, response );
	
	}
	
	
	/**
	 * Message StartSensor
	 */
	_msg_StartSensor(msg) {
		
		let service = this;
		let smng = service.ngSYS.sensorsManager;
		
		console.log('<*> NGSYS_Hero_NodeServices.Messages.StartSensor');	// TODO REMOVE DEBUG LOG
		console.log(msg);	// TODO REMOVE DEBUG LOG
//		  console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

		let response = {};
		response.result = null;
	  
		try {
		
			let _sensorSearch = smng.getSensorByID(msg.sensorID);
		  
			if (_sensorSearch.STsensor !== null) {
				_sensorSearch.STsensor.sensorEngine.startEngine();
				response.result = "OK";
			} else {
				console.log("Not found!!!");	// TODO REMOVE DEBUG LOG
				throw "Sensor not found.";  
			}

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;
			
			console.log('<EEE> NGSYS_Hero_NodeServices.Messages.StartSensor ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
//			msg.result = response.result;
		
	}
	
	
	/**
	 * Message StopSensor
	 */
	_msg_StopSensor(msg) {
		
		let service = this;
		let smng = service.ngSYS.sensorsManager;
		
		console.log('<*> NGSYS_Hero_NodeServices.Messages.StopSensor');	// TODO REMOVE DEBUG LOG
		console.log(msg);	// TODO REMOVE DEBUG LOG
//		console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG
		  
		let response = {};
		response.result = null;
		  
		try {
			
		  let _sensorSearch = smng.getSensorByID(msg.sensorID);
			  
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
			console.log('<EEE> NGSYS_Hero_NodeServices.Messages.StopSensor ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message TurnOffSensors
	 */
	_msg_TurnOffSensors(msg) {
		
		let service = this;
		let smng = service.ngSYS.sensorsManager;
		
		console.log('<*> NGSYS_Hero_NodeServices.Messages.TurnOffSensors');	// TODO REMOVE DEBUG LOG
	  
		let response = {};
		response.result = null;
	  
		try {
		
			smng.turnOffSensors();

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

			console.log('<EEE> NGSYS_Hero_NodeServices.Messages.TurnOffSensors ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	
	
}