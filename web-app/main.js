import Character from './character.js';
import Game from './game.js';

document.addEventListener("DOMContentLoaded", function() {
  const player1 = Character.Character("Player 1");
  const player2 = Character.Character("Player 2");

  const game = Game.Game(player1, player2);

  const attackButton = document.getElementById("attackButton");
  const defendButton = document.getElementById("defendButton");
  const evadeButton = document.getElementById("evadeButton");

  attackButton.addEventListener("click", function() {
    game.chooseAction("attack");
  });

  defendButton.addEventListener("click", function() {
    game.chooseAction("defend");
  });

  evadeButton.addEventListener("click", function() {
    game.chooseAction("evade");
  });
});
