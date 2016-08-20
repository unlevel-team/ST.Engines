"use strict";

/**
 * SomeThings Engines System library 
 *  
 * Provides a system with server and node roles...
 * 
 */


/**
 * Engines system constants
 * 
 * @memberof st.ngn
 * 
 */
const EnginesSystem_CONSTANTS = {
		
	"Config" : {
		
		"Role_Server" : "Server",
		"Role_Node" : "Node"

	}

};


/**
 * EnginesSystem
 * 
 * @class
 * @memberof st.ngn
 * 
 * @property {object} config - Configuration.
 * 
 */
class EnginesSystem {

	/**
	 * @constructs EnginesSystem
	 * 
	 * @param {object} config Configuration object
	 */
	constructor(config) {
		
		let _ngSYS = this;
		
		_ngSYS.CONSTANTS = EnginesSystem_CONSTANTS;
		_ngSYS.config = config;
		
	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		
		let ngSYS = this;
		
		if (ngSYS.config === undefined) {
			throw "Configuration is required.";
		}
		
	}
	
}



/**
 * Get EnginesSystem
 * 
 * @memberof st.ngn
 * 
 * @returns {st.ngn.EnginesSystem}
 */
function getEnginesSystem(config) {
	
	let enginesSYS_Hero = require('./enginesSYS_Hero/enginesSYS_Hero.js');
//	let _getEnginesSystem = enginesSYS_Hero.getEnginesSystem;
	let ngSYS = enginesSYS_Hero.getEnginesSystem(config);

	return ngSYS;
}





let ngsystem_Lib = {
	"EnginesSystem_CONSTANTS" : EnginesSystem_CONSTANTS,
	"EnginesSystem" : EnginesSystem,
	
	"getEnginesSystem" : getEnginesSystem
};


module.exports = ngsystem_Lib;
