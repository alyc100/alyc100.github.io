"use strict";
(self["__HF_CHUNKS__"] = self["__HF_CHUNKS__"] || []).push([[878],{

/***/ 124:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6505);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _boots_web_session_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9196);
/* harmony import */ var _BurgerMenuItem_BurgerMenuItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3577);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6876);
/* harmony import */ var _Tabs_Tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2227);
/* harmony import */ var _UtilityLinks_UtilityLinks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4765);
/* harmony import */ var _MyAccountPopup_MyAccountPopupLinks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7567);
/* harmony import */ var _MyAccountPopup_AdvantageCardPopupLinks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7015);
/* harmony import */ var _hooks_usePrevious__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(371);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













var LoginRegister = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "LoginRegister-LoginRegister";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return __webpack_require__.e(/* import() | LoginRegister-LoginRegister */ 921).then(__webpack_require__.bind(__webpack_require__, 1975));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(1975);
    }

    return eval('require.resolve')("../LoginRegister/LoginRegister");
  }
});
var AdvantageCard = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "UserMenu-AdvantageCard-AdvantageCard";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return Promise.all(/* import() | UserMenu-AdvantageCard-AdvantageCard */[__webpack_require__.e(934), __webpack_require__.e(28)]).then(__webpack_require__.bind(__webpack_require__, 9934));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(9934);
    }

    return eval('require.resolve')("../UserMenu/AdvantageCard/AdvantageCard");
  }
});

