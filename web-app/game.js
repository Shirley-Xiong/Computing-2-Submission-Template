import Character from './character.js';

const Game = Object.create(null);

Game.Game = function(player1, player2) {
  var currentTurn = player1;
  var opponent = player2;
  
  function changeTurn() {
    var temp = currentTurn;
    currentTurn = opponent;
    opponent = temp;
    document.getElementById('player').textContent = `${currentTurn.name}'s turn`;
  }
  
  function resolveRound() {
    if(currentTurn.action === "attack" && opponent.action !== "evade") {
      const damage = Math.floor(Math.random() * 21) + 30; // random damage between 30 and 50
      opponent.receiveDamage(damage);
    }

    if(opponent.action === "defend") {
      opponent.toggleDefenseMode();
    }
    changeTurn();
  }

  return {
    chooseAction: function(action) {
      currentTurn.action = action;
      resolveRound();
    }
  };
}

export default Object.freeze(Game);
