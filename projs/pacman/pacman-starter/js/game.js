'use strict';
var WALL = '';
var FOOD = '🍗';
var EMPTY = ' ';
var superFood = '$';
// init()

var gBoard;
var gState = {
  score: 0,
  isGameDone: false
};

function init() {
  gBoard = buildBoard();
  printMat(gBoard, '.boardContainer');
  console.table(gBoard);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      }
      if ((i === 1 && j === 1) || (i === SIZE - 2 && j === 1) ||
        (i === SIZE - 2 && j === SIZE - 2) || (i === 1 && j === SIZE - 2)) {
        board[i][j] = superFood;
      }
    }
  }
  createPacman(board);
  createGhosts(board);
  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent) {

  var elCell = document.querySelector('.box');
  var elTable = document.querySelector('table')
  if (cell === opponent) {
    // TODO: basic support for eating power-ball (which is not in the game yet)
    if (gPacman.isSuper) {

    } else {
      clearInterval(gIntervalGhosts);
      gState.isGameDone = true;
      // TODO: GameOver popup with a play again button
      // console.log('pop');
      elTable.classList.add('shake')
      elCell.classList.add('back')
      // alert('Game Over!');
      // console.log('Game Over!');
      return true;
    }
  }
  return false;
}


// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  document.querySelector('header > h3 > span').innerText = gState.score;
}


function checkVictoryGame() {
  var elVictory = document.querySelector('.box2');
  var isVictory = true;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === FOOD) {
        isVictory = false
      }
    }
  }
  if (isVictory) {
    elVictory.classList.add('back2')
    gState.isGameDone = true
    clearInterval(gIntervalGhosts)
  }
}

function playAgain() {
  location.reload()
}