var BurgerContent = function BurgerContent(_ref) {
  var _globalNavLinks$, _globalNavLinks$$elem, _globalNavLinks$$elem2, _globalNavLinksElemen, _level2Elements$, _level2Elements$2;

  var burgerMenuOpen = _ref.burgerMenuOpen,
      propLevel = _ref.propLevel,
      propSelectedLvl0Index = _ref.propSelectedLvl0Index,
      globalNavLinks = _ref.globalNavLinks,
      activeTab = _ref.activeTab,
      setActiveTab = _ref.setActiveTab;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(propLevel || 0),
      _useState2 = _slicedToArray(_useState, 2),
      currentLevel = _useState2[0],
      setCurrentLevel = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      prevLevel = _useState4[0],
      setPrevLevel = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(propSelectedLvl0Index || 0),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedLvl0Index = _useState6[0],
      setSelectedLvl0Index = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedLvl1Index = _useState8[0],
      setSelectedLvl1Index = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
      _useState10 = _slicedToArray(_useState9, 2),
      selectedTabIndex = _useState10[0],
      setSelectedTabIndex = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("no-scroll"),
      _useState12 = _slicedToArray(_useState11, 2),
      scrollBar = _useState12[0],
      setScrollBar = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState14 = _slicedToArray(_useState13, 2),
      sdkUser = _useState14[0],
      setSdkUser = _useState14[1];

  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      levelChangeAnimation = _useState16[0],
      setLevelChangeAnimation = _useState16[1];

  var prevTabIndex = (0,_hooks_usePrevious__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(selectedTabIndex);

  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      isAdCardLinked = _useState18[0],
      setIsAdCardLinked = _useState18[1];

  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
      _useState20 = _slicedToArray(_useState19, 2),
      offers = _useState20[0],
      setOffers = _useState20[1];

  var setLinkContent = function setLinkContent(level) {
    var indexLvl0 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var indexLvl1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    setPrevLevel(currentLevel);
    setCurrentLevel(level);
    setSelectedLvl0Index(indexLvl0);
    setSelectedLvl1Index(indexLvl1);
  };

  var scrollbarTimeout;

  var scrollAction = function scrollAction() {
    setScrollBar("scroll");

    if (scrollbarTimeout) {
      clearTimeout(scrollbarTimeout);
    }

    scrollbarTimeout = setTimeout(function () {
      setScrollBar("no-scroll");
    }, 1000);
  };

  var globalNavLinksElements = ((_globalNavLinks$ = globalNavLinks["".concat(selectedTabIndex)]) === null || _globalNavLinks$ === void 0 ? void 0 : (_globalNavLinks$$elem = _globalNavLinks$.elements) === null || _globalNavLinks$$elem === void 0 ? void 0 : (_globalNavLinks$$elem2 = _globalNavLinks$$elem.globalNavLinks) === null || _globalNavLinks$$elem2 === void 0 ? void 0 : _globalNavLinks$$elem2.value) || [];
  var level0Parent = globalNavLinksElements["".concat(selectedLvl0Index)];

  var setLevel1Parent = function setLevel1Parent(parent, index) {
    if (parent !== null && parent !== void 0 && parent.elements) return parent === null || parent === void 0 ? void 0 : parent.elements["".concat(index)];
    return [];
  };

  var level1Parent = setLevel1Parent(level0Parent, selectedLvl1Index);
  var level2Elements = ((_globalNavLinksElemen = globalNavLinksElements["".concat(selectedLvl0Index)]) === null || _globalNavLinksElemen === void 0 ? void 0 : _globalNavLinksElemen.elements) || [];
  var expanded = ((_level2Elements$ = level2Elements[0]) === null || _level2Elements$ === void 0 ? void 0 : _level2Elements$.render) === "fullColumnExpanded" || ((_level2Elements$2 = level2Elements[0]) === null || _level2Elements$2 === void 0 ? void 0 : _level2Elements$2.render) === "halfColumnExpanded";
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setSelectedTabIndex(globalNavLinks.indexOf(activeTab));
    setLevelChangeAnimation(false);
  }, [activeTab]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setLevelChangeAnimation(currentLevel < prevLevel);
  }, [currentLevel, prevLevel]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var retail = new _boots_web_session_sdk__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP("RETAIL");
    var customerName = retail.getCustomer();
    var advantageCard = retail.getLoyalty();
    setSdkUser(customerName);
    setIsAdCardLinked(advantageCard === null || advantageCard === void 0 ? void 0 : advantageCard.loyaltyDetails.isAdCardLinked);
    setOffers(advantageCard === null || advantageCard === void 0 ? void 0 : advantageCard.loyaltyDetails.offers);
  }, []);

  var renderBasedOnLevel = function renderBasedOnLevel() {
    if (currentLevel === 1) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
          "left-animation": prevLevel === 2,
          "right-animation": prevLevel === 0
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BurgerMenuItem_BurgerMenuItem__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        title: level0Parent.title,
        key: 1,
        isMenuTitle: true,
        backLink: function backLink() {
          setLinkContent(currentLevel - 1, selectedLvl0Index);
        }
      }));
    }

    if (currentLevel === 2) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "right-animation"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BurgerMenuItem_BurgerMenuItem__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        title: level1Parent.title,
        key: 1,
        isMenuTitle: true,
        backLink: function backLink() {
          setLinkContent(currentLevel - 1, selectedLvl0Index);
        }
      }));
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
        "left-animation": prevLevel !== null
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Tabs_Tabs__WEBPACK_IMPORTED_MODULE_6__["default"], {
      isMobile: burgerMenuOpen,
      tabs: globalNavLinks,
      activeTab: setActiveTab,
      active: activeTab,
      animationEnabled: selectedTabIndex === 0 && prevTabIndex !== undefined
    }));
  };

  var renderLinkElementsBasedOnLevel = function renderLinkElementsBasedOnLevel() {
    if (currentLevel === 1) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
          "left-animation": prevLevel === 2,
          "right-animation": prevLevel === 0
        })
      }, level0Parent.link && level0Parent.link.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BurgerMenuItem_BurgerMenuItem__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
          "oct-burger-menu-content__no-border": expanded
        }),
        title: "Visit ".concat(level0Parent.title),
        key: 2,
        isSecondaryLevel: true,
        goTo: level0Parent.link,
        analytics: level0Parent.analytics
      }), level2Elements.map(function (value, index) {
        var isExpanded = expanded && index === 0;
        var extraParams = isExpanded ? {
          className: "oct-burger-menu-content__expanded"
        } : {
          onClick: function onClick() {
            setLinkContent(2, selectedLvl0Index, index);
          }
        };
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BurgerMenuItem_BurgerMenuItem__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, _extends({
          title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
            className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
              "oct-burger-menu-content__bold-text": isExpanded
            })
          }, value.title)
        }, extraParams, {
          elements: value === null || value === void 0 ? void 0 : value.elements,
          key: index,
          isSecondaryLevel: true,
          expanded: isExpanded
        }, value !== null && value !== void 0 && value.elements ? {} : {
          goTo: value.link
        })), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "oct-burger-menu-content__list"
        }, level2Elements["".concat(selectedLvl1Index)].elements.map(function (elemValue, elemIndex) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: "oct-burger-menu-content__list-item-container",
            key: elemIndex
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BurgerMenuItem_BurgerMenuItem__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
            className: "oct-burger-menu-content__list-item",
            title: elemValue.title,
            isSecondaryLevel: true,
            goTo: elemValue.link,
            taxonomyEnd: true,
            analytics: elemValue.analytics
          }));
        })));
      }));
    }

    if (currentLevel === 2) {
      var _level2Elements$$elem;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "right-animation"
      }, level1Parent.link && level1Parent.link.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BurgerMenuItem_BurgerMenuItem__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        title: "Visit ".concat(level1Parent.title),
        key: 2,
        isSecondaryLevel: true,
        goTo: level1Parent.link,
        taxonomyEnd: true,
        analytics: level1Parent.analytics
      }), (_level2Elements$$elem = level2Elements["".concat(selectedLvl1Index)].elements) === null || _level2Elements$$elem === void 0 ? void 0 : _level2Elements$$elem.map(function (value, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BurgerMenuItem_BurgerMenuItem__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
          title: value.title,
          key: index,
          isSecondaryLevel: true,
          goTo: value.link,
          taxonomyEnd: true,
          analytics: value.analytics
        });
      }));
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("content-separator", {
        "left-animation": prevLevel !== null || selectedTabIndex === 1,
        "right-animation": selectedTabIndex === 0 && prevTabIndex !== undefined && !levelChangeAnimation
      })
    }, globalNavLinksElements.map(function (value, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BurgerMenuItem_BurgerMenuItem__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        title: value.title,
        onClick: function onClick() {
          setLinkContent(1, index, 0);
        },
        elements: value.elements,
        key: index
      });
    }));
  };

  var renderUserMenu = function renderUserMenu() {
    var _sdkUser$customerDeta, _sdkUser$customerDeta2;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
        "left-animation": prevLevel !== null
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoginRegister, {
      isMobile: burgerMenuOpen
    }), burgerMenuOpen && ((_sdkUser$customerDeta = sdkUser.customerDetails) === null || _sdkUser$customerDeta === void 0 ? void 0 : _sdkUser$customerDeta.isLoggedIn) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MyAccountPopup_MyAccountPopupLinks__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AdvantageCard, {
      isMobile: burgerMenuOpen
    }), burgerMenuOpen && ((_sdkUser$customerDeta2 = sdkUser.customerDetails) === null || _sdkUser$customerDeta2 === void 0 ? void 0 : _sdkUser$customerDeta2.isLoggedIn) && isAdCardLinked && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MyAccountPopup_AdvantageCardPopupLinks__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
      offers: offers.count !== "0" ? offers.count : null
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_UtilityLinks_UtilityLinks__WEBPACK_IMPORTED_MODULE_7__["default"], {
      isMobile: burgerMenuOpen
    }));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "oct-burger-menu-content"
  }, currentLevel === 0 && renderBasedOnLevel(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "oct-burger-content level-header"
  }, currentLevel === 1 && renderBasedOnLevel(), currentLevel === 2 && renderBasedOnLevel()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "oct-burger-content ".concat(scrollBar),
    onScroll: scrollAction
  }, currentLevel === 0 && renderLinkElementsBasedOnLevel(), currentLevel === 1 && renderLinkElementsBasedOnLevel(), currentLevel === 2 && renderLinkElementsBasedOnLevel(), currentLevel === 0 && renderUserMenu()));
};

BurgerContent.propTypes = {
  burgerMenuOpen: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),
  propLevel: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number),
  propSelectedLvl0Index: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number),
  globalNavLinks: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().array),
  activeTab: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object),
  setActiveTab: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BurgerContent);

/***/ }),

