"use strict";

/**
 * SomeThings Engines library
 * 
 * @ignore
 */

/**
 * Import Sensor
 * @ignore
 */
let Sensor = require('./Sensor.js');

/**
 * Import SensorEngine
 * @ignore
 */
let SensorEngine = require('./SensorEngine.js');

/**
 * Import Actuator
 * @ignore
 */
let Actuator = require('./Actuator.js');

/**
 * Import ActuatorEngine
 * @ignore
 */
let ActuatorEngine = require('./ActuatorEngine.js');

/**
 * Import EnginesSystem_Lib
 * @ignore
 */
let EnginesSystem_Lib = require('./EnginesSystem');


let stNGN_Lib = {
	
	"Sensor" : Sensor,
	"SensorEngine" : SensorEngine,
	
	"Actuator" : Actuator,
	"ActuatorEngine" : ActuatorEngine,
	
	"getEnginesSystem" : EnginesSystem_Lib.getEnginesSystem
	
};

module.exports = stNGN_Lib;