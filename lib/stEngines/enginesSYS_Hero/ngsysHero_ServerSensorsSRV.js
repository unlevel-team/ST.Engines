"use strict";

/**
 * Sensors services
 * for role Server
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
 * for role Server
 * 
 * version Hero
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.services.SensorsServices
 * 
 */
class NGSYS_Hero_Server_SensorsSRV extends SensorsServices {
	
	/**
	 * @construct NGSYS_Hero_Server_SensorsSRV
	 * 
	 * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
	 * @param {object} controlChannel - Control channel object
	 * @param {NodesManager} nodesManager - Nodes manager object
	 */
	constructor(sensorsManager, controlChannel, nodesManager) {
		
		super(sensorsManager, controlChannel);
		
		let service = this;
		
		service.nodesManager = nodesManager;
		
	}
	
	
	/**
	 * Initialize
	 */
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
	 * 
	 * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
	 */
	_mapControlEvents(sensorsManager) {
		
		let service = this;
		
		if (sensorsManager === undefined) {
			sensorsManager = service.sensorsManager;
		}
	
	}
	
	
	/**
	 * Map control messages
	 * 
	 * @param {object} socket - Socket object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
	 */
	_mapControlMessages(socket, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		super._mapControlMessages(socket, {
			"service" : service
		});
		
		
	}
	
	
	/**
	 * Unmap control messages
	 * 
	 * @param {object} socket - Socket object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
	 */
	_unmapControlMessages(socket, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		
		super._unmapControlMessages(socket, {
			"service" : service
		});
		

		service._mapped = null;
		
	}
	
	
	/**
	 * Map control events for nodes
	 * 
	 * @param {NodesManager} nodesManager - Nodes manager object
	 * 
	 */
	_mapControlEventsForNodes(nodesManager) {
		
		let service = this;
		
		if (nodesManager === undefined) {
			nodesManager = service.nodesManager;
		}

		
		// Map event NodeAdded
		nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeAdded, 
			function(data) {
				
				service._event_NodeAdded(data, {
					"service" : service 
				});
		});
		
		
		// Map event NodeDisconnected
		nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeDisconnected, 
			function(data) {
				
				service._event_NodeDisconnected(data, {
					"service" : service 
				});
			
		});
		
		// Map event NodeRemoved
		nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeRemoved, 
			function(data) {
				
				service._event_NodeRemoved(data, {
					"service" : service 
				});
		});
		
	}
	
	
	/**
	 * Manage sensors from node
	 * 
	 * @param {Node} stNode - Node object
	 */
	manageSensorsFromNode(stNode) {
		
		if (stNode.config._SensorsManaged !== undefined ) {
			throw "This node is already managed.";
		}
		
		let service = this;
		
		service._mapNodeControlEvents(stNode);
		service._mapNodeControlMessages(stNode);
		
		
		if ( stNode.config.numSensors > 0 ) {

			// Emit message getSensorsList
			stNode.socket.emit( service.CONSTANTS.Messages.getSensorsList );
		}
		
		stNode.config._SensorsManaged = true;
		
	}
	
	
	_mapNodeControlEvents(stNode) {
		
	}
	
	
	/**
	 * Map node control messages
	 * 
	 * @param {Node} stNode - Node object
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
	 * 
	 * @param {Node} stNode - Node object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
	 */
	_unmapNodeControlMessages(stNode, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
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
	 * 
	 * @param {object} data - Data object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
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
		
		console.log('<~*~> ST NGSYS_Hero_Server_SensorsSRV._event_NodeAdded');	// TODO REMOVE DEBUG LOG
		
		
		try {
			service.manageSensorsFromNode(stNode);
		} catch (e) {
			
			// TODO: handle exception
//			throw "Cannot manage sensors of node. " + e;
			console.log('<~EEE~> ST NGSYS_Hero_Server_SensorsSRV._event_NodeAdded');	// TODO REMOVE DEBUG LOG
			console.log('<~EEE~> Cannot manage sensors of node');	// TODO REMOVE DEBUG LOG
			console.log(e);	// TODO REMOVE DEBUG LOG

		}
		
	}
	
	
	/**
	 * Event NodeDisconnected
	 * 
	 * @param {object} data - Data object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
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
	 * 
	 * @param {object} data - Data object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
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
	 * <pre>
	 * Server receives message `SensorList` message from node 
	 * </pre>
	 * 
	 * 
	 * @protected
	 * 
	 * @param {object} msg - Message object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
	 */
	_msg_SensorsList(msg, options) {
		
		let _service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			_service = options.service;
		}
		
		
		let _smng = _service.sensorsManager;
		let _node = options.node;
		let _nodeID = _node.config.nodeID;
		let _socket = _node.socket;
		let _data = msg;

		
		console.log('<*> NGSYS_Hero_Server_SensorsSRV.Messages.SensorsList');	// TODO REMOVE DEBUG LOG
		

		if (_data.numSensors > 0 ) {

			_data.sensors.forEach(function(snsDATA, _i) {
				
				let _snsConfig = {
					"sensorID": snsDATA.sensorID,
					"type": snsDATA.type,
					
					"_sysID": _nodeID + '.' + snsDATA.sensorID,
					"_refSTNodeID": _nodeID,
					"_controlSocket": _socket
				};

				let _snsOptions = {
					"engine": snsDATA.engine,
					"state": snsDATA.state
				};
				
				
				try {
					
					_smng.addSensorFromNode( _snsConfig, _snsOptions);
					
					_socket.emit(_service.CONSTANTS.Messages.getSensorOptions, {
						"sensorID" : _snsConfig.sensorID
					});
					
					
				} catch (e) {
					
					// TODO: handle exception
					console.log('<~EEE~> NGSYS_Hero_Server_SensorsSRV.Messages.SensorsList');	// TODO REMOVE DEBUG LOG
					console.log('<~EEE~> Cannot add sensor from node.');	// TODO REMOVE DEBUG LOG
					console.log(e);	// TODO REMOVE DEBUG LOG
					console.log(_snsConfig);	// TODO REMOVE DEBUG LOG
				}

			});
		}
		
	}
	
	
	/**
	 * Message SensorOptions
	 * 
	 * @param {object} msg - Message object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
	 */
	_msg_SensorOptions(msg, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let smng = service.sensorsManager;
		let node = options.node;
		let socket = node.socket;
		
		let sensorID = msg.sensorID;
		let sensorOptions = msg.options;

		
		let sensor_sysID = node.config.nodeID + '.' + sensorID;
		
		
		console.log('<*> NGSYS_Hero_Server_SensorsSRV.Messages.SensorOptions');	// TODO REMOVE DEBUG LOG
		console.log(' <~~~> ' + sensor_sysID);	// TODO REMOVE DEBUG LOG
		console.log(sensorOptions);	// TODO REMOVE DEBUG LOG

		
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
	 * 
	 * @param {object} msg - Message object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
	 */
	_msg_SensorOptionsUpdated(msg, options) {
		
		let service = this;
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let smng = service.sensorsManager;
		let node = options.node;
		let socket = node.socket;
	
		let sensorID = msg.sensorID;
		let sensor_sysID = node.config.nodeID + '.' + sensorID;

		
		let response = {
			"sensorID": sensorID
		};


		console.log('<*> ST NGSYS_Hero_Server_SensorsSRV.SensorOptionsUpdated');	// TODO REMOVE DEBUG LOG
		console.log('<~~~> ' + sensor_sysID);	// TODO REMOVE DEBUG LOG

		
		try {

			let sensorSearch = smng.getSensorBy_sysID(sensor_sysID);
			if (sensorSearch.stSensor === null) {
				throw "Sensor not found";
			}

			let sns = sensorSearch.stSensor;
			
			// Emit message getSensorOptions
			socket.emit(service.CONSTANTS.Messages.getSensorOptions,
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
	 * 
	 * @param {object} msg - Message object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
	 */
	_msg_SensorStarted(msg, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let smng = service.sensorsManager;
		let node = options.node;
		let socket = node.socket;
		
		let sensorID = msg.sensorID;
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

		  console.log('<EEE> NGSYS_Hero_Server_SensorsSRV.SensorStarted ERROR');	// TODO REMOVE DEBUG LOG
		  console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message SensorStopped
	 * 
	 * @param {object} msg - Message object
	 * @param {object} options - Options object
	 * @param {st.ngn.ngnSYS_Hero.NGSYS_Hero_Server_SensorsSRV} [options.service] - Sensors Service object
	 */
	_msg_SensorStopped(msg, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let smng = service.sensorsManager;
		let node = options.node;
		let socket = node.socket;
		
		let sensorID = msg.sensorID;
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