/***/ 3577:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ BurgerMenuItem_BurgerMenuItem)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(4184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/@boots/core-ui/src/index.js + 91 modules
var src = __webpack_require__(939);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
;// CONCATENATED MODULE: ./src/client/helpers/icons/24px_icons/mobile_lvl1_chevron/chevron-right.svg
const chevron_right_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Im03IDIgMTAgMTBMNyAyMiIgc3Ryb2tlPSIjMDUwNTRCIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+Cg==";
;// CONCATENATED MODULE: ./src/client/helpers/icons/24px_icons/mobile_lvl1_chevron/chevron-left.svg
const chevron_left_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Im0xNC41IDEtOSA5IDkgOSIgc3Ryb2tlPSIjMzMzIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+Cg==";
;// CONCATENATED MODULE: ./src/client/components/BurgerMenuItem/styles.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const styles = ({});
;// CONCATENATED MODULE: ./src/client/components/BurgerMenuItem/BurgerMenuItem.jsx








var BurgerMenuItem = function BurgerMenuItem(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      elements = _ref.elements,
      title = _ref.title,
      backLink = _ref.backLink,
      isMenuTitle = _ref.isMenuTitle,
      isSecondaryLevel = _ref.isSecondaryLevel,
      taxonomyEnd = _ref.taxonomyEnd,
      goTo = _ref.goTo,
      analytics = _ref.analytics,
      expanded = _ref.expanded;
  return /*#__PURE__*/react.createElement("div", {
    role: "button",
    onKeyDown: function onKeyDown() {},
    className: classnames_default()(className, "oct-burger-menu-item", {
      "menu-title-container": isMenuTitle
    }),
    tabIndex: 0
  }, backLink && /*#__PURE__*/react.createElement("div", {
    className: "oct-icon-container",
    role: "button",
    "aria-label": "Back",
    onKeyDown: function onKeyDown() {},
    onClick: function onClick() {
      backLink();
    },
    tabIndex: 0
  }, /*#__PURE__*/react.createElement(src/* Icon */.JO, {
    icon: chevron_left_namespaceObject,
    height: "20",
    width: "20",
    className: "oct-mobile-left-icon"
  })), goTo ? /*#__PURE__*/react.createElement(src/* CallToAction */.Jd, {
    format: "textOnly",
    className: classnames_default()("oct-burger-menu-item__title", {
      "menu-title": isMenuTitle,
      "secondary-level": isSecondaryLevel,
      "taxonomy-end": taxonomyEnd
    }),
    to: goTo,
    "data-menu-taxonomy": analytics
  }, title) : /*#__PURE__*/react.createElement(src/* CallToAction */.Jd, {
    format: "textOnly",
    as: "button",
    className: classnames_default()("oct-burger-menu-item__title", {
      "with-elements": !goTo && !isMenuTitle && elements,
      "menu-title": isMenuTitle,
      "secondary-level": isSecondaryLevel,
      "taxonomy-end": taxonomyEnd
    }),
    onClick: !backLink ? onClick : function () {}
  }, title), elements && !expanded && /*#__PURE__*/react.createElement("div", {
    className: "oct-icon-container",
    role: "button",
    onKeyDown: function onKeyDown() {},
    onClick: !backLink ? onClick : function () {},
    tabIndex: 0
  }, /*#__PURE__*/react.createElement(src/* Icon */.JO, {
    icon: chevron_right_namespaceObject,
    height: "20",
    width: "20",
    className: "oct-mobile-icon"
  })));
};

BurgerMenuItem.propTypes = {
  onClick: (prop_types_default()).func,
  title: (prop_types_default()).string,
  elements: (prop_types_default()).array,
  backLink: (prop_types_default()).func,
  isMenuTitle: (prop_types_default()).bool,
  isSecondaryLevel: (prop_types_default()).bool,
  taxonomyEnd: (prop_types_default()).bool,
  goTo: (prop_types_default()).string,
  analytics: (prop_types_default()).string,
  className: (prop_types_default()).string,
  expanded: (prop_types_default()).bool
};
/* harmony default export */ const BurgerMenuItem_BurgerMenuItem = (BurgerMenuItem);

/***/ }),

/***/ 4348:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6505);
/* harmony import */ var _boots_core_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(939);
/* harmony import */ var _boots_core_ui_src_helpers_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1847);
/* harmony import */ var _hooks_useBreakpoint__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4655);
/* harmony import */ var _BurgerContent_BurgerContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(124);
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5231);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7136);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var InactivityModalContainer = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "InactivityModalContainer-InactivityModalContainer";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return Promise.all(/* import() | InactivityModalContainer-InactivityModalContainer */[__webpack_require__.e(324), __webpack_require__.e(508)]).then(__webpack_require__.bind(__webpack_require__, 9086));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(9086);
    }

    return eval('require.resolve')("../InactivityModalContainer/InactivityModalContainer");
  }
});
var Logo = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "Logo-Logo";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return __webpack_require__.e(/* import() | Logo-Logo */ 300).then(__webpack_require__.bind(__webpack_require__, 7231));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(7231);
    }

    return eval('require.resolve')("../Logo/Logo");
  }
});
var UtilityLinks = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "UtilityLinks-UtilityLinks";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 4765));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(4765);
    }

    return eval('require.resolve')("../UtilityLinks/UtilityLinks");
  }
});
var SearchBar = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "SearchBar-SearchBar";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return __webpack_require__.e(/* import() | SearchBar-SearchBar */ 502).then(__webpack_require__.bind(__webpack_require__, 9315));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(9315);
    }

    return eval('require.resolve')("../SearchBar/SearchBar");
  }
});
var UserMenu = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "UserMenu-UserMenu";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return Promise.all(/* import() | UserMenu-UserMenu */[__webpack_require__.e(324), __webpack_require__.e(906), __webpack_require__.e(934), __webpack_require__.e(6)]).then(__webpack_require__.bind(__webpack_require__, 3784));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(3784);
    }

    return eval('require.resolve')("../UserMenu/UserMenu");
  }
});
var GlobalNav = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "GlobalNav-GlobalNav";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return __webpack_require__.e(/* import() | GlobalNav-GlobalNav */ 457).then(__webpack_require__.bind(__webpack_require__, 7375));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(7375);
    }

    return eval('require.resolve')("../GlobalNav/GlobalNav");
  }
});
var BurgerMenu = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "BurgerMenu-BurgerMenu";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return __webpack_require__.e(/* import() | BurgerMenu-BurgerMenu */ 436).then(__webpack_require__.bind(__webpack_require__, 4351));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(4351);
    }

    return eval('require.resolve')("../BurgerMenu/BurgerMenu");
  }
});
var SkipToContent = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "SkipToContent-SkipToContent";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return __webpack_require__.e(/* import() | SkipToContent-SkipToContent */ 713).then(__webpack_require__.bind(__webpack_require__, 2382));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(2382);
    }

    return eval('require.resolve')("../SkipToContent/SkipToContent");
  }
});
var BurgerMenuModal = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "BurgerMenuModal-BurgerMenuModal";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return Promise.all(/* import() | BurgerMenuModal-BurgerMenuModal */[__webpack_require__.e(324), __webpack_require__.e(544)]).then(__webpack_require__.bind(__webpack_require__, 2677));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(2677);
    }

    return eval('require.resolve')("../BurgerMenuModal/BurgerMenuModal");
  }
});
var Tabs = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "Tabs-Tabs";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 2227));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(2227);
    }

    return eval('require.resolve')("../Tabs/Tabs");
  }
});

