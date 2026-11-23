import './style.css';
const gameArea = document.querySelector('#gameArea');
const gamePieces = document.querySelector('#gamePieces');
const resetButton = document.querySelector('#resetButton');

let zIndex = 1;

// Save the current picture
function saveGame() {
    const pieces = document.querySelectorAll('.gamePiece');

    const savedPieces = [];

    pieces.forEach(piece => {
        savedPieces.push({
            src: piece.src,
            left: piece.style.left,
            top: piece.style.top,
            zIndex: piece.style.zIndex
        });
    });

    localStorage.setItem('potatoGame', JSON.stringify(savedPieces));
}


// Create a new piece
function newGamePiece(e) {
    const newPiece = document.createElement('img');

    newPiece.src = e.target.src;
    newPiece.classList.add('gamePiece');

    gameArea.appendChild(newPiece);

  const areaRect = gameArea.getBoundingClientRect();

newPiece.style.left = (e.clientX - areaRect.left - 40) + 'px';
newPiece.style.top = (e.clientY - areaRect.top - 40) + 'px';

    newPiece.style.zIndex = ++zIndex;

    startDrag(newPiece, e);
}


// Handle dragging
function startDrag(piece, e) {
    e.preventDefault();

    const areaRect = gameArea.getBoundingClientRect();

    const pieceRect = piece.getBoundingClientRect();

    const offsetX = e.clientX - pieceRect.left;
    const offsetY = e.clientY - pieceRect.top;

    piece.style.zIndex = ++zIndex;

    function movePiece(e) {
        let x = e.clientX - areaRect.left - offsetX;
        let y = e.clientY - areaRect.top - offsetY;

        // Keep the piece inside the game area
        x = Math.max(0, Math.min(x, gameArea.clientWidth - piece.offsetWidth));
        y = Math.max(0, Math.min(y, gameArea.clientHeight - piece.offsetHeight));

        piece.style.left = x + 'px';
        piece.style.top = y + 'px';
    }

    function stopDrag() {
        document.removeEventListener('pointermove', movePiece);
        document.removeEventListener('pointerup', stopDrag);

        saveGame();
    }

    document.addEventListener('pointermove', movePiece);
    document.addEventListener('pointerup', stopDrag);
}


// Drag pieces from the picker
gamePieces.addEventListener('pointerdown', e => {
    if (e.target.tagName === 'IMG') {
        newGamePiece(e);
    }
});


// Drag pieces already on the potato
gameArea.addEventListener('pointerdown', e => {
    if (e.target.classList.contains('gamePiece')) {
        startDrag(e.target, e);
    }
});


// Restore the saved picture
function loadGame() {
    const savedPieces = JSON.parse(localStorage.getItem('potatoGame')) || [];

    savedPieces.forEach(savedPiece => {
        const piece = document.createElement('img');

        piece.src = savedPiece.src;
        piece.classList.add('gamePiece');

        piece.style.left = savedPiece.left;
        piece.style.top = savedPiece.top;
        piece.style.zIndex = savedPiece.zIndex;

        gameArea.appendChild(piece);

        zIndex = Math.max(zIndex, Number(savedPiece.zIndex) || 0);
    });
}


// Start over
resetButton.addEventListener('click', () => {
    document.querySelectorAll('.gamePiece').forEach(piece => {
        piece.remove();
    });

    localStorage.removeItem('potatoGame');
    zIndex = 1;
});


// Load saved game when page opens
loadGame();