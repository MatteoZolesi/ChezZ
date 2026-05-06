function tryMoveQueen(e){
    clearDraws()

    index = (GAMERTURN === "Light")? 1:-1;
    //questa funzione viene chiamata quando clicco su un Pawn
    let Queen = e.currentTarget
    if(SELECTEDPIECE){
        //se prima di quello che ho selezionato ora c'era gia un altro pezzo selezionato
        //tolgo la clearDraws, cosi che se lo riclicco non cancello
        SELECTEDPIECE.clickFunction = SELECTEDPIECE.clickFunction.filter(fn =>fn !==clearDraws)
    }
    selectPiece(Queen)
    
    //movimenti diagonali
    //movimenti Alto sx
    moveInDirection(Queen,-1*index,index)    
    //movimenti Alto dx
    moveInDirection(Queen,index,index)
    //movimenti Basso dx
    moveInDirection(Queen,index,-1*index)
    //movimenti Basso sx
    moveInDirection(Queen,-1*index,-1*index)
    
    //movimenti orizzontali
    //su
    moveInDirection(Queen,0,index)
    //destra
    moveInDirection(Queen,index,0)
    //giu
    moveInDirection(Queen,0,-1*index)
    //sinistra
    moveInDirection(Queen,-1*index,0)
}
