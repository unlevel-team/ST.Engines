"use strict";

/*
 SomeThings Engines services library

*/


/**
 * Import ActuatorsManager
 * @ignore
 */
let ActuatorsManager = require('./ActuatorsManager.js');

/**
 * Import SensorsManager
 * @ignore
 */
let SensorsManager = require('./SensorsManager.js');




let stNGNservices_Lib = {
		
	"ActuatorsManager" : ActuatorsManager,	
	"SensorsManager" : SensorsManager
		
};


module.exports = stNGNservices_Lib;