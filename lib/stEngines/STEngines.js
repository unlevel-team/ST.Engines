"use strict";

/**
 * SomeThings Engines library
 * 
 * 
 */


let Sensor = require('./Sensor.js');
let SensorEngine = require('./SensorEngine.js');

let Actuator = require('./Actuator.js');
let ActuatorEngine = require('./ActuatorEngine.js');

let EnginesSystem_Lib = require('./EnginesSystem');


let stNGN_Lib = {
	
	"Sensor" : Sensor,
	"SensorEngine" : SensorEngine,
	
	"Actuator" : Actuator,
	"ActuatorEngine" : ActuatorEngine,
	
	"getEnginesSystem" : EnginesSystem_Lib.getEnginesSystem
	
};

module.exports = stNGN_Lib;