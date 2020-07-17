import * as View from '../View';
import * as Model from '../Model';
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

    let { boards, turn, displayMove } = gameState;
    displayMove++;

    // duplicate the current board
    let newBoard = Resources.deepCopyObj(boards[boards.length - 1]);

    // determine the index of the cell
    let index = event.target.parentElement.getAttribute('index');

    // change the value of the cell according to the turn
    newBoard[index].value = turn;

    // check if the new board contains a squence of identical cells
    let sequenceFound = checkSequence(newBoard, gameState);
    if (sequenceFound) {
        // Chagne the gameOngoing state to false
        gameState = GameState.set({ gameOngoing: false });
        // Update the record if needed
        let record = localStorage.getItem('record');

        if (!record || record > displayMove) {
            localStorage.setItem('record', displayMove)
        }
    }


    // push the board to the collection
    boards.push(newBoard);
    // change turn
    turn = gameState.turn === 'player-x' ? 'player-o' : 'player-x';

    // update the state
    gameState = GameState.set({ boards, turn, displayMove });

    // render the boards
    View.renderBoard(gameState, onMove)

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
        View.renderBoard(gameState, onMove)

        GameState.set({ boards, displayMove, turn, gameOngoing: true });
    }
}

function onGetRecord(event) {
    event.preventDefault();
    // Get record button click event
    // Get the value of the record from the local storage
    // display the value of the record on a popup
    let record = localStorage.getItem('record');
    if (record) alert(`The record is ${record} moves`);
    else alert(`Thre\'s no record yet`)
}

function onSaveGame(event) {
    // save `boards` to the local storage
    event.preventDefault();
    let gameState = GameState.get();
    Model.saveGame(gameState);
}

function onUploadGame(event) {
    // Upload the game from local storage
    event.preventDefault();
    let gameState = Model.uploadGame();
    // render the game
    gameState = GameState.set(gameState);
    View.renderBoard(gameState, onMove);
}

function onChangeBoard(event) {
    event.preventDefault();

    let boardDimension = prompt("Enter board dimension (between 3-8)");
    if (boardDimension && boardDimension >= 3 && boardDimension <= 8) {
        GameState.set({ boardDimension })
    }

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
    View.renderBoard(gameState, onMove)
}

export default GameController