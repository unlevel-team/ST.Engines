"use strict";

/**
 * ST Sensor Dummy01
 * 
 * 
 * Sensor for made some tests..
 * 
 * 
 * 
 * 
 * 
 * 
 */


/*
 * Example of well implemented node engine in node-red
 * @see http://nodered.org/docs/creating-nodes/first-node
 * 
 
 module.exports = function(RED) {
 
    function LowerCaseNode(config) {
    
        RED.nodes.createNode(this,config);
        var node = this;
        
        this.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
        
    }
    
    RED.nodes.registerType("lower-case",LowerCaseNode);
}
 
 */



/**
 * Import SensorEngine
 * @ignore
 */
let SensorEngine = require('../SensorEngine.js').SensorEngine;



/**
 * ST Sensor Dummy01
 * 
 * @class
 * @memberof st.ngn
 * @implements st.ngn.SensorEngine
 */
class STSensor_Dummy01 extends SensorEngine {
	
	/**
	 * @constructs STSensor_Dummy01
	 * 
	 * @param {object} config - Configuration object
	 */
	constructor(config) {
		 
		super(config);
		
		let _snsEngine = this;
		_snsEngine.name = "STSensor_Dummy01";
		
		_snsEngine._lastTime = null;
	}
	
	/**
	 * Initialize
	 */
	initialize() {
		
		let stSensor = this;
		stSensor._ticks = 0;
		
		// Map event MainLoop_Tick
		stSensor.eventEmitter.on(stSensor.CONSTANTS.Events.MainLoop_Tick, function() {
			
			stSensor._ticks++;
			if (stSensor._ticks >= stSensor.config.options.ticks) {
				
				stSensor._ticks = 0;
				
				// Emit event SensorData
				stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, {"ticks": stSensor.config.options.ticks});
				
				// console.log('<*> STSensor_Dummy01.Events.SensorData');	// TODO REMOVE DEBUG LOG
				console.log('<~i~> STSensor_Dummy01 (info):');	// TODO REMOVE DEBUG LOG


				stSensor._lastTime = new Date().getTime();

				if (stSensor.config.options.showTime) {
					console.log(' <~~~> Time: ' + stSensor._lastTime);	// TODO REMOVE DEBUG LOG
				}
			  
				
				if (stSensor.config.options.showDeltaTime) {
					
					if (stSensor._deltaTimeRef !== undefined) {
					 	let deltaTime = stSensor._lastTime - stSensor._deltaTimeRef;
					 	console.log(' <~~~> DetalTime: ' + deltaTime );	// TODO REMOVE DEBUG LOG
					}
					
					stSensor._deltaTimeRef = stSensor._lastTime;
				}
				
			}
			
		});
		
		
		super.initialize();
	}
	
	
	/**
	 * Start engine
	 * 
	 * @fires SensorEngine#SensorEngine_Start
	 * 
	 */
	startEngine() {
		
		let stSensor = this;
		
		stSensor.mainLoop();
		
		// Emit event SensorEngine_Start
		stSensor.eventEmitter.emit( stSensor.CONSTANTS.Events.SensorEngine_Start );
	}
	
	
	/**
	 * Stop engine
	 * 
	 * @fires SensorEngine#SensorEngine_Stop
	 * 
	 */
	stopEngine() {
		
		let stSensor = this;
		
		stSensor.stopMainLoop();
		
		// Emit event SensorEngine_Stop 
		// for MainLoop_Stop
		stSensor.eventEmitter.emit( stSensor.CONSTANTS.Events.SensorEngine_Stop );

	}
	
	
	/**
	 * Get options
	 * 
	 * @override
	 */
	getOptions() {
		
		let stSensor = this;
		let snsOptions = stSensor.config.options;
		
		let options = {
				"ticks" : snsOptions.ticks,
				"showTime" : snsOptions.showTime,
				"showDeltaTime" : snsOptions.showDeltaTime
		};
		
		return options;
	}
	
	
	/**
	 * Set options
	 * 
	 * @param {object} options - Options object
	 * @param {number} [options.ticks] - Ticks 
	 * @param {boolean} [options.showTime] - Show time
	 * @param {boolean} [options.showDeltaTime] - Show delta time 
	 */
	setOptions(options) {
		
		let stSensor = this;
		
		if (stSensor.state === stSensor.CONSTANTS.States.SEstate_Working) {
			throw "Bad sensor state.";
		}
		
		let snsOptions = stSensor.config.options;
		
		if (options.ticks) {
			snsOptions.ticks = options.ticks;
		}
		
		if (options.showTime !== undefined) {
			snsOptions.showTime = options.showTime;
		}
		
		if (options.showDeltaTime !== undefined) {
			snsOptions.showDeltaTime = options.showDeltaTime;
		}
	}
	
	
}


module.exports = STSensor_Dummy01;