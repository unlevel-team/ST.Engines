"use strict";

/**
 * import express
 * @ignore
 */
let express = require('express');

/**
 * import bodyParser
 * @ignore
 */
let bodyParser = require('body-parser');


/**
 * SCS Response default
 * 
 * @typedef {Object} SCS_Response_Default
 * @memberof st.ngn.ngnSYS_Hero.scs_routes.SCS_RouteActuators
 * @type Object
 * @protected
 * 
 * @property {string} context - 'ST Server Actuators'
 * @property {string} action - 'Default'
 * @property {number} messagesReceived - Number of messages received
 * 
 */


/**
 * SCS Response list
 * <pre>
 * mapped to '/list/'
 * </pre>
 * 
 * @typedef {Object} SCS_Response_List
 * @memberof st.ngn.ngnSYS_Hero.scs_routes.SCS_RouteActuators
 * @type Object
 * @protected
 * 
 * @property {string} context - 'ST Server Actuators'
 * @property {string} action - 'List'
 * @property {number} numberOfActuators - The number of actuators
 * @property {Object[]} actuators - Actuators list
 * @property {string} actuators[].actuatorID - Actuator ID
 * @property {string} actuators[].type - Actuator type
 * @property {string} actuators[]._sysID - Actuator sysID
 * @property {string} actuators[].engine - Engine name. Could be 'not defined'
 * @property {string} actuators[].state - Engine state.
 * 
 */

/**
 * Routes for Actuators
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero.scs_routes
 * 
 * @property {object} expressRoute - Express route object
 * @property {number} messages - Messages counter
 * @property {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager object
 * 
 */
class SCS_RouteActuators {
	
