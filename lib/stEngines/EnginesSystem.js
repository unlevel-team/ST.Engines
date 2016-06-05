"use strict";

/*
 * SomeThings Engines System library 
 *  
 * Provides a system with server and node roles...
 * 
 */


/**
 * Engines system constants
 */
const EnginesSystem_CONSTANTS = {
		
	"Config" : {
		
		"Role_Server" : "Server",
		"Role_Node" : "Node"

	}

};


/**
 * EnginesSystem
 */
class EnginesSystem {

	constructor(config) {
		
		this.CONSTANTS = EnginesSystem_CONSTANTS;
		this.config = config;
		
	}
	
	
	initialize() {
		
		let ngSYS = this;
		
		if (ngSYS.config === undefined) {
			throw "Configuration is required.";
		}
		
	}
	
}


/**
 * Get EnginesSystem
 */
function getEnginesSystem(config) {
	
	let _getEnginesSystem = require('./enginesSYS_Hero/enginesSYS_Hero.js').getEnginesSystem;
	let ngSYS = _getEnginesSystem(config);

	return ngSYS;
}



let ngsystem_Lib = {
		"EnginesSystem_CONSTANTS" : EnginesSystem_CONSTANTS,
		"EnginesSystem" : EnginesSystem,
		
		"getEnginesSystem": getEnginesSystem
};


module.exports = ngsystem_Lib;
