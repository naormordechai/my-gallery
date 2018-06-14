'use strict'
var BOOM = '💣';
var elImg = document.querySelector('.img-mood');
var elTimer = document.querySelector('.timer');
var gCancel;
var gLevel = { SIZE: 0, MINES: 0 };
var gState = {
    isGameOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var IMAGE_SAD = '<img src="img/sad.jpg">'
var IMAGE_GLASS = "<img src ='img/glass.jpg'>"
var IMAGE_SMILE = "<img src ='img/smile.png'>"
var gBoard = buildBoard();
printBestResPerLevel()

function printBestResPerLevel() {
    document.querySelector('.best-time-beginner').innerHTML = localStorage.getItem('bestTimeB');
    document.querySelector('.best-time-medium').innerHTML = localStorage.getItem('bestTimeM');
    document.querySelector('.best-time-expert').innerHTML = localStorage.getItem('bestTimeE');
}

// createBooms()
// renderBoard()
// console.log(gBoard);

function getLevelBeginner() {
    gLevel = {
        SIZE: 4,
        MINES: 2
    }
    gState = {
        isGameOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    clearInterval(gCancel)
    elTimer.innerHTML = ''
    gBoard = buildBoard()
    createBooms()
    renderBoard()
    elImg.innerHTML = IMAGE_SMILE;

}

function getLevelMedium() {

    gLevel = {
        SIZE: 6,
        MINES: 5    
    }
    gState = {
        isGameOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    clearInterval(gCancel)
    elTimer.innerHTML = ''
    gBoard = buildBoard()
    createBooms()
    renderBoard()
    elImg.innerHTML = IMAGE_SMILE;
}

function getLevelExpert() {
    gLevel = {
        SIZE: 8,
        MINES: 15
    }
    gState = {
        isGameOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    clearInterval(gCancel)
    elTimer.innerHTML = ''
    gBoard = buildBoard()
    createBooms()
    renderBoard()
    elImg.innerHTML = IMAGE_SMILE;
}

function getRandomInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    var num = (Math.floor(Math.random() * max - min) + min);
    return num
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { bombsAroundCount: 0, isShown: false, isBomb: false, isMarked: false, }
        }
    }
    return board
}

function createBooms() {
    for (var i = 0; i < gLevel.MINES; i++) {
        var randNumI = getRandomInt(0, gLevel.SIZE)
        var randNumJ = getRandomInt(0, gLevel.SIZE)
        if (gBoard[randNumI][randNumJ].isBomb) i--
        else gBoard[randNumI][randNumJ].isBomb = true
    }
}

function renderBoard() {
    var elBoard = document.querySelector('.board');
    var strHtml = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHtml += "<tr oncontextmenu='return false'>"
        for (var j = 0; j < gBoard[0].length; j++) {
            strHtml += `<td class = 'cell cell-${i}-${j}' onclick =
             'cellClicked(this,${i},${j}) 'oncontextmenu = 'cellMarked(this,${i},${j})'>`
            if (gBoard[i][j].isBomb && gBoard[i][j].isShown) {
                strHtml += BOOM
            }
            strHtml += "</td>"
        }
        strHtml += "</tr>"
    }
    elBoard.innerHTML = strHtml;
}

function cellClicked(elCell, i, j) {
    // expandShown(elCell, i, j)

    var currCell = gBoard[i][j]
    // console.log(elCell);
    if (!gState.isGameOn || currCell.isShown) return
    if (!currCell.isShown && elCell.innerText !== 'F') {
        currCell.isShown = true
        gState.shownCount++
        // console.log('shown count', gState.shownCount);
    }
    if (gState.shownCount === 1) {
        gCancel = setInterval(startTimer, 1000)
    }
    if (!elCell.innerHTML && currCell.isBomb) {
        elImg.innerHTML = IMAGE_SAD;
        clearInterval(gCancel)
        gState.isGameOn = false
        openBooms()
    }
    else {
        if (!currCell.isMarked) {
            elCell.innerHTML = setNegsCount(i, j, gBoard)

            // console.log(setNegsCount(i, j, gBoard));
        }
    }

    if (gBoard[i][j].bombsAroundCount === 0 && !gBoard[i][j].isBomb && !gBoard[i][j].isMarked) {
        expandShown(elCell, gBoard, i, j)
    }
    // console.log(gBoard[i][j].bombsAroundCount);
    checkFinishGame()
}


