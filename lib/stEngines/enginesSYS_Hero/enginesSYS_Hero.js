"use strict";

/*
 SomeThings Engines System library
 
 version Hero

*/


let Sensor = require('../Sensor.js');
let Actuator = require('../Actuator.js');

let EnginesSystem_CONSTANTS = require('../EnginesSystem.js').EnginesSystem_CONSTANTS;
let EnginesSystem = require('../EnginesSystem.js').EnginesSystem;


const NGSystem_Hero_CONSTANTS = {
		
	"Config" : {
		"Version" : "Hero",
		
		"type_Vsensor" : "vsensor",
		"type_Vactuator" : "vactuator",
		"type_Cylonjs" : "cylonjs"
			
	}
};



/**
 * VActuator
 */
class VActuator extends Actuator {
	
	constructor(config) {
		super(config);
	}
	
}


/**
 * CylActuator
 */
class CylActuator extends Actuator {
	
	constructor(config) {
		super(config);
	}
	
}


/**
 * VSensor
 */
class VSensor extends Sensor {
	
	constructor(config){
		super(config);
	}
}


/**
 * CylSensor
 */
class CylSensor extends Sensor {
	
	constructor(config){
		super(config);
	}
}



/**
 * NGSystem_Hero 
 * 
 */
class NGSystem_Hero extends EnginesSystem {
	
	
	constructor(config) {
		
		super(config);
		
		let ngSYS = this;
		
		ngSYS.HeroCONSTANTS = NGSystem_Hero_CONSTANTS;
		ngSYS.CONSTANTS.Config.Version = NGSystem_Hero_CONSTANTS.Config.Version;
		
		
		ngSYS.sensorsManager = null;
		ngSYS.sensorsServices = null;

		ngSYS.actuatorsManager = null;
		ngSYS.actuatorsServices = null;
		
		ngSYS.controlChannel = null;
		
	}
	
	
	initialize() {
		
		super.initialize();
		
		let ngSYS = this;
		let config = ngSYS.config;
		
		if (config.controlChannel === undefined ||
				config.controlChannel === null) {
			throw "Control channel is required.";
		}
		
		ngSYS.controlChannel = config.controlChannel;
	}

}


/**
 * Get sensor
 * @param config
 * @returns Sensor, VSensor, CylSensor
 */
function getSensor(config){
	
	let sensor = null;
	
	switch (config.type) {
	
		case EnginesSystem_CONSTANTS.Config.type_Vsensor:
			sensor = new VSensor(config);
			break;
			
		case EnginesSystem_CONSTANTS.Config.type_Cylonjs:
			sensor = new CylSensor(config);
			break;

		default:
			sensor = new Sensor(config);
			break;
	}
	
	return sensor;
	
}


/**
 * Get actuator
 * @param config
 * @returns Actuator, VActuator or CylActuator
 */
function getActuator(config){
	
	let actuator = null;
	
	switch (config.type) {
	
		case NGSystem_Hero_CONSTANTS.Config.type_Vactuator:
			actuator = new VActuator(config);
			break;
			
		case NGSystem_Hero_CONSTANTS.Config.type_Cylonjs:
			actuator = new CylActuator(config);
			break;

		default:
			actuator = new Actuator(config);
			break;
	}

	return actuator;

}




/**
 * Get EnginesSystem
 */
const getEnginesSystem = function(config) {
	
	if (config.role === undefined) {
		throw "role is required.";
	}
	
	
	let ngSystem = null;
	
	
	switch (config.role) {
	
		case EnginesSystem_CONSTANTS.Config.Role_Node:
			
			let NGSYS_Hero_Node = require('./ngsysHero_Node.js');
			ngSystem = new NGSYS_Hero_Node(config);
			break;
			
		case EnginesSystem_CONSTANTS.Config.Role_Server:
			
			let NGSYS_Hero_Server = require('./ngsysHero_Server.js').NGSYS_Hero_Server;
			ngSystem = new NGSYS_Hero_Server(config);
			break;

		default:
			throw "Bad Role.";
//			break;
	}
	
	return ngSystem;

};





let ngysHero_Lib = {
	"NGSystem_Hero_CONSTANTS" : NGSystem_Hero_CONSTANTS,
	"NGSystem_Hero" : NGSystem_Hero,
	
	"getSensor" : getSensor,
	"getActuator" : getActuator,
	"getEnginesSystem" : getEnginesSystem
};


module.exports = ngysHero_Lib;
