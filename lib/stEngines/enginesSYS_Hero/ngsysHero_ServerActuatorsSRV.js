"use strict";

/**
 * Actuators services
 * for Server role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

let ActuatorsServices = require('../services/ActuatorsServices.js').ActuatorsServices;


/**
 * Actuators Services
 */
class NGSYS_Hero_Server_ActuatorsSRV extends ActuatorsServices {
	
	
	constructor(actuatorsManager, controlChannel, nodesManager) {
		
		super(actuatorsManager, controlChannel);
		
		let service = this;
		
		service.nodesManager = nodesManager;
		
//		service._mapControlEvents(actuatorsManager);
		
		
		
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
	
	
	_mapControlEvents(actuatorsManager) {
		
		let service = this;
		
		if (actuatorsManager === undefined) {
			actuatorsManager = service.actuatorsManager;
		}
		
		
//		actuatorsManager.actuatorsList.forEach(function(actuator, _i) {
//			service._mapActuatorControlEvents(actuator);
//		});
		
		
		
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
	 * Map control messages
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
	 * Manage actuators from node
	 * 
	 * @param stNode Node object
	 */
	manageActuatorsFromNode(stNode) {
		
		if (stNode.config._ActuatorsManaged !== undefined ) {
			throw "This node is already managed.";
		}
		
		let service = this;
		
		service._mapNodeControlEvents(stNode);
		service._mapNodeControlMessages(stNode);
		
		if ( stNode.config.numActuators > 0 ) {
			
			// Emit message getActuatorsList
			stNode.socket.emit( service.CONSTANTS.Messages.getActuatorsList ); 
		}
		
		stNode.config._ActuatorsManaged = true;
		
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
		
		// Map event disconnect
		socket.on("disconnect", 
				
			function(msg){
				service._unmapNodeControlMessages(stNode, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
		
		
		
		// Map message ActuatorsList
		socket.on(service.CONSTANTS.Messages.ActuatorsList, 
				
			function(msg){
				service._msg_ActuatorsList(msg, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
		
		// Map message ActuatorOptions
		socket.on(service.CONSTANTS.Messages.ActuatorOptions, 
				
			function(msg){
				service._msg_ActuatorOptions(msg, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
		
		// Map message ActuatorOptionsUpdated
		socket.on(service.CONSTANTS.Messages.ActuatorOptionsUpdated, 
				
			function(msg){
				service._msg_ActuatorOptionsUpdated(msg, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
		
		// Map message ActuatorStarted
		socket.on(service.CONSTANTS.Messages.ActuatorStarted, 
				
			function(msg){
				service._msg_ActuatorStarted(msg, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
		
		// Map message ActuatorStopped
		socket.on(service.CONSTANTS.Messages.ActuatorStopped, 
				
			function(msg){
				service._msg_ActuatorStopped(msg, 
					{	"node" : stNode,
						"service" : service
					});
			}
		);
		
	}
	
	
	/**
	 * Unmap node control messages
	 * 
	 * @param stNode Node object
	 * @param options Options object
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
		
		let node = options.node;
		let socket = node.socket;

		
		socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorsList);
		socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorOptions);
		socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorOptionsUpdated);
		socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorStarted);
		socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorStopped);

	}
	
	
	/**
	 * Event NodeAdded
	 */
	_event_NodeAdded(data, options){
		
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
			service.manageActuatorsFromNode(stNode);
		} catch (e) {
			// TODO: handle exception
			throw "Cannot manage actuators of node. " + e;
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
		let amng = service.actuatorsManager;
		
		let stActuators = amng.getActuatorsByNode( nodeID );

		stActuators.actuators.forEach(function(actuator, _i, _actuators) {

			let actuatorSearch = amng.getActuatorBy_sysID( actuator.config._sysID );
			if ( actuatorSearch.stActuator !== null ) {
				amng.actuatorsList.splice(actuatorSearch.position, 1);
			}

		});
		
	}
	
	
	/**
	 * Message ActuatorsList
	 */
	_msg_ActuatorsList(msg, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		
		let amng = service.actuatorsManager;
		let node = options.node;
		let socket = node.socket;
		let data = msg;

		
		console.log('<*> NGSYS_Hero_Server_ActuatorsSRV.Messages.ActuatorsList');	// TODO REMOVE DEBUG LOG
		

		if (data.numActuators > 0 ) {

			data.actuators.forEach(function(actDATA, _i) {

				actDATA._sysID = node.config.nodeID + '.' + actDATA.actuatorID;
				actDATA._refSTNodeID = node.config.nodeID;

//				actDATA._nodeEvents = node.eventEmitter;
				actDATA._controlSocket = socket;

				
				try {
					
					amng.addActuatorFromNode( actDATA );
					
					// Emit message getActuatorOptions
					socket.emit(service.CONSTANTS.Messages.getActuatorOptions, 
							{"actuatorID" : actDATA.actuatorID});
					
				} catch (e) {
					
					// TODO: handle exception
					console.log('<~EEE~> NGSYS_Hero_Server_ActuatorsSRV.Messages.ActuatorsList');	// TODO REMOVE DEBUG LOG
					console.log('<~EEE~> Cannot add actuator from node.');	// TODO REMOVE DEBUG LOG
					console.log(e);	// TODO REMOVE DEBUG LOG
					console.log(actDATA);	// TODO REMOVE DEBUG LOG
				}
				
				


			});
		}
		
	}
	
	
	/**
	 * Message ActuatorOptions
	 */
	_msg_ActuatorOptions(msg, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let amng = service.actuatorsManager;
		let node = options.node;
		let socket = node.socket;
		
		let actuatorID = msg.actuatorID;
		let actuatorOptions = msg.options;
		
		
		let actuator_sysID = node.config.nodeID + '.' + actuatorID;
		
		
		console.log('<*> NGSYS_Hero_Server_ActuatorsSRV.Messages.ActuatorOptions');	// TODO REMOVE DEBUG LOG
		console.log(' <~~~> ' + actuator_sysID);	// TODO REMOVE DEBUG LOG
		console.log(actuatorOptions);	// TODO REMOVE DEBUG LOG

		
		let response = {
				"actuatorID": actuatorID
		};


		try {

			let actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
			if (actuatorSearch.stActuator === null) {
				throw "Actuator not found";
			}

			let act = actuatorSearch.stActuator;

			act.options = actuatorOptions;

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

		  console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorOptions ERROR');	// TODO REMOVE DEBUG LOG
		  console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message ActuatorOptionsUpdated
	 */
	_msg_ActuatorOptionsUpdated(msg, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let amng = service.actuatorsManager;
		let node = options.node;
		let socket = node.socket;
	
		let actuatorID = msg.actuatorID;
		let actuator_sysID = node.config.nodeID + '.' + actuatorID;

		
		let response = {
			"actuatorID": actuatorID
		};


		console.log('<*> ST NGSYS_Hero_Server_ActuatorsSRV.ActuatorOptionsUpdated');	// TODO REMOVE DEBUG LOG
		console.log(options);	// TODO REMOVE DEBUG LOG

		try {

			let actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
			if (actuatorSearch.stActuator === null) {
				throw "Actuator not found";
			}

			let act = actuatorSearch.stActuator;

			// Emit message getActuatorOptions
			socket.emit(service.CONSTANTS.Messages.getActuatorOptions, 
					{"actuatorID" : act.config.actuatorID});

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

		  console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorOptionsUpdated ERROR');	// TODO REMOVE DEBUG LOG
		  console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message ActuatorStarted
	 */
	_msg_ActuatorStarted(msg, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let amng = service.actuatorsManager;
		let node = options.node;
		let socket = node.socket;
		
		let actuatorID = msg.actuatorID;
		let actuator_sysID = node.config.nodeID + '.' + actuatorID;

		console.log('<*> ST NGSYS_Hero_Server_ActuatorsSRV.ActuatorStarted');	// TODO REMOVE DEBUG LOG
		console.log('<~~~> ' + actuator_sysID);	// TODO REMOVE DEBUG LOG

		let response = {
				"actuatorID": actuatorID
		};
		
		try {

			let actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
			if (actuatorSearch.stActuator === null) {
				throw "Actuator not found";
			}

			let act = actuatorSearch.stActuator;
			let engine = act.actuatorEngine;
			
			engine.state = engine.CONSTANTS.States.SEstate_Working;

		} catch (e) {
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

		  console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorOptionsUpdated ERROR');	// TODO REMOVE DEBUG LOG
		  console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
	
	/**
	 * Message ActuatorStopped
	 */
	_msg_ActuatorStopped(msg, options) {
		
		let service = this;
		
		if (options === undefined ||
				options === null) {
			options = {};
		}
		
		if (options.service !== undefined) {
			service = options.service;
		}
		
		let amng = service.actuatorsManager;
		let node = options.node;
		let socket = node.socket;
		
		let actuatorID = msg.actuatorID;
		let actuator_sysID = node.config.nodeID + '.' + actuatorID;

		console.log('<*> ST NGSYS_Hero_Server_ActuatorsSRV.ActuatorStopped');	// TODO REMOVE DEBUG LOG
		console.log(' <~~~> ' + actuator_sysID);	// TODO REMOVE DEBUG LOG

		let response = {
				"actuatorID": actuatorID
		};
		
		try {

			let actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
			if (actuatorSearch.stActuator === null) {
				throw "Actuator not found";
			}

			let act = actuatorSearch.stActuator;
			let engine = act.actuatorEngine;
			
			engine.state = engine.CONSTANTS.States.SEstate_Ready;

		} catch (e) {	
			// TODO: handle exception
			response.result = "ERROR";
			response.error = e;

		  console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorStopped ERROR');	// TODO REMOVE DEBUG LOG
		  console.log(response);	// TODO REMOVE DEBUG LOG
		}
		
	}
	
}


let _Lib = {
		"NGSYS_Hero_Server_ActuatorsSRV" : NGSYS_Hero_Server_ActuatorsSRV
	};


module.exports = _Lib;