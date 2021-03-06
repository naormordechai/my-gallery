var GHOST = '&#9760;';

var gIntervalGhosts;
var gGhosts;


function createGhost(board) {

    var ghost = {
        color: getRandomColor(),
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD
    };
    console.log(ghost.color);   
    
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    gGhosts = [];

    createGhost(board);
    createGhost(board);
    createGhost(board);

    gIntervalGhosts = setInterval(function moveGhosts() {

        // TODO, if there are less than 3 ghosts, create one

        gGhosts.forEach(function moveGhost(ghost) {

            var nextLocation = {
                i: ghost.location.i + getRandomIntInclusive(-1, 1),
                j: ghost.location.j + getRandomIntInclusive(-1, 1)
            }
            // console.log('nextLocation', nextLocation);

            if (board[nextLocation.i][nextLocation.j] === WALL) return;
            if (board[nextLocation.i][nextLocation.j] === GHOST) return;

            var isGameOver = checkEngage(board[nextLocation.i][nextLocation.j], PACMAN);
            if (isGameOver) {
            }


            // set back what we stepped on
            board[ghost.location.i][ghost.location.j] = ghost.currCellContent;
            renderCell(ghost.location, ghost.currCellContent);

            // move the ghost
            ghost.location = nextLocation;

            // keep the contnet of the cell we are going to
            ghost.currCellContent = board[ghost.location.i][ghost.location.j];

            // move the ghost model and update dom
            board[ghost.location.i][ghost.location.j] = GHOST;
            renderCell(ghost.location, getGhostHTML(ghost));


        });

    }, 1000);
}

function getGhostHTML(ghost) {
    var color = 'red'
    if (gPacman.isSuper){
    return `<span style = "color: ${color}">${GHOST}</span>`
    }
    return `<span style = "color: ${ghost.color}">${GHOST}</span>`
}

