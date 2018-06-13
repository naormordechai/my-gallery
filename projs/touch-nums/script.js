'use strict'

var gCancel;
var gscondes = 0;
var gNum = 1;
var gChoice; //{ i: 4, j: 4 } 
var gameSize;
var gNums = createNums()
var gShuffleNums = shuffle(gNums)

function createBoard(gameSize) {
    var elTbl = document.querySelector('table');
    elTbl.style.visibility = 'visible'
    gscondes = 0;
    var elTimer = document.querySelector('.timer');
    elTimer.textContent = gscondes + 's'
    clearInterval(gCancel)
    gNum = 1;
    gNums = createNums(gameSize)
    gShuffleNums = shuffle(gNums)
    var num = 0
    var elTbl = document.querySelector('.tbl');
    var strHtml = '';
    for (var i = 0; i < Math.sqrt(gameSize); i++) {
        strHtml += '<tr>'
        for (var j = 0; j < Math.sqrt(gameSize); j++) {
            strHtml += '<td class = "tbl" onclick = "cellClicked(this)">' + gShuffleNums[num] + '</td>'
            num++
        }
        strHtml += '</tr>'
    }
    elTbl.innerHTML = strHtml
}
function createNums(gameSize) {
    var nums = [];
    for (var i = 0; i < gameSize; i++) {
        nums.push(i + 1)
    }
    return nums
}

function cellClicked(elNum) {
    console.log(elNum);

    var elVictory = document.querySelector('.victory');
    if (+elNum.textContent === gNum) {
        elNum.classList.add('correct');
        gNum++
        // console.log(num);
        if (gNum === 2) gCancel = setInterval(counterSecondes, 1000);
        if (gNum === gNums.length + 1) {
            clearInterval(gCancel)
            elVictory.textContent = 'Victory'
        }
    } else {
        if (!elNum.classList.contains('correct')) {
            elNum.classList.remove('wrong')
            setTimeout(function () {
                elNum.classList.add('wrong')
            }, 1);
        }
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function counterSecondes() {
    gscondes++
    var elTimer = document.querySelector('.timer');
    elTimer.textContent = gscondes + 's'
}


