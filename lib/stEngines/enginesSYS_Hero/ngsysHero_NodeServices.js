"use strict";


/**
 * Engines system services
 * for Node role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

/**
 * Import NGSYS_Hero_Services
 * @ignore
 */
let NGSYS_Hero_Services = require('./ngsysHero_Services.js');



/**
 * Engines system services
 * 
 * <pre>
 * for role Node
 * 
 * version Hero
 * </pre>
 * 
 * @class
 * @implements NGSYS_Hero_Services
 */
class NGSYS_Hero_NodeServices extends NGSYS_Hero_Services {
	
	/**
	 * @constructs NGSYS_Hero_NodeServices
	 * @param {EnginesSystem} ngSYS - Engines system object
	 */
	constructor(ngSYS) {
		
		super(ngSYS);
	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		
		super.initialize();
		
		
	}
	
	
	/**
	 * Map control events
	 * 
	 * @param {EnginesSystem} ngSYS - Engines system object
	 */
	_mapControlEvents(ngSYS) {
		
		super._mapControlEvents(ngSYS);
		
		let service = this;
		
		if (ngSYS === undefined) {
			ngSYS = service.ngSYS;
		}
		
		
		
		
	}
	
	
	/**
	 * Map control messages
	 * 
	 * @param {object} socket - Socket object
	 */
	_mapControlMessages(socket) {
		
		super._mapControlMessages(socket);
		
		let service = this;
		
		let comSYS = service.comSYS;
		let config = comSYS.config;
		
		if (socket === undefined) {
			socket = config.controlChannel.socket;
		}

	}
	
	
}


let _Lib = {
	"NGSYS_Hero_NodeServices" : NGSYS_Hero_NodeServices
};



module.exports = _Lib;


