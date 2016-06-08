"use strict";

/**
 * ActuatorsManager
 * 
 * Generic manager for Actuators
 * 
 */

let EventEmitter = require('events').EventEmitter;


/**
 * ActuatorsManager CONSTANTS
 */
const ActuatorsManager_CONSTANTS = {

	"Events" : {
		"ActuatorAdded" : "Actuator Added"
	}

};


/**
 * Actuators manager
 */
class ActuatorsManager {
	
	constructor() {
		
		this.actuatorsList = [];
		this.eventEmitter = new EventEmitter();
		
		this.CONSTANTS = ActuatorsManager_CONSTANTS;

	}
	
	
	/**
	 * Adds actuator
	 * 
	 * @act Actuator object
	 */
	addActuator(act) {
		
		let amng = this;
		
		
		let actSearch = amng.getActuatorByID(act.config.id);
		
		if (actSearch.STactuator !== null) {
			throw "Actuator ID already exists.";
		}
		
		amng.actuatorsList.push(act);
		
		// Emit message ActuatorAdded
		amng.eventEmitter.emit(amng.CONSTANTS.Events.ActuatorAdded, act);
		
	}

	
	/**
	 * Returns Actuator searched by ID
	 */
	getActuatorByID(actuatorID) {
		
		let amng = this;
		let actuator = null;
		let _i = 0;
		
		_i = amng.actuatorsList.map(function(x) {return x.config.id; }).indexOf(actuatorID);
		if (_i !== -1) {
			actuator = amng.actuatorsList[_i];
		}
		
		return {
			"STactuator": actuator,
			"position": _i
		};
	}
	
	
	/**
	 * Turn off actuators
	 */
	turnOffActuators() {
		
		let amng = this;
		let actList = amng.actuatorsList;
		
		actList.forEach(function(act_, _i) {
			if ( act_.actuatorEngine !== null ) {
				act_.actuatorEngine.stopEngine();
			}
		});
		
		console.log('<*> ActuatorsManager.turnOffActuators');	// TODO REMOVE DEBUG LOG
	}
	
	
	
}


let _Lib = {
	"ActuatorsManager_CONSTANTS" : ActuatorsManager_CONSTANTS,
	"ActuatorsManager" : ActuatorsManager
};


module.exports = _Lib;
