"use strict";

/**
 * Server Control System Engines routes
 * 
 * version Hero
 * 
 * @namespace st.ngn.ngnSYS_Hero.scs_routes
 * @memberof st.ngn.ngnSYS_Hero
 * 
 * 
 */

/**
 * import express
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');

/**
 * import SCS_RouteSensors
 * @ignore
 */
var SCS_RouteSensors = require('./SCS_RouteSensors.js');

/**
 * import SCS_RouteActuators
 * @ignore
 */
var SCS_RouteActuators = require('./SCS_RouteActuators.js');

/**
 * Routes for Engines
 * 
 * <pre>
 * Use with Server control service
 * </pre>
 * 
 * @class 
 * @memberof st.ngn.ngnSYS_Hero.scs_routes
 * 
 * @property {object} expressRoute - Express route object
 * @property {number} messages - Messages counter
 * @property {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
 * @property {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager object
 * @property {object} routesforSersors - Express route object for Sensors
 * @property {object} routesforActuators - Express route object for Sensors
 * 
 */

var SCS_RouteEngines = function () {

	/**
  * @constructs SCS_RouteEngines
  * 
  * @param {st.ngn.services.SensorsManager} sensorsManager - Sensors manager object
  * @param {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager object
  */

	function SCS_RouteEngines(sensorsManager, actuatorsManager) {
		_classCallCheck(this, SCS_RouteEngines);

		var scs_Routes = this;

		scs_Routes.expressRoute = null;
		scs_Routes.messages = 0;

		scs_Routes.sensorsManager = sensorsManager;
		scs_Routes.actuatorsManager = actuatorsManager;

		scs_Routes.routesforSersors = null;
		scs_Routes.routesforActuators = null;

		scs_Routes.initialize();
		scs_Routes.mapServiceRoutes();
	}

	/**
  * Initialize
  */


	_createClass(SCS_RouteEngines, [{
		key: 'initialize',
		value: function initialize() {

			var scs_Routes = this;

			if (scs_Routes.expressRoute !== null) {
				throw "Already initialized";
			}

			scs_Routes.expressRoute = express.Router();

			scs_Routes.routesforSersors = new SCS_RouteSensors(scs_Routes.sensorsManager);
			scs_Routes.routesforActuators = new SCS_RouteActuators(scs_Routes.actuatorsManager);
		}

		/**
   * Map service routes
   */

	}, {
		key: 'mapServiceRoutes',
		value: function mapServiceRoutes() {

			var routerNet = this;

			if (routerNet.expressRoute === null) {
				throw "Not initialized";
			}

			routerNet.expressRoute.use('/Sensors', routerNet.routesforSersors.expressRoute);
			routerNet.expressRoute.use('/Actuators', routerNet.routesforActuators.expressRoute);
		}
	}]);

	return SCS_RouteEngines;
}();

module.exports = SCS_RouteEngines;
//# sourceMappingURL=SCS_RouteEngines.js.map
