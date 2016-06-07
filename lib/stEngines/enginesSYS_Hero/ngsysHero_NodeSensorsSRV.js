"use strict";

/**
 * Sensors services
 * for Node role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

let SensorsServices = require('../services/SensorsServices.js').SensorsServices;


/**
 * Sensors Services
 */
class NGSYS_Hero_Node_SensorsSRV extends SensorsServices {
	
	constructor(sensorsManager, controlChannel) {
		
		super(sensorsManager, controlChannel);
	}
	
	
	/**
	 * Map control events
	 */
	_mapControlEvents(sensorsManager) {
		
		let service = this;
		
		if (sensorsManager === undefined) {
			sensorsManager = service.sensorsManager;
		}
		
		
		sensorsManager.sensorsList.forEach(function(sensor, _i) {
			service._mapSensorControlEvents(sensor);
		});
		
	}
	
	
	/**
	 * Map control events for sensors
	 */
	_mapSensorControlEvents(sensor) {
		
		let service = this;
		
		let sensorEngine = sensor.sensorEngine;
		
		sensor.eventEmitter.on(sensor.CONSTANST.Events.SensorOptionsUpdated, service._event_SensorOptionsUpdated);
		
		// Map event SensorEngine_Start
		sensorEngine.eventEmitter.on(
				sensorEngine.CONSTANTS.Events.SensorEngine_Start, 
				function(data){
					service._event_SensorEngine_Start({
						"data": data,
						"sensor": sensor
					});
				}
		);
		
		// Map event SensorEngine_Stop
		sensorEngine.eventEmitter.on(
				sensorEngine.CONSTANTS.Events.SensorEngine_Stop, 
				function(data){
					service._event_SensorEngine_Stop({
						"data": data,
						"sensor": sensor
					});
				}
		);
		
	}
	
	
	/**
	 * Map control messages
	 */
	_mapControlMessages(socket) {
		
		super._mapControlMessages(socket);
		
		let service = this;
		let smng = service.sensorsManager;
		
		
		socket.on(service.CONSTANTS.Messages.getSensorsList, service._msg_getSensorsList);
		socket.on(service.CONSTANTS.Messages.getSensorOptions, service._msg_getSensorOptions);
		socket.on(service.CONSTANTS.Messages.setSensorOptions, service._msg_setSensorOptions);
		socket.on(service.CONSTANTS.Messages.StartSensor, service._msg_StartSensor);
		socket.on(service.CONSTANTS.Messages.StopSensor, service._msg_StopSensor);
		socket.on(service.CONSTANTS.Messages.TurnOffSensors, service._msg_TurnOffSensors);
		
	}
	
	
	/**
	 * Unmap control messages
	 */
	_unmapControlMessages(socket) {
		
		super._unmapControlMessages(socket);
		
		let service = this;
		
		socket.removeListener(service.CONSTANTS.Messages.getSensorsList, service._msg_getSensorsList);
		socket.removeListener(service.CONSTANTS.Messages.getSensorOptions, service._msg_getSensorOptions);
		socket.removeListener(service.CONSTANTS.Messages.setSensorOptions, service._msg_setSensorOptions);
		socket.removeListener(service.CONSTANTS.Messages.StartSensor, service._msg_StartSensor);
		socket.removeListener(service.CONSTANTS.Messages.StopSensor, service._msg_StopSensor);
		socket.removeListener(service.CONSTANTS.Messages.TurnOffSensors, service._msg_TurnOffSensors);

		service._mapped = null;
		
	}
	
	
	/**
	 * Event SensorOptionsUpdated
	 */
	_event_SensorOptionsUpdated(data) {
		
		let service = this;
		let socket = service.controlChannel.socket;
		
		let sensor = data.sensor;
		
		// Emit message SensorOptionsUpdated
		socket.emit(service.CONSTANTS.Messages.SensorOptionsUpdated, {
			"sensorID": sensor.config.id
		});
		
	}
	
	
	/**
	 * Event SensorEngine_Start
	 */
	_event_SensorEngine_Start(data) {
		
		let service = this;
		let socket = service.controlChannel.socket;
		
		let sensor = data.sensor;
		
		// Emit message SensorStarted
		socket.emit(service.CONSTANTS.Messages.SensorStarted, {
			"sensorID": sensor.config.id
		});
		
	}
	
	
	/**
	 * Event SensorEngine_Stop
	 */
	_event_SensorEngine_Stop(data) {
		
		let service = this;
		let socket = service.controlChannel.socket;
		
		let sensor = data.sensor;
		
		// Emit message SensorStarted
		socket.emit(service.CONSTANTS.Messages.SensorStopped, {
			"sensorID": sensor.config.id
		});
		
	}
	
	
	/**
	 * Message getSensorsList
	 */
	_msg_getSensorsList(msg) {
		
		let service = this;
		let smng = service.sensorsManager;
		let socket = service.controlChannel.socket;
		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorsList');	// TODO REMOVE DEBUG LOG
	  
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
		socket.emit( service.CONSTANTS.Messages.SensorsList, response );
	
	}
	
	
	/**
	 * Message getSensorOptions
	 */
	_msg_getSensorOptions(msg) {
		
		let service = this;
		let smng = service.sensorsManager;
		let socket = service.controlChannel.socket;
		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorOptions');	// TODO REMOVE DEBUG LO
		  
		let sensorID = msg.sensorID;
		  
		let response = {
		  "sensorID" : sensorID
		};
		  
		try {
			  
			let sensorSearch = smng.getSensorByID(sensorID);
			if(sensorSearch.STsensor === null){
				throw "Sensor not found.";
			}
			
			let sensor = sensorSearch.STsensor;
			  
			response.options = sensor.getOptions();
			  
			// Emit message SensorOptions
			socket.emit(service.CONSTANTS.Messages.SensorOptions, response);
	
		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

			console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorOptions ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message setSensorOptions
	 */
	_msg_setSensorOptions(msg) {
		
		let service = this;
		let smng = service.sensorsManager;
			
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.setSensorOptions');	// TODO REMOVE DEBUG LO
		console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LO

		let sensorID = msg.sensorID;
		let options = msg.options;
		  
		let response = {
				"sensorID" : sensorID
		};
		  
		try {
		 
			let sensorSearch = smng.getSensorByID(sensorID);
			if(sensorSearch.STsensor === null){
				throw "Sensor not found.";
			}
			
			let sensor = sensorSearch.STsensor;
			
			sensor.setOptions(options);
			  
		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

			console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.setSensorOptions ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message StartSensor
	 */
	_msg_StartSensor(msg) {
		
		let service = this;
		let smng = service.sensorsManager;

		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.StartSensor');	// TODO REMOVE DEBUG LOG
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
			
			console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.StartSensor ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
//			msg.result = response.result;
		
	}
	
	
	/**
	 * Message StopSensor
	 */
	_msg_StopSensor(msg) {
		
		let service = this;
		let smng = service.sensorsManager;
		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.StopSensor');	// TODO REMOVE DEBUG LOG
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
			console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.StopSensor ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message TurnOffSensors
	 */
	_msg_TurnOffSensors(msg) {
		
		let service = this;
		let smng = service.sensorsManager;
		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.TurnOffSensors');	// TODO REMOVE DEBUG LOG
	  
		let response = {};
		response.result = null;
	  
		try {
		
			smng.turnOffSensors();

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

			console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.TurnOffSensors ERROR');	// TODO REMOVE DEBUG LOG
			console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
}


let _Lib = {
	"NGSYS_Hero_Node_SensorsSRV" : NGSYS_Hero_Node_SensorsSRV
};


module.exports = _Lib;
