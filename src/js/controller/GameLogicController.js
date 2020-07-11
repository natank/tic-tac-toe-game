import * as GameState from './GameStateController';


/** CHECK SEQUENCE */
// Checks if a board contains a sequence of identical, non-empty cells.
let board, gameOptions
export default function checkSequence(paramBoard) {
  let row, col, diagonal;
  board = paramBoard;
  let gameState = GameState.get();

  let { boardDimension } = gameState;

  // check rows, columns and diagonals
  row = checkRows();
  if (row === null) {
    col = checkColumns()
  }
  if (col === null) {
    diagonal = checkDiagonals()
  }

  if (row != null) {
    // Mark all row cells as sequence of cells
    for (col = 0; col < boardDimension; col++) {
      let index = getCellIndex(row, col, boardDimension)
      board[index].isSequence = true;
    }
    return true;
  }

  else if (col != null) {
    // Mark all columns cells as sequence of cells
    for (row = 0; row < boardDimension; row++) {
      let index = getCellIndex(row, col, boardDimension)
      board[index].isSequence = true;
    }
    return true;
  }

  else if (diagonal != null) {
    let row, col;
    if (diagonal === 'tl') {
      // loop over top-left -> bottom-right diagonal  
      // Mark all diagonal cells as sequence of cells
      for (row = 0; row < boardDimension; row++) {
        let col = row;
        let index = getCellIndex(row, col, boardDimension)
        board[index].isSequence = true;
      }
    } else if (diagonal === 'tr') {
      // loop over top-left -> bottom-right diagonal  
      // Mark all diagonal cells as sequence of cells
      row = 0;
      for (row = 0; row < boardDimension; row++) {
        col = boardDimension - row - 1;
        let index = getCellIndex(row, col, boardDimension)
        board[index].isSequence = true;
      }
    }
    return true;
  }
  return false;
}
/**CHECK ROWS */
// Return value:
//  null - if board rows rows does not contain squence
//  row number - of the row that contains sequense
function checkRows() {
  let gameState = GameState.get();
  let { boardDimension } = gameState;

  let row, col, index;
  for (row = 0; row < boardDimension; row++) {
    let col = 0;
    index = getCellIndex(row, col, boardDimension)
    let prevValue = board[index].value;
    let isSequence = true;
    for (col = 0; col < boardDimension; col++) {

      index = getCellIndex(row, col, boardDimension)
      let currValue = board[index].value;

      if (!currValue || currValue !== prevValue) {
        isSequence = false; // column doesn't contain a sequence
        continue; // continue to next row
      }

    }
    if (isSequence) return row;  // if there is a sequence - return row id
  }
  return null;
}


/**CHECK COLUMNS */
// Return value:
//  null - if board columns does not contain squence
//  row number - of the column that contains sequense
function checkColumns() {
  let gameState = GameState.get();
  let { boardDimension } = gameState;

  let row, col, index;
  for (col = 0; col < boardDimension; col++) {
    row = 0;
    index = getCellIndex(row, col, boardDimension)
    let prevValue = board[index].value;
    let isSequence = true;
    for (row = 0; row < boardDimension; row++) {
      index = getCellIndex(row, col, boardDimension)
      let currValue = board[index].value;

      if (!currValue || currValue !== prevValue) {
        isSequence = false; // column doesn't contain a sequence
        continue; // continue to next column
      }

    }
    if (isSequence) return col;  // if there is a sequence - return coll id
  }
  return null;
}

/**CHECK DIGONALS */
// Return value:
//  null - if board diagonals do not contain squence
//  diagonal id - of the diagonal that contains sequense
function checkDiagonals() {
  let row, col, index, prevValue;
  let gameState = GameState.get();
  let { boardDimension } = gameState;
  // check top-left -> bottom-right diagonal
  col = 0;
  row = 0;
  index = getCellIndex(row, col, boardDimension)
  prevValue = board[index].value;
  let isSequence = true;
  // loop over top-left -> bottom-right diagonal  
  for (row = 0; row < boardDimension; row++) {
    col = row;
    index = getCellIndex(row, col, boardDimension)

    let currValue = board[index].value;
    if (!currValue || currValue != prevValue) {
      isSequence = false;
      continue
    }
  }
  if (isSequence) {
    return ('tl')
  }
  // check top-right -> bottom-left diagonal
  isSequence = true;
  row = 0;
  col = boardDimension - 1;
  index = getCellIndex(row, col, boardDimension)
  prevValue = board[index].value;
  for (row = 0; row < boardDimension; row++) {
    col = boardDimension - row - 1;
    let index = getCellIndex(row, col, boardDimension)

    let currValue = board[index].value

    if (!currValue || currValue != prevValue) {
      isSequence = false;
      continue
    }
  }
  if (isSequence) {
    return ('tr')
  }
  // no sequence was found
  return (null)
}


function getCellIndex(row, col, dimension) {
  let base = row * dimension;
  let offset = col;
  let index = base + offset
  return index;
}



