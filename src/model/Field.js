import Ship from "./Ship.js";
import * as CONST from './const.js';


export default class Field {
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
      const ship = new Ship(
        shipSize,
        Math.random() > 0.5?CONST.SHIP_DIR_H:CONST.SHIP_DIR_V
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
          if (ship.dir == CONST.SHIP_DIR_H) {
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
    return this.shipMap[x][y] !== null && this.shipMap[x][y] instanceof Ship;
  }
}