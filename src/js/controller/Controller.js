import * as View from '../View';
import * as Resources from '../Resouces';
import checkSequence from './GameLogicController';
import * as GameState from './GameStateController';

function GameController() {
    View.renderTitle();
    initGame()
    View.renderControlPanel({
        onMove,
        onNewGame,
        onDeleteLast,
        onGetRecord,
        onSaveGame,
        onUploadGame,
        onChangeBoard

    })
}

function onMove(event) {
    event.preventDefault();
    let gameState = GameState.get();

    // duplicate the current board
    let { boards, turn, displayMove } = gameState;
    let newBoard = Resources.deepCopyObj(boards[boards.length - 1]);

    // determine the index of the cell
    let index = event.target.getAttribute('index');

    // change the value of the cell according to the turn
    newBoard[index].value = turn;

    // check if the new board contains a squence of identical cells
    let sequenceFound = checkSequence(newBoard, gameState);
    if (sequenceFound) {
        gameState = GameState.set({ gameOngoing: false });
    }

    // render the boards
    View.renderBoard(newBoard, gameState, onMove)

    // push the board to the collection
    boards.push(newBoard);
    // change turn
    turn = gameState.turn === 'player-x' ? 'player-o' : 'player-x';
    displayMove++;
    // update the state
    gameState = GameState.set({ boards, turn });

    return;

}

function onNewGame(event) {
    event.preventDefault();
    // call init game
    initGame();
}
function onDeleteLast() {
    // delete last move
    // pops out a single item from boards[] and re-render the board
    event.preventDefault();
    let { boards, displayMove, turn } = GameState.get()
    if (boards.length > 1) {
        boards.pop();
        displayMove = displayMove === 0 ? displayMove : --displayMove;
        turn = turn === 'player-x' ? 'player-y' : 'player-x';

        let last = boards.length - 1;
        let gameState = GameState.get();
        View.renderBoard(boards[last], gameState, onMove)

        GameState.set({ boards, displayMove, turn, gameOngoing: true });
    }
}

function onGetRecord(event) {
    event.preventDefault();
    // Get record button click event
    // Get the value of the record from the local storage
    // display the value of the record on a popup

    alert("onRecordClick")
}

function onSaveGame(event) {
    // save `boards` to the local storage
    event.preventDefault();
    alert('save game')

}

function onUploadGame(event) {
    // Upload the game from local storage
    event.preventDefault();
    alert('upload game');
}

function onChangeBoard(event) {
    event.preventDefault();

    let boardDimension = prompt("Enter board dimension (between 3-10)");

    GameState.set({ boardDimension })

    initGame();

}


/* INIT GAME */
// initialize the game

function initGame() {

    let gameState = GameState.get();

    // Create initial board
    let initialBoard = [];

    // initialize board with empty cells
    for (let i = 0; i < gameState.boardDimension ** 2; i++) {
        initialBoard.push({
            value: null, // the cell value (normally x, y or empty)
            sequence: false // is the cell part of a sequence
        })
    }

    // Reset game state
    gameState = GameState.set({
        boards: [initialBoard],
        turn: 'player-x',
        displayMove: 0,
        gameOngoing: true
    })

    // render initial board
    View.renderBoard(initialBoard, gameState, onMove)
}

export default GameController