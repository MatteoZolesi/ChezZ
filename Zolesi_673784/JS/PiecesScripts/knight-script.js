function tryMoveKnight(e){
    clearDraws()
    index = (GAMERTURN === "Light")? 1:-1;
    let Knight = e.currentTarget
    if(SELECTEDPIECE){
        //se prima di quello che ho selezionato ora c'era gia un altro pezzo selezionato
        //tolgo la clearDraws, cosi che se lo riclicco non cancello
        SELECTEDPIECE.clickFunction = SELECTEDPIECE.clickFunction.filter(fn =>fn !==clearDraws)
    }
    selectPiece(Knight)
    //movimenti
    //N-N-E
    let cellaNNE = nextCella(Knight,index,2*index)
    moveLikeAHorse(cellaNNE)

    //N-E-E
    let cellaNEE = nextCella(Knight,2*index,index)
    moveLikeAHorse(cellaNEE)
    
    //S-E-E
    let cellaSEE = nextCella(Knight,2*index,-1*index)
    moveLikeAHorse(cellaSEE)
    
    //S-S-E
    let cellaSSE = nextCella(Knight,index,-2*index)
    moveLikeAHorse(cellaSSE)

    //S-S-W
    let cellaSSW = nextCella(Knight,-1*index,-2*index)
    moveLikeAHorse(cellaSSW)

    //S-W-W
    let cellaSWW = nextCella(Knight,-2*index,-1*index)
    moveLikeAHorse(cellaSWW)

    //N-W-W
    let cellaNWW = nextCella(Knight,-2*index,index)
    moveLikeAHorse(cellaNWW)

    //N-N-W
    let cellaNNW = nextCella(Knight,-1*index,2*index)
    moveLikeAHorse(cellaNNW)
}
