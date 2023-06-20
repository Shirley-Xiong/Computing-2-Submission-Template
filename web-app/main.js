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

document.getElementById('restartButton').addEventListener('click', function() {
  player1Score = 0;
  player2Score = 0;
  game.restartGame();
  document.getElementById('score').innerText = `Score: Player 1 - ${player1Score}, Player 2 - ${player2Score}`;
});
