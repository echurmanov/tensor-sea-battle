import * as CONST from './const.js';

/**
 * Класс описания размера, направления и состояния корабля
 */
export default class Ship {

  constructor(size, dir) {
    this.size = size;
    this.dir = dir;

    this.state = CONST.SHIP_STATE_UNKNOWN;
  }

  /**
   * Помечаем корабль поврежденным
   */
  damage() {
    if (this.state == CONST.SHIP_STATE_LIVE) {
      this.state = CONST.SHIP_STATE_DAMAGED;
    }
  }

  /**
   * Помечаем корабль убитым
   */
  kill() {
    this.state = CONST.SHIP_STATE_DEAD
  }

  /**
   * Пометить корабль как целый (известный)
   */
  live() {
    this.state = CONST.SHIP_STATE_LIVE;
  }
}