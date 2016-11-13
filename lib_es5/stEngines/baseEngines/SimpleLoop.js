"use strict";

/**
 * Simple Loop engine
 * 
 * 
 */

/**
 * Import BaseEngine
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseEngine = require('./BaseEngine.js').BaseEngine;

/**
 * SimpleLoop configuration object.
 * 
 * @typedef {Object} Config
 * @memberof st.ngn.baseEngines.SimpleLoop
 * 
 * @type Object
 * @property {number} loopTime - The time in miliseconds for main loop.
 * 
 */

/**
 * SimpleLoop options object.
 * 
 * @typedef {Object} Options
 * @memberof st.ngn.baseEngines.SimpleLoop
 * 
 * @type Object
 * @property {number} loopTime - The time in miliseconds for main loop.
 * 
 */

/**
 * SimpleLoop
 * <pre>
 * A simple loop engine. 
 * 
 * Provides  'loopTime' option
 * </pre>
 * 
 * 
 * @class
 * @memberof st.ngn.baseEngines
 * @implements st.ngn.BaseEngine
 */

var SimpleLoop = function (_BaseEngine) {
	_inherits(SimpleLoop, _BaseEngine);

	/**
  * 
  * @constructs SimpleLoop
  * 
  * @param {st.ngn.baseEngines.SimpleLoop.Config} config - Configuration object
  */

	function SimpleLoop(config) {
		_classCallCheck(this, SimpleLoop);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleLoop).call(this, config));
	}

	/**
  * Get options
  * 
  * @param {object} options - Options object
  * @param {st.ngn.baseEngines.SimpleLoop} [options.engine] - Engine reference
  * 
  * @return {st.ngn.baseEngines.SimpleLoop.Options} options - Options object
  * 
  */


	_createClass(SimpleLoop, [{
		key: 'getOptions',
		value: function getOptions(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngn = this;
			if (options.engine !== undefined) {
				_ngn = options.engine;
			}

			var _ngnConfig = _ngn.config;

			var _ngnOptions = {
				'loopTime': _ngnConfig.loopTime
			};

			return _ngnOptions;
		}

		/**
   * Set options
   * 
   * @param {object} options - Options object
   * @param {st.ngn.baseEngines.SimpleLoop} [options.engine] - Engine reference
   * @param {st.ngn.baseEngines.SimpleLoop.Options} options.ngnOptions - Engine options
   * 
   */

	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngn = this;
			if (options.engine !== undefined) {
				_ngn = options.engine;
			}

			var _ngnConfig = _ngn.config;

			// Check engine state
			switch (_ngn.state) {
				case _ngn.CONSTANTS.States.Ready:
				case _ngn.CONSTANTS.States.Stop:
					break;

				default:
					throw 'Bad engine state';
					break;
			}

			var _ngnOptions = {};
			if (options.ngnOptions !== undefined) {
				_ngnOptions = options.ngnOptions;
			}

			if (_ngnOptions.loopTime !== undefined) {
				_ngnConfig.loopTime = _ngnOptions.loopTime;
			}
		}
	}]);

	return SimpleLoop;
}(BaseEngine);

var _lib = {
	"SimpleLoop": SimpleLoop

};

module.exports = _lib;
//# sourceMappingURL=SimpleLoop.js.map
