"use strict";

let express = require('express');

let SCS_RouteNetNodes = require("./SCS_RouteNetNodes.js");
let SCS_RouteNetServer = require("./SCS_RouteNetServer.js");


/**
 * Routes for Engines
 * Use with Server control service
 */
class SCS_RouteEngines {
	
	constructor(sensorsManager, actuatorsManager) {
		
		this.expressRoute = null;
		this.messages = 0;
		
		this.sensorsManager = sensorsManager;
		this.actuatorsManager = actuatorsManager;
		
		this.routesforSersors = null;
		this.routesforActuators = null;
		
		this.expressRoute = null;
		
		this.initialize();
		this.mapServiceRoutes();
	}
	
	
	initialize() {
		
		let routerNet = this;
		
		if (routerNet.expressRoute !== null) {
			throw "Already initialized";
		}
		
		routerNet.expressRoute = express.Router();
		
		routerNet.routesforNodes = new SCS_RouteNetNodes(routerNet.nodesManager, routerNet.nodesNetManager);
		routerNet.routesforServer = new SCS_RouteNetServer(routerNet.serverNetManager);
		
	}
	
	
	mapServiceRoutes() {
		
		let routerNet = this;
		
		if (routerNet.expressRoute === null) {
			throw "Not initialized";
		}
	
		routerNet.expressRoute.use('/Nodes', routerNet.routesforNodes.expressRoute);
		routerNet.expressRoute.use('/Server', routerNet.routesforServer.expressRoute);
		
	}
	
}


module.exports = SCS_RouteEngines;