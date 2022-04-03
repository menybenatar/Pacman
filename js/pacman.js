"use strict";
var PACMAN = '<img src="img/pac-left.png" />';

var gPacman;
function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5,
    },
    isSuper: false,
    myFood: 0,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
  gFood--;
}
function movePacman(ev) {
  if (!gGame.isOn) return;
  var nextLocation = getNextLocation(ev);

  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  if (nextCell === WALL) return;
  if (nextCell === FOOD) {
    gPacman.myFood++;
    updateScore(1);
  } else if (nextCell === GHOST) {
    if (!gPacman.isSuper) {
      gameOver();
      renderCell(gPacman.location, EMPTY);
      return;
    } else {
      killGhost(nextLocation);
    }
  } else if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return;
    updateScore(1);
    gPacman.myFood++;
    gPacman.isSuper = true;
    randerGhosts();

    setTimeout(() => {
      gPacman.isSuper = false;
      randerGhosts();
      ghostBackToLife();
    }, 5000);
  } else if (nextCell === CHERY) {
    updateScore(10);
  }
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  gEmptyCells.push(gPacman.location);

  // update the dom
  renderCell(gPacman.location, EMPTY);

  gPacman.location = nextLocation;

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the dom
  renderCell(gPacman.location, PACMAN);
  chackVictory();
}
function ghostBackToLife() {
  for (var i = 0; i < gKilledGhosts.length; i++) {
    gGhosts.push(gKilledGhosts[i]);
    gBoard[gKilledGhosts[i].location.i][gKilledGhosts[i].location.j] = GHOST;
    renderCell(gKilledGhosts[i].location, getGhostHTML(gGhosts[i]));
  }
  gKilledGhosts = [];
}
function killGhost(location) {
  if (gBoard[location.i][location.j] === GHOST) {
    updateScore(1);
    gBoard[location.i][location.j] = EMPTY;
    gEmptyCells.push(location);
    renderCell(location, EMPTY);
    var index = gGhosts.findIndex(
      (g) => g.location.i === location.i && g.location.j === location.j
    );
    if (index > -1) {
      var killedGhost = gGhosts.splice(index, 1);
      gKilledGhosts.push(killedGhost[0]);
    }
  }
}
function randerGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
  }
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  switch (eventKeyboard.code) {
    case "ArrowUp":
      PACMAN = '<img src="img/pac-up.png" />';
      nextLocation.i--;
      break;
    case "ArrowDown":
      PACMAN = '<img src="img/pac-down.png" />';
      nextLocation.i++;
      break;
    case "ArrowLeft":
      PACMAN = '<img src="img/pac-left.png" />';
      nextLocation.j--;
      break;
    case "ArrowRight":
      PACMAN = '<img src="img/pac-right.png" />';
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}
