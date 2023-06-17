const Character = Object.create(null);

Character.Character = function(name) {
  var character = {
    name: name,
    health: 100,
    defenseMode: false,
    action: ""
  };
  
  character.toggleDefenseMode = function() {
    character.defenseMode = !character.defenseMode;
  }
  
  character.receiveDamage = function(damage) {
    // if evasion is successful (25% chance), no damage is taken
    if (Math.random() < 0.25) {
      console.log(character.name + " evaded the attack!");
      return;
    }

    // if defense mode is active, received damage is halved
    if (character.defenseMode) {
      console.log(character.name + " is defending!");
      character.health -= damage / 2;
    } else {
      character.health -= damage;
    }

    // health can't go below 0
    if (character.health < 0) {
      character.health = 0;
    }

    // update health bar
    const healthElement = document.getElementById(character.name === "Player 1" ? "player1Health" : "player2Health");
    healthElement.style.width = character.health + "%";
  }

  return character;
}

export default Object.freeze(Character);
