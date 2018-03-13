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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEOInputProgressbar = __webpack_require__(5);

var _SEOInputProgressbar2 = _interopRequireDefault(_SEOInputProgressbar);

var _SEOInputMessages = __webpack_require__(4);

var _SEOInputMessages2 = _interopRequireDefault(_SEOInputMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEOInput = function (_React$Component) {
    _inherits(SEOInput, _React$Component);

    function SEOInput(props) {
        _classCallCheck(this, SEOInput);

        var _this = _possibleConstructorReturn(this, (SEOInput.__proto__ || Object.getPrototypeOf(SEOInput)).call(this, props));

        _this.onChange = _this.onChange.bind(_this);
        _this.validateMessages = [];
        _this.duplicateCheckRequest = null;
        _this.state = {
            'Messages': _this.validateMessages
        };
        return _this;
    }

    _createClass(SEOInput, [{
        key: 'addValidationsMessage',
        value: function addValidationsMessage(type, message, data) {
            this.validateMessages.push({
                'type': type,
                'message': ss.i18n.inject(message, data)
            });
        }
    }, {
        key: 'validateRequired',
        value: function validateRequired(value, params) {
            var trimmedValue = value.trim();
            if (!trimmedValue || trimmedValue.length === 0) {
                this.addValidationsMessage('error', params, {});
            }
        }
    }, {
        key: 'validateShorterThan',
        value: function validateShorterThan(value, params) {
            if (value.length > 0 && value.length < params.chars) {
                this.addValidationsMessage('warning', params.message, {});
            }
        }
    }, {
        key: 'validateLongerThan',
        value: function validateLongerThan(value, params) {
            if (value.length > 0 && value.length > params.chars) {
                this.addValidationsMessage('warning', params.message, {});
            }
        }
    }, {
        key: 'validateLengthWithin',
        value: function validateLengthWithin(value, params) {
            if (value.length > 0 && value.length >= params.min && value.length <= params.max) {
                this.addValidationsMessage('good', params.message, {});
            }
        }
    }, {
        key: 'validateFieldValueNotFound',
        value: function validateFieldValueNotFound(value, params) {
            var haystack = value.toLowerCase();
            var needle = document.getElementsByName(params.name)[0].value.toString().trim();
            needle = needle.toLowerCase();
            if (needle.length > 0 && haystack.length > 0 && haystack.indexOf(needle) < 0) {
                this.addValidationsMessage('error', params.message, {
                    'needle': needle
                });
            }
        }
    }, {
        key: 'validateDuplicates',
        value: function validateDuplicates(value, params) {
            var _this2 = this;

            if (this.duplicateCheckRequest) {
                this.duplicateCheckRequest.abort();
            }

            this.duplicateCheckRequest = _jquery2.default.ajax({
                url: params.link,
                data: {
                    Field: params.field,
                    Needle: value
                },
                type: 'POST',
                method: 'POST',
                dataType: 'json',
                success: function success(data) {
                    if (data.checked === 1) {
                        if (data.valid === 0) {
                            _this2.addValidationsMessage('error', params.message, {
                                'duplicates': data.duplicates
                            });
                        } else {
                            _this2.addValidationsMessage('good', params.unique, {});
                        }
                    }
                    _this2.setState({
                        'Messages': _this2.validateMessages
                    });
                }

            });
        }
    }, {
        key: 'processValidateItem',
        value: function processValidateItem(type, value, params) {
            if (type == 'required') {
                return this.validateRequired(value, params);
            }
            if (type == 'shorter_than') {
                return this.validateShorterThan(value, params);
            }
            if (type == 'longer_than') {
                return this.validateLongerThan(value, params);
            }
            if (type == 'within_range') {
                return this.validateLengthWithin(value, params);
            }
            if (type == 'not_found') {
                return this.validateFieldValueNotFound(value, params);
            }
            if (type == 'duplicate_check') {
                return this.validateDuplicates(value, params);
            }
        }
    }, {
        key: 'validate',
        value: function validate() {
            if (this.props.validations) {
                var value = document.getElementsByName(this.props.name)[0].value.toString();
                this.validateMessages = [];
                for (var type in this.props.validations) {
                    this.processValidateItem(type, value, this.props.validations[type]);
                }
                this.setState({
                    'Messages': this.validateMessages
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.validate();
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            this.validate();
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        }
    }, {
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
                _react2.default.createElement('input', {
                    type: 'text',
                    className: 'text',
                    name: this.props.name,
                    value: this.props.value,
                    onChange: this.onChange
                }),
                _react2.default.createElement(_SEOInputProgressbar2.default, null),
                _react2.default.createElement(_SEOInputMessages2.default, { messages: this.state.Messages })
            );
        }
    }]);

    return SEOInput;
}(_react2.default.Component);

exports.default = SEOInput;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ReactDom;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEOInputMessages = function (_React$Component) {
    _inherits(SEOInputMessages, _React$Component);

    function SEOInputMessages(props) {
        _classCallCheck(this, SEOInputMessages);

        return _possibleConstructorReturn(this, (SEOInputMessages.__proto__ || Object.getPrototypeOf(SEOInputMessages)).call(this, props));
    }

    _createClass(SEOInputMessages, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'seo-messages' },
                this.props.messages.length ? this.props.messages.map(function (message) {
                    return [_react2.default.createElement('p', { className: 'message ' + message.type, dangerouslySetInnerHTML: { __html: message.message } })];
                }) : ''
            );
        }
    }]);

    return SEOInputMessages;
}(_react2.default.Component);

