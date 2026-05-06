function tryMoveCavolfiore(e){
    clearDraws()

    index = (GAMERTURN === "Light")? 1:-1;
    let Cavolfiore = e.currentTarget
    if(SELECTEDPIECE){
        //se prima di quello che ho selezionato ora c'era gia un altro pezzo selezionato
        //tolgo la clearDraws, cosi che se lo riclicco non cancello
        SELECTEDPIECE.clickFunction = SELECTEDPIECE.clickFunction.filter(fn =>fn !==clearDraws)
    }
    selectPiece(Cavolfiore)

    //Movimenti
    //movimenti Cavallo
    //N-N-E
    let cellaNNE = nextCella(Cavolfiore,index,2*index)
    moveLikeAHorse(cellaNNE)

    //N-E-E
    let cellaNEE = nextCella(Cavolfiore,2*index,index)
    moveLikeAHorse(cellaNEE)
    
    //S-E-E
    let cellaSEE = nextCella(Cavolfiore,2*index,-1*index)
    moveLikeAHorse(cellaSEE)
    
    //S-S-E
    let cellaSSE = nextCella(Cavolfiore,index,-2*index)
    moveLikeAHorse(cellaSSE)

    //S-S-W
    let cellaSSW = nextCella(Cavolfiore,-1*index,-2*index)
    moveLikeAHorse(cellaSSW)

    //S-W-W
    let cellaSWW = nextCella(Cavolfiore,-2*index,-1*index)
    moveLikeAHorse(cellaSWW)

    //N-W-W
    let cellaNWW = nextCella(Cavolfiore,-2*index,index)
    moveLikeAHorse(cellaNWW)

    //N-N-W
    let cellaNNW = nextCella(Cavolfiore,-1*index,2*index)
    moveLikeAHorse(cellaNNW)

    //movimenti diagonali
    //movimenti Alto sx
    moveInDirection(Cavolfiore,-1*index,index)    
    //movimenti Alto dx
    moveInDirection(Cavolfiore,index,index)
    //movimenti Basso dx
    moveInDirection(Cavolfiore,index,-1*index)
    //movimenti Basso sx
    moveInDirection(Cavolfiore,-1*index,-1*index)
}
