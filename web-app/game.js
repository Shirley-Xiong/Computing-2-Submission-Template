import CharacterObj from "./character.js";

let player1Score = 0; // Player 1's score
let player2Score = 0; // Player 2's score

  /**
   * Choose an action to take: 'attack', 'defend', or 'evade'.
   * @memberof Game
   * @function
   * @param {string} action The action to take.
   */

function handleDefendAction(player) {
  player.toggleDefenseMode();
}

function handleAttackAction(attacker, defender) {
  var damage = Math.floor(Math.random() * 21) + 30;
  defender.receiveDamage(damage);
}

function handleScore(game, winnerPlayer, loserPlayer) {
  winnerPlayer.score += 1;
  console.log(winnerPlayer.name + " wins the round!");
  game.restartGame();
}

function resolveRound(game) {
  if (game.action1 === 'defend') {
    handleDefendAction(game.player1);
  }
  if (game.action2 === 'defend') {
    handleDefendAction(game.player2);
  }
  if (game.action1 === 'attack') {
    handleAttackAction(game.player1, game.player2);
  }
  if (game.action2 === 'attack') {
    handleAttackAction(game.player2, game.player1);
  }

  // reset actions and defense modes for the next round
  game.action1 = null;
  game.action2 = null;
  game.player1.defenseMode = false;
  game.player2.defenseMode = false;

  // log the remaining health of both players
  console.log("Player 1: " + game.player1.health + " health remaining.");
  console.log("Player 2: " + game.player2.health + " health remaining.");

  // Check if a player's health has reached zero and increment score
  if (game.player1.health <= 0) {
    handleScore(game, game.player2, game.player1);
  }
  if (game.player2.health <= 0) {
    handleScore(game, game.player1, game.player2);
  }
}



function handleChooseAction(game, action) {
  if (game.currentPlayer === game.player1) {
    game.action1 = action;
    game.currentPlayer = game.player2;
  } else {
    game.action2 = action;
    game.currentPlayer = game.player1;
  }

  // if both players have chosen an action, resolve the round
  if (game.action1 !== null && game.action2 !== null) {
    resolveRound(game);
  }
}


function handleRestartGame(game) {
  game.player1 = CharacterObj.Character("Player 1");
  game.player2 = CharacterObj.Character("Player 2");
  game.currentPlayer = game.player1;
  game.action1 = null;
  game.action2 = null;

  // update UI
  document.getElementById('player1Health').style.width = game.player1.health + "%";
  document.getElementById('player2Health').style.width = game.player2.health + "%";
}



function Game() {
  let game = {};
  game.player1 = CharacterObj.Character("Player 1");
  game.player2 = CharacterObj.Character("Player 2");
  game.currentPlayer = game.player1;
  game.action1 = null; // action chosen by player 1
  game.action2 = null; // action chosen by player 2
  game.player1Score = 0; // initialize score for player 1
  game.player2Score = 0; // initialize score for player 2


  game.chooseAction = function(action) {
    handleChooseAction(this, action);
  };

  game.restartGame = function() {
    handleRestartGame(this);
  };

  game.resolveRound = function() {
    resolveRound(this);
  };


  return game;
}



const GameObj = { Game: Game, player1Score: 0, player2Score: 0 };
export default Object.freeze(GameObj);