exports.default = SEOInputMessages;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEOInputProgressbar = function (_React$Component) {
  _inherits(SEOInputProgressbar, _React$Component);

  function SEOInputProgressbar(props) {
    _classCallCheck(this, SEOInputProgressbar);

    return _possibleConstructorReturn(this, (SEOInputProgressbar.__proto__ || Object.getPrototypeOf(SEOInputProgressbar)).call(this, props));
  }

  _createClass(SEOInputProgressbar, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "seo-input-progress" },
        _react2.default.createElement(
          "div",
          { className: "bar" },
          _react2.default.createElement("div", { className: "indicator" })
        )
      );
    }
  }]);

  return SEOInputProgressbar;
}(_react2.default.Component);

exports.default = SEOInputProgressbar;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEOInput = __webpack_require__(2);

var _SEOInput2 = _interopRequireDefault(_SEOInput);

var _SEOTextarea = __webpack_require__(11);

var _SEOTextarea2 = _interopRequireDefault(_SEOTextarea);

var _SEORobotsFollow = __webpack_require__(9);

var _SEORobotsFollow2 = _interopRequireDefault(_SEORobotsFollow);

var _SEORobotsIndex = __webpack_require__(10);

var _SEORobotsIndex2 = _interopRequireDefault(_SEORobotsIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ss = typeof window.ss !== 'undefined' ? window.ss : {};

_jquery2.default.entwine('ss', function ($) {
  ss.seo = {
    openImageEditor: function openImageEditor(type, element) {
      var dialog = $('#insert-seo-media-react__dialog-wrapper');
      if (!dialog.length) {
        dialog = $('<div id="insert-seo-media-react__dialog-wrapper" />');
        $('body').append(dialog);
      }
      dialog.setElement({
        Type: type,
        Element: element
      });
      dialog.open();
    }
  };
});

var SEOEditorHolder = function (_React$Component) {
  _inherits(SEOEditorHolder, _React$Component);

  function SEOEditorHolder(props) {
    _classCallCheck(this, SEOEditorHolder);

    var _this = _possibleConstructorReturn(this, (SEOEditorHolder.__proto__ || Object.getPrototypeOf(SEOEditorHolder)).call(this, props));

    _this.state = {
      Name: props.name,
      Link: props.link,
      FocusKeyword: props.seodata.FocusKeyword,
      MetaTitle: props.seodata.MetaTitle,
      MetaDescription: props.seodata.MetaDescription,
      MetaRobotsFollow: props.seodata.MetaRobotsFollow,
      MetaRobotsIndex: props.seodata.MetaRobotsIndex,
      FacebookTitle: props.seodata.FacebookTitle,
      FacebookDescription: props.seodata.FacebookDescription,
      TwitterTitle: props.seodata.TwitterTitle,
      TwitterDescription: props.seodata.TwitterDescription,
      CurrentTab: 'seo',
      FacebookImageURL: props.seodata.FacebookImageURL,
      FacebookImageID: props.seodata.FacebookImageID,
      TwitterImageURL: props.seodata.TwitterImageURL,
      TwitterImageID: props.seodata.TwitterImageID,
      HostName: props.seodata.HostName
    };
    return _this;
  }

  _createClass(SEOEditorHolder, [{
    key: 'getFieldName',
    value: function getFieldName(name) {
      return this.state.Name + '[' + name + ']';
    }
  }, {
    key: 'openTab',
    value: function openTab(tab) {
      this.setState({
        CurrentTab: tab
      });
    }
  }, {
    key: 'setImageForType',
    value: function setImageForType(type, data) {
      if (type === 'FacebookImage') {
        this.setState({
          FacebookImageID: data.ID,
          FacebookImageURL: data.url
        });
      } else {
        this.setState({
          TwitterImageID: data.ID,
          TwitterImageURL: data.url
        });
      }
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(event, name) {
      var val = {};
      val[name] = event.target.value;
      this.setState(val);
    }
  }, {
    key: 'handleRadioChange',
    value: function handleRadioChange(event, name) {
      var val = {};
      if (event.target.checked) {
        val[name] = event.target.value;
        this.setState(val);
      }
    }
  }, {
    key: 'openImageEditor',
    value: function openImageEditor(type) {
      ss.seo.openImageEditor(type, this);
    }
  }, {
    key: 'removeImage',
    value: function removeImage(type) {
      if (type === 'FacebookImage') {
        this.setState({
          FacebookImageID: 0,
          FacebookImageURL: null
        });
      } else {
        this.setState({
          TwitterImageID: 0,
          TwitterImageURL: null
        });
      }
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
                {
                  className: '' + (this.state.CurrentTab === 'seo' ? 'active' : ''),
                  'data-href': '#seo',
                  onClick: function onClick() {
                    _this2.openTab('seo');
                  }
                },
                _react2.default.createElement('i', { className: 'seo-rocket' })
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                {
                  className: '' + (this.state.CurrentTab === 'facebook' ? 'active' : ''),
                  'data-href': '#facebook',
                  onClick: function onClick() {
                    _this2.openTab('facebook');
                  }
                },
                _react2.default.createElement('i', { className: 'seo-facebook-square' })
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                {
                  className: '' + (this.state.CurrentTab === 'twitter' ? 'active' : ''),
                  'data-href': '#twitter',
                  onClick: function onClick() {
                    _this2.openTab('twitter');
                  }
                },
                _react2.default.createElement('i', { className: 'seo-twitter-square' })
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                {
                  className: '' + (this.state.CurrentTab === 'settings' ? 'active' : ''),
                  'data-href': '#settings',
                  onClick: function onClick() {
                    _this2.openTab('settings');
                  }
                },
                _react2.default.createElement('i', { className: 'seo-cog' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'seo-tab-container' },
          _react2.default.createElement(
            'div',
            { className: 'seo-tab ' + (this.state.CurrentTab === 'seo' ? 'active' : ''), 'data-tab': 'seo' },
            _react2.default.createElement(
              'h3',
              { className: 'seo-tab__title' },
              'SEO Data'
            ),
            _react2.default.createElement(
              'div',
              { className: 'seo-section' },
              _react2.default.createElement(
                'div',
                { className: 'fields' },
                _react2.default.createElement(_SEOInput2.default, {
                  label: 'Focus Keyword',
                  value: this.state.FocusKeyword,
                  name: this.getFieldName('FocusKeyword'),
                  validations: {
                    'required': ss.i18n._t('SEO.EMPTY_KEYWORD'),
                    'duplicate_check': {
                      field: 'FocusKeyword',
                      link: this.props.duplicatelink,
                      message: ss.i18n._t('SEO.DUPLICATE_KEYWORD'),
                      unique: ss.i18n._t('SEO.UNIQUE_KEYWORD')
                    }
                  },
                  onChange: function onChange(e) {
                    _this2.handleInputChange(e, 'FocusKeyword');
                  }
                }),
                _react2.default.createElement(_SEOInput2.default, {
                  label: 'Meta Title',
                  value: this.state.MetaTitle,
                  name: this.getFieldName('MetaTitle'),
                  validations: {
                    'required': ss.i18n._t('SEO.EMPTY_META_TITLE'),
                    'not_found': {
                      name: this.getFieldName('FocusKeyword'),
                      message: ss.i18n._t('SEO.KEYWORD_NOT_FOUND_IN_META_TITLE')
                    },
                    'longer_than': {
                      chars: 70,
                      message: ss.i18n._t('SEO.META_TITLE_LONG')
                    },
                    'shorter_than': {
                      chars: 45,
                      message: ss.i18n._t('SEO.META_TITLE_SHORT')
                    },
                    'within_range': {
                      min: 45,
                      max: 70,
                      message: ss.i18n._t('SEO.META_TITLE_GOOD_LENGTH')
                    },
                    'duplicate_check': {
                      field: 'MetaTitle',
                      link: this.props.duplicatelink,
                      message: ss.i18n._t('SEO.DUPLICATE_META_TITLE'),
                      unique: ss.i18n._t('SEO.UNIQUE_META_TITLE')
                    }
                  },
                  onChange: function onChange(e) {
                    _this2.handleInputChange(e, 'MetaTitle');
                  }
                }),
                _react2.default.createElement(_SEOTextarea2.default, {
                  label: 'Meta Description',
                  value: this.state.MetaDescription,
                  name: this.getFieldName('MetaDescription'),
                  validations: {
                    'required': ss.i18n._t('SEO.EMPTY_META_DESC'),
                    'not_found': {
                      name: this.getFieldName('FocusKeyword'),
                      message: ss.i18n._t('SEO.KEYWORD_NOT_FOUND_IN_META_DESC')
                    },
                    'longer_than': {
                      chars: 156,
                      message: ss.i18n._t('SEO.META_DESC_LONG')
                    },
                    'shorter_than': {
                      chars: 120,
                      message: ss.i18n._t('SEO.META_DESC_SHORT')
                    },
                    'within_range': {
                      min: 120,
                      max: 156,
                      message: ss.i18n._t('SEO.META_DESC_GOOD_LENGTH')
                    },
                    'duplicate_check': {
                      field: 'MetaDescription',
                      link: this.props.duplicatelink,
                      message: ss.i18n._t('SEO.DUPLICATE_META_DESC'),
                      unique: ss.i18n._t('SEO.UNIQUE_META_DESC')
                    }
                  },
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
                  { className: 'preview-card google' },
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
            { className: 'seo-tab ' + (this.state.CurrentTab === 'facebook' ? 'active' : ''), 'data-tab': 'facebook' },
            _react2.default.createElement(
              'h3',
              { className: 'seo-tab__title' },
              'Facebook'
            ),
            _react2.default.createElement(
              'div',
              { className: 'seo-section' },
              _react2.default.createElement(
                'div',
                { className: 'fields' },
                _react2.default.createElement(_SEOInput2.default, {
                  label: 'Facebook Title',
                  value: this.state.FacebookTitle,
                  name: this.getFieldName('FacebookTitle'),
                  validations: {
                    'required': ss.i18n._t('SEO.FB_TITLE_EMPTY')
                  },
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
                _react2.default.createElement('input', { type: 'hidden', value: this.state.FacebookImageID, name: this.getFieldName('FacebookImageID') })
              ),
              _react2.default.createElement(
                'div',
                { className: 'preview-holder' },
                _react2.default.createElement(
                  'div',
                  { className: 'preview-card facebook' },
                  _react2.default.createElement(
                    'div',
                    { className: 'preview-card--image' },
                    _react2.default.createElement(
                      'div',
                      { className: 'preview-card--actions' },
                      _react2.default.createElement(
                        'a',
                        { className: 'js-og-image-selector', onClick: function onClick() {
                            _this2.openImageEditor('FacebookImage');
                          } },
                        _react2.default.createElement('i', { className: 'seo-pencil-square-o' })
                      ),
                      this.state.FacebookImageURL && _react2.default.createElement(
                        'a',
                        { className: 'js-og-image-selector', onClick: function onClick() {
                            _this2.removeImage('FacebookImage');
                          } },
                        _react2.default.createElement('i', { className: 'seo-trash' })
                      )
                    ),
                    this.state.FacebookImageURL && _react2.default.createElement(
                      'div',
                      { className: 'img' },
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
                    this.state.HostName
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'seo-tab ' + (this.state.CurrentTab === 'twitter' ? 'active' : ''), 'data-tab': 'twitter' },
            _react2.default.createElement(
              'h3',
              { className: 'seo-tab__title' },
              'Twitter'
            ),
            _react2.default.createElement(
              'div',
              { className: 'seo-section' },
              _react2.default.createElement(
                'div',
                { className: 'fields' },
                _react2.default.createElement(_SEOInput2.default, {
                  label: 'Twitter Title',
                  value: this.state.TwitterTitle,
                  name: this.getFieldName('TwitterTitle'),
                  validations: {
                    'required': ss.i18n._t('SEO.TWITTER_TITLE_EMPTY')
                  },
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
                _react2.default.createElement('input', { type: 'hidden', value: this.state.TwitterImageID, name: this.getFieldName('TwitterImageID') })
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
                      { className: 'preview-card--image' },
                      _react2.default.createElement(
                        'div',
                        { className: 'preview-card--actions' },
                        _react2.default.createElement(
                          'a',
                          { className: 'js-og-image-selector', onClick: function onClick() {
                              _this2.openImageEditor('TwitterImage');
                            } },
                          _react2.default.createElement('i', { className: 'seo-pencil-square-o' })
                        ),
                        this.state.TwitterImageURL && _react2.default.createElement(
                          'a',
                          { className: 'js-og-image-selector', onClick: function onClick() {
                              _this2.removeImage('TwitterImage');
                            } },
                          _react2.default.createElement('i', { className: 'seo-trash' })
                        )
                      ),
                      this.state.TwitterImageURL && _react2.default.createElement(
                        'div',
                        { className: 'img' },
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
                      this.state.HostName
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'seo-tab ' + (this.state.CurrentTab === 'settings' ? 'active' : ''), 'data-tab': 'settings' },
            _react2.default.createElement(
              'h3',
              { className: 'seo-tab__title' },
              'Settings'
            ),
            _react2.default.createElement(_SEORobotsIndex2.default, {
              label: 'Meta robots index',
              value: this.state.MetaRobotsIndex,
              name: this.getFieldName('MetaRobotsIndex'),
              onChange: function onChange(e) {
                _this2.handleInputChange(e, 'MetaRobotsIndex');
              }
            }),
            _react2.default.createElement(_SEORobotsFollow2.default, {
              label: 'Meta robots follow',
              value: this.state.MetaRobotsFollow,
              name: this.getFieldName('MetaRobotsFollow'),
              onChange: function onChange(e) {
                _this2.handleRadioChange(e, 'MetaRobotsFollow');
              }
            }),
            _react2.default.createElement(_SEOInput2.default, {
              label: 'Canonical URL',
              value: this.state.CanonicalURL,
              name: this.getFieldName('CanonicalURL'),
              onChange: function onChange(e) {
                _this2.handleInputChange(e, 'CanonicalURL');
              }
            }),
            _react2.default.createElement(
              'p',
              null,
              'The canonical URL that this page should point to, leave empty to default to permalink.',
              _react2.default.createElement(
                'a',
                { href: 'https://webmasters.googleblog.com/2009/12/handling-legitimate-cross-domain.html', target: '_blank' },
                'Cross domain canonical'
              ),
              ' supported too.'
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactApollo = __webpack_require__(13);

var _Injector = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InjectableInsertMediaModal = (0, _Injector.provideInjector)(window.InsertMediaModal.default);

_jquery2.default.entwine('ss', function ($) {
    $('#insert-seo-media-react__dialog-wrapper').entwine({

        Element: null,
        ImageType: null,
        Data: {},
        onunmatch: function onunmatch() {
            this._clearModal();
        },
        _clearModal: function _clearModal() {
            _reactDom2.default.unmountComponentAtNode(this[0]);
        },
        open: function open() {
            this._renderModal(true);
        },
        close: function close() {
            this._renderModal(false);
        },
        setTypeField: function setTypeField(type) {
            this.ImageType = type;
            console.log(this.ImageType);
        },
        _renderModal: function _renderModal(show) {
            var _this = this;

            var handleHide = function handleHide() {
                return _this.close();
            };
            var handleInsert = function handleInsert() {
                return _this._handleInsert.apply(_this, arguments);
            };
            var store = window.ss.store;
            var client = window.ss.apolloClient;
            var attrs = {};

            delete attrs.url;

            _reactDom2.default.render(_react2.default.createElement(
                _reactApollo.ApolloProvider,
                { store: store, client: client },
                _react2.default.createElement(InjectableInsertMediaModal, {
                    title: false,
                    type: 'insert-media',
                    show: show,
                    onInsert: handleInsert,
                    onHide: handleHide,
                    bodyClassName: 'modal__dialog',
                    className: 'insert-media-react__dialog-wrapper',
                    requireLinkText: false,
                    fileAttributes: attrs
                })
            ), this[0]);
        },
        _handleInsert: function _handleInsert(data, file) {
            var result = false;
            this.setData(Object.assign({}, data, file));

            try {
                var category = null;
                if (file) {
                    category = file.category;
                } else {
                    category = 'image';
                }

                if (category === 'image') {
                    result = this.insertImage();
                } else {
                    throw 'Wrong file type';
                }
            } catch (e) {
                this.statusMessage(e, 'bad');
            }

            if (result) {
                this.close();
            }
            return Promise.resolve();
        },
        insertImage: function insertImage() {
            var $field = this.getElement();
            if (!$field) {
                return false;
            }

            var data = this.getData();
            $field.Element.setImageForType($field.Type, data);
            return true;
        },
        statusMessage: function statusMessage(text, type) {
            var content = $('<div/>').text(text).html();
            $.noticeAdd({
                text: content,
                type: type,
                stayTime: 5000,
                inEffect: { left: '0', opacity: 'show' }
            });
        }
    });
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SEOEditorHolder = __webpack_require__(6);

var _SEOEditorHolder2 = _interopRequireDefault(_SEOEditorHolder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(7);

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
            var duplicateCheckLink = this.data('duplicatelink');

            _reactDom2.default.render(_react2.default.createElement(_SEOEditorHolder2.default, {
                link: link,
                name: name,
                seodata: seoData,
                duplicatelink: duplicateCheckLink
            }), this[0]);
        }
    });
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEOInput2 = __webpack_require__(2);

var _SEOInput3 = _interopRequireDefault(_SEOInput2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEORobotsFollow = function (_SEOInput) {
  _inherits(SEORobotsFollow, _SEOInput);

  function SEORobotsFollow() {
    _classCallCheck(this, SEORobotsFollow);

    return _possibleConstructorReturn(this, (SEORobotsFollow.__proto__ || Object.getPrototypeOf(SEORobotsFollow)).apply(this, arguments));
  }

  _createClass(SEORobotsFollow, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'seo-input field radio' },
        _react2.default.createElement(
          'label',
          null,
          this.props.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'radio-options' },
          _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement('input', {
              type: 'radio',
              value: 'follow',
              name: this.props.name,
              onClick: this.props.onChange,
              checked: this.props.value === 'follow'
            }),
            'Follow'
          ),
          _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement('input', {
              type: 'radio',
              value: 'no-follow',
              name: this.props.name,
              onClick: this.props.onChange,
              checked: this.props.value === 'no-follow'
            }),
            'No Follow'
          )
        )
      );
    }
  }]);

  return SEORobotsFollow;
}(_SEOInput3.default);

exports.default = SEORobotsFollow;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEOInput2 = __webpack_require__(2);

var _SEOInput3 = _interopRequireDefault(_SEOInput2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEORobotsIndex = function (_SEOInput) {
  _inherits(SEORobotsIndex, _SEOInput);

  function SEORobotsIndex() {
    _classCallCheck(this, SEORobotsIndex);

    return _possibleConstructorReturn(this, (SEORobotsIndex.__proto__ || Object.getPrototypeOf(SEORobotsIndex)).apply(this, arguments));
  }

  _createClass(SEORobotsIndex, [{
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
          'select',
          {
            className: 'dropdown',
            name: this.props.name,
            onChange: this.props.onChange
          },
          _react2.default.createElement(
            'option',
            { value: '', selected: this.props.value === '' },
            'none'
          ),
          _react2.default.createElement(
            'option',
            { value: 'index', selected: this.props.value === 'index' },
            'index'
          ),
          _react2.default.createElement(
            'option',
            { value: 'noindex', selected: this.props.value === 'noindex' },
            'noindex'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Note: This setting will be overridden by the site config\'s search engine visibility setting'
        )
      );
    }
  }]);

  return SEORobotsIndex;
}(_SEOInput3.default);

exports.default = SEORobotsIndex;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEOInput2 = __webpack_require__(2);

var _SEOInput3 = _interopRequireDefault(_SEOInput2);

var _SEOInputProgressbar = __webpack_require__(5);

var _SEOInputProgressbar2 = _interopRequireDefault(_SEOInputProgressbar);

var _SEOInputMessages = __webpack_require__(4);

var _SEOInputMessages2 = _interopRequireDefault(_SEOInputMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
            onChange: this.onChange
          },
          this.props.value
        ),
        _react2.default.createElement(_SEOInputProgressbar2.default, null),
        _react2.default.createElement(_SEOInputMessages2.default, { messages: this.state.Messages })
      );
    }
  }]);

  return SEOTextarea;
}(_SEOInput3.default);

exports.default = SEOTextarea;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = ReactApollo;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map