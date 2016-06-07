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
		"Version" : "Hero"
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
	
	
	static getVActuator(config) {
		
		let vActuator = new VActuator(config);
		return vActuator;
	}
	
	
	static getCylActuator(config) {
		
		let cylActuator = new CylActuator(config);
		return cylActuator;
	}
	
	
	static getVSensor(config) {
		
		let vSensor = new VSensor(config);
		return vSensor;
	}
	
	
	static getCylSensor(config) {
		
		let cylSensor = new CylSensor(config);
		return cylSensor;
	}
	
}


/**
 * Get EnginesSystem
 */
function getEnginesSystem(config) {
	
	if (config.role === undefined) {
		throw "role is required.";
	}
	
	let ngSystem = null;
	
	switch (config.role) {
	
		case EnginesSystem_CONSTANTS.Config.Role_Node:
			
			let NGSYS_Hero_Node = require('./ngsysHero_Node.js').NGSYS_Hero_Node;
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
}


let ngysHero_Lib = {
		"NGSystem_Hero_CONSTANTS" : NGSystem_Hero_CONSTANTS,
		"NGSystem_Hero" : NGSystem_Hero,
		
		"getEnginesSystem": getEnginesSystem
};


module.exports = ngysHero_Lib;
