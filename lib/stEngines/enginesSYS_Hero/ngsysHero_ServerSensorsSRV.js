"use strict";

/**
 * Sensors services
 * for Node sever
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

let SensorsServices = require('../services/SensorsServices.js').SensorsServices;


/**
 * Sensors Services
 */
class NGSYS_Hero_Server_SensorsSRV extends SensorsServices {
	
	
	constructor(sensorsManager, controlChannel, nodesManager) {
		
		super(sensorsManager, controlChannel);
		
		let service = this;
		
		service.nodesManager = nodesManager;
		
	}
	
	
	initialize() {
		
		super.initialize();
		
		let service = this;
		
		if (service.nodesManager === undefined ||
				service.nodesManager === null) {
			throw "Nodes manager is required";
		}
		
		
		service._mapControlEventsForNodes(service.nodesManager);
	}
	
	
	/**
	 * Map control events
	 */
	_mapControlEvents(sensorsManager) {
		
		let service = this;
		
		if (sensorsManager === undefined) {
			sensorsManager = service.sensorsManager;
		}
	
	}
	
	
	/**
	 * Map control messages
	 */
	_mapControlMessages(socket) {
		
		super._mapControlMessages(socket);
		
		let service = this;
		let smng = service.sensorsManager;
		
	}
	
	
	/**
	 * Unmap control messages
	 */
	_unmapControlMessages(socket) {
		
		super._unmapControlMessages(socket);
		
		let service = this;

		service._mapped = null;
	}
	
	
	/**
	 * Map control events for nodes
	 */
	_mapControlEventsForNodes(nodesManager) {
		
		let service = this;
		
		if (nodesManager === undefined) {
			nodesManager = service.nodesManager;
		}
		
		
		// Map event NodeAdded
		nodesManager.EventEmitter.on(nodesManager.CONSTANTS.Events.NodeAdded, 
			function(data) {
				
				service._event_NodeAdded(data, {
					"service" : service 
				});
		});
		
		
		// Map event NodeDisconnected
		nodesManager.EventEmitter.on(nodesManager.CONSTANTS.Events.NodeDisconnected, 
			function(data) {
				
				service._event_NodeDisconnected(data, {
					"service" : service 
				});
			
		});
		
		// Map event NodeRemoved
		nodesManager.EventEmitter.on(nodesManager.CONSTANTS.Events.NodeRemoved, 
			function(data) {
				
				service._event_NodeRemoved(data, {
					"service" : service 
				});
		});
		
	}
	
	
	/**
	 * Manage sensors from node
	 * 
	 * @param stNode Node object
	 */
	manageSensorsFromNode(stNode) {
		
		if (stNode.config._SensorsManaged !== undefined ) {
			throw "This node is already managed.";
		}
		
		let service = this;
		
		service._mapNodeControlEvents(stNode);
		service._mapNodeControlMessages(stNode);
		
		
		stNode.config._SensorsManaged = true;
		
	}
	
	
	_mapNodeControlEvents(stNode) {
		
	}
	
	
	/**
	 * Map node control messages
	 * 
	 * @param stNode Node object
	 */
	_mapNodeControlMessages(stNode) {
		
		let service = this;
		let socket = stNode.socket;
		
		
		// Map message SensorsList
		socket.on(service.CONSTANTS.Messages.SensorsList, 
				
			function(msg){
				service._msg_SensorsList(msg, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
		
		// Map message SensorOptions
		socket.on(service.CONSTANTS.Messages.SensorOptions, 
				
			function(msg){
				service._msg_SensorOptions(msg, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
		
		// Map message SensorOptionsUpdated
		socket.on(service.CONSTANTS.Messages.SensorOptionsUpdated, 
				
			function(msg){
				service._msg_SensorOptionsUpdated(msg, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
		
		// Map message SensorStarted
		socket.on(service.CONSTANTS.Messages.SensorStarted, 
				
			function(msg){
				service._msg_SensorStarted(msg, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
		
		// Map message SensorStopped
		socket.on(service.CONSTANTS.Messages.SensorStopped, 
				
			function(msg){
				service._msg_SensorStopped(msg, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
	}
	
	
	/**
	 * Unmap node control messages
	 */
	_unmapNodeControlMessages(stNode, options) {
		
		let service = this;
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let smng = service.sensorsManager;
		let node = options.node;
		let socket = node.socket;

		
		socket.removeAllListeners(service.CONSTANTS.Messages.SensorsList);
		socket.removeAllListeners(service.CONSTANTS.Messages.SensorOptions);
		socket.removeAllListeners(service.CONSTANTS.Messages.SensorOptionsUpdated);
		socket.removeAllListeners(service.CONSTANTS.Messages.SensorStarted);
		socket.removeAllListeners(service.CONSTANTS.Messages.SensorStopped);

	}
	
	
	/**
	 * Event NodeAdded
	 */
	_event_NodeAdded(data, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let stNode = data.node;
		
		try {
			service.manageSensorsFromNode(stNode);
		} catch (e) {
			// TODO: handle exception
			throw "Cannot manage sensors of node. " + e;
		}
		
	}
	
	
	/**
	 * Event NodeDisconnected
	 */
	_event_NodeDisconnected(data, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let stNode = data.node;
		
		service._unmapNodeControlMessages(stNode, 
				{	"node" : stNode,
					"service" : service
				});
		
	}
	
	
	/**
	 * Event NodeRemoved
	 */
	_event_NodeRemoved(data, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let nodeID = data.nodeID;
		let smng = service.sensorsManager;
		
		let stSensors = smng.getSensorsByNode( nodeID );

		stSensors.sensors.forEach(function(sensor, _i, _sensors) {

			let sensorSearch = smng.getSensorBy_sysID( sensor.config._sysID );
			if ( sensorSearch.stSensor !== null ) {
				smng.sensorsList.splice(sensorSearch.position, 1);
			}

		});
		
	}
	
	
	/**
	 * Message SensorsList
	 */
	_msg_SensorsList(msg, options) {
		
		let service = this;
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		
		let smng = service.sensorsManager;
		let node = options.node;
		let socket = node.socket;
		let data = options.data;

		
		console.log('<*> NGSYS_Hero_Server_SensorsSRV.Messages.SensorsList');	// TODO REMOVE DEBUG LOG
		

		if (data.numSensors > 0 ) {

			data.sensors.forEach(function(snsDATA, _i) {

				snsDATA._sysID = node.config.nodeID + '.' + snsDATA.sensorID;
				snsDATA._refSTNodeID = node.config.nodeID;

//				snsDATA._nodeEvents = node.eventEmitter;
				snsDATA._controlSocket = socket;

				smng.addSensorFromNode( snsDATA );

			});
		}
		
	}
	
	
	/**
	 * Message SensorOptions
	 */
	_msg_SensorOptions(msg, options) {
		
		let service = this;
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let smng = service.sensorsManager;
		let node = options.node;
		let socket = node.socket;
		
		let sensorID = msg.sensorID;
		let sensorOptions = msg.options;

		
		console.log('<*> NGSYS_Hero_Server_SensorsSRV.Messages.SensorOptions');	// TODO REMOVE DEBUG LOG

		
		let sensor_sysID = node.config.nodeID + '.' + sensorID;

		let response = {
				"sensorID": sensorID
		};


		try {

			let sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
			if (sensorSearch.stSensor === null) {
				throw "Sensor not found";
			}

			let sns = sensorSearch.stSensor;

			sns.options = sensorOptions;

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

		  console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorOptions ERROR');	// TODO REMOVE DEBUG LOG
		  console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message SensorOptionsUpdated
	 */
	_msg_SensorOptionsUpdated(msg, options) {
		
		let service = this;
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let smng = service.sensorsManager;
		let node = options.node;
		let socket = node.socket;
	
		let sensorID = options.sensorID;
		let sensor_sysID = node.config.nodeID + '.' + sensorID;

		
		let response = {
			"sensorID": sensorID
		};


		console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorOptionsUpdated');	// TODO REMOVE DEBUG LOG
		console.log(options);	// TODO REMOVE DEBUG LOG

		try {

			let sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
			if (sensorSearch.stSensor === null) {
				throw "Sensor not found";
			}

			let sns = sensorSearch.stSensor;
			
			smng.getOptionsOfSensor(sns);
			
			// Emit message getSensorOptions
			socket.emit(smng.CONSTANTS.Messages.getSensorOptions,
					{"sensorID" : sns.config.sensorID});
			

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

		  console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorOptionsUpdated ERROR');	// TODO REMOVE DEBUG LOG
		  console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message SensorStarted
	 */
	_msg_SensorStarted(msg, options) {
		
		let service = this;
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let smng = service.sensorsManager;
		let node = options.node;
		let socket = node.socket;
		
		let sensorID = options.sensorID;
		let sensor_sysID = node.config.nodeID + '.' + sensorID;

		console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorStarted');	// TODO REMOVE DEBUG LOG
		console.log('<~~~> ' + sensor_sysID);	// TODO REMOVE DEBUG LOG

		let response = {
				"sensorID": sensorID
		};
		
		try {

			let sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
			if (sensorSearch.stSensor === null) {
				throw "Sensor not found";
			}

			let sns = sensorSearch.stSensor;
			let engine = sns.sensorEngine;
			
			engine.state = engine.CONSTANTS.States.SEstate_Working;

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

		  console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorOptionsUpdated ERROR');	// TODO REMOVE DEBUG LOG
		  console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message SensorStopped
	 */
	_msg_SensorStopped(msg, options) {
		
		let service = this;
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let smng = service.sensorsManager;
		let node = options.node;
		let socket = node.socket;
		
		let sensorID = options.sensorID;
		let sensor_sysID = node.config.nodeID + '.' + sensorID;

		console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorStopped');	// TODO REMOVE DEBUG LOG
		console.log(' <~~~> ' + sensor_sysID);	// TODO REMOVE DEBUG LOG

		let response = {
				"sensorID": sensorID
		};
		
		try {

			let sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
			if (sensorSearch.stSensor === null) {
				throw "Sensor not found";
			}

			let sns = sensorSearch.stSensor;
			let engine = sns.sensorEngine;
			
			engine.state = engine.CONSTANTS.States.SEstate_Ready;

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

		  console.log('<EEE> NGSYS_Hero_Server_SensorsSRV._msg_SensorStopped ERROR');	// TODO REMOVE DEBUG LOG
		  console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
}


let _Lib = {
	"NGSYS_Hero_Server_SensorsSRV" : NGSYS_Hero_Server_SensorsSRV
};


module.exports = _Lib;
