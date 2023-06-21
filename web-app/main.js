import Game from "./game.js";

// Initialize a new game and get references to the player objects
let gameInstance = Game.createGame();

let player1HealthBar = document.getElementById('player1Health');
let player2HealthBar = document.getElementById('player2Health');

function handleAction(action) {
  const healths = gameInstance.chooseAction(action);

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

  // Update the HP text
  document.getElementById("player1_HP").textContent =
  players.player1.getHealth();

  document.getElementById("player2_HP").textContent =
  players.player2.getHealth();

  // Update action info
  if (players.player1.action === "attack") {
    document.getElementById("player1_info").textContent =
    "Player1 is attacking";
  } else if (players.player1.action === "defend") {
    document.getElementById("player1_info").textContent =
    "Player1 is defending";
  } else if (players.player1.action === "evade") {
    document.getElementById("player1_info").textContent =
    "Player1 is evading";
  }

  if (players.player2.action === "attack") {
    document.getElementById("player2_info").textContent =
    "Player2 is attacking";
  } else if (players.player2.action === "defend") {
    document.getElementById("player2_info").textContent =
    "Player2 is defending";
  } else if (players.player2.action === "evade") {
    document.getElementById("player2_info").textContent =
    "Player2 is evading";
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



