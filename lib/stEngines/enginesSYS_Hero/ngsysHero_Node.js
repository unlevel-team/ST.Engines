"use strict";

/**
 * Engines System
 * for node
 * 
 * 
 * SomeThings Engines System library
 * version Hero
 */

let SensorsManager = require('../services/SensorsManager.js').SensorsManager;
let NGSYS_Hero_Node_SensorsSRV = require('./ngsysHero_NodeSensorsSRV.js').NGSYS_Hero_Node_SensorsSRV;

let ActuatorsManager = require('../services/ActuatorsManager.js').ActuatorsManager;
let NGSYS_Hero_Node_ActuatorsSRV = require('./ngsysHero_NodeActuatorsSRV.js').NGSYS_Hero_Node_ActuatorsSRV;

let NGSystem_Hero = require('./enginesSYS_Hero.js').NGSystem_Hero;


/**
 * NGSYSHero_Node
 */
class NGSYS_Hero_Node extends NGSystem_Hero {
	
	constructor(config) {
		
		super(config);
	}
	
	
	initialize() {
		
		super.initialize();
		
		let ngSYS = this;
		let _config = ngSYS.config;
		
		
		ngSYS.sensorsManager = new SensorsManager();
		ngSYS.sensorsServices = new NGSYS_Hero_Node_SensorsSRV(
				ngSYS.sensorsManager, 
				ngSYS.controlChannel
				);
		
		
		ngSYS.actuatorsManager = new ActuatorsManager();
		ngSYS.actuatorsServices = new NGSYS_Hero_Node_ActuatorsSRV(
				ngSYS.actuatorsManager, 
				ngSYS.controlChannel
				);
		
	}
	
	
	
}



let ngysHero_roleNode_Lib = {
		"NGSYS_Hero_Node" : NGSYS_Hero_Node
};


module.exports = ngysHero_roleNode_Lib;
