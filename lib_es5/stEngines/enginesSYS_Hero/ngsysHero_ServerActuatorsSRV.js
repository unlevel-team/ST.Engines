"use strict";

/**
 * Actuators services
 * for Server role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

/**
 * Import ActuatorsServices
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActuatorsServices = require('../services/ActuatorsServices.js').ActuatorsServices;

/**
 * Actuators Services 
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.services.ActuatorsServices
 * 
 * @property {NodesManager} nodesManager - Nodes manager object.
 * @property {object} eventEmitter - Object for emit events.
 * 
 */

var NGSYS_Hero_Server_ActuatorsSRV = function (_ActuatorsServices) {
	_inherits(NGSYS_Hero_Server_ActuatorsSRV, _ActuatorsServices);

	/**
  * 
  * @constructs NGSYS_Hero_Server_ActuatorsSRV
  * 
  * @param {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager
  * @param {object} controlChannel - Actuators manager
  * @param {NodesManager} nodesManager - Nodes manager
  * 
  */

	function NGSYS_Hero_Server_ActuatorsSRV(actuatorsManager, controlChannel, nodesManager) {
		_classCallCheck(this, NGSYS_Hero_Server_ActuatorsSRV);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_Server_ActuatorsSRV).call(this, actuatorsManager, controlChannel));

		var service = _this;

		service.nodesManager = nodesManager;

		//		service._mapControlEvents(actuatorsManager);

		return _this;
	}

	/**
  * Initialize
  */


	_createClass(NGSYS_Hero_Server_ActuatorsSRV, [{
		key: "initialize",
		value: function initialize() {

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_ActuatorsSRV.prototype), "initialize", this).call(this);

			var service = this;

			if (service.nodesManager === undefined || service.nodesManager === null) {
				throw "Nodes manager is required";
			}

			service._mapControlEventsForNodes(service.nodesManager);
		}

		/**
   * Map control events
   * 
   * @param {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager
   * 
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(actuatorsManager) {

			var service = this;

			if (actuatorsManager === undefined) {
				actuatorsManager = service.actuatorsManager;
			}

			//		actuatorsManager.actuatorsList.forEach(function(actuator, _i) {
			//			service._mapActuatorControlEvents(actuator);
			//		});
		}

		/**
   * Map control events for nodes
   * 
   * @param {NodesManager} nodesManager - Nodes manager
   */

	}, {
		key: "_mapControlEventsForNodes",
		value: function _mapControlEventsForNodes(nodesManager) {

			var service = this;

			if (nodesManager === undefined) {
				nodesManager = service.nodesManager;
			}

			// Map event NodeAdded
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeAdded, function (data) {

				service._event_NodeAdded(data, {
					"service": service
				});
			});

			// Map event NodeDisconnected
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeDisconnected, function (data) {

				service._event_NodeDisconnected(data, {
					"service": service
				});
			});

			// Map event NodeRemoved
			nodesManager.eventEmitter.on(nodesManager.CONSTANTS.Events.NodeRemoved, function (data) {

				service._event_NodeRemoved(data, {
					"service": service
				});
			});
		}

		/**
   * Map control messages
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_ActuatorsSRV.prototype), "_mapControlMessages", this).call(this, socket, {
				"service": service
			});
		}

		/**
   * Unmap control messages
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			_get(Object.getPrototypeOf(NGSYS_Hero_Server_ActuatorsSRV.prototype), "_unmapControlMessages", this).call(this, socket, {
				"service": service
			});

			service._mapped = null;
		}

		/**
   * Manage actuators from node
   * 
   * @param {Node} stNode - Node object
   */

	}, {
		key: "manageActuatorsFromNode",
		value: function manageActuatorsFromNode(stNode) {

			if (stNode.config._ActuatorsManaged !== undefined) {
				throw "This node is already managed.";
			}

			var service = this;

			service._mapNodeControlEvents(stNode);
			service._mapNodeControlMessages(stNode);

			if (stNode.config.numActuators > 0) {

				// Emit message getActuatorsList
				stNode.socket.emit(service.CONSTANTS.Messages.getActuatorsList);
			}

			stNode.config._ActuatorsManaged = true;
		}
	}, {
		key: "_mapNodeControlEvents",
		value: function _mapNodeControlEvents(stNode) {}

		/**
   * Map node control messages
   * 
   * @param {Node} stNode - Node object
   */

	}, {
		key: "_mapNodeControlMessages",
		value: function _mapNodeControlMessages(stNode) {

			var service = this;
			var socket = stNode.socket;

			// Map event disconnect
			socket.on("disconnect", function (msg) {
				service._unmapNodeControlMessages(stNode, { "node": stNode,
					"service": service
				});
			});

			// Map message ActuatorsList
			socket.on(service.CONSTANTS.Messages.ActuatorsList, function (msg) {
				service._msg_ActuatorsList(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message ActuatorOptions
			socket.on(service.CONSTANTS.Messages.ActuatorOptions, function (msg) {
				service._msg_ActuatorOptions(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message ActuatorOptionsUpdated
			socket.on(service.CONSTANTS.Messages.ActuatorOptionsUpdated, function (msg) {
				service._msg_ActuatorOptionsUpdated(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message ActuatorStarted
			socket.on(service.CONSTANTS.Messages.ActuatorStarted, function (msg) {
				service._msg_ActuatorStarted(msg, { "node": stNode,
					"service": service
				});
			});

			// Map message ActuatorStopped
			socket.on(service.CONSTANTS.Messages.ActuatorStopped, function (msg) {
				service._msg_ActuatorStopped(msg, { "node": stNode,
					"service": service
				});
			});
		}

		/**
   * Unmap node control messages
   * 
   * @param {Node} stNode - Node object
   * @param {object} options - Options object
   */

	}, {
		key: "_unmapNodeControlMessages",
		value: function _unmapNodeControlMessages(stNode, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var node = options.node;
			var socket = node.socket;

			socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorsList);
			socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorOptions);
			socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorOptionsUpdated);
			socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorStarted);
			socket.removeAllListeners(service.CONSTANTS.Messages.ActuatorStopped);
		}

		/**
   * Event NodeAdded
   */

	}, {
		key: "_event_NodeAdded",
		value: function _event_NodeAdded(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var stNode = data.node;

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

	}, {
		key: "_event_NodeDisconnected",
		value: function _event_NodeDisconnected(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var stNode = data.node;

			service._unmapNodeControlMessages(stNode, { "node": stNode,
				"service": service
			});
		}

		/**
   * Event NodeRemoved
   */

	}, {
		key: "_event_NodeRemoved",
		value: function _event_NodeRemoved(data, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var nodeID = data.nodeID;
			var amng = service.actuatorsManager;

			var stActuators = amng.getActuatorsByNode(nodeID);

			stActuators.actuators.forEach(function (actuator, _i, _actuators) {

				var actuatorSearch = amng.getActuatorBy_sysID(actuator.config._sysID);
				if (actuatorSearch.stActuator !== null) {
					amng.actuatorsList.splice(actuatorSearch.position, 1);
				}
			});
		}

		/**
   * Message ActuatorsList
   */

	}, {
		key: "_msg_ActuatorsList",
		value: function _msg_ActuatorsList(msg, options) {

			var _service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				_service = options.service;
			}

			var _amng = _service.actuatorsManager;
			var _node = options.node;
			var _nodeID = _node.config.nodeID;
			var _socket = _node.socket;
			var _data = msg;

			console.log('<*> NGSYS_Hero_Server_ActuatorsSRV.Messages.ActuatorsList'); // TODO REMOVE DEBUG LOG

			if (_data.numActuators > 0) {

				_data.actuators.forEach(function (actDATA, _i) {

					var _actConfig = {
						"actuatorID": actDATA.actuatorID,
						"type": actDATA.type,

						"_sysID": _nodeID + '.' + actDATA.actuatorID,
						"_refSTNodeID": _nodeID,
						"_controlSocket": _socket
					};

					var _actOptions = {
						"engine": actDATA.engine,
						"state": actDATA.state
					};

					try {

						_amng.addActuatorFromNode(_actConfig, _actOptions);

						// Emit message getActuatorOptions
						_socket.emit(_service.CONSTANTS.Messages.getActuatorOptions, { "actuatorID": actDATA.actuatorID });
					} catch (e) {

						// TODO: handle exception
						console.log('<~EEE~> NGSYS_Hero_Server_ActuatorsSRV.Messages.ActuatorsList'); // TODO REMOVE DEBUG LOG
						console.log('<~EEE~> Cannot add actuator from node.'); // TODO REMOVE DEBUG LOG
						console.log(e); // TODO REMOVE DEBUG LOG
						console.log(actDATA); // TODO REMOVE DEBUG LOG
					}
				});
			}
		}

		/**
   * Message ActuatorOptions
   */

	}, {
		key: "_msg_ActuatorOptions",
		value: function _msg_ActuatorOptions(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var amng = service.actuatorsManager;
			var node = options.node;
			var socket = node.socket;

			var actuatorID = msg.actuatorID;
			var actuatorOptions = msg.options;

			var actuator_sysID = node.config.nodeID + '.' + actuatorID;

			console.log('<*> NGSYS_Hero_Server_ActuatorsSRV.Messages.ActuatorOptions'); // TODO REMOVE DEBUG LOG
			console.log(' <~~~> ' + actuator_sysID); // TODO REMOVE DEBUG LOG
			console.log(actuatorOptions); // TODO REMOVE DEBUG LOG

			var response = {
				"actuatorID": actuatorID
			};

			try {

				var actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
				if (actuatorSearch.stActuator === null) {
					throw "Actuator not found";
				}

				var act = actuatorSearch.stActuator;

				act.options = actuatorOptions;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorOptions ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message ActuatorOptionsUpdated
   */

	}, {
		key: "_msg_ActuatorOptionsUpdated",
		value: function _msg_ActuatorOptionsUpdated(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var amng = service.actuatorsManager;
			var node = options.node;
			var socket = node.socket;

			var actuatorID = msg.actuatorID;
			var actuator_sysID = node.config.nodeID + '.' + actuatorID;

			var response = {
				"actuatorID": actuatorID
			};

			console.log('<*> ST NGSYS_Hero_Server_ActuatorsSRV.ActuatorOptionsUpdated'); // TODO REMOVE DEBUG LOG
			console.log(options); // TODO REMOVE DEBUG LOG

			try {

				var actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
				if (actuatorSearch.stActuator === null) {
					throw "Actuator not found";
				}

				var act = actuatorSearch.stActuator;

				// Emit message getActuatorOptions
				socket.emit(service.CONSTANTS.Messages.getActuatorOptions, { "actuatorID": act.config.actuatorID });
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorOptionsUpdated ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message ActuatorStarted
   */

	}, {
		key: "_msg_ActuatorStarted",
		value: function _msg_ActuatorStarted(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var amng = service.actuatorsManager;
			var node = options.node;
			var socket = node.socket;

			var actuatorID = msg.actuatorID;
			var actuator_sysID = node.config.nodeID + '.' + actuatorID;

			console.log('<*> ST NGSYS_Hero_Server_ActuatorsSRV.ActuatorStarted'); // TODO REMOVE DEBUG LOG
			console.log('<~~~> ' + actuator_sysID); // TODO REMOVE DEBUG LOG

			var response = {
				"actuatorID": actuatorID
			};

			try {

				var actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
				if (actuatorSearch.stActuator === null) {
					throw "Actuator not found";
				}

				var act = actuatorSearch.stActuator;
				var engine = act.actuatorEngine;

				engine.state = engine.CONSTANTS.States.State_Working;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorOptionsUpdated ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}

		/**
   * Message ActuatorStopped
   */

	}, {
		key: "_msg_ActuatorStopped",
		value: function _msg_ActuatorStopped(msg, options) {

			var service = this;

			if (options === undefined || options === null) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			var amng = service.actuatorsManager;
			var node = options.node;
			var socket = node.socket;

			var actuatorID = msg.actuatorID;
			var actuator_sysID = node.config.nodeID + '.' + actuatorID;

			console.log('<*> ST NGSYS_Hero_Server_ActuatorsSRV.ActuatorStopped'); // TODO REMOVE DEBUG LOG
			console.log(' <~~~> ' + actuator_sysID); // TODO REMOVE DEBUG LOG

			var response = {
				"actuatorID": actuatorID
			};

			try {

				var actuatorSearch = amng.getActuatorBy_sysID(actuator_sysID);
				if (actuatorSearch.stActuator === null) {
					throw "Actuator not found";
				}

				var act = actuatorSearch.stActuator;
				var engine = act.actuatorEngine;

				engine.state = engine.CONSTANTS.States.State_Ready;
			} catch (e) {
				// TODO: handle exception
				response.result = "ERROR";
				response.error = e;

				console.log('<EEE> NGSYS_Hero_Server_ActuatorsSRV._msg_ActuatorStopped ERROR'); // TODO REMOVE DEBUG LOG
				console.log(response); // TODO REMOVE DEBUG LOG
			}
		}
	}]);

	return NGSYS_Hero_Server_ActuatorsSRV;
}(ActuatorsServices);

var _Lib = {
	"NGSYS_Hero_Server_ActuatorsSRV": NGSYS_Hero_Server_ActuatorsSRV
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_ServerActuatorsSRV.js.map
