const choices = ['rock', 'paper', 'scissor'];
let playerScore = 0;
let computerScore = 0;
const maxRounds = 5;

const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const playerChoiceElement = document.querySelector('.player-choice');
const computerChoiceElement = document.querySelector('.computer-choice');
const mainHeadElement = document.querySelector('.main-head');
const modalElement = document.querySelector('.modal');
const modalTextElement = document.querySelector('.modal-text');
const modalButtonElement = document.querySelector('.modal-button');
const overlayElement = document.querySelector('.overlay');

function computerPlay() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function updateScores() {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

function updateChoice(element, choice) {
  element.textContent = '';
  const img = document.createElement('img');
  img.src = `images/${choice}.png`;
  img.alt = choice;
  element.appendChild(img);
}

function showWinnerModal(winnerText) {
  modalTextElement.textContent = winnerText;
  modalElement.classList.add('active');
  overlayElement.classList.add('active');
}

function closeModal() {
  modalElement.classList.remove('active');
  overlayElement.classList.remove('active');
}

function playRound(playerChoice) {
  const computerChoice = computerPlay();
  updateChoice(playerChoiceElement, playerChoice);
  updateChoice(computerChoiceElement, computerChoice);

  if (playerChoice === computerChoice) {
    // Tie
    return 'Tie';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissor') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissor' && computerChoice === 'paper')
  ) {
    // Player wins
    playerScore++;
    updateScores();
    return 'Player wins';
  } else {
    // Computer wins
    computerScore++;
    updateScores();
    return 'Computer wins';
  }
}

function checkGameStatus() {
  if (playerScore === maxRounds || computerScore === maxRounds) {
    const winnerText =
      playerScore > computerScore
        ? 'Player wins!'
        : playerScore < computerScore
        ? 'Computer wins!'
        : 'It\'s a draw!';

    showWinnerModal(winnerText);

    const buttons = document.querySelectorAll('.set button');
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScores();

  playerChoiceElement.textContent = '❔';
  computerChoiceElement.textContent = '❔';

  const buttons = document.querySelectorAll('.set button');
  buttons.forEach((button) => {
    button.disabled = false;
  });

  mainHeadElement.textContent = 'Choose your hand';
}

const buttons = document.querySelectorAll('.set button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const playerChoice = button.classList[1];
    const result = playRound(playerChoice);
    console.log(result);
    checkGameStatus();
  });
});

modalButtonElement.addEventListener('click', () => {
  closeModal();
  resetGame();
});
