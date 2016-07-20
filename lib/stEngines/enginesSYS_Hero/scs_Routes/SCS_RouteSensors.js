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
 * @memberof st.ngn.ngnSYS_Hero.scs_routes.SCS_RouteSensors
 * @type Object
 * @protected
 * 
 * @property {string} context - 'ST Server Sensors'
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
 * @memberof st.ngn.ngnSYS_Hero.scs_routes.SCS_RouteSensors
 * @type Object
 * @protected
 * 
 * @property {string} context - 'ST Server Sensors'
 * @property {string} action - 'List'
 * @property {number} numberOfSensors - The number of sensors
 * @property {Object[]} sensors - Sensors list
 * @property {string} sensors[].sensorID - Sensor ID
 * @property {string} sensors[].type - Sensor type
 * @property {string} sensors[]._sysID - Sensor sysID
 * @property {string} sensors[].engine - Engine name. Could be 'not defined'
 * @property {string} sensors[].state - Engine state.
 * 
 */


/**
 * SCS Response sensor options
 * <pre>
 * mapped to '/:sensorID/options'
 * </pre>
 * 
 * @typedef {Object} SCS_Response_Options
 * @memberof st.ngn.ngnSYS_Hero.scs_routes.SCS_RouteSensors
 * @type Object
 * @protected
 * 
 * @property {string} context - 'ST Server Sensors'
 * @property {string} action - 'Get Options of Sensor'
 * @property {string} sensorID - 'The Sensor ID'
 * @property {Object[]} options - 'Sensor options'
 * 
 * 
 * @property {number} numberOfSensors - The number of sensors
 * @property {Object[]} sensors - Sensors list
 * @property {string} sensors[].sensorID - Sensor ID
 * @property {string} sensors[].type - Sensor type
 * @property {string} sensors[]._sysID - Sensor sysID
 * 
 */


/**
 * Routes for Sensors
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero.scs_routes
 * 
 * @property {object} expressRoute - Express route object
 * @property {number} messages - Messages counter
 * @property {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
 */
class SCS_RouteSensors {

