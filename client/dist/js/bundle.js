/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SEOInput = __webpack_require__(5);

var _SEOInput2 = _interopRequireDefault(_SEOInput);

var _SEOTextarea = __webpack_require__(7);

var _SEOTextarea2 = _interopRequireDefault(_SEOTextarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ss = typeof window.ss !== 'undefined' ? window.ss : {};

var SEOEditorHolder = function (_React$Component) {
    _inherits(SEOEditorHolder, _React$Component);

    function SEOEditorHolder(props) {
        _classCallCheck(this, SEOEditorHolder);

        var _this = _possibleConstructorReturn(this, (SEOEditorHolder.__proto__ || Object.getPrototypeOf(SEOEditorHolder)).call(this, props));

        _this.state = {
            Name: props.name,
            Link: props.link,
            MetaTitle: props.seodata.MetaTitle,
            MetaDescription: props.seodata.MetaDescription,
            FacebookTitle: props.seodata.FacebookTitle,
            FacebookDescription: props.seodata.FacebookDescription,
            TwitterTitle: props.seodata.TwitterTitle,
            TwitterDescription: props.seodata.TwitterDescription,
            CurrentTab: 'seo',
            FacebookImageURL: props.seodata.FacebookImageURL,
            FacebookImageID: props.seodata.FacebookImageID,
            TwitterImageURL: props.seodata.TwitterImageURL,
            TwitterImageID: props.seodata.TwitterImageID
        };
        return _this;
    }

    _createClass(SEOEditorHolder, [{
        key: 'getFieldName',
        value: function getFieldName(name) {
            return this.state.Name + '[' + name + ']';
        }
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(event, name) {
            var val = {};
            val[name] = event.target.value;;
            this.setState(val);
        }
    }, {
        key: 'openTab',
        value: function openTab(tab) {
            this.setState({
                CurrentTab: tab
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'seo-editor' },
                _react2.default.createElement(
                    'nav',
                    null,
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { 'data-href': '#seo', onClick: function onClick(e) {
                                        _this2.openTab('seo');
                                    } },
                                _react2.default.createElement('i', { className: 'icon font-icon-rocket' })
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { 'data-href': '#social', onClick: function onClick(e) {
                                        _this2.openTab('social');
                                    } },
                                _react2.default.createElement('i', { className: 'icon font-icon-globe-1' })
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { 'data-href': '#settings', onClick: function onClick(e) {
                                        _this2.openTab('settings');
                                    } },
                                _react2.default.createElement('i', { className: 'icon font-icon-cog' })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'seo-tab-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'seo-tab ' + (this.state.CurrentTab == 'seo' ? 'active' : ''), 'data-tab': 'seo' },
                        _react2.default.createElement(
                            'div',
                            { className: 'seo-section' },
                            _react2.default.createElement(
                                'h3',
                                null,
                                'SEO Data'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'fields' },
                                _react2.default.createElement(_SEOInput2.default, {
                                    label: 'Meta Title',
                                    value: this.state.MetaTitle,
                                    name: this.getFieldName('MetaTitle'),
                                    onChange: function onChange(e) {
                                        _this2.handleInputChange(e, 'MetaTitle');
                                    }
                                }),
                                _react2.default.createElement(_SEOTextarea2.default, {
                                    label: 'Meta Description',
                                    value: this.state.MetaDescription,
                                    name: this.getFieldName('MetaDescription'),
                                    onChange: function onChange(e) {
                                        _this2.handleInputChange(e, 'MetaDescription');
                                    }
                                })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'preview-holder' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'preview-card' },
                                    _react2.default.createElement(
                                        'h3',
                                        null,
                                        this.state.MetaTitle
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'preview-link' },
                                        this.state.Link
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'preview-description' },
                                        this.state.MetaDescription
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'seo-tab ' + (this.state.CurrentTab == 'social' ? 'active' : ''), 'data-tab': 'social' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Social Data'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'seo-section' },
                            _react2.default.createElement(
                                'div',
                                { className: 'fields' },
                                _react2.default.createElement(
                                    'h4',
                                    null,
                                    'Facebook'
                                ),
                                _react2.default.createElement(_SEOInput2.default, {
                                    label: 'Facebook Title',
                                    value: this.state.FacebookTitle,
                                    name: this.getFieldName('FacebookTitle'),
                                    onChange: function onChange(e) {
                                        _this2.handleInputChange(e, 'FacebookTitle');
                                    }
                                }),
                                _react2.default.createElement(_SEOTextarea2.default, {
                                    label: 'Facebook Description',
                                    value: this.state.FacebookDescription,
                                    name: this.getFieldName('FacebookDescription'),
                                    onChange: function onChange(e) {
                                        _this2.handleInputChange(e, 'FacebookDescription');
                                    }
                                }),
                                _react2.default.createElement('input', { type: 'hidden', name: this.getFieldName('FacebookImageID') })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'preview-holder' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'preview-card facebook' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'preview-cart--image' },
                                        _react2.default.createElement(
                                            'a',
                                            null,
                                            _react2.default.createElement('i', { className: 'fa fa-edit' })
                                        ),
                                        this.state.FacebookImageURL && _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement('img', { src: this.state.FacebookImageURL })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'h3',
                                        null,
                                        this.state.FacebookTitle
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'preview-description' },
                                        this.state.FacebookDescription
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'preview-link' },
                                        this.state.Link
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'seo-section' },
                            _react2.default.createElement(
                                'div',
                                { className: 'fields' },
                                _react2.default.createElement(
                                    'h4',
                                    null,
                                    'Twitter'
                                ),
                                _react2.default.createElement(_SEOInput2.default, {
                                    label: 'Twitter Title',
                                    value: this.state.TwitterTitle,
                                    name: this.getFieldName('TwitterTitle'),
                                    onChange: function onChange(e) {
                                        _this2.handleInputChange(e, 'TwitterTitle');
                                    }
                                }),
                                _react2.default.createElement(_SEOTextarea2.default, {
                                    label: 'Twitter Description',
                                    value: this.state.TwitterDescription,
                                    name: this.getFieldName('TwitterDescription'),
                                    onChange: function onChange(e) {
                                        _this2.handleInputChange(e, 'TwitterDescription');
                                    }
                                }),
                                _react2.default.createElement('input', { type: 'hidden', name: this.getFieldName('TwitterImageID') })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'preview-holder' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'preview-card twitter' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'preview-contents' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'preview-cart--image' },
                                            _react2.default.createElement(
                                                'a',
                                                null,
                                                _react2.default.createElement('i', { className: 'fa fa-edit' })
                                            ),
                                            this.state.TwitterImageURL && _react2.default.createElement(
                                                'div',
                                                null,
                                                _react2.default.createElement('img', { src: this.state.TwitterImageURL })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'h3',
                                            null,
                                            this.state.TwitterTitle
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'preview-description' },
                                            this.state.TwitterDescription
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'preview-link' },
                                            this.state.Link
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'seo-tab ' + (this.state.CurrentTab == 'settings' ? 'active' : ''), 'data-tab': 'settings' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Settings'
                        )
                    )
                )
            );
        }
    }]);

    return SEOEditorHolder;
}(_react2.default.Component);

