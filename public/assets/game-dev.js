var Game =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const SHIP_DIR_H = 'h';
/* harmony export (immutable) */ __webpack_exports__["a"] = SHIP_DIR_H;

const SHIP_DIR_V = 'v';
/* harmony export (immutable) */ __webpack_exports__["b"] = SHIP_DIR_V;


const SHIP_STATE_UNKNOWN = 'UNKNOWN';
/* harmony export (immutable) */ __webpack_exports__["c"] = SHIP_STATE_UNKNOWN;

const SHIP_STATE_LIVE = 'LIVE';
/* harmony export (immutable) */ __webpack_exports__["d"] = SHIP_STATE_LIVE;

const SHIP_STATE_DEAD = 'DEAD';
/* harmony export (immutable) */ __webpack_exports__["f"] = SHIP_STATE_DEAD;

const SHIP_STATE_DAMAGED = 'DAMAGED';
/* harmony export (immutable) */ __webpack_exports__["e"] = SHIP_STATE_DAMAGED;


const defaultShipConfig = [
  4, 3, 3, 2, 2, 2, 1, 1, 1, 1
];
/* unused harmony export defaultShipConfig */


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Ship_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__const_js__ = __webpack_require__(0);




class Field {
  constructor (width, height) {
    this.width = width;
    this.height = height;

    this.shipMap = [];
    this.shootMap = [];
    for (let x = 0; x < width; x++) {
      this.shipMap[x] = [];
      this.shootMap[x] = [];
      for (let y = 0; y < height; y++) {
        this.shipMap[x][y] = null;
        this.shootMap[x][y] = null;
      }
    }
    this.ship = [];

    this.ownField = true;
  }

