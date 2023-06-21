import Game from "./game.js";
import Stats from "./stats.js";

// Initialize a new game and get references to the player objects
let gameInstance = Game.createGame();

let player1HealthBar = document.getElementById("player1Health");
let player2HealthBar = document.getElementById("player2Health");
let players = gameInstance.getPlayers();
let player1 = players.player1;
let player2 = players.player2;

function updateHealthBars(player1Health, player2Health) {
  player1HealthBar.style.width = player1Health + "%";
  player2HealthBar.style.width = player2Health + "%";
}

function handleAction(action) {
  const healths = gameInstance.chooseAction(action);
  // Get the current player instances
  players = gameInstance.getPlayers();
  player1 = players.player1;
  player2 = players.player2;

  // Update health bars if both players have chosen an action
  if (healths) {
    updateHealthBars(healths.player1Health, healths.player2Health);
  }

  // If the game has ended, record the result
  let score;
  if (Game.is_ended(players.player1, players.player2)) {
    let winner = Game.getWinner(players.player1, players.player2);
    score = Stats.record_game(player1.getName(), player2.getName(), winner);
    gameInstance.reset();
    players = gameInstance.getPlayers();
    player1 = players.player1;
    player2 = players.player2;

    // Reset action info
    document.getElementById("player1_info").textContent =
    "Player1 is ready";
    document.getElementById("player2_info").textContent =
    "Player2 is ready";

    // Reset health bars
    player1HealthBar.style.width = "100%";
    player2HealthBar.style.width = "100%";

    // Update scores
    document.getElementById("score").innerText =
    `${score[player1.getName()].player_1_wins}  :
      ${score[player2.getName()].player_2_wins}`;

    document.getElementById("player1_longest_streak").textContent =
     score[player1.getName()].longest_streak;
    document.getElementById("player1_current_streak").textContent =
     score[player1.getName()].current_streak;

    document.getElementById("player2_longest_streak").textContent =
     score[player2.getName()].longest_streak;
    document.getElementById("player2_current_streak").textContent =
     score[player2.getName()].current_streak;
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
  // Update the turn display
  if (gameInstance.getCurrentPlayer() === "player1") {
    document.getElementById("player1_ready").textContent = "Your turn!";
    document.getElementById("player2_ready").textContent = "Wait your turn...";
  } else {
    document.getElementById("player1_ready").textContent = "Wait your turn...";
    document.getElementById("player2_ready").textContent = "Your turn!";
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

document.getElementById("restartButton").addEventListener('click', function() {
  gameInstance.reset();
  players = gameInstance.getPlayers();
  player1 = players.player1;
  player2 = players.player2;
  Stats.reset(player1.getName(), player2.getName());
  document.getElementById("score").textContent = "0 : 0";

  // Update health bars immediately after the game is reset
  updateHealthBars(player1.getHealth(), player2.getHealth());
});