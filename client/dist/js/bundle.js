!function(e){function t(n){if(a[n])return a[n].exports;var o=a[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var a={};t.m=e,t.c=a,t.i=function(e){return e},t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=7)}([function(e,t){e.exports=React},function(e,t){e.exports=jQuery},function(e,t){e.exports=ReactDom},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(0),c=n(s),u=a(4),f=n(u),d=function(e){function t(e){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),l(t,[{key:"render",value:function(){return c.default.createElement("div",{className:"seo-input field"},c.default.createElement("label",null,this.props.label),c.default.createElement("input",{type:"text",className:"text",name:this.props.name,value:this.props.value,onChange:this.props.onChange}),c.default.createElement(f.default,null))}}]),t}(c.default.Component);t.default=d},function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(0),s=function(e){return e&&e.__esModule?e:{default:e}}(l),c=function(e){function t(e){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return r(t,e),i(t,[{key:"render",value:function(){return s.default.createElement("div",{className:"seo-input-progress"},s.default.createElement("div",{className:"bar"},s.default.createElement("div",{className:"indicator"})))}}]),t}(s.default.Component);t.default=c},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(1),c=n(s),u=a(0),f=n(u),d=a(3),m=n(d),p=a(8),h=n(p),b=void 0!==window.ss?window.ss:{};c.default.entwine("ss",function(e){b.seo={openImageEditor:function(t,a){var n=e("#insert-seo-media-react__dialog-wrapper");n.length||(n=e('<div id="insert-seo-media-react__dialog-wrapper" />'),e("body").append(n)),n.setElement({Type:t,Element:a}),n.open()}}});var g=function(e){function t(e){o(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={Name:e.name,Link:e.link,MetaTitle:e.seodata.MetaTitle,MetaDescription:e.seodata.MetaDescription,FacebookTitle:e.seodata.FacebookTitle,FacebookDescription:e.seodata.FacebookDescription,TwitterTitle:e.seodata.TwitterTitle,TwitterDescription:e.seodata.TwitterDescription,CurrentTab:"seo",FacebookImageURL:e.seodata.FacebookImageURL,FacebookImageID:e.seodata.FacebookImageID,TwitterImageURL:e.seodata.TwitterImageURL,TwitterImageID:e.seodata.TwitterImageID},a}return i(t,e),l(t,[{key:"getFieldName",value:function(e){return this.state.Name+"["+e+"]"}},{key:"openTab",value:function(e){this.setState({CurrentTab:e})}},{key:"setImageForType",value:function(e,t){"FacebookImage"===e?this.setState({FacebookImageID:t.ID,FacebookImageURL:t.url}):this.setState({TwitterImageID:t.ID,TwitterImageURL:t.url})}},{key:"handleInputChange",value:function(e,t){var a={};a[t]=e.target.value,this.setState(a)}},{key:"openImageEditor",value:function(e){b.seo.openImageEditor(e,this)}},{key:"render",value:function(){var e=this;return f.default.createElement("div",{className:"seo-editor"},f.default.createElement("nav",null,f.default.createElement("ul",null,f.default.createElement("li",null,f.default.createElement("a",{"data-href":"#seo",onClick:function(){e.openTab("seo")}},f.default.createElement("i",{className:"icon icon-seo-rocket"}))),f.default.createElement("li",null,f.default.createElement("a",{"data-href":"#facebook",onClick:function(){e.openTab("facebook")}},f.default.createElement("i",{className:"icon icon-seo-facebook-square"}))),f.default.createElement("li",null,f.default.createElement("a",{"data-href":"#twitter",onClick:function(){e.openTab("twitter")}},f.default.createElement("i",{className:"icon icon-seo-twitter-square"}))),f.default.createElement("li",null,f.default.createElement("a",{"data-href":"#settings",onClick:function(){e.openTab("settings")}},f.default.createElement("i",{className:"icon icon-seo-cog"}))))),f.default.createElement("div",{className:"seo-tab-container"},f.default.createElement("div",{className:"seo-tab "+("seo"===this.state.CurrentTab?"active":""),"data-tab":"seo"},f.default.createElement("h3",null,"SEO Data"),f.default.createElement("div",{className:"seo-section"},f.default.createElement("div",{className:"fields"},f.default.createElement(m.default,{label:"Meta Title",value:this.state.MetaTitle,name:this.getFieldName("MetaTitle"),onChange:function(t){e.handleInputChange(t,"MetaTitle")}}),f.default.createElement(h.default,{label:"Meta Description",value:this.state.MetaDescription,name:this.getFieldName("MetaDescription"),onChange:function(t){e.handleInputChange(t,"MetaDescription")}})),f.default.createElement("div",{className:"preview-holder"},f.default.createElement("div",{className:"preview-card"},f.default.createElement("h3",null,this.state.MetaTitle),f.default.createElement("p",{className:"preview-link"},this.state.Link),f.default.createElement("p",{className:"preview-description"},this.state.MetaDescription))))),f.default.createElement("div",{className:"seo-tab "+("facebook"===this.state.CurrentTab?"active":""),"data-tab":"facebook"},f.default.createElement("h3",null,"Social Data"),f.default.createElement("div",{className:"seo-section"},f.default.createElement("div",{className:"fields"},f.default.createElement("h4",null,"Facebook"),f.default.createElement(m.default,{label:"Facebook Title",value:this.state.FacebookTitle,name:this.getFieldName("FacebookTitle"),onChange:function(t){e.handleInputChange(t,"FacebookTitle")}}),f.default.createElement(h.default,{label:"Facebook Description",value:this.state.FacebookDescription,name:this.getFieldName("FacebookDescription"),onChange:function(t){e.handleInputChange(t,"FacebookDescription")}}),f.default.createElement("input",{type:"hidden",value:this.state.FacebookImageID,name:this.getFieldName("FacebookImageID")})),f.default.createElement("div",{className:"preview-holder"},f.default.createElement("div",{className:"preview-card facebook"},f.default.createElement("div",{className:"preview-card--image"},f.default.createElement("a",{className:"js-og-image-selector",onClick:function(){e.openImageEditor("FacebookImage")}},f.default.createElement("i",{className:"icon font-icon-edit"})),this.state.FacebookImageURL&&f.default.createElement("div",null,f.default.createElement("img",{src:this.state.FacebookImageURL}))),f.default.createElement("h3",null,this.state.FacebookTitle),f.default.createElement("p",{className:"preview-description"},this.state.FacebookDescription),f.default.createElement("p",{className:"preview-link"},this.state.Link))))),f.default.createElement("div",{className:"seo-tab "+("twitter"===this.state.CurrentTab?"active":""),"data-tab":"twitter"},f.default.createElement("div",{className:"seo-section"},f.default.createElement("div",{className:"fields"},f.default.createElement("h4",null,"Twitter"),f.default.createElement(m.default,{label:"Twitter Title",value:this.state.TwitterTitle,name:this.getFieldName("TwitterTitle"),onChange:function(t){e.handleInputChange(t,"TwitterTitle")}}),f.default.createElement(h.default,{label:"Twitter Description",value:this.state.TwitterDescription,name:this.getFieldName("TwitterDescription"),onChange:function(t){e.handleInputChange(t,"TwitterDescription")}}),f.default.createElement("input",{type:"hidden",value:this.state.TwitterImageID,name:this.getFieldName("TwitterImageID")})),f.default.createElement("div",{className:"preview-holder"},f.default.createElement("div",{className:"preview-card twitter"},f.default.createElement("div",{className:"preview-contents"},f.default.createElement("div",{className:"preview-card--image"},f.default.createElement("a",{className:"js-og-image-selector",onClick:function(){e.openImageEditor("TwitterImage")}},f.default.createElement("i",{className:"icon font-icon-edit"})),this.state.TwitterImageURL&&f.default.createElement("div",null,f.default.createElement("img",{src:this.state.TwitterImageURL}))),f.default.createElement("h3",null,this.state.TwitterTitle),f.default.createElement("p",{className:"preview-description"},this.state.TwitterDescription),f.default.createElement("p",{className:"preview-link"},this.state.Link)))))),f.default.createElement("div",{className:"seo-tab "+("settings"===this.state.CurrentTab?"active":""),"data-tab":"settings"},f.default.createElement("h3",null,"Settings"),f.default.createElement(m.default,{label:"Canonical URL",value:this.state.CanonicalURL,name:this.getFieldName("CanonicalURL"),onChange:function(t){e.handleInputChange(t,"CanonicalURL")}}),f.default.createElement("p",null,"The canonical URL that this page should point to, leave empty to default to permalink.",f.default.createElement("a",{href:"https://webmasters.googleblog.com/2009/12/handling-legitimate-cross-domain.html",target:"_blank"},"Cross domain canonical")," supported too."))))}}]),t}(f.default.Component);t.default=g},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var o=a(1),r=n(o),i=a(0),l=n(i),s=a(2),c=n(s),u=a(10),f=a(9),d=(0,f.provideInjector)(window.InsertMediaModal.default);r.default.entwine("ss",function(e){e("#insert-seo-media-react__dialog-wrapper").entwine({Element:null,ImageType:null,Data:{},onunmatch:function(){this._clearModal()},_clearModal:function(){c.default.unmountComponentAtNode(this[0])},open:function(){this._renderModal(!0)},close:function(){this._renderModal(!1)},setTypeField:function(e){this.ImageType=e,console.log(this.ImageType)},_renderModal:function(e){var t=this,a=function(){return t.close()},n=function(){return t._handleInsert.apply(t,arguments)},o=window.ss.store,r=window.ss.apolloClient,i={};delete i.url,c.default.render(l.default.createElement(u.ApolloProvider,{store:o,client:r},l.default.createElement(d,{title:!1,type:"insert-media",show:e,onInsert:n,onHide:a,bodyClassName:"modal__dialog",className:"insert-media-react__dialog-wrapper",requireLinkText:!1,fileAttributes:i})),this[0])},_handleInsert:function(e,t){var a=!1;this.setData(Object.assign({},e,t));try{if("image"!==(t?t.category:"image"))throw"Wrong file type";a=this.insertImage()}catch(e){this.statusMessage(e,"bad")}return a&&this.close(),Promise.resolve()},insertImage:function(){var e=this.getElement();if(!e)return!1;var t=this.getData();return e.Element.setImageForType(e.Type,t),!0},statusMessage:function(t,a){var n=e("<div/>").text(t).html();e.noticeAdd({text:n,type:a,stayTime:5e3,inEffect:{left:"0",opacity:"show"}})}})})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var o=a(1),r=n(o),i=a(0),l=n(i),s=a(2),c=n(s),u=a(5),f=n(u);a(6),r.default.entwine("ss",function(e){e(".js-seo-editor:visible").entwine({onunmatch:function(){this._super(),c.default.unmountComponentAtNode(this[0])},onmatch:function(){this._super(),this.refresh()},refresh:function(){var e=this.data("name"),t=this.data("seo"),a=this.data("recordlink");c.default.render(l.default.createElement(f.default,{link:a,name:e,seodata:t}),this[0])}})})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(0),c=n(s),u=a(3),f=n(u),d=a(4),m=n(d),p=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){return c.default.createElement("div",{className:"seo-input field"},c.default.createElement("label",null,this.props.label),c.default.createElement("textarea",{className:"text",name:this.props.name,onChange:this.props.onChange},this.props.value),c.default.createElement(m.default,null))}}]),t}(f.default);t.default=p},function(e,t){e.exports=Injector},function(e,t){e.exports=ReactApollo}]);