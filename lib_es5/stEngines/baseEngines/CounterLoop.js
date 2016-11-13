"use strict";

/**
 * Counter Loop engine
 * 
 * 
 */

/**
 * Import SimpleLoop
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleLoop = require('./SimpleLoop.js').SimpleLoop;

/**
 * CounterLoop configuration object.
 * 
 * @typedef {Object} Config
 * @memberof st.ngn.baseEngines.CounterLoop
 * @implements st.ngn.baseEngines.SimpleLoop
 * 
 * @type Object
 * @property {number} ticks - Main loop ticks for counter.
 * @property {number} maxLoopNum - Maximum number of loops to count.
 */

/**
 * LoopCount event.
 *
 * @event st.ngn.baseEngines.CounterLoop#LoopCount
 * @memberof st.ngn.baseEngines.CounterLoop
 * @type {object}
 * 
 * @property {number} loopNum - The number of loops.
 * @property {st.ngn.BaseEngine} engine - The engine of the counter loop.
 * 
 */

/**
 * BaseEngine CONSTANTS
 * 
 * @memberof st.ngn.baseEngines.CounterLoop
 */

var CounterLoop_CONSTANTS = {
	'Events': {
		'CounterLoop': 'counterLoop',
		'CounterMax': 'counterMax'

	}
};

/**
 * CounterLoop
 * <pre>
 * 
 * </pre>
 * 
 * 
 * @class
 * @memberof st.ngn.baseEngines
 * @implements st.ngn.baseEngines.SimpleLoop
 * 
 * @property {number} _loopNum - Number of loops
 * @property {number} _tickNum - Number of ticks
 * 
 */

var CounterLoop = function (_SimpleLoop) {
	_inherits(CounterLoop, _SimpleLoop);

	/**
  * 
  * @constructs CounterLoop
  * 
  * @param {st.ngn.baseEngines.CounterLoop.Config} config - Configuration object
  */

	function CounterLoop(config) {
		_classCallCheck(this, CounterLoop);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CounterLoop).call(this, config));

		var _ngn = _this;

		_ngn._loopNum = 0;
		_ngn._tickNum = 0;

		_ngn._CONSTANTS = CounterLoop_CONSTANTS;

		return _this;
	}

	_createClass(CounterLoop, [{
		key: 'initialize',
		value: function initialize() {

			_get(Object.getPrototypeOf(CounterLoop.prototype), 'initialize', this).call(this);

			var _ngn = this;

			// Map event MainLoop_Tick
			_ngn.eventEmitter.on(_baseEngine.CONSTANTS.Events.MainLoop_Tick, function (data) {

				_ngn._processEngineTick({
					'engine': _ngn
				});
			});
		}
	}, {
		key: '_processEngineTick',
		value: function _processEngineTick(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngn = this;
			if (options.engine !== null) {
				_ngn = options.engine;
			}

			var _ngnConfig = _ngn.config;

			if (_ngn._tickNum < _ngnConfig.ticks) {
				_ngn._tickNum++;
			} else {
				_ngn._tickNum = 0;

				if (_ngn._loopNum < _ngnConfig.maxLoopNum) {
					_ngn._loopNum++;

					// Emit event CounterLoop
					_ngn.eventEmitter.emit(_ngn._CONSTANTS.Events.CounterLoop, {
						'loopNum': _ngn._loopNum,
						'engine': _ngn
					});
				} else {
					_ngn._loopNum = 0;

					// Emit event CounterMax
					_ngn.eventEmitter.emit(_ngn._CONSTANTS.Events.CounterMax, {
						'maxLoopNum': _ngnConfig.maxLoopNum,
						'engine': _ngn
					});
				}
			}
		}
	}]);

	return CounterLoop;
}(SimpleLoop);

var _lib = {
	"CounterLoop": CounterLoop

};

module.exports = _lib;
//# sourceMappingURL=CounterLoop.js.map
