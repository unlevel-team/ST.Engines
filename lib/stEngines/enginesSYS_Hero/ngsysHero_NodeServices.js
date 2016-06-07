"use strict";


/**
 * Engines system services
 * for Node role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

let NGSYS_Hero_Services = require('./ngsysHero_Services.js');



/**
 * NGSYS_Hero_NodeServices
 */
class NGSYS_Hero_NodeServices extends NGSYS_Hero_Services {
	
	constructor(ngSYS) {
		
		super(ngSYS);
	}
	
	
	initialize() {
		
		super.initialize();
		
		
		
	}
	
	
	/**
	 * Map control events
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


