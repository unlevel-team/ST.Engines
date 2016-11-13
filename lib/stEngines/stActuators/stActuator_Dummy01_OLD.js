"use strict";


/**
 * Import EventEmitter
 * @ignore
 */
let EventEmitter = require('events').EventEmitter;

/**
 * Import ActuatorEngine
 * @ignore
 */
let ActuatorEngine = require('../ActuatorEngine.js').ActuatorEngine;


/**
 * ST Actuator Dummy01
 * 
 * <pre>
 * Actuator for tests
 * </pre>
 * 
 * @class
 * @implements ActuatorEngine
 * 
 */
class STActuator_Dummy01 extends ActuatorEngine {
	
	/**
	 * @constructs STActuator_Dummy01
	 * 
	 * @param {object} config - Configuration object
	 */
	constructor(config) {
		
		super(config);
		
		let _actEngine = this;
		
		_actEngine.name = "STActuator_Dummy01";
		
		_actEngine._lastTime = null;
		_actEngine._lastActuatorDATA = {
			"time": null,
			"data": null
		};
	}
	
	
	/**
	 * Initialize
	 */
	initialize() {
		
		let stActuator = this;
		let actOptions = stActuator.config.options;
		
		stActuator._ticks = 0;
		
		// Map event MainLoop_Tick
		stActuator.eventEmitter.on(stActuator.CONSTANTS.Events.MainLoop_Tick, function() {
			
			stActuator._ticks++;
			
			if (stActuator._ticks >= actOptions.ticks) {
				
				stActuator._ticks = 0;
				stActuator._lastTime = new Date().getTime();
				
				console.log('<~i~> STActuator_Dummy01 (info):');	// TODO REMOVE DEBUG LOG

			  
				if (actOptions.showTime) {
					console.log(' <~~~> Time: ' + stActuator._lastTime);	// TODO REMOVE DEBUG LOG
				}
				
				if (actOptions.showDeltaTime) {
					if (stActuator._deltaTimeRef !== undefined) {
						let deltaTime = stActuator._lastTime - stActuator._deltaTimeRef;
						console.log(' <~~~> DetalTime: ' + deltaTime );	// TODO REMOVE DEBUG LOG
					}
					stActuator._deltaTimeRef = stActuator._lastTime;
				}
				
			}
		});
		
		
		// Map event ActuatorData
		stActuator.eventEmitter.on(stActuator.CONSTANTS.Events.ActuatorData, function(data) {
			stActuator._event_ActuatorData(data);
		});
		
		
		
		super.initialize();
	}
	
	
	/**
	 * Start engine
	 */
	startEngine() {
		
		let stActuator = this;
		stActuator.mainLoop();
		
		stActuator.eventEmitter.emit( stActuator.CONSTANTS.Events.ActuatorEngine_Start );
	}
	
	
	/**
	 * Stop engine
	 */
	stopEngine() {
		
		let stActuator = this;
		stActuator.stopMainLoop();
		
		// MainLoop_Stop
		stActuator.eventEmitter.emit( stActuator.CONSTANTS.Events.ActuatorEngine_Stop );
	}
	
	
	/**
	 * Get options
	 */
	getOptions() {
		
		let stActuator = this;
		let actOptions = stActuator.config.options;
		
		let options = {
				"ticks" : actOptions.ticks,
				"showTime" : actOptions.showTime,
				"showDeltaTime" : actOptions.showDeltaTime
		};
		
		return options;
	}
	
	
	/**
	 * Set options
	 */
	setOptions(options) {
		
		let stActuator = this;
		
		if (stActuator.state === stActuator.CONSTANTS.States.Working) {
			throw "Bad actuator state.";
		}
		
		let actOptions = stActuator.config.options;
		
		if (options.ticks !== undefined) {
			actOptions.ticks = options.ticks;
		}
		
		if (options.showTime !== undefined) {
			actOptions.showTime = options.showTime;
		}
		
		if (options.showDeltaTime !== undefined) {
			actOptions.showDeltaTime = options.showDeltaTime;
		}
	}	
	
	
	/**
	 * Event ActuatorData
	 */
	_event_ActuatorData(data) {
		
		let stActuator = this;
		
		stActuator._lastActuatorDATA.data = data;
		stActuator._lastActuatorDATA.time = new Date().getTime();
		
		console.log('<*> STActuator_Dummy01.Events.ActuatorData');	// TODO REMOVE DEBUG LOG
		console.log(stActuator._lastActuatorDATA);	// TODO REMOVE DEBUG LOG
		
	}
	
	
}


module.exports = STActuator_Dummy01;