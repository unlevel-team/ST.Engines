"use strict";

/**
 * import express
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');

/**
 * import bodyParser
 * @ignore
 */
var bodyParser = require('body-parser');

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
 * SCS Response info
 * <pre>
 * mapped to '/:sensorID/info'
 * </pre>
 * 
 * @typedef {Object} SCS_Response_Info
 * @memberof st.ngn.ngnSYS_Hero.scs_routes.SCS_RouteSensors
 * @type Object
 * @protected
 * 
 * @property {string} context - 'ST Server Sensors'
 * @property {string} action - 'Info'
 * @property {string} sensorID - Sensor ID
 * @property {Object} sensor - Sensor data
 * @property {string} sensor.sensorID - Sensor ID
 * @property {string} sensor.type - Sensor type
 * @property {string} sensor._sysID - Sensor sysID
 * @property {string} sensor.engine - Engine name. Could be 'not defined'
 * @property {string} sensor.state - Engine state.
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

var SCS_RouteSensors = function () {

	/**
  * @constructs SCS_RouteSensors
  * 
  * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
  */

	function SCS_RouteSensors(sensorsManager) {
		_classCallCheck(this, SCS_RouteSensors);

		var _scsRouteSensors = this;

		_scsRouteSensors.expressRoute = null;
		_scsRouteSensors.messages = 0;
		_scsRouteSensors.sensorsManager = sensorsManager;

		_scsRouteSensors.mapServiceRoutes();
	}

	/**
  * Map service routes
  */


	_createClass(SCS_RouteSensors, [{
		key: 'mapServiceRoutes',
		value: function mapServiceRoutes() {

			var routerSensors = this;
			routerSensors.expressRoute = express.Router();

			// create application/json parser
			var jsonParser = bodyParser.json();

			// middleware that is specific to this router
			routerSensors.expressRoute.use(function messageCount(req, res, next) {
				routerSensors.messages++;

				//			res.setHeader('Content-Type', 'text/html');
				//			res.write('ST Server Nodes <br />', 'utf8')

				res.setHeader('Content-Type', 'application/json');
				next();
			});

			// define the home page route
			routerSensors.expressRoute.get('/', function (req, res) {

				routerSensors._route_Default(req, res, {
					"scsRouteSensors": routerSensors
				});
			});

			// List of Sensors
			routerSensors.expressRoute.get('/list/', function (req, res) {

				routerSensors._route_List(req, res, {
					"scsRouteSensors": routerSensors
				});
			});

			// Get Sensor information
			routerSensors.expressRoute.get('/:sensorID/info', function (req, res) {

				routerSensors._route_Info(req, res, {
					"scsRouteSensors": routerSensors,
					"sensorID": req.params.sensorID
				});
			});

			// Get Sensor options
			routerSensors.expressRoute.get('/:sensorID/options', function (req, res) {

				console.log(' <*> SeverControlService Get Sensor Options'); // TODO REMOVE DEBUG LOG

				var smngr = routerSensors.sensorsManager;
				var sensorID = req.params.sensorID;

				var _response = {
					"context": "ST Server Sensors",
					"action": "Get Options of Sensor",
					"sensorID": sensorID
				};

				try {

					var sensorSearch = smngr.getSensorBy_sysID(sensorID);
					if (sensorSearch.stSensor === null) {
						throw "Sensor not found";
					}

					var stSensor = sensorSearch.stSensor;

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
			routerSensors.expressRoute.post('/:sensorID/options', jsonParser, function (req, res) {

				console.log(' <*> SeverControlService Set Sensor Options'); // TODO REMOVE DEBUG LOG

				var smngr = routerSensors.sensorsManager;
				var sensorID = req.params.sensorID;

				var options = req.body.options;

				var _response = {
					"context": "ST Server Sensors",
					"action": "Set Options of Sensor",
					"sensorID": sensorID,
					"options": options
				};

				try {

					var sensorSearch = smngr.getSensorBy_sysID(sensorID);
					if (sensorSearch.stSensor === null) {
						throw "Sensor not found";
					}

					var stSensor = sensorSearch.stSensor;

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
			routerSensors.expressRoute.get('/:sensorID/start', function (req, res) {

				console.log(' <*> SeverControlService Sensor Start'); // TODO REMOVE DEBUG LOG

				var smngr = routerSensors.sensorsManager;
				var sensorID = req.params.sensorID;

				var _response = {
					"context": "ST Server Sensors",
					"action": "Start",
					"sensorID": sensorID,
					"response": "test"
				};

				try {

					var sensorSearch = smngr.getSensorBy_sysID(sensorID);
					if (sensorSearch.stSensor !== null) {
						sensorSearch.stSensor.start().then(function (value) {
							console.log(value); // TODO REMOVE DEBUG LOG
							console.log(' <*> Sensor Started'); // TODO REMOVE DEBUG LOG
						}, function (reason) {
							console.log(reason); // TODO REMOVE DEBUG LOG
							console.log(' <*> Sensor Start problem...'); // TODO REMOVE DEBUG LOG
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
			routerSensors.expressRoute.get('/:sensorID/stop', function (req, res) {

				console.log(' <*> SeverControlService Sensor Stop'); // TODO REMOVE DEBUG LOG

				var smngr = routerSensors.sensorsManager;
				var sensorID = req.params.sensorID;

				var _response = {
					"context": "ST Server Sensors",
					"action": "Stop",
					"sensorID": sensorID,
					"response": "test"
				};

				try {

					var sensorSearch = smngr.getSensorBy_sysID(sensorID);
					if (sensorSearch.stSensor !== null) {
						sensorSearch.stSensor.stop().then(function (value) {
							console.log(value); // TODO REMOVE DEBUG LOG
							console.log(' <*> Sensor Stopped'); // TODO REMOVE DEBUG LOG
						}, function (reason) {
							console.log(reason); // TODO REMOVE DEBUG LOG
							console.log(' <*> Sensor Stop problem...'); // TODO REMOVE DEBUG LOG
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
			routerSensors.expressRoute.get('/:nodeID/turnOffSensors', function (req, res) {

				console.log(' <*> SeverControlService Sensors turnOffSensors'); // TODO REMOVE DEBUG LOG

				var smngr = routerSensors.sensorsManager;
				var nodeID = req.params.nodeID;

				var _response = {
					"context": "ST Server Sensors",
					"action": "Turn off sensors",
					"sensorID": nodeID,
					"response": "test"
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
   * Returns sensor data
   * @private
   */

	}, {
		key: '_getSensorData',
		value: function _getSensorData(_sns) {
			var _sensorData = {
				"sensorID": _sns.config.sensorID,
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

			return _sensorData;
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

	}, {
		key: '_route_Default',
		value: function _route_Default(req, res, options) {

			if (options === undefined) {
				options = {};
			}

			var _SCS_RouteSensors = this;
			if (options.scsRouteSensors !== undefined) {
				_SCS_RouteSensors = options.scsRouteSensors;
			}

			var _response = {
				"context": "ST Server Sensors",
				"action": "Default",
				"messagesReceived": _SCS_RouteSensors.messages

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

	}, {
		key: '_route_List',
		value: function _route_List(req, res, options) {

			if (options === undefined) {
				options = {};
			}

			var _SCS_RouteSensors = this;
			if (options.scsRouteSensors !== undefined) {
				_SCS_RouteSensors = options.scsRouteSensors;
			}

			var _smngr = _SCS_RouteSensors.sensorsManager;

			var _response = {
				"context": "ST Server Sensors",
				"action": "List",
				"numberOfSensors": 0,
				"sensors": []
			};

			_smngr.sensorsList.forEach(function (_sns, _i) {

				var _sensorData = _SCS_RouteSensors._getSensorData(_sns);
				_response.sensors.push(_sensorData);
			});

			_response.numberOfSensors = _smngr.sensorsList.length;

			res.jsonp(_response);
			res.end();
		}

		/**
   * Response for info action
   * 
   * @protected
   * 
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Object} options - Options
   */

	}, {
		key: '_route_Info',
		value: function _route_Info(req, res, options) {

			if (options === undefined) {
				options = {};
			}

			var _SCS_RouteSensors = this;
			if (options.scsRouteSensors !== undefined) {
				_SCS_RouteSensors = options.scsRouteSensors;
			}

			var _smngr = _SCS_RouteSensors.sensorsManager;
			var _sensorID = options.sensorID;

			var _response = {
				"context": "ST Server Sensors",
				"action": "Info",
				"sensorID": _sensorID,
				"sensor": {}
			};

			try {

				var sensorSearch = _smngr.getSensorBy_sysID(_sensorID);
				if (sensorSearch.stSensor !== null) {

					var _sns = sensorSearch.stSensor;
					_response.sensor = _SCS_RouteSensors._getSensorData(_sns);
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
		}
	}]);

	return SCS_RouteSensors;
}();

module.exports = SCS_RouteSensors;
//# sourceMappingURL=SCS_RouteSensors.js.map
