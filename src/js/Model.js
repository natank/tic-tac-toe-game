
export function saveGame(gameState) {
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

export function uploadGame() {
  let gameState = JSON.parse(localStorage.getItem('gameState'));
  return gameState;
}