var Header = function Header() {
  var _activeTab$elements, _activeTab$elements$l, _activeTab$elements2, _activeTab$elements2$;

  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_AppContext__WEBPACK_IMPORTED_MODULE_6__/* .AppContext */ .I),
      globalNavLinks = _useContext.globalNavLinks;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(globalNavLinks.length ? globalNavLinks[0] : []),
      _useState2 = _slicedToArray(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      burgerMenuOpen = _useState4[0],
      setBurgerMenuOpen = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showSearch = _useState6[0],
      setShowSearch = _useState6[1];

  var searchInputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var mediumLarge = "medium-large";
  var breakpoint = (0,_hooks_useBreakpoint__WEBPACK_IMPORTED_MODULE_4__/* .useBreakpoint */ .G)();
  var isMobileBreakpoint = [_boots_core_ui_src_helpers_constants__WEBPACK_IMPORTED_MODULE_3__/* .BREAKPOINTS.SMALL */ .j.SMALL, _boots_core_ui_src_helpers_constants__WEBPACK_IMPORTED_MODULE_3__/* .BREAKPOINTS.MEDIUM_SMALL */ .j.MEDIUM_SMALL, _boots_core_ui_src_helpers_constants__WEBPACK_IMPORTED_MODULE_3__/* .BREAKPOINTS.MEDIUM */ .j.MEDIUM].indexOf(breakpoint) > -1;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!isMobileBreakpoint && burgerMenuOpen) {
      setBurgerMenuOpen(false);
    }
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("header", {
    className: "oct-header",
    "aria-label": "Boots",
    role: "banner"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_2__/* .Grid */ .rj, {
    className: "oct-header__grid"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SkipToContent, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "oct-header__utility-links-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_2__/* .Grid.Row */ .rj.Row, {
    className: "oct-header__utility-links"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_2__/* .Grid.Cell */ .rj.Cell, {
    className: "oct-header__utility-links-cell",
    only: ["".concat(mediumLarge), "large"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(UtilityLinks, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(InactivityModalContainer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "oct-header__middle-container-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_2__/* .Grid.Row */ .rj.Row, {
    className: "oct-header__middle-container"
  }, isMobileBreakpoint &&
  /*#__PURE__*/
  // Grid.Cell uses css (display: none) in order to hide the content via only prop, adding a conditional render to help with perf
  react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_2__/* .Grid.Cell */ .rj.Cell, {
    className: "oct-header__middle-container-cell",
    only: ["small", "medium-small", "medium"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(BurgerMenu, {
    onClick: function onClick() {
      setBurgerMenuOpen(function (currentState) {
        return !currentState;
      });
      setShowSearch(false);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(BurgerMenuModal, {
    isOpen: burgerMenuOpen,
    onClose: function onClose() {
      setBurgerMenuOpen(function (currentState) {
        return !currentState;
      });
    },
    onSearch: function onSearch() {
      setShowSearch(function (currentState) {
        return !currentState;
      });
      searchInputRef.current.focus();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BurgerContent_BurgerContent__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
    burgerMenuOpen: true,
    globalNavLinks: globalNavLinks,
    activeTab: activeTab,
    setActiveTab: setActiveTab
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_2__/* .Grid.Cell */ .rj.Cell, {
    className: "oct-header__middle-container-cell"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Logo, null)), !isMobileBreakpoint && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_2__/* .Grid.Cell */ .rj.Cell, {
    className: "oct-header__tabs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tabs, {
    tabs: globalNavLinks,
    activeTab: setActiveTab,
    active: activeTab
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_2__/* .Grid.Cell */ .rj.Cell, {
    className: "oct-header__middle-container-cell oct-header__search-cell oct-header__middle-container-cell--grow"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "hidden",
    id: "AlgoliaSearchInput"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SearchBar, {
    showSearchInput: showSearch,
    setShowSearchInput: setShowSearch,
    searchInputRef: searchInputRef
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_2__/* .Grid.Cell */ .rj.Cell, {
    className: "oct-header__middle-container-cell oct-header__user-menu-cell"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(UserMenu, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_2__/* .Grid.Row */ .rj.Row, {
    className: "oct-header__global-nav",
    role: "navigation",
    "aria-label": "".concat(activeTab === null || activeTab === void 0 ? void 0 : (_activeTab$elements = activeTab.elements) === null || _activeTab$elements === void 0 ? void 0 : (_activeTab$elements$l = _activeTab$elements.level0Title) === null || _activeTab$elements$l === void 0 ? void 0 : _activeTab$elements$l.value, " categories")
  }, !isMobileBreakpoint && activeTab && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(GlobalNav, {
    levelOneData: activeTab === null || activeTab === void 0 ? void 0 : (_activeTab$elements2 = activeTab.elements) === null || _activeTab$elements2 === void 0 ? void 0 : (_activeTab$elements2$ = _activeTab$elements2.globalNavLinks) === null || _activeTab$elements2$ === void 0 ? void 0 : _activeTab$elements2$.value
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ 7015:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ MyAccountPopup_AdvantageCardPopupLinks)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/@boots/core-ui/src/index.js + 91 modules
var src = __webpack_require__(939);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./src/client/components/MyAccountPopup/styles.scss
var styles = __webpack_require__(5438);
// EXTERNAL MODULE: ./src/client/utils/constants.js
var constants = __webpack_require__(6599);
// EXTERNAL MODULE: ./src/client/AppContext.js
var AppContext = __webpack_require__(5231);
;// CONCATENATED MODULE: ./src/client/utils/getUrlWithWCSParams.js


var getUrlWithWCSParams = function getUrlWithWCSParams(currentUrl, region, publicPath) {
  var storeId = region === "roi" ? constants/* WCS_STORE_ID.ROI */._v.ROI : constants/* WCS_STORE_ID.UK */._v.UK;
  var catalogId = region === "roi" ? constants/* WCS_CATALOG_ID.ROI */.Y8.ROI : constants/* WCS_CATALOG_ID.UK */.Y8.UK;

  try {
    var url = new URL(currentUrl);
    var currentSearchParams = url.searchParams;
    currentSearchParams.set("catalogId", catalogId);
    currentSearchParams.set("storeId", storeId);
    url.search = currentSearchParams.toString();
    return "".concat(publicPath).concat(url.pathname).concat(url.search);
  } catch (error) {
    return currentUrl;
  }
};

/* harmony default export */ const utils_getUrlWithWCSParams = (getUrlWithWCSParams);
;// CONCATENATED MODULE: ./src/client/components/MyAccountPopup/AdvantageCardPopupLinks.jsx








var AdvantageCardPopupLinks = function AdvantageCardPopupLinks(_ref) {
  var offers = _ref.offers,
      onBlur = _ref.onBlur;

  var _useContext = (0,react.useContext)(AppContext/* AppContext */.I),
      publicPath = _useContext.publicPath,
      region = _useContext.region;

  var offerOneOrMore = offers !== "1" ? "offers" : "offer";
  var offersAriaLabelText = offers ? "Offers just for me. ".concat(offers, " ").concat(offerOneOrMore, " for you") : "Offers just for me.";
  return /*#__PURE__*/react.createElement("ul", {
    className: "my-account__popup-links advantage-card"
  }, /*#__PURE__*/react.createElement("li", null, /*#__PURE__*/react.createElement(src/* Link */.rU, {
    to: utils_getUrlWithWCSParams(constants/* ADVANTAGE_CARD_VIEW */.kd, region, publicPath),
    "data-header-label": "true",
    role: "link"
  }, "View my Advantage Card")), /*#__PURE__*/react.createElement("li", null, /*#__PURE__*/react.createElement(src/* Link */.rU, {
    to: utils_getUrlWithWCSParams(constants/* ADVANTAGE_CARD_OFFERS */.ge, region, publicPath),
    "data-header-label": "true",
    className: "with-notification",
    "aria-label": offersAriaLabelText,
    role: "link"
  }, "Offers just for me", offers && /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(src/* Text */.xv, {
    as: "p",
    size: "small"
  }, offers)))), /*#__PURE__*/react.createElement("li", null, /*#__PURE__*/react.createElement(src/* Link */.rU, {
    to: utils_getUrlWithWCSParams(constants/* ADVANTAGE_CARD_TOP_PICKS */.MK, region, publicPath),
    "data-header-label": "true",
    onBlur: onBlur,
    role: "link"
  }, "Top picks")));
};

AdvantageCardPopupLinks.propTypes = {
  offers: (prop_types_default()).string,
  onBlur: (prop_types_default()).func
};
/* harmony default export */ const MyAccountPopup_AdvantageCardPopupLinks = (AdvantageCardPopupLinks);

/***/ }),

/***/ 7567:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var _boots_core_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(939);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6599);
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5231);
/* harmony import */ var _utils_getLoginLogoutUrlBasedOnFlag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2641);







var MyAccountPopupLinks = function MyAccountPopupLinks(_ref) {
  var onBlur = _ref.onBlur;

  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_AppContext__WEBPACK_IMPORTED_MODULE_3__/* .AppContext */ .I),
      MFA_ENABLED = _useContext.MFA_ENABLED,
      publicPath = _useContext.publicPath,
      region = _useContext.region;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
    className: "my-account__popup-links"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_1__/* .Link */ .rU, {
    to: _utils_constants__WEBPACK_IMPORTED_MODULE_2__/* .MY_ACCOUNT_VIEW */ .Pv,
    "data-header-label": "true",
    role: "link"
  }, "View my account")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_1__/* .Link */ .rU, {
    to: _utils_constants__WEBPACK_IMPORTED_MODULE_2__/* .MY_ACCOUNT_ORDER_HISTORY */ .NL,
    "data-header-label": "true",
    role: "link"
  }, "Order history")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_1__/* .Link */ .rU, {
    to: _utils_constants__WEBPACK_IMPORTED_MODULE_2__/* .MY_ACCOUNT_FAVOURITES */ .B5,
    "data-header-label": "true",
    role: "link"
  }, "Favourites")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_boots_core_ui__WEBPACK_IMPORTED_MODULE_1__/* .Link */ .rU, {
    to: (0,_utils_getLoginLogoutUrlBasedOnFlag__WEBPACK_IMPORTED_MODULE_4__/* .getLogoutUrl */ .Ky)(publicPath, region, MFA_ENABLED),
    "data-header-label": "true",
    onBlur: onBlur,
    role: "link"
  }, "Log out")));
};

MyAccountPopupLinks.propTypes = {
  onBlur: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyAccountPopupLinks);

/***/ }),

/***/ 2227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Tabs_Tabs)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(4184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/@boots/core-ui/src/index.js + 91 modules
var src = __webpack_require__(939);
;// CONCATENATED MODULE: ./src/client/components/Tabs/TabItem/styles.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const styles = ({"small":"575px","medium-small":"767px","medium":"991px","medium-large":"1280px","large":"1440px"});
;// CONCATENATED MODULE: ./src/client/components/Tabs/TabItem/TabItem.jsx






var TabItem = function TabItem(_ref) {
  var _tab$elements, _tab$elements$level0T, _tab$elements2, _tab$elements2$level, _tab$elements3, _tab$elements3$level;

  var isMobile = _ref.isMobile,
      active = _ref.active,
      onToggle = _ref.onToggle,
      tab = _ref.tab,
      animationEnabled = _ref.animationEnabled,
      index = _ref.index;
  var setWidthTab = index === 0 ? "shop" : "pharmacy";
  var mainClass = isMobile ? "oct-tabs oct-tab-container-mobile" : "oct-tabs oct-tab-container";
  var activeTab = (active === null || active === void 0 ? void 0 : active.title) === (tab === null || tab === void 0 ? void 0 : tab.title);
  return /*#__PURE__*/react.createElement("div", {
    className: mainClass
  }, /*#__PURE__*/react.createElement(src/* CallToAction */.Jd, {
    as: "button",
    format: "textOnly",
    "aria-label": tab === null || tab === void 0 ? void 0 : (_tab$elements = tab.elements) === null || _tab$elements === void 0 ? void 0 : (_tab$elements$level0T = _tab$elements.level0Title) === null || _tab$elements$level0T === void 0 ? void 0 : _tab$elements$level0T.value,
    "aria-selected": activeTab,
    role: "tab",
    onClick: function onClick() {
      onToggle(tab);
    },
    className: classnames_default()("".concat(mainClass, "__button ").concat(setWidthTab), {
      active: activeTab,
      "with-hover": !activeTab,
      leftAnimation: isMobile && index === 1,
      rightAnimation: animationEnabled && index === 0
    }),
    "data-menu-taxonomy": tab === null || tab === void 0 ? void 0 : (_tab$elements2 = tab.elements) === null || _tab$elements2 === void 0 ? void 0 : (_tab$elements2$level = _tab$elements2.level0Title) === null || _tab$elements2$level === void 0 ? void 0 : _tab$elements2$level.analytics
  }, tab === null || tab === void 0 ? void 0 : (_tab$elements3 = tab.elements) === null || _tab$elements3 === void 0 ? void 0 : (_tab$elements3$level = _tab$elements3.level0Title) === null || _tab$elements3$level === void 0 ? void 0 : _tab$elements3$level.value));
};

TabItem.propTypes = {
  isMobile: (prop_types_default()).bool,
  active: (prop_types_default()).string,
  tab: (prop_types_default()).string,
  onToggle: (prop_types_default()).func,
  animationEnabled: (prop_types_default()).bool,
  index: (prop_types_default()).number
};
/* harmony default export */ const TabItem_TabItem = (TabItem);
;// CONCATENATED MODULE: ./src/client/components/Tabs/styles.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Tabs_styles = ({"small":"575px","medium-small":"767px","medium":"991px","medium-large":"1280px","large":"1440px"});
;// CONCATENATED MODULE: ./src/client/components/Tabs/Tabs.jsx





var Tabs = function Tabs(_ref) {
  var isMobile = _ref.isMobile,
      tabs = _ref.tabs,
      activeTab = _ref.activeTab,
      active = _ref.active,
      animationEnabled = _ref.animationEnabled;

  var handleToggle = function handleToggle(tab) {
    activeTab(tab);
  };

  var mainClass = isMobile ? "oct-tabs-container-mobile" : "oct-tabs-container";
  return /*#__PURE__*/react.createElement("div", {
    className: mainClass,
    role: "tablist",
    "aria-label": "Boots Categories"
  }, tabs.map(function (tab, index) {
    return /*#__PURE__*/react.createElement(TabItem_TabItem, {
      isMobile: isMobile,
      key: tab === null || tab === void 0 ? void 0 : tab.title,
      tab: tab,
      onToggle: handleToggle,
      active: active,
      animationEnabled: animationEnabled,
      index: index
    });
  }), /*#__PURE__*/react.createElement("div", {
    className: "".concat(mainClass, "__separator")
  }));
};

Tabs.propTypes = {
  isMobile: (prop_types_default()).bool,
  tabs: (prop_types_default()).array,
  activeTab: (prop_types_default()).func,
  active: (prop_types_default()).string,
  animationEnabled: (prop_types_default()).bool
};
/* harmony default export */ const Tabs_Tabs = (Tabs);

/***/ }),

/***/ 4765:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ UtilityLinks_UtilityLinks)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/@boots/core-ui/src/index.js + 91 modules
var src = __webpack_require__(939);
// EXTERNAL MODULE: ./node_modules/@boots/core-ui/src/components/Synthetix/Synthetix.jsx
var Synthetix = __webpack_require__(5007);
;// CONCATENATED MODULE: ./src/client/components/UtilityLinks/styles.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const styles = ({});
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./src/client/AppContext.js
var AppContext = __webpack_require__(5231);
;// CONCATENATED MODULE: ./src/client/components/UtilityLinks/UtilityLinks.jsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // eslint-disable-next-line node/file-extension-in-import






var UtilityLinks = function UtilityLinks(_ref) {
  var isMobile = _ref.isMobile;

  var _useContext = (0,react.useContext)(AppContext/* AppContext */.I),
      links = _useContext.links;

  var mainClass = isMobile ? "oct-utility-links-mobile" : "oct-utility-links";
  var iconSize = isMobile ? {
    height: "24px",
    width: "24px"
  } : {
    height: "16px",
    width: "16px"
  };
  var textSize = isMobile ? "m" : "xs";

  var setLinkTarget = function setLinkTarget(target) {
    return target === "newTab" ? "_blank" : "_self";
  };

  return /*#__PURE__*/react.createElement("div", {
    className: mainClass
  }, links.length > 0 && links.map(function (item, index) {
    return item.synthetix ? /*#__PURE__*/react.createElement(src/* Text */.xv, {
      key: "".concat(item.title, "-").concat(index),
      as: "span",
      size: textSize,
      "aria-label": item.ariaLabel
    }, /*#__PURE__*/react.createElement(Synthetix/* default */.Z, {
      displayText: item.title,
      synTrigger: item.link,
      klassName: "".concat(mainClass, "__item"),
      iconProps: _objectSpread({
        name: item.icon,
        className: "".concat(mainClass, "__icon")
      }, iconSize),
      theme: item.icon !== "none" && "utility",
      analytics: {
        "data-header-label": "true"
      }
    })) : /*#__PURE__*/react.createElement(src/* Link */.rU, {
      key: "".concat(item.title, "-").concat(index),
      to: item.link,
      "data-header-label": "true",
      "aria-label": item.ariaLabel,
      className: "".concat(mainClass, "__item"),
      target: setLinkTarget(item.linkOpenOptions),
      iconProps: _objectSpread({
        name: item.icon,
        className: "".concat(mainClass, "__icon")
      }, iconSize),
      theme: item.icon !== "none" && "utility"
    }, /*#__PURE__*/react.createElement(src/* Text */.xv, {
      as: "span",
      size: textSize
    }, item.title));
  }));
};

UtilityLinks.propTypes = {
  isMobile: (prop_types_default()).bool
};
/* harmony default export */ const UtilityLinks_UtilityLinks = (UtilityLinks);

/***/ }),

