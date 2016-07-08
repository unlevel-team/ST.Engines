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
let SensorsServices = require('../services/SensorsServices.js').SensorsServices;


/**
 * Sensors Services
 * <pre>
 * for role Node
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * @implements SensorsServices
 * 
 */
class NGSYS_Hero_Node_SensorsSRV extends SensorsServices {
	
	/**
	 * 
	 * @constructs NGSYS_Hero_Node_SensorsSRV
	 * 
	 * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
	 * @param {object} controlChannel - Control chnnel object
	 * 
	 */
	constructor(sensorsManager, controlChannel) {
		
		super(sensorsManager, controlChannel);
	}
	
	
	/**
	 * Map control events
	 * 
	 * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
	 */
	_mapControlEvents(sensorsManager) {
		
		let service = this;
		
		if (sensorsManager === undefined) {
			sensorsManager = service.sensorsManager;
		}
		
		
		sensorsManager.sensorsList.forEach(function(sensor, _i) {
			
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
	 * @param {st.ngn.Sensor} sensor 
	 */
	_mapSensorControlEvents(sensor) {
		
		let service = this;
		let sensorEngine = sensor.sensorEngine;
		
		console.log('<*> NGSYS_Hero_Node._mapSensorControlEvents');	// TODO REMOVE DEBUG LOG
		console.log(sensor);
		
		
		sensor.eventEmitter.on(sensor.CONSTANTS.Events.SensorOptionsUpdated, 
				
				function(data) {
					service._event_SensorOptionsUpdated( data,
							{
								"service" : service
							});
				}
				
				
		);
		
		
		if (sensorEngine !== null) {
			
			
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
		
	}
	
	
	/**
	 * Map control messages
	 * 
	 * @param {object} socket - Socket object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Node_SensorsSRV} [options.service] - Sensors Service object
	 * 
	 */
	_mapControlMessages(socket, options) {
		
		super._mapControlMessages(socket, options);
		
		let service = this;
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let smng = service.sensorsManager;
		
		
		// Map message getSensorsList
		socket.on(service.CONSTANTS.Messages.getSensorsList, 
				
			function(msg){
				service._msg_getSensorsList(msg, service);
			}
		);
		
		// Map message getSensorOptions
		socket.on(service.CONSTANTS.Messages.getSensorOptions, 
				
			function(msg){
				service._msg_getSensorOptions(msg, service);
			}
		);
		
		// Map message setSensorOptions
		socket.on(service.CONSTANTS.Messages.setSensorOptions, 
				
			function(msg){
				service._msg_setSensorOptions(msg, service);
			}	
		);
		
		// Map message StartSensor
		socket.on(service.CONSTANTS.Messages.StartSensor, 
				
			function(msg){
				service._msg_StartSensor(msg, service);
			}		
		);
		
		// Map message StopSensor
		socket.on(service.CONSTANTS.Messages.StopSensor, 
				
			function(msg){
				service._msg_StopSensor(msg, service);
			}
		);
		
		// Map message TurnOffSensors
		socket.on(service.CONSTANTS.Messages.TurnOffSensors, 
				
			function(msg){
				service._msg_TurnOffSensors(msg, service);
			}
		);
		
	}
	
	
	/**
	 * Unmap control messages
	 * 
	 * @param {object} socket - Socket object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Node_SensorsSRV} [options.service] - Sensors Service object
	 * 
	 */
	_unmapControlMessages(socket, options) {
		
		super._unmapControlMessages(socket, options);
		
		let service = this;
		
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
	_event_SensorOptionsUpdated(data, options) {
		
		let service = this;
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
			
		
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
	_msg_getSensorsList(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
		let smng = service.sensorsManager;
		let socket = service.controlChannel.socket;
		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorsList');	// TODO REMOVE DEBUG LOG
	  
		let response = {};
		response.numSensors = smng.sensorsList.length;
		response.sensors = [];
	  
		smng.sensorsList.forEach(function(sns_, _i) {
	  	
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
	_msg_getSensorOptions(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
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
	_msg_setSensorOptions(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
		let smng = service.sensorsManager;
			
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.setSensorOptions');	// TODO REMOVE DEBUG LO
		console.log(msg);	// TODO REMOVE DEBUG LO

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
	_msg_StartSensor(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
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
	_msg_StopSensor(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
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
	_msg_TurnOffSensors(msg, service) {
		
		if (service === undefined) {
			service = this;
		}
		
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
