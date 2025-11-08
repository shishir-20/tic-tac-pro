const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const playerModeBtn = document.getElementById("playerMode");
const computerModeBtn = document.getElementById("computerMode");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOn = false;
let vsComputer = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// 🕹️ Start Game
function startGame(mode) {
  vsComputer = (mode === "computer");
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOn = true;
  renderBoard();
  statusEl.textContent = vsComputer ? "Your turn!" : "Player X's turn";
}

// 🎯 Render the board dynamically
function renderBoard() {
  boardEl.innerHTML = "";
  board.forEach((cell, i) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    div.addEventListener("click", () => handleClick(i));
    boardEl.appendChild(div);
  });
}

// 💥 Handle cell clicks
function handleClick(index) {
  if (!gameOn || board[index] !== "") return;
  board[index] = currentPlayer;
  renderBoard();
  
  if (checkWin()) return;
  if (checkDraw()) return;

  // Switch turn
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = vsComputer && currentPlayer === "O" 
      ? "Computer's move..." 
      : `Player ${currentPlayer}'s turn`;

  if (vsComputer && currentPlayer === "O") {
    setTimeout(computerMove, 600);
  }
}

// 🤖 Simple computer AI (random move)
function computerMove() {
  const empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  const choice = empty[Math.floor(Math.random() * empty.length)];
  board[choice] = "O";
  renderBoard();
  if (checkWin()) return;
  if (checkDraw()) return;
  currentPlayer = "X";
  statusEl.textContent = "Your turn!";
}

// 🏆 Check for a win
function checkWin() {
  for (let [a,b,c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusEl.textContent = `${board[a]} wins! 🎉`;
      gameOn = false;
      return true;
    }
  }
  return false;
}

// 🤝 Check for a draw
function checkDraw() {
  if (!board.includes("") && gameOn) {
    statusEl.textContent = "It's a draw!";
    gameOn = false;
    return true;
  }
  return false;
}

// 🔁 Restart Game
restartBtn.addEventListener("click", () => {
  if (!gameOn) statusEl.textContent = "Game reset!";
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOn = true;
  renderBoard();
  statusEl.textContent = vsComputer ? "Your turn!" : "Player X's turn";
});

// 🎮 Mode Buttons
playerModeBtn.addEventListener("click", () => startGame("player"));
computerModeBtn.addEventListener("click", () => startGame("computer"));