/***/ 4655:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ useBreakpoint)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3279);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _boots_core_ui_src_styles_breakpoints_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5712);
/* harmony import */ var _boots_core_ui_src_helpers_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1847);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6599);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable node/no-missing-import, css-modules/no-undef-class */






var getWidth = function getWidth(width) {
  return parseInt(width, 10);
};

var breakpoints = [{
  name: _boots_core_ui_src_helpers_constants__WEBPACK_IMPORTED_MODULE_3__/* .BREAKPOINTS.LARGE */ .j.LARGE,
  width: getWidth(_boots_core_ui_src_styles_breakpoints_scss__WEBPACK_IMPORTED_MODULE_2__/* ["default"]["medium-large"] */ .Z["medium-large"])
}, _utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .LARGE_CUSTOM_BREAKPOINT */ .kc, {
  name: _boots_core_ui_src_helpers_constants__WEBPACK_IMPORTED_MODULE_3__/* .BREAKPOINTS.MEDIUM_LARGE */ .j.MEDIUM_LARGE,
  width: getWidth(_boots_core_ui_src_styles_breakpoints_scss__WEBPACK_IMPORTED_MODULE_2__/* ["default"].medium */ .Z.medium)
}, {
  name: _boots_core_ui_src_helpers_constants__WEBPACK_IMPORTED_MODULE_3__/* .BREAKPOINTS.MEDIUM */ .j.MEDIUM,
  width: getWidth(_boots_core_ui_src_styles_breakpoints_scss__WEBPACK_IMPORTED_MODULE_2__/* ["default"]["medium-small"] */ .Z["medium-small"])
}, {
  name: _boots_core_ui_src_helpers_constants__WEBPACK_IMPORTED_MODULE_3__/* .BREAKPOINTS.MEDIUM_SMALL */ .j.MEDIUM_SMALL,
  width: getWidth(_boots_core_ui_src_styles_breakpoints_scss__WEBPACK_IMPORTED_MODULE_2__/* ["default"].small */ .Z.small)
}, {
  name: _boots_core_ui_src_helpers_constants__WEBPACK_IMPORTED_MODULE_3__/* .BREAKPOINTS.SMALL */ .j.SMALL,
  width: 0
}];
var useBreakpoint = function useBreakpoint() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      breakpoint = _useState2[0],
      setBreakpoint = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(function () {
    var handleResize = lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(function () {
      var newBreakpoint = breakpoints.find(function (b) {
        return window.innerWidth > b.width;
      }).name;

      if (newBreakpoint !== breakpoint) {
        setBreakpoint(newBreakpoint);
      }
    }, 100);
    window.addEventListener("resize", handleResize);
    handleResize();
    return function () {
      return window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);
  return breakpoint;
};

/***/ }),

