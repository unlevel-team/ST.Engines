"use strict";

/**
 * ActuatorsManager
 * 
 * Generic manager for Actuators
 * 
 */


/**
 * Import EventEmitter
 * @ignore
 */
let EventEmitter = require('events').EventEmitter;


/**
 * ActuatorsManager CONSTANTS
 * 
 * @memberof st.ngn.services
 * 
 */
const ActuatorsManager_CONSTANTS = {

	"Events" : {
		"ActuatorAdded" : "Actuator Added"
	}

};


/**
 * The result object.
 * 
 * @typedef {Object} SearchResult
 * @memberof st.ngn.services.ActuatorsManager
 * @type Object
 * @property {(st.ngn.Actuator|null)} STactuator - The Actuator object, may be null.
 * @property {number} position - The position in list.
 * 
 */


/**
 * Actuators manager
 * 
 * @class
 * @memberof st.ngn.services
 * 
 * @property {st.ngn.Actuator[]} actuatorsList - List of Actuators.
 * @property {object} eventEmitter - Object for emit events.
 */
class ActuatorsManager {
	
	/**
	 * @constructs ActuatorsManager
	 */
	constructor() {
		
		this.actuatorsList = [];
		this.eventEmitter = new EventEmitter();
		
		this.CONSTANTS = ActuatorsManager_CONSTANTS;

	}
	
	
	/**
	 * Adds actuator
	 * 
	 * @param {st.ngn.Actuator} act - Actuator object
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
	 * 
	 * @param {string} actuatorID - Actuator ID
	 * @returns {st.ngn.services.ActuatorsManager.SearchResult} result - Result object
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
		
		actList.forEach(function(_act, _i) {
			
			if ( _act.actuatorEngine !== null ) {
				let _actEngine = _act.actuatorEngine;
				
				if (_actEngine.state === _actEngine.CONSTANTS.States.Working) {
					_actEngine.stopEngine();
				}

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
