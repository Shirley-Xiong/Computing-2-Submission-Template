/**
 * Constructs a new character.
 * @memberof Character
 * @param {string} name The name of the character.
 */
function Character(name) {
  var character = {
    name: name,
    health: 100,
    defenseMode: false,
  };

  /**
   * Toggles the defense mode of the character.
   * @memberof Character
   * @function
   */
  character.toggleDefenseMode = function() {
    character.defenseMode = !character.defenseMode;
  };

  /**
   * Apply damage to the character. If the character is in defense mode, the damage is halved. 
   * If the character successfully evades, no damage is taken.
   * @memberof Character
   * @function
   * @param {number} damage The amount of damage to apply.
   */
  character.receiveDamage = function(damage) {
    // if evasion is successful (25% chance), no damage is taken
    if (Math.random() < 0.25) {
      console.log(character.name + " evaded the attack!");
      return;
    }

    // if defense mode is active, received damage is halved
    if (character.defenseMode) {
      console.log(character.name + "is defending!");
      character.health -= damage / 2;
    } else {
      character.health -= damage;
    }

    // health can't go below 0
    if (character.health < 0) {
      character.health = 0;
    }

      // update the width of the health bar
    let healthBarId = this.name === "Player 1" ? "player1Health" : "player2Health";
     document.getElementById(healthBarId).style.width = this.health + '%';
    console.log(this.name)
  };

  return character;
}

const CharacterObj = { Character: Character };
export default Object.freeze(CharacterObj);