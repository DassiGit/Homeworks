function newGamePiece(e){
    const newPiece = document.createElement('img');
    newPiece.src = e.target.src;
    document.querySelector('#gameArea').appendChild(newPiece);
}