import Game from "./game.js";

// Initialize a new game and get references to the player objects
let gameInstance = Game.createGame();

let player1HealthBar = document.getElementById('player1Health');
let player2HealthBar = document.getElementById('player2Health');

function handleAction(action) {
  // Perform the chosen action
  const healths = gameInstance.chooseAction(action);

  // Update the health bars only if healths is defined
  if (healths) {
    player1HealthBar.style.width = healths.player1Health + '%';
    player2HealthBar.style.width = healths.player2Health + '%';
  }

  // Update the game status
  let players = gameInstance.getPlayers();

  if (Game.isWinningForPlayer(players.player1)) {
    console.log(players.player2.getName() + ' has won the game!');
  } else if (Game.isWinningForPlayer(players.player2)) {
    console.log(players.player1.getName() + ' has won the game!');
  }
}


document.getElementById("player1_attackButton").addEventListener("click",
function() {
  handleAction("attack");
});

document.getElementById("player1_defendButton").addEventListener("click",
function() {
  handleAction("defend");
});

document.getElementById("player1_evadeButton").addEventListener("click",
function() {
  handleAction("evade");
});

document.getElementById("player2_attackButton").addEventListener("click",
function() {
  handleAction("attack");
});

document.getElementById("player2_defendButton").addEventListener("click",
function() {
  handleAction("defend");
});

document.getElementById("player2_evadeButton").addEventListener("click",
function() {
  handleAction("evade");
});

// Attach event listeners for the restart button
document.getElementById('restartButton').addEventListener('click', function() {
  // Restart the game and get references to the new player objects
  gameInstance = Game.createGame();
  let players = gameInstance.getPlayers();

  // Reset the health bars
  player1HealthBar.style.width = players.player1.getHealth() + '%';
  player2HealthBar.style.width = players.player2.getHealth() + '%';
});



