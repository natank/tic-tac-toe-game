
/**GAME STATE */
import * as Resources from '../Resouces';

let gameState = { // Default values
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
  return Resources.deepCopyObj(gameState);

}

export function get() {
  return Resources.deepCopyObj(gameState);
}

