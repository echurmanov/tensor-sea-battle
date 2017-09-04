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


export default class UIField {
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