exports.default = SEOEditorHolder;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDom;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(3);

var _jquery2 = _interopRequireDefault(_jquery);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SEOEditorHolder = __webpack_require__(0);

var _SEOEditorHolder2 = _interopRequireDefault(_SEOEditorHolder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jquery2.default.entwine('ss', function ($) {

    $('.js-seo-editor:visible').entwine({
        onunmatch: function onunmatch() {
            this._super();
            _reactDom2.default.unmountComponentAtNode(this[0]);
        },
        onmatch: function onmatch() {
            this._super();
            this.refresh();
        },
        refresh: function refresh() {
            var name = this.data('name');
            var seoData = this.data('seo');
            var link = this.data('recordlink');

            _reactDom2.default.render(_react2.default.createElement(_SEOEditorHolder2.default, {
                link: link,
                name: name,
                seodata: seoData }), this[0]);
        }
    });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _SEOInputProgressbar = __webpack_require__(6);

var _SEOInputProgressbar2 = _interopRequireDefault(_SEOInputProgressbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEOInput = function (_React$Component) {
    _inherits(SEOInput, _React$Component);

    function SEOInput(props) {
        _classCallCheck(this, SEOInput);

        return _possibleConstructorReturn(this, (SEOInput.__proto__ || Object.getPrototypeOf(SEOInput)).call(this, props));
    }

    _createClass(SEOInput, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'seo-input field' },
                _react2.default.createElement(
                    'label',
                    null,
                    this.props.label
                ),
                _react2.default.createElement('input', { type: 'text', className: 'text',
                    name: this.props.name,
                    value: this.props.value,
                    onChange: this.props.onChange
                }),
                _react2.default.createElement(_SEOInputProgressbar2.default, null)
            );
        }
    }]);

    return SEOInput;
}(_react2.default.Component);

exports.default = SEOInput;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ss = typeof window.ss !== 'undefined' ? window.ss : {};

var SEOInputProgressbar = function (_React$Component) {
    _inherits(SEOInputProgressbar, _React$Component);

    function SEOInputProgressbar(props) {
        _classCallCheck(this, SEOInputProgressbar);

        return _possibleConstructorReturn(this, (SEOInputProgressbar.__proto__ || Object.getPrototypeOf(SEOInputProgressbar)).call(this, props));
    }

    _createClass(SEOInputProgressbar, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'seo-input-progress' },
                _react2.default.createElement(
                    'div',
                    { className: 'bar' },
                    _react2.default.createElement('div', { className: 'indicator' })
                )
            );
        }
    }]);

    return SEOInputProgressbar;
}(_react2.default.Component);

exports.default = SEOInputProgressbar;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _SEOInput2 = __webpack_require__(5);

var _SEOInput3 = _interopRequireDefault(_SEOInput2);

var _SEOInputProgressbar = __webpack_require__(6);

var _SEOInputProgressbar2 = _interopRequireDefault(_SEOInputProgressbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ss = typeof window.ss !== 'undefined' ? window.ss : {};

var SEOTextarea = function (_SEOInput) {
    _inherits(SEOTextarea, _SEOInput);

    function SEOTextarea() {
        _classCallCheck(this, SEOTextarea);

        return _possibleConstructorReturn(this, (SEOTextarea.__proto__ || Object.getPrototypeOf(SEOTextarea)).apply(this, arguments));
    }

    _createClass(SEOTextarea, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'seo-input field' },
                _react2.default.createElement(
                    'label',
                    null,
                    this.props.label
                ),
                _react2.default.createElement(
                    'textarea',
                    {
                        className: 'text',
                        name: this.props.name,
                        onChange: this.props.onChange },
                    this.props.value
                ),
                _react2.default.createElement(_SEOInputProgressbar2.default, null)
            );
        }
    }]);

    return SEOTextarea;
}(_SEOInput3.default);

exports.default = SEOTextarea;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map