const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6], // Diagonals
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[clickedCellIndex] !== "" || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer);

  checkForWinner();
}

function checkForWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") continue;
    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    scores[currentPlayer]++;
    updateScoreboard();
    confetti({ particleCount: 100, spread: 70 });
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
}

function updateScoreboard() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);