/***/ 371:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);


var usePrevious = function usePrevious(value) {
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (usePrevious);

/***/ }),

/***/ 6599:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B5": () => (/* binding */ MY_ACCOUNT_FAVOURITES),
/* harmony export */   "Ej": () => (/* binding */ INACTIVITY_MODAL),
/* harmony export */   "Ex": () => (/* binding */ SKIP_TO_CONTENT),
/* harmony export */   "FS": () => (/* binding */ INSTAGRAM_ROI_URL),
/* harmony export */   "Hc": () => (/* binding */ PINTEREST_URL),
/* harmony export */   "Hg": () => (/* binding */ MATCHING_PRODUCTS),
/* harmony export */   "IG": () => (/* binding */ INSTAGRAM_UK_URL),
/* harmony export */   "MK": () => (/* binding */ ADVANTAGE_CARD_TOP_PICKS),
/* harmony export */   "N$": () => (/* binding */ TWITTER_URL),
/* harmony export */   "NL": () => (/* binding */ MY_ACCOUNT_ORDER_HISTORY),
/* harmony export */   "Pv": () => (/* binding */ MY_ACCOUNT_VIEW),
/* harmony export */   "RX": () => (/* binding */ MY_ACCOUNT),
/* harmony export */   "Sk": () => (/* binding */ ADVANTAGE_CARD),
/* harmony export */   "Uo": () => (/* binding */ ADVANTAGE_CARD_HOME_VIEW),
/* harmony export */   "Y8": () => (/* binding */ WCS_CATALOG_ID),
/* harmony export */   "_v": () => (/* binding */ WCS_STORE_ID),
/* harmony export */   "b0": () => (/* binding */ FACEBOOK_UK_URL),
/* harmony export */   "dl": () => (/* binding */ CLOSE_SEARCH_MODAL),
/* harmony export */   "eT": () => (/* binding */ ADVANTAGE_CARD_NON_LOYALITY_VIEW),
/* harmony export */   "eZ": () => (/* binding */ SUGGESTED_KEYWORDS),
/* harmony export */   "em": () => (/* binding */ FACEBOOK_ROI_URL),
/* harmony export */   "f1": () => (/* binding */ INACTIVITY),
/* harmony export */   "gU": () => (/* binding */ WORTH_OF_POINTS),
/* harmony export */   "ge": () => (/* binding */ ADVANTAGE_CARD_OFFERS),
/* harmony export */   "h8": () => (/* binding */ TIKTOK_URL),
/* harmony export */   "kL": () => (/* binding */ SEARCH_PLACEHOLDER),
/* harmony export */   "kc": () => (/* binding */ LARGE_CUSTOM_BREAKPOINT),
/* harmony export */   "kd": () => (/* binding */ ADVANTAGE_CARD_VIEW),
/* harmony export */   "l0": () => (/* binding */ COOKIE),
/* harmony export */   "nc": () => (/* binding */ YOUTUBE_ROI_URL),
/* harmony export */   "qd": () => (/* binding */ HELLO),
/* harmony export */   "sG": () => (/* binding */ GLOBAL_NAV_MORE_ITEM),
/* harmony export */   "sk": () => (/* binding */ LOGO_SRC),
/* harmony export */   "tu": () => (/* binding */ YOUTUBE_UK_URL),
/* harmony export */   "vA": () => (/* binding */ SEARCH_URL),
/* harmony export */   "yG": () => (/* binding */ LOGIN_REGISTER),
/* harmony export */   "zy": () => (/* binding */ VIEW_ALL_PRODUCTS)
/* harmony export */ });
/* unused harmony exports FIND_STORE, HELP, TABS, CATEGORY_MOCKS */
// Utility links
var FIND_STORE = "Find a store";
var HELP = "Help"; // Login / register

