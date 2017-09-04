import * as CONST from './const.js';
import Field from './Field.js';

export default class GameSession {
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
    this.field1 = new Field(CONST.FIELD_SIZE, CONST.FIELD_SIZE);
    if (this.onePlayer && this.player1.human) {
      this.field1.ownField = true;
    }
    this.field1.generate(CONST.defaultShipConfig);

    this.field2 = new Field(CONST.FIELD_SIZE, CONST.FIELD_SIZE);
    if (this.onePlayer && this.player2.human) {
      this.field2.ownField = true;
    }
    this.field2.generate(CONST.defaultShipConfig);
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
      }, 2000);
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
    let dx = tx;
    let dy = ty;
    let alertLimit = targetField.width * targetField.height;
    while (!this.doShoot(targetField, dx, dy) && alertLimit > -1) {
      if (dir % 4 == 0) {
        len++;
        dir = 0;
      }
      
      dir++;
      alertLimit--;
    }
    if (alertLimit < 0) {
      throw new Exception("AI can't do shoot");
    }
  }
}