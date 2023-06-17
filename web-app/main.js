import GameObj from "./game.js";

var game = GameObj.Game();

document.getElementById('attackButton').addEventListener('click', () => {
  game.chooseAction('attack');
  document.getElementById('player').textContent = game.currentPlayer.name + "'s turn";
});

document.getElementById('defendButton').addEventListener('click', () => {
  game.chooseAction('defend');
  document.getElementById('player').textContent = game.currentPlayer.name + "'s turn";
});

document.getElementById('evadeButton').addEventListener('click', () => {
  game.chooseAction('evade');
  document.getElementById('player').textContent = game.currentPlayer.name + "'s turn";
});