var HELLO = "Hello";
var WCS_STORE_ID = {
  UK: "11352",
  ROI: "11353"
};
var WCS_CATALOG_ID = {
  UK: "28501",
  ROI: "28502"
};
var LOGIN_REGISTER = "Log in / register"; // Advantage card

var ADVANTAGE_CARD = "Advantage Card";
var MY_ACCOUNT = "My Account";
var WORTH_OF_POINTS = "worth of points"; // Logo

var LOGO_SRC = "/"; // Search bar + Searchbar Modal

var SEARCH_PLACEHOLDER = "Search products, brands and services…";
var MATCHING_PRODUCTS = "Matching Products";
var CLOSE_SEARCH_MODAL = "Close";
var SUGGESTED_KEYWORDS = "Suggested Keywords";
var VIEW_ALL_PRODUCTS = "VIEW ALL PRODUCTS";
var SEARCH_URL = "/sitesearch?searchTerm={query}"; // Skip to content

var SKIP_TO_CONTENT = "Skip to content"; // Footer Social Media

var FACEBOOK_UK_URL = "https://www.facebook.com/BootsUK/";
var FACEBOOK_ROI_URL = "https://www.facebook.com/BootsIrelandOfficial";
var INSTAGRAM_UK_URL = "https://www.instagram.com/bootsuk/";
var INSTAGRAM_ROI_URL = "https://www.instagram.com/boots.ireland/";
var YOUTUBE_UK_URL = "https://www.youtube.com/user/boots";
var YOUTUBE_ROI_URL = "https://www.youtube.com/c/BootsIrelandOfficial";
var TWITTER_URL = "https://twitter.com/bootsuk";
var PINTEREST_URL = "https://www.pinterest.co.uk/bootsofficial/";
var TIKTOK_URL = "https://www.tiktok.com/@bootsuk"; // Tabs

