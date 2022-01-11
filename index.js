const cellClass = 'game-cell';

const gameCells = document.getElementsByClassName(cellClass);
const restartButton = document.getElementById('restart');
const playerOneScore = document.getElementById('score-X');
const playerTwoScore = document.getElementById('score-O');

let gameTable;
let playerOne;

restartButton.onclick = startGame;

startGame();

function startGame () {
    gameTable = Array(9).fill(".");

    playerOne = true;

    for (let i = 0; i < gameCells.length; i++ ) {
        gameCells[i].textContent = '.';
        gameCells[i].classList.remove('clicked');
        gameCells[i].classList.remove('player-1-win');
        gameCells[i].classList.remove('player-2-win');
        gameCells[i].onclick = registerClicker;
    }
}

function restoreGameTable () {
    for (let i = 0; i < gameCells.length; i++ )
        gameTable[i] = gameCells[i].textContent;   
}

function registerClicker() {
    const playerChar = playerOne ? 'X' : 'O';

    this.textContent = playerChar;
    this.onclick = null;
    this.classList.add('clicked');

    restoreGameTable();
    changeGameState(verifyWin());

    playerOne = !playerOne;
}

function changeGameState ({ win, winType, firstIndex }) {
    if(!win)
        return;
    
    for (let i = 0; i < gameCells.length; i++ ) {
        gameCells[i].onclick = null;
        if(gameCells[i] === '.')
            gameCells[i].classList.add('clicked');
    }

    showWinnerCells(winType, firstIndex);

    if(playerOne)
        playerOneScore.textContent = parseInt(playerOneScore.textContent) + 1;
    else
        playerTwoScore.textContent = parseInt(playerTwoScore.textContent) + 1;
    
}

function showWinnerCells(winType, firstIndex) {
    let winnerClass = playerOne ? 'player-1-win' : 'player-2-win';

    let first, second, third;

    first = second = third = 0;

    if(winType[0]) {
        first = firstIndex[0];
        second = first + 1;
        third = first + 2;
    } else if(winType[1]) {
        first = firstIndex[1];
        second = first + 3;
        third = first + 6;
    } else if(winType[2]) {
        first = firstIndex[2];
        second = first + 4;
        third = first + 8;
    } else if(winType[3]) {
        first = firstIndex[3];
        second = first + 2;
        third = first + 4;
    }

    gameCells[first].classList.add(winnerClass);
    gameCells[second].classList.add(winnerClass);
    gameCells[third].classList.add(winnerClass);
}

function verifyWin () {
    const playerChar = playerOne ? 'X' : 'O';
    
    let winType = [false, false, false, false];
    let firstIndex = [0, 0, 0, 0];

    let win = false;
    let index = 0;

    for( let i = 0; i < 3; i++ ){
        index = i * 3;
        winType[0] = verifyLineValidity (index, index + 1, index + 2);
        firstIndex[0] = index;

        win = win || winType[0];
        if(win)
            break;
    }

    for( let i = 0; i < 3; i++ ){
        index = i;

        winType[1] = verifyLineValidity (index, index + 3, index + 6);
        firstIndex[1] = index;

        win = win || winType[1];
        
        if(win)
            break;
    }

    index = 0;
    winType[2] = verifyLineValidity (index, index + 4, index + 8);
    firstIndex[2] = index;
    win = win || winType[2];

    index = 2;
    winType[3] = verifyLineValidity (index, index + 2, index + 4);
    firstIndex[3] = index;
    win = win || winType[3];  

    return { win: win, winType: winType, firstIndex: firstIndex};
}

function verifyLineValidity (first, second, third) {
    const playerChar = playerOne ? 'X' : 'O';

    if(gameTable[first] !== playerChar)
        return false;
        
    if(gameTable[second] !== playerChar)
        return false;

    if(gameTable[third] !== playerChar)
        return false;

    return true;
}



