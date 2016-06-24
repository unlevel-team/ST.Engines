"use strict";

let express = require('express');


let SCS_RouteSensors = require('./SCS_RouteSensors.js');
let SCS_RouteActuators = require('./SCS_RouteActuators.js');


/**
 * Routes for Engines
 * Use with Server control service
 */
class SCS_RouteEngines {
	
	constructor(sensorsManager, actuatorsManager) {
		
		let scs_Routes = this;
		
		scs_Routes.expressRoute = null;
		scs_Routes.messages = 0;
		
		scs_Routes.sensorsManager = sensorsManager;
		scs_Routes.actuatorsManager = actuatorsManager;
		
		scs_Routes.routesforSersors = null;
		scs_Routes.routesforActuators = null;
		
		scs_Routes.expressRoute = null;
		
		
		scs_Routes.initialize();
		scs_Routes.mapServiceRoutes();
	}
	
	
	initialize() {
		
		let scs_Routes = this;
		
		if (scs_Routes.expressRoute !== null) {
			throw "Already initialized";
		}
		
		scs_Routes.expressRoute = express.Router();
		
		
		
		scs_Routes.routesforSersors = new SCS_RouteSensors(scs_Routes.sensorsManager);
		scs_Routes.routesforActuators = new SCS_RouteActuators(scs_Routes.actuatorsManager);
		
	}
	
	
	mapServiceRoutes() {
		
		let routerNet = this;
		
		if (routerNet.expressRoute === null) {
			throw "Not initialized";
		}
	
		routerNet.expressRoute.use('/Sensors', routerNet.routesforSersors.expressRoute);
		routerNet.expressRoute.use('/Actuators', routerNet.routesforActuators.expressRoute);
		
	}
	
}


module.exports = SCS_RouteEngines;