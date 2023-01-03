"use strict";

// ELEMENTS SELECTION

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const currentScore0El = document.getElementById("current--score-0");
const currentScore1El = document.getElementById("current--score-1");
const player_0 = document.querySelector(".player--0");
const player_1 = document.querySelector(".player--1");
// Startingndition

let scores, playing, activePlayer, currentScore;

// Initial conditions
const reStartGame = function () {
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
  currentScore = 0;

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  player_0.classList.add("player--active");
  player_1.classList.remove("player--active");
  player_0.classList.remove("player--winner");
  player_1.classList.remove("player--winner");
};
reStartGame();
const switchPlayer = function () {
  document.getElementById(`current--score-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player_0.classList.toggle("player--active");
  player_0.classList.toggle("name");
  player_1.classList.toggle("player--active");
};

const rollDice = () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `image/dice-${dice}.png`;
    // check if dice roll is
    if (dice !== 1) {
      // not 1
      currentScore += dice;
      document.getElementById(`current--score-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const holdScore = () => {
  if (playing) {
    // Add surrent player's Score to the total score
    scores[activePlayer] += currentScore;
    // console.log(activePlayer);
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      // btnRoll.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
};

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdScore);
btnNew.addEventListener("click", reStartGame);
