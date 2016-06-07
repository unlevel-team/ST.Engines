"use strict";

/*
 SomeThings Engines System library

 Services
 
 version Hero
 

*/


class NGSYS_Hero_Services {
	
	constructor(ngSYS) {
		
		this.ngSYS = ngSYS;
		this.CONSTANTS = ngSYS.CONSTANTS;
	}
	
	
	initialize() {
		
		let service = this;
		service._mapControlEvents();
		service._mapControlMessages();
	}
	
	
	
	
	/**
	 * Map control events
	 */
	_mapControlEvents(ngSYS) {
		
		let service = this;
		
		if (ngSYS === undefined) {
			ngSYS = service.ngSYS;
		}
		
	}
	
	
	/**
	 * Map control messages
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



module.exports = NGSYS_Hero_Services;