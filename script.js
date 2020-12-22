
const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');
const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');
const resetIcon = document.getElementById('reset');
const resultText = document.getElementById('resultText');

// the game logic
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let computerChoice = '';
let playerScoreNumber = 0;
let computerScoreNumber = 0;


// because we need to compare the computerChoice and playerChoice, so we need to get those two variable
function updateScore(playerChoice) {
  // when playerChoice === computerChoice, it's a tie
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a Tie!";
  } else {
    // set a const choice and let the choice to be the game logic choices, and pass the playerChoice into the choices array using []
    const choice = choices[playerChoice];
    // in the choice array, there is defeats object, and using indexOf to check if computerChoice is in defeats object, there will be 1, 0, -1 three results
    // 1 and 0 means computerChoice is in defeat object(player win), playerscore + 1
    // -1 means not(computer win), computerScore +1
    // no number means it's a tie
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = 'You Won!';
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = 'You Lost!';
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

function computerSelect() {
  // change icon color and update computerChoice text
  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}

// Random computer choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = 'paper';
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = 'scissors';
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = 'lizard';
  } else {
    computerChoice = 'spock';
  }
}


// this function focus on allGameIcons(which is an array, so we use forEach to apply every object in this array)
function resetAllGameIcons() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
}

// reset all to restart the game
// 1) reset playerScoreEl and computerScoreEl to 0
// 2) reset playerChoice and computerChoice TextContent to ''
// 3) reset all game icons
// 4) reset resultText to ''
function resetAll() {
  resetAllGameIcons();
  playerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  playerChoiceEl.textContent = '';
  computerScoreNumber = 0;
  computerScoreEl.textContent = computerScoreNumber;
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
}

// pass the playerChoice to updateScore function
function checkResult(playerChoice) {
  // reset all icon color to its original color
  resetAllGameIcons();
  // computer give random choices while player give choices
  computerRandomChoice();
  // computer display the select choice by showing the choice name and change the icon color
  computerSelect();
  // create a function to decide who is winner(computer vs player) and show the score
  updateScore(playerChoice);
}


// select function: click each playerchoice icon, the icon color will change, and the player choice text will show the corresponding choice
// but all the icon need to reset to the original color before switching to other choice, so add resetAllGameIcon function to reset all icons' color
function playerSelect(playerChoice) {
  // put checkResult function here(it includes many other functions), it's easy to trouble shooting if we put many functions into one function
  // get the playerChoice variable from playerSelect
  checkResult(playerChoice);
  // change icon color and update playerChoice text
  switch (playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}


// set an inial 0 number for player and computer score, so call resetAll at first
resetAll();