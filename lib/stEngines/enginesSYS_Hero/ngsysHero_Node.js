"use strict";

/**
 * Engines System
 * for role Node
 * 
 * 
 * SomeThings Engines System library
 * version Hero
 */


/**
 * Import NGSystem_Hero_Lib
 * @ignore
 */
let NGSystem_Hero_Lib = require('./enginesSYS_Hero.js');

/**
 * Import NGSystem_Hero_CONSTANTS
 * @ignore
 */
let NGSystem_Hero_CONSTANTS = NGSystem_Hero_Lib.NGSystem_Hero_CONSTANTS;

/**
 * Import NGSystem_Hero
 * @ignore
 */
let NGSystem_Hero = NGSystem_Hero_Lib.NGSystem_Hero;


/**
 * Import SensorsManager
 * @ignore
 */
let SensorsManager = require('../services/SensorsManager.js').SensorsManager;

/**
 * Import NGSYS_Hero_Node_SensorsSRV
 * @ignore
 */
let NGSYS_Hero_Node_SensorsSRV = require('./ngsysHero_NodeSensorsSRV.js').NGSYS_Hero_Node_SensorsSRV;

/**
 * Import ActuatorsManager
 * @ignore
 */
let ActuatorsManager = require('../services/ActuatorsManager.js').ActuatorsManager;

/**
 * Import NGSYS_Hero_Node_ActuatorsSRV
 * @ignore
 */
let NGSYS_Hero_Node_ActuatorsSRV = require('./ngsysHero_NodeActuatorsSRV.js').NGSYS_Hero_Node_ActuatorsSRV;


/**
 * NGSYS_Hero_Node_SensorsMNG
 * 
 * <pre>
 * Sensors manager
 * for role Node
 * 
 * SomeThings Engines System library
 * version Hero
 * </pre>
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * 
 * @implements st.ngn.services.SensorsManager
 * 
 */
class NGSYS_Hero_Node_SensorsMNG extends SensorsManager {
	
	/**
	 * @constructs NGSYS_Hero_Node_SensorsMNG
	 */
	constructor() {
		
		super();
	}
	
	
	/**
	 * Add sensor
	 * 
	 * @param {st.ngn.Sensor} sensor - Sensor object
	 */
	addSensor(sensor) {
		
		super.addSensor(sensor);
	
		let smng = this;
		
		if (sensor.config.type === NGSystem_Hero_CONSTANTS.Config.type_Cylonjs && 
				smng._cylonJS === undefined) {
			
			// Load CylonJS library
			smng._cylonJS = require('cylon');
		}
		
	}
	
	
	/**
	 * Turn off sensors
	 */
	turnOffSensors() {
		
		super.turnOffSensors();
		
		let smng = this;
		
		if (smng._cylonJS !== undefined) {
			smng._cylonJS.halt();
		}
		
	}
	
}



/**
 * NGSYS_Hero_Node_ActuatorsMNG
 * 
 * <pre>
 * Actuators manager
 * for role Node
 * 
 * SomeThings Engines System library
 * version Hero
 * </pre>
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.services.ActuatorsManager
 * 
 */
class NGSYS_Hero_Node_ActuatorsMNG extends ActuatorsManager {
	
	/**
	 * @constructs NGSYS_Hero_Node_ActuatorsMNG
	 */
	constructor() {
		
		super();
	}
	
	
	/**
	 * Adds actuator
	 * 
	 * @param {st.ngn.Actuator} act - Actuator object
	 */
	addActuator(act) {
		
		super.addActuator(act);
		
		let amng = this;
		
		
		if (act.config.type === NGSystem_Hero_CONSTANTS.Config.type_Cylonjs && 
				amng._cylonJS === undefined) {
			
			// Load CylonJS library
			amng._cylonJS = require('cylon');
		}
	}
	
	
	/**
	 * Turn off actuators
	 */
	turnOffActuators() {
		
		super.turnOffActuators();
		
		let amng = this;
		
		if (amng._cylonJS !== undefined) {
			amng._cylonJS.halt();
		}
		
	}
	
}



/**
 * NGSYS_Hero_Node
 * 
 * <pre>
 * Engines System
 * for role Node
 * 
 * SomeThings Engines System library
 * version Hero
 * </pre>
 * 
 * 
 * @class
 * @memberof st.ngn.ngnSYS_Hero
 * @implements st.ngn.ngnSYS_Hero.NGSystem_Hero
 * 
 */
class NGSYS_Hero_Node extends NGSystem_Hero {
	
	/**
	 * @constructs NGSYS_Hero_Node
	 * 
	 * @param {object} config - Configuration object
	 */
	constructor(config) {
		
		super(config);
	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		
		super.initialize();
		
		let ngSYS = this;
		let config = ngSYS.config;
		
		if (config.sensors === undefined) {
			throw "Sensors configuration is required.";
		}
		
		if (config.actuators === undefined) {
			throw "Actuators configuration is required.";
		}
		
		try {
			ngSYS._init_Sensors();
		} catch (e) {
			// TODO: handle exception
			throw "Cannot initialize Sensors. " + e;
		}
		
		try {
			ngSYS._init_Actuators();
		} catch (e) {
			// TODO: handle exception
			throw "Cannot initialize Actuators. " + e;
		}
		
	}
	
	
	/**
	 * Initialize sensors
	 */
	_init_Sensors() {
		
		let ngSYS = this;
		let config = ngSYS.config;
		
		
		ngSYS.sensorsManager = new NGSYS_Hero_Node_SensorsMNG();
		
		config.sensors.forEach(function(_sns, _i) {
			let sensor = NGSystem_Hero_Lib.getSensor(_sns);
			
			try {
				sensor.initialize();
				ngSYS.sensorsManager.addSensor(sensor);
			} catch (e) {
				// TODO: handle exception
				throw "Cannot add sensor. " + e;
			}
		});
		
		
		ngSYS.sensorsServices = new NGSYS_Hero_Node_SensorsSRV(
				ngSYS.sensorsManager, 
				ngSYS.controlChannel
				);
		
		try {
			ngSYS.sensorsServices.initialize();
		} catch (e) {
			// TODO: handle exception
			throw "Cannot initialize sensors services. " + e;
		}
		
	}
	
	
	/**
	 * Initialize actuators
	 */
	_init_Actuators() {
		
		let ngSYS = this;
		let config = ngSYS.config;
		
		
		ngSYS.actuatorsManager = new NGSYS_Hero_Node_ActuatorsMNG();
		
		config.actuators.forEach(function(_act, _i) {
			let actuator = NGSystem_Hero_Lib.getActuator(_act);
			
			try {
				actuator.initialize();
				ngSYS.actuatorsManager.addActuator(actuator);
			} catch (e) {
				// TODO: handle exception
				throw "Cannot add actuator. " + e;
			}
		});
		
		
		ngSYS.actuatorsServices = new NGSYS_Hero_Node_ActuatorsSRV(
				ngSYS.actuatorsManager, 
				ngSYS.controlChannel
				);
		
		try {
			ngSYS.actuatorsServices.initialize();
		} catch (e) {
			// TODO: handle exception
			throw "Cannot initialize actuators services. " + e;
		}
	}
	
}



let ngysHeroNode_Lib = {
	"NGSYS_Hero_Node" : NGSYS_Hero_Node
};


module.exports = NGSYS_Hero_Node;