	/**
	 * @constructs SCS_RouteActuators
	 * 
	 * @param {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager object
	 */
	constructor(actuatorsManager) {
		
		this.expressRoute = null;
		this.messages = 0;
		this.actuatorsManager = actuatorsManager;
		
		this.mapServiceRoutes();
	}
	
	
	/**
	 * Map service routes
	 */
	mapServiceRoutes() {
		
		let routerActuators = this;

		routerActuators.expressRoute = express.Router();
		
		// create application/json parser 
		let jsonParser = bodyParser.json();
		
		// middleware that is specific to this router
		routerActuators.expressRoute.use(function messageCount(req, res, next) {
			 routerActuators.messages++;
			
//			res.setHeader('Content-Type', 'text/html');
//			res.write('ST Server Nodes <br />', 'utf8')
			
			 res.setHeader('Content-Type', 'application/json');
			next();
		});
		
		// define the home page route
		routerActuators.expressRoute.get('/', function(req, res) {
			
			routerActuators._route_Default(req, res, {
				"scsRouteActuators": routerActuators
			});
		});
		
		
		// List of Actuators
		routerActuators.expressRoute.get('/list/', function(req, res) {
			
			routerActuators._route_List(req, res, {
				"scsRouteActuators": routerActuators
			});
		});
		
		
		// Get Actuator options
		routerActuators.expressRoute.get('/:actuatorID/options', function(req, res) {
			
			console.log(' <*> SeverControlService Get Actuator Options' );	// TODO REMOVE DEBUG LOG

			let amngr = routerActuators.actuatorsManager;
			let actuatorID = req.params.actuatorID;
			
			let _response = {
					"context" : "ST Server Actuators",
					"action" : "Get Options of Actuator",
					"actuatorID": actuatorID
				};
			
			try {
				
				let actuatorSearch = amngr.getActuatorBy_sysID(actuatorID);
				if (actuatorSearch.stActuator === null ) {
					throw "Actuator not found";
				}
				
				let stActuator = actuatorSearch.stActuator;
				
				_response.options = stActuator.options;
				
				
			} catch (e) {
				// TODO: handle exception
				
				_response.response = 'Something happends...';
				_response.error = e;
			}
			
			
			res.jsonp(_response);
			res.end();
			
		});
		
		
		
		// Set Actuator options
		routerActuators.expressRoute.post('/:actuatorID/options', jsonParser, function(req, res) {
			
			console.log(' <*> SeverControlService Set Actuator Options' );	// TODO REMOVE DEBUG LOG

			let amngr = routerActuators.actuatorsManager;
			let actuatorID = req.params.actuatorID;
			
			let options = req.body.options;
			
			let _response = {
					"context" : "ST Server Actuators",
					"action" : "Set Options of Actuator",
					"actuatorID": actuatorID,
					"options": options
				};
			
			try {
				
				let actuatorSearch = amngr.getActuatorBy_sysID(actuatorID);
				if (actuatorSearch.stActuator === null ) {
					throw "Actuator not found";
				}
				
				let stActuator = actuatorSearch.stActuator;
				stActuator.setOptions(options);
				
				
			} catch (e) {
				// TODO: handle exception
				
				_response.response = 'Something happends...';
				_response.error = e;
			}
			
			
			res.jsonp(_response);
			res.end();
			
		});	
		
		
		
		
		
		// Start Actuator
		routerActuators.expressRoute.get('/:actuatorID/start', function(req, res) {
			
			console.log(' <*> SeverControlService Actuator Start' );	// TODO REMOVE DEBUG LOG
			
			let amngr = routerActuators.actuatorsManager;
			let actuatorID = req.params.actuatorID;
			
			var _response = {
					"context" : "ST Server Actuators",
					"action" : "Start",
					"actuatorID": req.params.actuatorID,
					"response" : "test"
				};
			
			
			try {
				
				let actuatorSearch = amngr.getActuatorBy_sysID(actuatorID);
				if (actuatorSearch.stActuator !== null ) {
					actuatorSearch.stActuator.start().then(function(value) {
						console.log( value );	// TODO REMOVE DEBUG LOG
						console.log(' <*> Actuator Started' );	// TODO REMOVE DEBUG LOG
					}, function(reason) {
						
					});
					
					
				} else {
					_response.response = 'Actuator not found.';
				}
				
			} catch (e) {
				// TODO: handle exception
				
				_response.response = 'Something happends...';
				_response.error = e.message;
			}
			
			
			res.jsonp(_response);
			res.end();
			
		});
		
		// Stop Actuator
		routerActuators.expressRoute.get('/:actuatorID/stop', function(req, res) {
			
			console.log(' <*> SeverControlService Actuator Stop' );	// TODO REMOVE DEBUG LOG
			
			let amngr = routerActuators.actuatorsManager;
			let actuatorID = req.params.actuatorID;
			
			var _response = {
					"context" : "ST Server Actuators",
					"action" : "Stop",
					"actuatorID": req.params.actuatorID,
					"response" : "test"
				};
			
			
			try {
				
				let actuatorSearch = amngr.getActuatorBy_sysID(actuatorID);
				if (actuatorSearch.stActuator !== null ) {
					actuatorSearch.stActuator.stop().then(function(value) {
						console.log( value );	// TODO REMOVE DEBUG LOG
						console.log(' <*> Actuator Stopped' );	// TODO REMOVE DEBUG LOG
					}, function(reason) {
						console.log( reason );	// TODO REMOVE DEBUG LOG

					});
					
					
				} else {
					_response.response = 'Actuator not found.';
				}
				
			} catch (e) {
				// TODO: handle exception
				
				_response.response = 'Something happends...';
				_response.error = e.message;
			}
			
			
			res.jsonp(_response);
			res.end();
			
		});		
		
		
		
		// Turn off Actuators of Node
		routerActuators.expressRoute.get('/:nodeID/turnOffActuators', function(req, res) {
			
			console.log(' <*> SeverControlService Actuators turnOffActuators' );	// TODO REMOVE DEBUG LOG

			
			var _response = {
					"context" : "ST Server Actuators",
					"action" : "Turn off actuators",
					"sensorID": req.params.nodeID,
					"response" : "test"
				};
			
			
			try {
				
				routerActuators.actuatorsManager.turnOffActuatorsOfNode(req.params.nodeID);
				
			} catch (e) {
				// TODO: handle exception
				
				_response.response = 'Something happends...';
				_response.error = e.message;
			}
			
			
			res.jsonp(_response);
			res.end();
			
		});
		
	}
	
	
	/**
	 * Response for default action
	 * 
	 * @protected
	 * 
	 * @param {Object} req - Request object
	 * @param {Object} res - Response object
	 * @param {Object} options - Options
	 * 
	 */
	_route_Default(req, res, options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _SCS_RouteActuators = this;
		if (options.scsRouteActuators !== undefined) {
			_SCS_RouteActuators = options.scsRouteActuators;
		}
		
		let _response = {
			"context" : "ST Server Actuators",
			"action" : "Default",
			"messagesReceived" : _SCS_RouteActuators.messages
			
		};
		
		res.jsonp(_response);
		res.end();
			
	}
	
	
	
	/**
	 * Response for list action
	 * 
	 * @protected
	 * 
	 * @param {Object} req - Request object
	 * @param {Object} res - Response object
	 * @param {Object} options - Options
	 */
	_route_List(req, res, options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _SCS_RouteActuators = this;
		if (options.scsRouteActuators !== undefined) {
			_SCS_RouteActuators = options.scsRouteActuators;
		}
		
		let _amngr = _SCS_RouteActuators.actuatorsManager;
		
		let _response = {
			"context" : "ST Server Actuators",
			"action" : "list",
			"numberOfActuators": 0,
			"actuators" : []
		};
		
		_amngr.actuatorsList.forEach(function(_act, _i) {
			
			let _actuatorData = {
					"actuatorID" : _act.config.actuatorID,
					"type": _act.config.type,
					"_sysID": _act.config._sysID,
					"engine": "not defined",
					"state": "not defined"
					
			};
			
			if (_act.actuatorEngine !== null) {
				if (_act.actuatorEngine.name !== undefined) {
					_actuatorData.engine = _act.actuatorEngine.name;
				}
				_actuatorData.state = _act.actuatorEngine.state;
			}
			
			_response.actuators.push(_actuatorData);
		});
		
		_response.numberOfActuators = _amngr.actuatorsList.length;
		
		
		res.jsonp(_response);
		res.end();
	}
	
}

module.exports = SCS_RouteActuators;
