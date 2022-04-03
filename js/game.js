"use strict";
const WALL = "#";
const FOOD = ".";
const SUPER_FOOD = "🍔";
const EMPTY = " ";
const CHERY = "🍒";

var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};
var gFood;
var gEmptyCells = [];
var gIntervalChery;
function init() {
  gFood = 0;
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, ".board-container");
}
function restart() {
  hide(".gameOver");
  hide(".restart");
  hide(".start");
  gIntervalGhosts = setInterval(moveGhosts, 700);
  gIntervalChery = setInterval(putCheryOnBoard, 15000);
  init();
  gGame.isOn = true;
  gGame.score = 0;
  updateScore(0);
}
function putCheryOnBoard() {
  if (gEmptyCells.length > 0) {
    var indexRndom = getRandomIntInt(0, gEmptyCells.length);
    gBoard[gEmptyCells[indexRndom].i][gEmptyCells[indexRndom].j] = CHERY;
    renderCell(gEmptyCells[indexRndom], CHERY);
    gEmptyCells.splice(indexRndom, 1);
  }
}

function buildBoard() {
  var SIZE = 13;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2) ||
        (i === 2 && j > SIZE - 6 && j < SIZE) ||
        (j === 10 && i > 5 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
      }

      if (board[i][j] === FOOD) gFood++;
    }
  }
  board[1][1] = SUPER_FOOD;
  board[1][SIZE - 2] = SUPER_FOOD;
  board[SIZE - 2][1] = SUPER_FOOD;
  board[SIZE - 2][SIZE - 2] = SUPER_FOOD;
  return board;
}

function updateScore(diff) {
  gGame.score += diff;
  document.querySelector("h2 span").innerText = gGame.score;
}
function chackVictory() {
  console.log("(gPacman.myFood :>> ", gPacman.myFood);
  if (gPacman.myFood === gFood) {
    show(".restart");
    document.querySelector(".gameOver span").innerText = "YOU ARE THE BEST!";
    show(".gameOver");
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalChery);
    gGame.isOn = false;
    hideGhosts();
  }
}
function hideGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];
    gBoard[ghost.location.i][ghost.location.j] = EMPTY;
    gEmptyCells.push(ghost.location);
    renderCell(ghost.location, EMPTY);
  }
  gGhosts = [];
}
function gameOver() {
  gGame.isOn = false;
  show(".restart");
  document.querySelector(".gameOver span").innerText = "GAME OVER!";
  show(".gameOver");
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalChery);
}
