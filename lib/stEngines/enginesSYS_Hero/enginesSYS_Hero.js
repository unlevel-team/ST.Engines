"use strict";

/**
 * 
 * SomeThings Engines System library
 * 
 * <pre>
 * version Hero
 * </pre>
 * 
 * @namespace st.ngn.ngnSYS_Hero
 * @memberof st.ngn
 * 
 */


/**
 * Import Sensor
 * @ignore
 */
let Sensor = require('../Sensor.js');

/**
 * Import Actuator
 * @ignore
 */
let Actuator = require('../Actuator.js');


/**
 * Import EnginesSystem_CONSTANTS
 * @ignore
 */
let EnginesSystem_CONSTANTS = require('../EnginesSystem.js').EnginesSystem_CONSTANTS;

/**
 * Import EnginesSystem
 * @ignore
 */
let EnginesSystem = require('../EnginesSystem.js').EnginesSystem;


/**
 * Engines system constants
 * 
 * <pre>
 * version Hero
 * 
 * </pre>
 * 
 * @memberof st.ngn.ngnSYS_Hero
 * 
 */
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
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * 
 * @implements st.ngn.Actuator
 */
class VActuator extends Actuator {
	
	/**
	 * @constructs VActuator
	 * @param {object} config - Configuration object
	 */
	constructor(config) {
		super(config);
	}
	
}


/**
 * CylActuator
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * 
 * @implements st.ngn.Actuator
 */
class CylActuator extends Actuator {
	
	/**
	 * @constructs CylActuator
	 * @param {object} config - Configuration object
	 */
	constructor(config) {
		super(config);
	}
	
}


/**
 * VSensor
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * 
 * @implements st.ngn.Sensor
 */
class VSensor extends Sensor {
	
	/**
	 * @constructs VSensor
	 * @param {object} config - Configuration object
	 */
	constructor(config){
		super(config);
	}
}


/**
 * CylSensor
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * 
 * @implements st.ngn.Sensor
 * 
 */
class CylSensor extends Sensor {
	
	/**
	 * @constructs CylSensor
	 * @param {object} config - Configuration object
	 */
	constructor(config){
		super(config);
	}
}



/**
 * NGSystem_Hero 
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * 
 * @implements st.ngn.EnginesSystem
 * 
 * 
 */
class NGSystem_Hero extends EnginesSystem {
	
	/**
	 * @constructs NGSystem_Hero
	 * @param {object} config - Configuration object.
	 */
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
	
	/**
	 * Initialize
	 */
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
 * 
 * @memberof st.ngn.ngnSYS_Hero
 * 
 * 
 * @param {object} config - Configuration object
 * @returns {(st.ngn.Sensor|st.ngn.ngnSYS_Hero.VSensor|st.ngn.ngnSYS_Hero.CylSensor)}
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
 * 
 * @memberof st.ngn.ngnSYS_Hero
 * 
 * @param {object} config - Configuration object
 * @returns {(st.ngn.Actuator|st.ngn.ngnSYS_Hero.VActuator|st.ngn.ngnSYS_Hero.CylActuator)}
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
 * 
 * @memberof st.ngn.ngnSYS_Hero
 * 
 * @param {object} config - Configuration object
 * @returns {st.ngn.ngnSYS_Hero.NGSYS_Hero_Node|st.ngn.ngnSYS_Hero.Role_Server}
 * 
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
