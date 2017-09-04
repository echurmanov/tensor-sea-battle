import GameSession from './model/GameSession.js';
import UIField from './ui/UIField.js';

export function run(fieldDom1, fieldDom2) {
  const game = new GameSession(
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

  const uiField = new UIField("#game-zone-1", game.field1, false);
  uiField.fullDraw();
  const uiEnemyField = new UIField("#game-zone-2", game.field2, true);
  uiEnemyField.fullDraw();

  uiEnemyField.on('click', (evt) => {
    game.doShoot(evt.uiField.modelField, evt.x, evt.y);
  });
}