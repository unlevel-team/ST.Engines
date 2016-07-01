"use strict";

/*
 SomeThings Engines System library

 Services
 
 version Hero
*/


/**
 * Engine system services
 * 
 * <pre>
 * version Hero
 * </pre>
 * 
 * @class
 * @property {EnginesSystem} ngSYS - Engines system object
 * 
 */
class NGSYS_Hero_Services {
	
	/**
	 * @constructs NGSYS_Hero_Services
	 * 
	 * @param {EnginesSystem} ngSYS - Engines system object
	 */
	constructor(ngSYS) {
		
		this.ngSYS = ngSYS;
		this.CONSTANTS = ngSYS.CONSTANTS;
	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		
		let service = this;
		service._mapControlEvents();
		service._mapControlMessages();
	}
	
	
	/**
	 * Map control events
	 * 
	 * @param {EnginesSystem} ngSYS - Engines system object
	 */
	_mapControlEvents(ngSYS) {
		
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
		
		let service = this;
		
		let comSYS = service.comSYS;
		let config = comSYS.config;
		
		
		if (config._mapped !== undefined && 
				config._mapped === true) {
			throw "control messages already mapped.";
		}
		
		if (socket === undefined) {
			socket = config.controlChannel.socket;
		}		
		
		socket.on("disconnect", function(data) {
			service._unmapControlMessages(socket);
		});
		
		config._mapped = true;
		
	}
	
	
	/**
	 * Unmap control messages
	 * 
	 * @param {object} socket - Socket object
	 */
	_unmapControlMessages(socket) {
		
		let service = this;
		
		let comSYS = service.comSYS;
		let config = comSYS.config;
		
		if (config._mapped === undefined || 
				config._mapped !== true) {
			throw "control messages not already mapped.";
		}
		
	}
	
	
	
}


let _Lib = {
		
	"NGSYS_Hero_Services" : NGSYS_Hero_Services
		
};


module.exports = _Lib;