  /**
   * Генерируем размещение кораблей
   *
   * @param shipConfig
   */
  generate(shipConfig) {

    const shipList = shipConfig.slice(0);
    shipList.forEach((shipSize) => {
      let placeTry = 1000;
      const ship = new __WEBPACK_IMPORTED_MODULE_0__Ship_js__["a" /* default */](
        shipSize,
        Math.random() > 0.5?__WEBPACK_IMPORTED_MODULE_1__const_js__["a" /* SHIP_DIR_H */]:__WEBPACK_IMPORTED_MODULE_1__const_js__["b" /* SHIP_DIR_V */]
      );
      if (this.ownField) {
        ship.live();
      }
      let placeSuccess;
      do {
        placeSuccess = true;

        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height);

        const shipPlaces = [];

        for (let s = 0; s < ship.size && placeSuccess; s++) {
          let dx = x;
          let dy = y;
          if (ship.dir == __WEBPACK_IMPORTED_MODULE_1__const_js__["a" /* SHIP_DIR_H */]) {
            dx += s;
          } else {
            dy += s;
          }
          shipPlaces.push({x: dx, y: dy});

          if (dx >= this.width || dy >= this.height || this.shipMap[dx][dy] !== null) {
            placeSuccess = false;
          }
        }
        if (placeSuccess) {
          shipPlaces.forEach((pos) => {
            this.shipMap[pos.x][pos.y] = ship;
            this.markCloseZone(pos.x, pos.y);
          });
          this.ship.push(ship);
        } else {
          placeTry--;
        }
      } while (!placeSuccess && placeTry > 0);

    });
    console.log(this.ship);
  }

  /**
   * Отмечаем зону вокруг указаной клекти как закрытую длфя размещения кораблей
   * @param centerX
   * @param centerY
   */
  markCloseZone(centerX, centerY) {
    for (let sx = -1; sx <=1; sx++) {
      for (let sy = -1; sy <=1; sy++) {
        const dx = centerX + sx;
        const dy = centerY + sy;
        if (dx >= 0 && dx < this.width
          && dy >=0 && dy < this.height
          && this.shipMap[dx][dy] === null
        ) {
          this.shipMap[dx][dy] = '.';
        }
      }
    }
  }

  /**
   * Выполнить функцию для каждой клетки поля
   * @param func (x, y, field)
   */
  doForEachCell(func) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        func(x, y, this);
      }
    }
  }


  /**
   * Проверка наличия корабля в клетке
   *
   * @param x
   * @param y
   */
  hasShip(x, y) {
    return this.shipMap[x][y] !== null && this.shipMap[x][y] instanceof __WEBPACK_IMPORTED_MODULE_0__Ship_js__["a" /* default */];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Field;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CONST = {
  CSS: {
    CELL: 'cell',
    TOP_LEFT_CORN: 'top-left-corn',
    NUMBER_CELL: 'number-cell',
    ALPHA_CELL: 'alpha-cell',
    FIELD_CELL: 'field-cell',
    LEFT_BORDER: 'left-border',
    RIGHT_BORDER: 'right-border',
    TOP_BORDER: 'top-border',
    BOTTOM_BORDER: 'bottom-border',
    OWN_SHIP: 'own-ship'
  },
  ALPHA_LIST: [
    'А', 'Б', 'В', 'Г', 'Д','Е','Ж','З', 'И', 'К', 'Л', 'М', 'Н'
  ]
};


class UIField {
  constructor(field, interective) {
    this.modelField = field;
    this.interective = interective;
  }

  /**
   * Полная отрисовка поля в указанный элемент
   *
   * @param DOMElement
   */
  fullDraw(DOMElement) {
    const el = $(DOMElement);
    const own = this.modelField.ownField;
    el.html('');
    const corn = $(document.createElement('div'));
    corn.addClass(CONST.CSS.CELL);
    corn.addClass(CONST.CSS.TOP_LEFT_CORN);
    el.append(corn);

    for (let x = 0; x < this.modelField.width; x++) {
      const numberCell = $(document.createElement('div'));
      numberCell.addClass(CONST.CSS.CELL);
      numberCell.addClass(CONST.CSS.NUMBER_CELL);
      numberCell.text(x+1);
      el.append(numberCell);
    }

    this.modelField.doForEachCell((x, y, field) => {
      if (x == 0) {
        const alphaCell = $(document.createElement('div'));
        alphaCell.addClass(CONST.CSS.CELL);
        alphaCell.addClass(CONST.CSS.ALPHA_CELL);
        alphaCell.text(CONST.ALPHA_LIST[y]);
        el.append(alphaCell);
      }
      const fieldCell = $(document.createElement('div'));
      fieldCell.addClass(CONST.CSS.CELL);
      fieldCell.addClass(CONST.CSS.FIELD_CELL);
      if (x == 0) {
        fieldCell.addClass(CONST.CSS.LEFT_BORDER);
      }

      if (x == field.width - 1) {
        fieldCell.addClass(CONST.CSS.RIGHT_BORDER);
      }

      if (y == 0) {
        fieldCell.addClass(CONST.CSS.TOP_BORDER);
      }

      if (y == field.height - 1) {
        fieldCell.addClass(CONST.CSS.BOTTOM_BORDER);
      }

      if (own && field.hasShip(x, y)) {
        fieldCell.addClass(CONST.CSS.OWN_SHIP);
      }

      if (this.interective) {
        fieldCell.addClass("interective");
        fieldCell.data('x', x);
        fieldCell.data('y', y);
        fieldCell.on('click', (evt) => {
          this.click(x, y);
        })
      }

      el.append(fieldCell);
    });

  }

  click(x, y) {
    console.log("CLICK", x, y);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIField;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_Field_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_UIField_js__ = __webpack_require__(2);



const field = __WEBPACK_IMPORTED_MODULE_0__model_Field_js__["a" /* default */];
/* harmony export (immutable) */ __webpack_exports__["field"] = field;

const uiField = __WEBPACK_IMPORTED_MODULE_1__ui_UIField_js__["a" /* default */];
/* harmony export (immutable) */ __webpack_exports__["uiField"] = uiField;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__const_js__ = __webpack_require__(0);


/**
 * Класс описания размера, направления и состояния корабля
 */
class Ship {

  constructor(size, dir) {
    this.size = size;
    this.dir = dir;

    this.state = __WEBPACK_IMPORTED_MODULE_0__const_js__["c" /* SHIP_STATE_UNKNOWN */];
  }

  /**
   * Помечаем корабль поврежденным
   */
  damage() {
    if (this.state == __WEBPACK_IMPORTED_MODULE_0__const_js__["d" /* SHIP_STATE_LIVE */]) {
      this.state = __WEBPACK_IMPORTED_MODULE_0__const_js__["e" /* SHIP_STATE_DAMAGED */];
    }
  }

  /**
   * Помечаем корабль убитым
   */
  kill() {
    this.state = __WEBPACK_IMPORTED_MODULE_0__const_js__["f" /* SHIP_STATE_DEAD */]
  }

  /**
   * Пометить корабль как целый (известный)
   */
  live() {
    this.state = __WEBPACK_IMPORTED_MODULE_0__const_js__["d" /* SHIP_STATE_LIVE */];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ship;


/***/ })
/******/ ]);