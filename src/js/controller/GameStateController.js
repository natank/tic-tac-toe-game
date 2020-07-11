
// An array of boards to store game. 
// Each board contains cells.  
// Each cell can have the value of x, o, n
let boards = []

// The currently displayed move
let displayMove = 0;

// The current player
let turn = 'player-x'

// The status : ongoing, completed
let gameOngoing = true;

// The dimension of the board
let boardDimension = 3;

export function setBoards(parmaBoards) {
  boards = parmaBoards
}

let gameState = {
  boards: [],
  displayMove: 0,
  turn: 'player-x',
  gameOngoing: false,
  boardDimension: 3
}

export function set(objState) {
  Object.keys(objState).forEach(item => {
    gameState[item] = objState[item]
  })
  return gameState;
}

export function get() {
  return gameState;
}


export function setTurn(paramTurn) {
  turn = paramTurn
}

export function setGameOngoing(paramOngoing) {
  gameOngoing = paramOngoing
}

export function setBoardDimension(paramDimension) {
  boardDimension = paramDimension;
}

export function setDisplayMove(paramDisplayMove) {
  displayMove = paramDisplayMove;
}


