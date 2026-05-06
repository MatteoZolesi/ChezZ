function tryMoveRook(e){
    clearDraws()
    index = (GAMERTURN === "Light")? 1:-1;
    //questa funzione viene chiamata quando clicco su un Pawn
    let Rook = e.currentTarget
    if(SELECTEDPIECE){
        //se prima di quello che ho selezionato ora c'era gia un altro pezzo selezionato
        //tolgo la clearDraws, cosi che se lo riclicco non cancello
        SELECTEDPIECE.clickFunction = SELECTEDPIECE.clickFunction.filter(fn =>fn !==clearDraws)
    }
    selectPiece(Rook)

    //movimenti
    //su
    moveInDirection(Rook,0,index)
    //destra
    moveInDirection(Rook,index,0)
    //giu
    moveInDirection(Rook,0,-1*index)
    //sinistra
    moveInDirection(Rook,-1*index,0)
}
