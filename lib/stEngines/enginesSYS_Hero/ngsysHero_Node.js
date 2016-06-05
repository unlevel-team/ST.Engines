"use strict";

/*
 SomeThings Engines System library
 
 version Hero
 for node

*/


let NGSystem_Hero = require('./enginesSYS_Hero.js').NGSystem_Hero;


/**
 * NGSYSHero_Node
 */
class NGSYS_Hero_Node extends NGSystem_Hero {
	
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



let ngysHero_roleNode_Lib = {
		"NGSYS_Hero_Node" : NGSYS_Hero_Node
};


module.exports = ngysHero_roleNode_Lib;
