module.exports =
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "24fb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "b3fa":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "div.vue-analog-clock{font-size:1.25rem;display:inline-block}div.vue-analog-clock div.clock-outer-ring{position:relative;width:100%;height:100%;border:1px solid #000;border-radius:50%;box-shadow:0 0 3px 3px rgba(0,0,0,.33);background-color:#117b49}div.vue-analog-clock div.clock-container{width:90%;height:90%;border:2px solid #1a1a1a;border-radius:50%;background-color:#fdfdf8;box-shadow:inset 0 0 8px 10px rgba(0,0,0,.15)}div.vue-analog-clock div.clock-container,div.vue-analog-clock div.clock-container div.pos-clock-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}div.vue-analog-clock div.clock-container div.center-dot{width:7%;height:7%;background-color:#333;border-radius:50%;z-index:11}div.vue-analog-clock div.clock-container div.pointer{position:absolute;left:50%;background-color:#333;border-top-right-radius:20px;border-bottom-right-radius:20px;border-top-left-radius:10px;border-bottom-left-radius:10px;transform-origin:left}div.vue-analog-clock div.clock-container div.hour-pointer{top:47.5%;width:32%;height:5%;z-index:10}div.vue-analog-clock div.clock-container div.minute-pointer{top:48.5%;width:40%;height:3%;z-index:9}div.vue-analog-clock div.clock-container div.second-pointer{top:49%;width:45%;height:2%;z-index:8;border-top-right-radius:500%;border-bottom-right-radius:500%}div.vue-analog-clock div.clock-container div.number{font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;font-weight:700;position:absolute;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}div.vue-analog-clock div.clock-container div.number.number-0{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(90deg)}div.vue-analog-clock div.clock-container div.number.number-0 span{display:inline-block;transform:rotate(-90deg)}div.vue-analog-clock div.clock-container div.number.number-1{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(120deg)}div.vue-analog-clock div.clock-container div.number.number-1 span{display:inline-block;transform:rotate(-120deg)}div.vue-analog-clock div.clock-container div.number.number-2{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(150deg)}div.vue-analog-clock div.clock-container div.number.number-2 span{display:inline-block;transform:rotate(-150deg)}div.vue-analog-clock div.clock-container div.number.number-3{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(180deg)}div.vue-analog-clock div.clock-container div.number.number-3 span{display:inline-block;transform:rotate(-180deg)}div.vue-analog-clock div.clock-container div.number.number-4{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(210deg)}div.vue-analog-clock div.clock-container div.number.number-4 span{display:inline-block;transform:rotate(-210deg)}div.vue-analog-clock div.clock-container div.number.number-5{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(240deg)}div.vue-analog-clock div.clock-container div.number.number-5 span{display:inline-block;transform:rotate(-240deg)}div.vue-analog-clock div.clock-container div.number.number-6{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(270deg)}div.vue-analog-clock div.clock-container div.number.number-6 span{display:inline-block;transform:rotate(-270deg)}div.vue-analog-clock div.clock-container div.number.number-7{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(300deg)}div.vue-analog-clock div.clock-container div.number.number-7 span{display:inline-block;transform:rotate(-300deg)}div.vue-analog-clock div.clock-container div.number.number-8{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(330deg)}div.vue-analog-clock div.clock-container div.number.number-8 span{display:inline-block;transform:rotate(-330deg)}div.vue-analog-clock div.clock-container div.number.number-9{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(1turn)}div.vue-analog-clock div.clock-container div.number.number-9 span{display:inline-block;transform:rotate(-1turn)}div.vue-analog-clock div.clock-container div.number.number-10{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(390deg)}div.vue-analog-clock div.clock-container div.number.number-10 span{display:inline-block;transform:rotate(-390deg)}div.vue-analog-clock div.clock-container div.number.number-11{width:100%;top:49%;left:50%;transform:translate(-50%,-50%) rotate(420deg)}div.vue-analog-clock div.clock-container div.number.number-11 span{display:inline-block;transform:rotate(-420deg)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "bf47":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueAnalogClock_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c84e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueAnalogClock_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueAnalogClock_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "c84e":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("b3fa");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("b7e75d50", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1f0fc60c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VueAnalogClock.vue?vue&type=template&id=50b41286&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-analog-clock",class:_vm.themeClass,style:({ width: _vm.mySize + 'px', height: _vm.mySize + 'px' })},[_c('div',{staticClass:"clock-outer-ring"},[_c('div',{staticClass:"clock-container"},[_c('div',{staticClass:"center-dot pos-clock-center"}),_c('div',{staticClass:"pointer hour-pointer",style:(_vm.hourPointerStyle)}),_c('div',{staticClass:"pointer minute-pointer",style:(_vm.minutePointerStyle)}),_c('div',{staticClass:"pointer second-pointer",style:(_vm.secondPointerStyle)}),_c('div',{staticClass:"numbers"},_vm._l((_vm.clockFaces),function(n,index){return _c('div',{key:n,staticClass:"number",class:'number-' + index},[_c('span',{style:(_vm.numberSpanStyle)},[_vm._v(_vm._s(n))])])}),0)])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VueAnalogClock.vue?vue&type=template&id=50b41286&

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/ts-loader??ref--12-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VueAnalogClock.vue?vue&type=script&lang=ts&

const defaultSize = () => 320;
/* harmony default export */ var VueAnalogClockvue_type_script_lang_ts_ = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "vue-analog-clock",
    props: {
        theme: {
            type: String,
            default: "default"
        },
        size: {
            type: Number,
            default: defaultSize
        },
        autoSize: {
            type: Boolean,
            default: false
        },
        value: {
            type: Date,
            default: () => new Date()
        },
        enableTimeFlow: {
            type: Boolean,
            default: true
        },
        intValTime: {
            type: Number,
            default: 100
        },
        transitionSpeed: {
            type: Number,
            default: 80
        }
    },
    watch: {
        size() {
            this.mySize = this.size;
        },
        value() {
            this.date = new Date(this.value);
        },
        enableTimeFlow() {
            if (this.enableTimeFlow) {
                this.startInterval();
            }
            else {
                if (this.intVal != null) {
                    window.clearInterval(this.intVal);
                }
            }
        }
    },
    data() {
        return {
            date: new Date(),
            dateTemp: new Date(),
            sDate: new Date(),
            eDate: new Date(),
            refreshFirstLoop: true,
            intVal: null,
            mySize: this.size
        };
    },
    beforeMount() {
        this.dateTemp = new Date(this.value);
        let value = new Date(this.value);
        value.setMilliseconds(0);
        this.date = new Date(value);
        if (this.enableTimeFlow) {
            this.startInterval();
        }
    },
    computed: {
        themeClass() {
            return "vue-analog-clock-" + this.theme;
        },
        hourAngle() {
            const hour = this.date.getHours();
            const hour12 = (hour > 11) ? (hour - 12) : hour;
            const minutes = this.date.getMinutes();
            const minDecimal = (minutes / 60);
            const hourWithMins = hour12 + minDecimal;
            const hourAsPercentage = (hourWithMins / 12);
            // 90 is the base angle (clock 15), 359 is max angle.
            const hourAngle = (359 * hourAsPercentage) - 90;
            return hourAngle;
        },
        minuteAngle() {
            const minutes = this.date.getMinutes();
            const seconds = this.date.getSeconds();
            const minuteAsPercentage = ((minutes + (seconds / 60)) / 60);
            const minuteAngle = (359 * minuteAsPercentage) - 90;
            return minuteAngle;
        },
        secondAngle() {
            const seconds = this.date.getSeconds();
            return (359 * (seconds / 60)) - 90;
        },
        hourPointerStyle() {
            return this.calculatePointerStyle(this.hourAngle);
        },
        minutePointerStyle() {
            return this.calculatePointerStyle(this.minuteAngle);
        },
        secondPointerStyle() {
            return this.calculatePointerStyle(this.secondAngle);
        },
        clockFaces() {
            let arr = [12];
            for (let i = 1; i < 12; i++) {
                arr.push(i);
            }
            return arr;
        },
        numberSpanStyle() {
            let scaleBase = defaultSize();
            let scale = (this.mySize / scaleBase);
            let fontSize = 100 * scale;
            let padding = Math.round(8 * scale);
            return {
                "font-size": `${fontSize}%`,
                "padding": `${padding}px`
            };
        }
    },
    methods: {
        startInterval() {
            if (this.intVal != null) {
                window.clearInterval(this.intVal);
            }
            this.refreshFirstLoop = true;
            this.refresh();
            this.intVal = window.setInterval(() => {
                this.refresh();
            }, this.intValTime);
        },
        refresh() {
            this.sDate = new Date();
            if (this.refreshFirstLoop) {
                this.eDate = new Date(this.sDate);
                this.eDate.setMilliseconds(this.eDate.getMilliseconds() - this.intValTime);
                this.refreshFirstLoop = false;
            }
            var valueDiffFromLastInterval = this.sDate.valueOf() - this.eDate.valueOf();
            this.eDate = new Date();
            var newDate = new Date(this.date);
            newDate.setMilliseconds(newDate.getMilliseconds() + valueDiffFromLastInterval);
            this.date = new Date(newDate);
            this.$emit('input', this.date);
            // Calculate clock size if auto-size is enabled
            if (this.autoSize && !!this.$el) {
                const myEl = this.$el;
                const myParent = myEl.parentElement;
                if (!myParent) {
                    throw "Clock must have a parent element when using auto-size";
                }
                const parentWidth = myParent.offsetWidth;
                this.mySize = parentWidth;
            }
        },
        calculatePointerStyle(angle) {
            let obj = {};
            obj["transform"] = "rotate(" + angle.toFixed(2) + "deg)";
            // The pointer will animate counter-clockwise to 12 after full cycle
            // Prevent this by removing transition when pointer is around 12...
            if (angle < 265 && angle > -89) {
                obj["transition"] = `transform ${this.transitionSpeed}ms ease-in-out`;
            }
            return obj;
        }
    }
}));

// CONCATENATED MODULE: ./src/components/VueAnalogClock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_VueAnalogClockvue_type_script_lang_ts_ = (VueAnalogClockvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/VueAnalogClock.vue?vue&type=style&index=0&lang=scss&
var VueAnalogClockvue_type_style_index_0_lang_scss_ = __webpack_require__("bf47");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/VueAnalogClock.vue






/* normalize component */

var component = normalizeComponent(
  components_VueAnalogClockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VueAnalogClock = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (VueAnalogClock);



/***/ })

/******/ })["default"];
//# sourceMappingURL=vueHtmlAnalogClock.common.js.map