	/**
	 * @constructs SCS_RouteSensors
	 * 
	 * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
	 */
	constructor(sensorsManager) {
		this.expressRoute = null;
		this.messages = 0;
		this.sensorsManager = sensorsManager;
		
		
		this.mapServiceRoutes();
	}
	
	
	/**
	 * Map service routes
	 */
	mapServiceRoutes() {
		
		let routerSensors = this;
		routerSensors.expressRoute = express.Router();
		
		// create application/json parser 
		let jsonParser = bodyParser.json();
		
		// middleware that is specific to this router
		routerSensors.expressRoute.use(function messageCount(req, res, next) {
			 routerSensors.messages++;
			
//			res.setHeader('Content-Type', 'text/html');
//			res.write('ST Server Nodes <br />', 'utf8')
			
			 res.setHeader('Content-Type', 'application/json');
			next();
		});
		
		
		// define the home page route
		routerSensors.expressRoute.get('/', function(req, res) {
			
			routerSensors._route_Default(req, res, {
				"scsRouteSensors": routerSensors
			});
			
		});
		
		
		// List of Sensors
		routerSensors.expressRoute.get('/list/', function(req, res) {
			
			routerSensors._route_List(req, res, {
				"scsRouteSensors": routerSensors
			});
			
		});
		
		
		// Get Sensor options
		routerSensors.expressRoute.get('/:sensorID/options', function(req, res) {
			
			console.log(' <*> SeverControlService Get Sensor Options' );	// TODO REMOVE DEBUG LOG

			let smngr = routerSensors.sensorsManager;
			let sensorID = req.params.sensorID;
			
			let _response = {
					"context" : "ST Server Sensors",
					"action" : "Get Options of Sensor",
					"sensorID": sensorID
				};
			
			try {
				
				let sensorSearch = smngr.getSensorBy_sysID(sensorID);
				if (sensorSearch.stSensor === null ) {
					throw "Sensor not found";
				}
				
				let stSensor = sensorSearch.stSensor;
				
				_response.options = stSensor.options;
				
				
			} catch (e) {
				// TODO: handle exception
				
				_response.response = 'Something happends...';
				_response.error = e;
			}
			
			
			res.jsonp(_response);
			res.end();
			
		});
		
		
		// Set Sensor options
		routerSensors.expressRoute.post('/:sensorID/options', jsonParser, function(req, res) {
			
			console.log(' <*> SeverControlService Set Sensor Options' );	// TODO REMOVE DEBUG LOG

			let smngr = routerSensors.sensorsManager;
			let sensorID = req.params.sensorID;
			
			let options = req.body.options;
			
			let _response = {
					"context" : "ST Server Sensors",
					"action" : "Set Options of Sensor",
					"sensorID": sensorID,
					"options": options
				};
			
			try {
				
				let sensorSearch = smngr.getSensorBy_sysID(sensorID);
				if (sensorSearch.stSensor === null ) {
					throw "Sensor not found";
				}
				
				let stSensor = sensorSearch.stSensor;
				
				stSensor.setOptions(options);
				
			} catch (e) {
				// TODO: handle exception
				
				_response.response = 'Something happends...';
				_response.error = e;
			}
			
			
			res.jsonp(_response);
			res.end();
			
		});	
		
		
		// Start Sensor
		routerSensors.expressRoute.get('/:sensorID/start', function(req, res) {
			
			console.log(' <*> SeverControlService Sensor Start' );	// TODO REMOVE DEBUG LOG
			
			let smngr = routerSensors.sensorsManager;
			let sensorID = req.params.sensorID;
			
			let _response = {
					"context" : "ST Server Sensors",
					"action" : "Start",
					"sensorID": sensorID,
					"response" : "test"
				};
			
			
			try {
				
				let sensorSearch = smngr.getSensorBy_sysID(sensorID);
				if (sensorSearch.stSensor !== null ) {
					sensorSearch.stSensor.start().then(function(value) {
						console.log( value );	// TODO REMOVE DEBUG LOG
						console.log(' <*> Sensor Started' );	// TODO REMOVE DEBUG LOG
					}, function(reason) {
						console.log( reason );	// TODO REMOVE DEBUG LOG
						console.log(' <*> Sensor Start problem...' );	// TODO REMOVE DEBUG LOG

					});
					
					
				} else {
					_response.response = 'Sensor not found.';
				}
				
			} catch (e) {
				// TODO: handle exception
				_response.response = 'Something happends...';
				_response.error = e;
			}
			
			
			res.jsonp(_response);
			res.end();
			
		});
		
		
		// Stop Sensor
		routerSensors.expressRoute.get('/:sensorID/stop', function(req, res) {
			
			console.log(' <*> SeverControlService Sensor Stop' );	// TODO REMOVE DEBUG LOG

			let smngr = routerSensors.sensorsManager;
			let sensorID = req.params.sensorID;
			
			let _response = {
					"context" : "ST Server Sensors",
					"action" : "Stop",
					"sensorID": sensorID,
					"response" : "test"
				};
			
			
			try {
				
				let sensorSearch = smngr.getSensorBy_sysID(sensorID);
				if (sensorSearch.stSensor !== null ) {
					sensorSearch.stSensor.stop().then(function(value) {
						console.log( value );	// TODO REMOVE DEBUG LOG
						console.log(' <*> Sensor Stopped' );	// TODO REMOVE DEBUG LOG
					}, function(reason) {
						console.log( reason );	// TODO REMOVE DEBUG LOG
						console.log(' <*> Sensor Stop problem...' );	// TODO REMOVE DEBUG LOG
					});
					
					
				} else {
					_response.response = 'Sensor not found.';
				}
				
			} catch (e) {
				// TODO: handle exception
				
				_response.response = 'Something happends...';
				_response.error = e;
			}
			
			
			res.jsonp(_response);
			res.end();
			
		});
		
		
		// Turn off Sensors of Node
		routerSensors.expressRoute.get('/:nodeID/turnOffSensors', function(req, res) {
			
			console.log(' <*> SeverControlService Sensors turnOffSensors' );	// TODO REMOVE DEBUG LOG

			let smngr = routerSensors.sensorsManager;
			let nodeID = req.params.nodeID;
			
			var _response = {
					"context" : "ST Server Sensors",
					"action" : "Turn off sensors",
					"sensorID": nodeID,
					"response" : "test"
				};
			
			try {
				smngr.turnOffSensorsOfNode(nodeID);
			} catch (e) {
				// TODO: handle exception
				_response.response = 'Something happends...';
				_response.error = e;
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
		
		let _SCS_RouteSensors = this;
		if (options.scsRouteSensors !== undefined) {
			_SCS_RouteSensors = options.scsRouteSensors;
		}
		
		let _response = {
			"context" : "ST Server Sensors",
			"action" : "Default",
			"messagesReceived" : _SCS_RouteSensors.messages
			
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
		
		let _SCS_RouteSensors = this;
		if (options.scsRouteSensors !== undefined) {
			_SCS_RouteSensors = options.scsRouteSensors;
		}
		
		let _smngr = _SCS_RouteSensors.sensorsManager;
		
		let _response = {
			"context" : "ST Server Sensors",
			"action" : "List",
			"numberOfSensors": 0,
			"sensors" : []
		};
			
		_smngr.sensorsList.forEach(function(_sns, _i) {
			
			let _sensorData = {
					"sensorID" : _sns.config.sensorID,
					"type": _sns.config.type,
					"_sysID": _sns.config._sysID,
					"engine": "not defined",
					"state": "not defined"
					
			};
			
			if (_sns.sensorEngine !== null) {
				if (_sns.sensorEngine.name !== undefined) {
					_sensorData.engine = _sns.sensorEngine.name;
				}
				_sensorData.state = _sns.sensorEngine.state;
			}
			
			_response.sensors.push(_sensorData);
		});
		
		
		_response.numberOfSensors = _smngr.sensorsList.length;
		
		
		res.jsonp(_response);
		res.end();
		
	}
	
}

module.exports = SCS_RouteSensors;
