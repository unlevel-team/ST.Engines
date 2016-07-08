"use strict";

/**
 * SomeThins project
 * 
 * @namespace st
 */


/**
 * SomeThings Engines library
 * 
 * @namespace st.ngn
 * @memberof  st
 * 
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
let SensorEngine = require('./SensorEngine.js').SensorEngine;

/**
 * Import Actuator
 * @ignore
 */
let Actuator = require('./Actuator.js');

/**
 * Import ActuatorEngine
 * @ignore
 */
let ActuatorEngine = require('./ActuatorEngine.js').ActuatorEngine;

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