var TABS = [{
  title: "SHOP"
}, {
  title: "PHARMACY"
}];
var CATEGORY_MOCKS = [{
  title: "Shop link #1",
  elements: []
}, {
  title: "Shop link #1"
}, {
  title: "Shop link #2 with a longer name and chevron right icon displayed but with cropped text",
  elements: []
}, {
  title: "Shop link #2 with a longer name and without chevron right icon displayed but with cropped text"
}, {
  title: "Shop link #3 #@% special characters@"
}]; // Custom Large breakpoint

var LARGE_CUSTOM_BREAKPOINT = {
  name: "large-custom",
  width: 1239
};
var GLOBAL_NAV_MORE_ITEM = {
  title: "More...",
  elements: []
}; // Cookie for Algolia Analytics

var COOKIE = {
  name: "x-search-usertoken",
  expTime: 30
}; // My Account Links

var MY_ACCOUNT_VIEW = "/AjaxLogonForm?myAcctMain=1";
var MY_ACCOUNT_ORDER_HISTORY = "/TrackOrderStatus";
var MY_ACCOUNT_FAVOURITES = "/WishListDisplayView"; // Inactivity Modal

var INACTIVITY_MODAL = {
  COPY: "Your session is about to timeout due to inactivity. Extend your session for an additional 20 minutes or your session will expire.",
  EXTEND_SESSION: "EXTEND SESSION",
  TITLE: "Session timeout"
};
var INACTIVITY = {
  USER_TIME: 1170000,
  MODAL_TIME: 30000
}; // ADVANTAGE CARD Links

var ADVANTAGE_CARD_HOME_VIEW = "/MyAdvantageCardHomeView";
var ADVANTAGE_CARD_NON_LOYALITY_VIEW = "/advantage-card";
var ADVANTAGE_CARD_VIEW = "https://www.boots.com/MyAdvantageCardHomeView?catalogId=0&storeId=0&langId=-1";
var ADVANTAGE_CARD_OFFERS = "https://www.boots.com/DigitalOffersCmd?catalogId=0&action=justForMe&storeId=0&langId=-1";
var ADVANTAGE_CARD_TOP_PICKS = "https://www.boots.com/DigitalOffersCmd?catalogId=0&action=bestAtBoots&storeId=0&langId=-1";

/***/ }),

/***/ 2641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ky": () => (/* binding */ getLogoutUrl),
/* harmony export */   "Zd": () => (/* binding */ getLoginUrl)
/* harmony export */ });
/* unused harmony export getStoreAndCatalogID */
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6599);

var getStoreAndCatalogID = function getStoreAndCatalogID(region) {
  return {
    storeId: region === "roi" ? _constants__WEBPACK_IMPORTED_MODULE_0__/* .WCS_STORE_ID.ROI */ ._v.ROI : _constants__WEBPACK_IMPORTED_MODULE_0__/* .WCS_STORE_ID.UK */ ._v.UK,
    catalogId: region === "roi" ? _constants__WEBPACK_IMPORTED_MODULE_0__/* .WCS_CATALOG_ID.ROI */ .Y8.ROI : _constants__WEBPACK_IMPORTED_MODULE_0__/* .WCS_CATALOG_ID.UK */ .Y8.UK
  };
};
var getLoginUrl = function getLoginUrl(publicPath, region, flag) {
  var _getStoreAndCatalogID = getStoreAndCatalogID(region),
      storeId = _getStoreAndCatalogID.storeId,
      catalogId = _getStoreAndCatalogID.catalogId;

  var params = {
    flagEnabled: {
      scope: "default",
      extendedScope: "headerJourney",
      success_uri: "".concat(publicPath, "/AjaxLogonForm?myAcctMain=1&storeId=").concat(storeId, "&catalogId=").concat(catalogId, "&langId=-1&cm_reg_set=true"),
      back_uri: publicPath,
      storeId: storeId
    },
    flagDisabled: "/LogonForm?myAcctMain=1&catalogId=".concat(catalogId, "&langId=-1&storeId=").concat(storeId)
  };
  var urlBasedOnFlag = flag ? "/retail/session/login?".concat(new URLSearchParams(params.flagEnabled).toString()) : params.flagDisabled;
  return urlBasedOnFlag;
};
var getLogoutUrl = function getLogoutUrl(publicPath, region, flag) {
  var _getStoreAndCatalogID2 = getStoreAndCatalogID(region),
      storeId = _getStoreAndCatalogID2.storeId,
      catalogId = _getStoreAndCatalogID2.catalogId;

  var logoutUrlFlagDisabled = "".concat(publicPath, "/Logoff?myAcctMain=1&catalogId=").concat(catalogId, "&deleteCartCookie=true&inactivityLogOffFlag=false&langId=-1&storeId=").concat(storeId);
  return flag ? "/retail/session/logout" : "javascript:logoutGigyaFunctions('".concat(logoutUrlFlagDisabled, "')");
};

/***/ }),

/***/ 6876:
/***/ (() => {

// extracted by mini-css-extract-plugin
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({});

/***/ }),

/***/ 7136:
/***/ (() => {

// extracted by mini-css-extract-plugin
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({"small":"575px","medium-small":"767px","medium":"991px","medium-large":"1280px","large":"1440px"});

/***/ }),

/***/ 5438:
/***/ (() => {

// extracted by mini-css-extract-plugin
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({"small":"575px","medium-small":"767px","medium":"991px","medium-large":"1280px","large":"1440px"});

/***/ })

}]);