function setNegsCount(rowIdx, colIdx, board) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i >= 0 && i < board.length) {
            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                if (j >= 0 && j < board.length) {
                    if (board[i][j].isBomb) {
                        // console.log(board[i][j]);
                        board[rowIdx][colIdx].bombsAroundCount++
                    }
                }
            }
        }
    }
    // if (board[rowIdx][colIdx] === BOOM) board[rowIdx][colIdx].bombsAroundCount--
    // console.log('NegsCount', board[rowIdx][colIdx].bombsAroundCount);


    return board[rowIdx][colIdx].bombsAroundCount
}

function checkFinishGame() {
    var elBestTime = document.querySelector('.best-time');
    console.log(elBestTime);

    var countCells = gState.shownCount + gState.markedCount
    // console.log('countCells', countCells);
    // console.log(countCells);

    if (gLevel.SIZE ** 2 === countCells) {
        elImg.innerHTML = IMAGE_GLASS;
        if (gLevel.SIZE === 4) {
            if (gState.secsPassed < Infinity) {
                if (localStorage.getItem('bestTimeB') === null || gState.secsPassed < localStorage.getItem('bestTimeB')) {
                    localStorage.setItem('bestTimeB', gState.secsPassed)
                }
            }
        }

        if (gLevel.SIZE === 6) {
            if (gState.secsPassed < Infinity) {
                if (localStorage.getItem('bestTimeM') === null || gState.secsPassed < localStorage.getItem('bestTimeM')) {
                    localStorage.setItem('bestTimeM', gState.secsPassed)
                }
            }
        }

        if (gLevel.SIZE === 8) {
            if (gState.secsPassed < Infinity) {
                if (localStorage.getItem('bestTimeE') === null || gState.secsPassed < localStorage.getItem('bestTimeE')) {
                    localStorage.setItem('bestTimeE', gState.secsPassed)
                }
            }
        }
        // console.log('victory!!!!!!!!!!!!');
        clearInterval(gCancel)
        gState.isGameOn = false
    }
}

function startTimer() {
    var el = document.querySelector('.timer');
    gState.secsPassed += 1;
    el.innerText = gState.secsPassed + 's'
}

function openBooms() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isBomb) {
                gBoard[i][j].isShown = true
            }
        }
    }
    renderBoard()
}

function cellMarked(elCell, i, j) {
    if (!gState.isGameOn || gBoard[i][j].isShown) return
    var currCell = gBoard[i][j];
    if (!currCell.isMarked) {
        currCell.isMarked = true
        elCell.textContent = 'F'
        if (currCell.isBomb) gState.markedCount++
    }
    else {
        if (currCell.isBomb) gState.markedCount--
        currCell.isMarked = false;
        elCell.textContent = ''
    }
    // console.log(gState.markedCount);
    checkFinishGame()
}


function expandShown(elCell, board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i >= 0 && i < board.length) {
            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                if (j >= 0 && j < board.length) {
                    if (!board[i][j].isShown && !board[i][j].isMarked) {
                        board[i][j].isShown = true
                        gState.shownCount++
                        var currCell = document.querySelector(`.cell-${i}-${j}`);
                        if (elCell.innerText !== 'F' && !board[i][j].isMarked) {
                            currCell.innerText = setNegsCount(i, j, board);
                        }
                        if (!board[i][j].bombsAroundCount) {
                            for (var iIdx = i - 1; iIdx <= i + 1; iIdx++) {
                                if (iIdx >= 0 && iIdx < board.length) {
                                    for (var jIdx = j - 1; jIdx <= j + 1; jIdx++) {
                                        if (jIdx >= 0 && jIdx < board.length) {
                                            if (!board[iIdx][jIdx].isShown && !board[iIdx][jIdx].isMarked) {
                                                board[iIdx][jIdx].isShown = true
                                                gState.shownCount++
                                                var currCelll = document.querySelector(`.cell-${iIdx}-${jIdx}`);
                                                if (elCell.innerText !== 'F' && !board[iIdx][jIdx].isMarked) {
                                                    currCelll.innerText = setNegsCount(iIdx, jIdx, board);
                                                }
                                            }
                                        }
                                    }
                                    // console.log(board[i][j]);
                                    // board[rowIdx][colIdx].bombsAroundCount++
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function newGame() {
    location.reload()
}
