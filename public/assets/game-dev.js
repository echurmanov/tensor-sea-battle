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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const SHIP_DIR_H = 'h';
/* harmony export (immutable) */ __webpack_exports__["c"] = SHIP_DIR_H;

const SHIP_DIR_V = 'v';
/* harmony export (immutable) */ __webpack_exports__["d"] = SHIP_DIR_V;


const SHIP_STATE_UNKNOWN = 'UNKNOWN';
/* harmony export (immutable) */ __webpack_exports__["f"] = SHIP_STATE_UNKNOWN;

const SHIP_STATE_LIVE = 'LIVE';
/* harmony export (immutable) */ __webpack_exports__["g"] = SHIP_STATE_LIVE;

const SHIP_STATE_DEAD = 'DEAD';
/* harmony export (immutable) */ __webpack_exports__["e"] = SHIP_STATE_DEAD;

const SHIP_STATE_DAMAGED = 'DAMAGED';
/* harmony export (immutable) */ __webpack_exports__["h"] = SHIP_STATE_DAMAGED;


const FIELD_SIZE = 10;
/* harmony export (immutable) */ __webpack_exports__["a"] = FIELD_SIZE;


const defaultShipConfig = [
  4, 3, 3, 2, 2, 2, 1, 1, 1, 1
];
/* harmony export (immutable) */ __webpack_exports__["b"] = defaultShipConfig;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class EventEmitter {
  constructor () {
    this._listeners = {};
  }

  /**
   * Добавление слушателя события
   *
   * @param event
   * @param func
   */
  on(event, func) {
    if (typeof this._listeners[event] === 'undefined') {
      this._listeners[event] = [];
    }
    this._listeners[event].push(func);
  }

  /**
   * Генерируем событие, вызывая обработчиков
   *
   * @param event
   * @param data
   */
  emit(event, data) {
    if (typeof this._listeners[event] !== 'undefined') {
      this._listeners[event].forEach((func) => {
        func.call(this, data);
      });
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventEmitter;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__const_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Field_js__ = __webpack_require__(5);



class GameSession {
  /**
   *
   * @param {{human: bool, name: string, drawElement: {}}} player1
   * @param {{human: bool, name: string, drawElement: {}}} player2
   */
  constructor (player1, player2) {
    this.player1 = player1;
    this.player2 = player2;

    this.field1 = null;
    this.field2 = null;

    this.onePlayer = player1.human ^ player2.human;

    this.currentPlayer = this.player1;
  }


  createFields() {
    this.field1 = new __WEBPACK_IMPORTED_MODULE_1__Field_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__const_js__["a" /* FIELD_SIZE */], __WEBPACK_IMPORTED_MODULE_0__const_js__["a" /* FIELD_SIZE */]);
    if (this.onePlayer && this.player1.human) {
      this.field1.ownField = true;
    }
    this.field1.generate(__WEBPACK_IMPORTED_MODULE_0__const_js__["b" /* defaultShipConfig */]);

    this.field2 = new __WEBPACK_IMPORTED_MODULE_1__Field_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__const_js__["a" /* FIELD_SIZE */], __WEBPACK_IMPORTED_MODULE_0__const_js__["a" /* FIELD_SIZE */]);
    if (this.onePlayer && this.player2.human) {
      this.field2.ownField = true;
    }
    this.field2.generate(__WEBPACK_IMPORTED_MODULE_0__const_js__["b" /* defaultShipConfig */]);
  }

  /**
   * Обработка выстрела по клетки поля.
   *
   * Возвращает false если выстрел не валидный,
   * иначе генерирует изменение поля и возрвщает true
   *
   * @param field
   * @param x
   * @param y
   * @returns {boolean}
   */
  doShoot(field, x, y) {
    if ((this.currentPlayer == this.player2 && field != this.field1)
      || (this.currentPlayer == this.player1 && field != this.field2)
      || !field.validateShoot(x, y)
    ) {
      console.log("can't fire");
      return false;
    }

    const target = field.shoot(x, y);
    if (target) {
      field.emitter.emit('update', field);
    }

    if (target != 'x') {
      if (this.currentPlayer == this.player1) {
        this.currentPlayer = this.player2;
      } else {
        this.currentPlayer = this.player1;
      }
    }
    if (this.currentPlayer.human == false) {
      setTimeout(() => {
        this.doAI();
      }, 500);
    }
    return true;
  }

  /**
   * Делаем ход компьютерным игроком
   */
  doAI() {
    const targetField = this.currentPlayer == this.player1?this.field2:this.field1;
    const tx = Math.floor(Math.random() * targetField.width);
    const ty = Math.floor(Math.random() * targetField.height);

    let len = 0;
    let dir = 0;
    let shift = 0;
    let dx = tx;
    let dy = ty;
    let alertLimit = targetField.width * targetField.height * 100;
    while (!this.doShoot(targetField, dx, dy) && alertLimit > -1) {
      if (dir % 4 == 0) {
        len++;
        dir = 0;
        shift = 0;
      }

      switch (dir) {
        case 0:
          dx = tx + len - shift;
          dy = ty + shift;
          break;
        case 1:
          dx = tx - shift;
          dy = ty + len - shift;
          break;
        case 2:
          dx = tx - len + shift;
          dy = ty + shift;
          break;
        case 3:
          dx = tx + shift;
          dy = ty - len + shift;
          break;
      }

      shift++;
      if (shift > len) {
        shift = 0;
        dir++;
      }

      alertLimit--;
    }
    if (alertLimit < 0) {
      throw new Error("AI can't do shoot");
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameSession;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_EventEmitter_js__ = __webpack_require__(1);
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
    OWN_SHIP: 'own-ship',
    MISS_SHOOT: 'miss-shoot',
    CELL_DEAD_SHIP: 'dead-ship',
    CELL_DAMAGED_SHIP: 'damaged-ship'
  },
  ALPHA_LIST: [
    'А', 'Б', 'В', 'Г', 'Д','Е','Ж','З', 'И', 'К', 'Л', 'М', 'Н'
  ]
};





class UIField {
  constructor(DOMElement, field, interactive) {
    this.modelField = field;
    this.interactive = interactive;

    this.modelField.on('update', (field) => {
      this.draw();
    });

    this.domElement = $(DOMElement);

    this.emitter = new __WEBPACK_IMPORTED_MODULE_0__utils_EventEmitter_js__["a" /* default */]();

    this.cellMap = [];
  }
  on(event, func) {
    this.emitter.on(event, func);
  }



  /**
   * Полная отрисовка поля в указанный элемент
   *
   */
  fullDraw() {
    const el = this.domElement;
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
      numberCell.text(x + 1);
      el.append(numberCell);
    }

    this.modelField.doForEachCell((x, y, field) => {
      if (typeof this.cellMap[x] === 'undefined') {
        this.cellMap[x] = [];
      }
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

      if (this.interactive) {
        fieldCell.addClass("interactive");
        fieldCell.data('x', x);
        fieldCell.data('y', y);
        fieldCell.on('click', (evt) => {
          this.click(x, y);
        })
      }

      if (field.shootMap[x][y] == '.') {
        fieldCell.addClass("miss-shoot");
      }
      this.cellMap[x][y] = fieldCell;
      el.append(fieldCell);
    });
  }

  draw() {
    this.modelField.doForEachCell((x, y, field) => {
      if (field.shootMap[x][y] == '.') {
        this.cellMap[x][y].addClass(CONST.CSS.MISS_SHOOT)
      }
      if (field.shootMap[x][y] == 'x') {
        if (field.shipMap[x][y].state == 'DEAD') {
          this.cellMap[x][y].removeClass(CONST.CSS.CELL_DAMAGED_SHIP)
          this.cellMap[x][y].addClass(CONST.CSS.CELL_DEAD_SHIP)
        } else {
          this.cellMap[x][y].addClass(CONST.CSS.CELL_DAMAGED_SHIP)
        }

      }
    });
  }

  /**
   * Генерируем клик
   *
   * @param x
   * @param y
   */
  click(x, y) {
    this.emitter.emit('click', {uiField: this, x: x, y:y});
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIField;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["run"] = run;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_GameSession_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_UIField_js__ = __webpack_require__(3);



function run(fieldDom1, fieldDom2) {
  const game = new __WEBPACK_IMPORTED_MODULE_0__model_GameSession_js__["a" /* default */](
    {
      human: true,
      name: "Игрок"
    },
    {
      human: false,
      name: "SkyNet"
    }
  );

  game.createFields();

  const uiField = new __WEBPACK_IMPORTED_MODULE_1__ui_UIField_js__["a" /* default */]("#game-zone-1", game.field1, false);
  uiField.fullDraw();
  const uiEnemyField = new __WEBPACK_IMPORTED_MODULE_1__ui_UIField_js__["a" /* default */]("#game-zone-2", game.field2, true);
  uiEnemyField.fullDraw();

  uiEnemyField.on('click', (evt) => {
    game.doShoot(evt.uiField.modelField, evt.x, evt.y);
  });
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Ship_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__const_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_EventEmitter_js__ = __webpack_require__(1);






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

    this.ownField = false;

    this.emitter = new __WEBPACK_IMPORTED_MODULE_2__utils_EventEmitter_js__["a" /* default */]();
  }

  on(event, func) {
    this.emitter.on(event, func);
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
        Math.random() > 0.5?__WEBPACK_IMPORTED_MODULE_1__const_js__["c" /* SHIP_DIR_H */]:__WEBPACK_IMPORTED_MODULE_1__const_js__["d" /* SHIP_DIR_V */]
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
          if (ship.dir == __WEBPACK_IMPORTED_MODULE_1__const_js__["c" /* SHIP_DIR_H */]) {
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
   * @param addShootMarks
   */
  markCloseZone(centerX, centerY, addShootMarks = false) {
    console.log(addShootMarks);
    for (let sx = -1; sx <=1; sx++) {
      for (let sy = -1; sy <=1; sy++) {
        const dx = centerX + sx;
        const dy = centerY + sy;
        if (dx >= 0 && dx < this.width
          && dy >=0 && dy < this.height
          && (this.shipMap[dx][dy] === null || this.shipMap[dx][dy] == '.')
        ) {
          this.shipMap[dx][dy] = '.';
          if (addShootMarks) {
            console.log("MARK EMPTY", dx, dy);
            this.shootMap[dx][dy] = '.';
          }
        }
      }
    }
    console.log(this.shootMap);
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

  markDeadShip(ship) {
    this.doForEachCell((x, y, field) => {
      if (this.shipMap[x][y] == ship) {
        this.markCloseZone(x, y, true);
      }
    });
  }

  /**
   * Проверка возможности выстрела в указанную точку
   *
   * @param x
   * @param y
   * @returns {boolean}
   */
  validateShoot(x, y) {
    return x >=0 && x < this.width
      && y >=0 && y < this.height
      && this.shootMap[x][y] === null;
  }

  /**
   *
   * @param x
   * @param y
   *
   * @return
   */
  shoot(x, y) {
    let mark = '';
    if (this.validateShoot(x, y)) {
      mark = '.';
      if (this.shipMap[x][y] !== null && this.shipMap[x][y] instanceof __WEBPACK_IMPORTED_MODULE_0__Ship_js__["a" /* default */]) {
        mark = 'x';
        this.shipMap[x][y].damage();
        if (this.shipMap[x][y].state == __WEBPACK_IMPORTED_MODULE_1__const_js__["e" /* SHIP_STATE_DEAD */]) {
          console.log("MARK_DEAD");
          this.markDeadShip(this.shipMap[x][y]);
        }

      }
      this.shootMap[x][y] = mark;
    }
    return mark;
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
/* 6 */
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

    this.state = __WEBPACK_IMPORTED_MODULE_0__const_js__["f" /* SHIP_STATE_UNKNOWN */];

    this.health = size;
  }

  /**
   * Помечаем корабль поврежденным
   */
  damage() {
    if (this.state == __WEBPACK_IMPORTED_MODULE_0__const_js__["g" /* SHIP_STATE_LIVE */]) {
      this.state = __WEBPACK_IMPORTED_MODULE_0__const_js__["h" /* SHIP_STATE_DAMAGED */];
    }
    this.health--;
    if (this.health <= 0) {
      this.kill();
    }
  }

  /**
   * Помечаем корабль убитым
   */
  kill() {
    this.state = __WEBPACK_IMPORTED_MODULE_0__const_js__["e" /* SHIP_STATE_DEAD */]
  }

  /**
   * Пометить корабль как целый (известный)
   */
  live() {
    this.state = __WEBPACK_IMPORTED_MODULE_0__const_js__["g" /* SHIP_STATE_LIVE */];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ship;


/***/ })
/******/ ]);