/**
 * game.js is a module to model and play "Street Fighter" and related games.
 * @namespace Game
 * @author Shirley Xiong
 * @version 2023
 */
const Game = Object.create(null);

/**
 * Return damage on a player.
 * The amount of damage is a random value between 30 and 50.
 * @memberof Game
 * @function
 * @param {Object} player - The player object to receive the damage.
 * @returns {void} This function does not return a value.
 */
Game.attack = function(player) {
  // calculate damage between 30 and 50
  const damage = Math.floor(Math.random() * 21) + 30;
  player.receiveDamage(damage);
};

/**
 * Toggles the defense mode of a player.
 * When in defense mode, a player receives only half the normal damage.
 * @memberof Game
 * @function
 * @param {Object} player - The player object to toggle defense mode.
 * @returns {void} This function does not return a value.
 */
Game.defend = function(player) {
  player.toggleDefenseMode();
};

/**
 * Return whether the evade is successful.
 * Makes a player evade an attack.
 * There's a 25% chance of a successful evasion.
 * @memberof Game
 * @function
 * @returns {boolean} Returns true if evasion was successful, false otherwise.
 */
Game.evade = function() {
  if (Math.random() < 0.25) {
    return true;
  }
  return false;
};

/**
 * Creates a new player with a given name.
 * Players start with 100 health and not in defense mode.
 * @memberof Game
 * @function
 * @param {string} name - The name of the player.
 * @returns {Object} The newly created player object.
 * The player object includes:
 *  - `toggleDefenseMode` (function): Toggles the defense mode of the player.
 *  - `receiveDamage` (function): Inflicts damage to the player.
 *     The damage received is halved if the player is in defense mode.
 *  - `getHealth` (function): Returns the current health of the player.
 *  - `getName` (function): Returns the name of the player.
 */
Game.createCharacter = function(name) {
  let health = 100;
  let defenseMode = false;

 // Toggle the defense mode of the player
  const toggleDefenseMode = function() {
    defenseMode = !defenseMode;
  };

 // Inflicts damage to the player.
 //The damage received is halved if the player is in defense mode.
  const receiveDamage = function(damage) {
    if (defenseMode) {
      health -= damage / 2;
    } else {
      health -= damage;
    }
    // Ensure the player's health does not fall below 0
    if (health < 0) {
      health = 0;
    }
  };

  return {
    toggleDefenseMode,
    receiveDamage,
    getHealth: () => health,
    getName: () => name
  };
};

/**
 * Creates a new game with two players named "Player 1" and "Player 2".
 * Players can choose actions and rounds are resolved based on these actions.
 * @memberof Game
 * @function
 * @returns {Object} The newly created game object. The game object includes:
 *  - `chooseAction` (function): Assigns the chosen action to the current player
 *     and switches the turn to the other player.
 *     Resolves the round if both players have chosen an action.
 *  - `getPlayers` (function): Returns the current game state including
 *     both player objects.
 */
Game.createGame = function () {
  let player1 = Game.createCharacter("Player 1");
  let player2 = Game.createCharacter("Player 2");
  let currentPlayer = player1;
  let action1 = null;
  let action2 = null;

  const chooseAction = function(action) {
    if (currentPlayer === player1) {
      action1 = action;
      currentPlayer = player2;
    } else {
      action2 = action;
      currentPlayer = player1;
    }
    // Resolve the round when both players have chosen an action
    if (action1 !== null && action2 !== null) {
      return resolveRound();
    }
  };

 //Determines and executes actions chosen by players.
  const handleActions= function() {
    if (action1 === 'defend') {
      Game.defend(player1);
    } else if (action1 === 'attack') {
      Game.attack(player2);
    } else {
      Game.evade(player1);
    }

    if (action2 === 'defend') {
      Game.defend(player2);
    } else if (action2 === 'attack') {
      Game.attack(player1);
    } else {
      Game.evade(player2);
    }
  };

 // Resets actions and defense modes after each round.
  const resetActionsAndDefenseModes = function() {
    action1 = null;
    action2 = null;
    player1.toggleDefenseMode();
    player2.toggleDefenseMode();
  };

  //Resolves the round, handles actions, resets actions and defense modes,
  //and returns the current health of both players.
  const resolveRound = function() {
    Game.handleActions();
    resetActionsAndDefenseModes();

    return {
      player1Health: player1.getHealth(),
      player2Health: player2.getHealth()
    };
    };

  return {
    chooseAction: chooseAction,
    handleActions: handleActions,
    getPlayers: () => ({ player1, player2 })
  };
};
Game.createGame();

/**
 * Returns true if the player has lost the game.
 * A player loses the game if their health is zero or less.
 * @memberof Game
 * @function
 * @param {Object} player The player object.
 * @returns {boolean} Whether the player has lost.
 */
Game.isWinningForPlayer = function (player) {
    return player.getHealth() <= 0;
};

/**
 * Returns true if the game has ended.
 * A game is considered ended if either player has lost.
 * @memberof Game
 * @function
 * @param {Object} player1 The first player object.
 * @param {Object} player2 The second player object.
 * @returns {boolean} Whether the game has ended.
 */
Game.is_ended = function (player1, player2) {
    return (
        Game.isWinningForPlayer(player1) ||
        Game.isWinningForPlayer(player2)
    );
};

Game.resetHealth = function () {

};

export default Object.freeze(Game);
