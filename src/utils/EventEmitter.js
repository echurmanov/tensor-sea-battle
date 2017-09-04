
export default class EventEmitter {
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