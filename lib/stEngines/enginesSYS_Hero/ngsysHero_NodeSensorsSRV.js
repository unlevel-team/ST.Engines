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
		
		// console.log('<*> NGSYS_Hero_Node._mapSensorControlEvents');	// TODO REMOVE DEBUG LOG
		// console.log(sensor.config);	// TODO REMOVE DEBUG LOG
		
		
		sensor.eventEmitter.on(sensor.CONSTANTS.Events.SensorOptionsUpdated, 
				
				function(data) {
					service._event_SensorOptionsUpdated( data,
							{
								"service" : service
							});
				}
				
				
		);
		
		
		if (sensorEngine !== null) {
			
			// Map event Engine_Start
			sensorEngine.eventEmitter.on(
					sensorEngine.CONSTANTS.Events.Engine_Start, 
					function(data){
						service._event_Engine_Start({
							"data": data,
							"sensor": sensor
						});
					}
			);
			
			// Map event Engine_Stop
			sensorEngine.eventEmitter.on(
					sensorEngine.CONSTANTS.Events.Engine_Stop, 
					function(data){
						service._event_Engine_Stop({
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
		
		let _service = this;
		if (options.service !== undefined) {
			_service = options.service;
		}
		
		let _smng = _service.sensorsManager;
		
		
		// Map message getSensorsList
		socket.on(_service.CONSTANTS.Messages.getSensorsList, 

			function(_msg) {
				_service._msg_getSensorsList({
					'msg': _msg,
					'service': _service
				});
			}
		);
		
		// Map message getSensorOptions
		socket.on(_service.CONSTANTS.Messages.getSensorOptions, 
				
			function(_msg) {
				_service._msg_getSensorOptions({
					'msg': _msg,
					'service': _service
				});
			}
		);
		
		// Map message setSensorOptions
		socket.on(_service.CONSTANTS.Messages.setSensorOptions, 
				
			function(_msg) {
				_service._msg_setSensorOptions({
					'msg': _msg,
					'service': _service
				});
			}	
		);
		
		// Map message StartSensor
		socket.on(_service.CONSTANTS.Messages.StartSensor, 

			function(_msg) {
				_service._msg_StartSensor({
					'msg': _msg,
					'service': _service
				});
			}		
		);
		
		// Map message StopSensor
		socket.on(_service.CONSTANTS.Messages.StopSensor, 
				
			function(_msg) {
				_service._msg_StopSensor({
					'msg': _msg,
					'service': _service
				});
			}
		);
		
		// Map message TurnOffSensors
		socket.on(_service.CONSTANTS.Messages.TurnOffSensors, 
				
			function(_msg) {
				_service._msg_TurnOffSensors({
					'msg': _msg,
					'service': _service
				});
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
	 * Event Engine_Start
	 */
	_event_Engine_Start(data) {
		
		let service = this;
		let socket = service.controlChannel.socket;
		
		let sensor = data.sensor;
		
		// Emit message SensorStarted
		socket.emit(service.CONSTANTS.Messages.SensorStarted, {
			"sensorID": sensor.config.id
		});
		
	}
	
	
	/**
	 * Event Engine_Stop
	 */
	_event_Engine_Stop(data) {
		
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
	_msg_getSensorsList(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _service = this;
		if (options.service !== undefined) {
			_service  = options.service;
		}
		
		let _msg = options.msg;
		
		let _smng = _service.sensorsManager;
		let _socket = _service.controlChannel.socket;
		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorsList');	// TODO REMOVE DEBUG LOG
	  
		let _response = {};
		_response.numSensors = _smng.sensorsList.length;
		_response.sensors = [];
	  
		// Only for enabled
		let _sensorsEnabled = _smng.sensorsList.filter(function(_sensor, _i) {
			
			if (_sensor.enabled === true) {
				return true;
			}
			
			return false;
		});
		
		
		_sensorsEnabled.forEach(function(_sns, _i) {
	  	
			let _sensor = {
				"sensorID" : _sns.config.id,
				"type" : _sns.config.type,
				"engine": "not defined",
				"state" : "config"
			};
			
			
			if (_sns.sensorEngine !== null) {
				if (_sns.sensorEngine.name !== undefined) {
					_sensor.engine = _sns.sensorEngine.name;
				}
				_sensor.state = _sns.sensorEngine.state;
			}
			
			_response.sensors.push( _sensor );
			
		});
	  
	  
		// Emit message SensorsList
		_socket.emit( _service.CONSTANTS.Messages.SensorsList, _response );
	
	}
	
	
	/**
	 * Message getSensorOptions
	 */
	_msg_getSensorOptions(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _service = this;
		if (options.service !== undefined) {
			_service  = options.service;
		}
		
		let _msg = options.msg;
		
		
		let _smng = _service.sensorsManager;
		let _socket = _service.controlChannel.socket;
		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorOptions');	// TODO REMOVE DEBUG LO
		  
		let _sensorID = _msg.sensorID;
		  
		let _response = {
		  "sensorID" : _sensorID
		};
		  
		try {
			  
			let _sensorSearch = _smng.getSensorByID(_sensorID);
			if(_sensorSearch.STsensor === null){
				throw "Sensor not found.";
			}
			
			let _sensor = _sensorSearch.STsensor;
			
			_response.options = _sensor.getOptions();
			
			// Emit message SensorOptions
			_socket.emit(_service.CONSTANTS.Messages.SensorOptions, _response);

	
		} catch (_e) {
			// TODO: handle exception
			_response.result = "ERROR";
			_response.error = _e;

			console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.getSensorOptions ERROR');	// TODO REMOVE DEBUG LOG
			console.log(_response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message setSensorOptions
	 */
	_msg_setSensorOptions(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _service = this;
		if (options.service !== undefined) {
			_service  = options.service;
		}
		
		let _msg = options.msg;
		
		let _smng = _service.sensorsManager;
			
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.setSensorOptions');	// TODO REMOVE DEBUG LO
		console.log(_msg);	// TODO REMOVE DEBUG LO

		let _sensorID = _msg.sensorID;
		let _options = _msg.options;
		  
		let _response = {
			"sensorID" : _sensorID
		};
		  
		try {
		 
			let _sensorSearch = _smng.getSensorByID(_sensorID);
			if(_sensorSearch.STsensor === null){
				throw "Sensor not found.";
			}
			
			let _sensor = _sensorSearch.STsensor;
			
			_sensor.setOptions(_options);
			
		} catch (_e) {
			// TODO: handle exception
			_response.result = "ERROR";
			_response.error = _e;

			console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.setSensorOptions ERROR');	// TODO REMOVE DEBUG LOG
			console.log(_response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message StartSensor
	 */
	_msg_StartSensor(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _service = this;
		if (options.service !== undefined) {
			_service  = options.service;
		}
		
		let _msg = options.msg;
		
		let _smng = _service.sensorsManager;

		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.StartSensor');	// TODO REMOVE DEBUG LOG
		console.log(_msg);	// TODO REMOVE DEBUG LOG
//		  console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG

		let _response = {};
		_response.result = null;
	  
		try {
		
			let _sensorSearch = _smng.getSensorByID(_msg.sensorID);
		  
			if (_sensorSearch.STsensor !== null) {
				
				 _sensorSearch.STsensor.sensorEngine.startEngine({
					 'ngnInterface': _sensorSearch.STsensor.sensorEngine
				 });
				 
			} else {
				console.log("Not found!!!");	// TODO REMOVE DEBUG LOG
				throw "Sensor not found.";  
			}

		} catch (_e) {
			// TODO: handle exception
			_response.result = "ERROR";
			_response.error = _e;
;
			
			console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.StartSensor ERROR');	// TODO REMOVE DEBUG LOG
			console.log(_response);	// TODO REMOVE DEBUG LOG
		}
		
//			msg.result = response.result;
		
	}
	
	
	/**
	 * Message StopSensor
	 */
	_msg_StopSensor(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _service = this;
		if (options.service !== undefined) {
			_service  = options.service;
		}
		
		let _msg = options.msg;

		
		let _smng = _service.sensorsManager;
		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.StopSensor');	// TODO REMOVE DEBUG LOG
		console.log(_msg);	// TODO REMOVE DEBUG LOG
//		console.log(' <~> ' + msg);	// TODO REMOVE DEBUG LOG
		  
		let _response = {};
		_response.result = null;
		  
		try {
			
		  let _sensorSearch = _smng.getSensorByID(_msg.sensorID);
			  
		  if (_sensorSearch.STsensor !== null) {
			  
			  _sensorSearch.STsensor.sensorEngine.stopEngine({
				  'ngnInterface': _sensorSearch.STsensor.sensorEngine
			  });
			  
		  } else {
			throw "Sensor not found.";  
		  }
		  
		} catch (_e) {
			
			// TODO: handle exception
			_response.result = "ERROR";
			_response.error = _e;
			console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.StopSensor ERROR');	// TODO REMOVE DEBUG LOG
			console.log(_response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message TurnOffSensors
	 */
	_msg_TurnOffSensors(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _service = this;
		if (options.service !== undefined) {
			_service  = options.service;
		}
		
		let _msg = options.msg;
		
		let _smng = _service.sensorsManager;
		
		console.log('<*> NGSYS_Hero_Node_SensorsSRV.Messages.TurnOffSensors');	// TODO REMOVE DEBUG LOG
	  
		let _response = {};
		_response.result = null;
	  
		try {
		
			_smng.turnOffSensors();

		} catch (_e) {
			// TODO: handle exception
			_response.result = "ERROR";
			_response.error = _e;

			console.log('<EEE> NGSYS_Hero_Node_SensorsSRV.Messages.TurnOffSensors ERROR');	// TODO REMOVE DEBUG LOG
			console.log(_response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
}


let _Lib = {
	"NGSYS_Hero_Node_SensorsSRV" : NGSYS_Hero_Node_SensorsSRV
};


module.exports = _Lib;
