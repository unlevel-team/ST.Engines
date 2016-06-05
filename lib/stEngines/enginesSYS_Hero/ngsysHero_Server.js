"use strict";

/*
 SomeThings Engines System library
 
 version Hero
 for node

*/


let NGSystem_Hero = require('./enginesSYS_Hero.js').NGSystem_Hero;


/**
 * NGSYS_Hero_Server
 */
class NGSYS_Hero_Server extends NGSystem_Hero {
	
	constructor(config) {
		
		super(config);
	}
	
	
	initialize() {
		
		super.initialize();
		
		let ngSYS = this;
		let _config = ngSYS.config;
		
//		comSYS._service = new COMSys_Morse_Srv_Node(comSYS);
	}
	
	
	
}



let _Lib = {
		"NGSYS_Hero_Server" : NGSYS_Hero_Server
};


module.exports = _Lib;
