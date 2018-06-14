'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

$(document).ready(init);

function init() {

    if (loadFromStorage('quests')) {
        gQuestsTree = loadFromStorage('quests')
    } else {
        gQuestsTree = createQuest('Male?');

        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;

}

function startGuessing() {
    // TODO: hide the gameStart section
    $('.gameStart').hide()

    renderQuest();
    // TODO: show the gameQuest section
    $('.gameQuest').show()

}

function renderQuest() {
    // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
    $('.gameQuest h2').html(gCurrQuest.txt)
}

function userResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            // TODO: improve UX
            $('.win').html('I knew it!');
            $('.gameQuest').hide()

        } else {
            // TODO: hide and show gameNewQuest section
            $('.gameQuest').hide()
            $('.gameNewQuest').show()

        }
    } else {
        // TODO: update the prev, curr and res global vars
        gPrevQuest = gCurrQuest;
        gCurrQuest = gCurrQuest[res]
        gLastRes = res
        renderQuest();
    }
}

function addGuess() {
    // TODO: create 2 new Quests based on the inputs' values
    // TODO: connect the 2 Quests to the quetsions tree
    var newQuest = $('#newQuest').val();
    var newGuess = $('#newGuess').val();

    gPrevQuest[gLastRes] = createQuest(newQuest)
    gPrevQuest[gLastRes].no = gCurrQuest;
    gPrevQuest[gLastRes].yes = createQuest(newGuess)

    restartGame();
    saveToStorage(gCurrQuest, )
    saveToStorage('quests', gQuestsTree)

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}