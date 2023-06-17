import CharacterObj from "./character.js";

function Game() {
  var game = {};
  game.player1 = CharacterObj.Character("Player 1");
  game.player2 = CharacterObj.Character("Player 2");
  game.currentPlayer = game.player1;
  game.action1 = null; // action chosen by player 1
  game.action2 = null; // action chosen by player 2
  game.player1Score = 0; // Player 1's score
  game.player2Score = 0; // Player 2's score

  /**
   * Choose an action to take: 'attack', 'defend', or 'evade'.
   * @memberof Game
   * @function
   * @param {string} action The action to take.
   */
  game.chooseAction = function(action) {
    if (game.currentPlayer === game.player1) {
      game.action1 = action;
      game.currentPlayer = game.player2;
    } else {
      game.action2 = action;
      game.currentPlayer = game.player1;
    }

    // if both players have chosen an action, resolve the round
    if (game.action1 !== null && game.action2 !== null) {
      game.resolveRound();
    }
  };

  /**
   * Resolve a round of combat after both players have chosen an action.
   * @memberof Game
   * @function
   */
  game.resolveRound = function() {
    if (game.action1 === 'defend') {
      game.player1.toggleDefenseMode();
    }
    if (game.action2 === 'defend') {
      game.player2.toggleDefenseMode();
    }
    if (game.action1 === 'attack') {
      var damage = Math.floor(Math.random() * 21) + 30;
      game.player2.receiveDamage(damage);
    }
    if (game.action2 === 'attack') {
      var damage = Math.floor(Math.random() * 21) + 30;
      game.player1.receiveDamage(damage);
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
      game.player2Score += 1;
      console.log("Player 2 wins the round!");
      game.restartGame();
      }
    if (game.player2.health <= 0) {
      game.player1Score += 1;
      console.log("Player 1 wins the round!");
      game.restartGame();
      }
    //update the scoreboard in HTML
    document.getElementById('score').innerText = `Score: Player 1 - ${game.player1Score}, Player 2 - ${game.player2Score}`;};


  game.restartGame = function() {
    // Increase the score of the winning player
    if (game.player1.health <= 0) {
      game.player2Score += 1;
    } else {
      game.player1Score += 1;
     }
   // Log the scores
  console.log(`Score: Player 1 - ${game.player1Score}, Player 2 - ${game.player2Score}`);

    // Reset game state
      game.player1 = CharacterObj.Character("Player 1");
      game.player2 = CharacterObj.Character("Player 2");
      game.currentPlayer = game.player1;
      game.action1 = null;
      game.action2 = null;
      game.player1.defenseMode = false;
      game.player2.defenseMode = false;
      game.player1Score = 0;
      game.player2Score = 0;

    // Update the UI
      document.getElementById('player1Health').style.width = "100%";
      document.getElementById('player2Health').style.width = "100%";
      document.getElementById('player').innerText = "Player 1's turn";
      document.getElementById('score').innerText = `Score: Player 1 - ${game.player1Score}, Player 2 - ${game.player2Score}`;};
  return game;
}



const GameObj = { Game: Game };
export default Object.freeze(GameObj);