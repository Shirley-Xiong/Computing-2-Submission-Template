const Stats = Object.create(null);

/**
 * @memberof Stats
 * @typedef {Object} Statistics
 * @property {number} current_streak The number of games the player has won
 *     since last losing (or ever if the player has never lost).
 * @property {number} longest_streak The most consecutive games won.
 * @property {number} player_1_wins How many times the player has won.
 * @property {number} player_2_wins How many times the player has won.
 */
const player_statistics = {};

const new_player = function () {
  return {
      "current_streak": 0,
      "longest_streak": 0,
      "player_1_wins": 0,
      "player_2_wins": 0
  };
};

/**
 * @memberof Stats
 * @function
 * @param {string[]} players Player name to return stats for.
 * @returns {Object.<Stats4.Statistics>} The statistics of the requested
 *     player as object with keys given in player.
 */
Stats.get_statistics = function (players) {
  return Object.fromEntries(
      players.map(
          (player) => [player, player_statistics[player] || new_player()]
      )
  );
};

/**
 * Record the result of a game and return updated statistcs.
 * @memberof Stats
 * @function
 * @param {string} player_1 The name of player 1
 * @param {string} player_2 The name of player 2
 * @param {string} winner The winner of each round
 * @returns {Object.<Stats.Statistics>} Returns statistics for player_1 and
 *     player_2, i.e. the result of
 *     {@link Stats.get_statistics}`([player_1, player_2])`
 */
Stats.record_game = function (player_1, player_2, winner) {
  if (!player_statistics[player_1]) {
      player_statistics[player_1] = new_player();
  }
  if (!player_statistics[player_2]) {
      player_statistics[player_2] = new_player();
  }
  const player_1_stats = player_statistics[player_1];
  const player_2_stats = player_statistics[player_2];

  if (winner === player_1) {
    player_1_stats.player_1_wins +=1;
    player_1_stats.current_streak +=1;
    player_2_stats.current_streak =0;
  }

  if (winner === player_2) {
    player_2_stats.player_2_wins +=1;  // corrected from player_1_wins to player_2_wins
    player_2_stats.current_streak +=1;
    player_1_stats.current_streak =0;
  }

  if (player_1_stats.current_streak > player_1_stats.longest_streak) {
    player_1_stats.longest_streak = player_1_stats.current_streak;
  }

  if (player_2_stats.current_streak > player_2_stats.longest_streak) {  // corrected to player_2_stats
    player_2_stats.longest_streak = player_2_stats.current_streak; // corrected to player_2_stats
  }

  return Stats.get_statistics([player_1, player_2]);
};

export default Object.freeze(Stats);
