function tryMoveTarallo(e){
    clearDraws()

    index = (GAMERTURN === "Light")? 1:-1;
    let Tarallo = e.currentTarget
    if(SELECTEDPIECE){
        //se prima di quello che ho selezionato ora c'era gia un altro pezzo selezionato
        //tolgo la clearDraws, cosi che se lo riclicco non cancello
        SELECTEDPIECE.clickFunction = SELECTEDPIECE.clickFunction.filter(fn =>fn !==clearDraws)
    }
    selectPiece(Tarallo)

    //Movimenti
    //movimenti Cavallo
    //N-N-E
    let cellaNNE = nextCella(Tarallo,index,2*index)
    moveLikeAHorse(cellaNNE)

    //N-E-E
    let cellaNEE = nextCella(Tarallo,2*index,index)
    moveLikeAHorse(cellaNEE)
    
    //S-E-E
    let cellaSEE = nextCella(Tarallo,2*index,-1*index)
    moveLikeAHorse(cellaSEE)
    
    //S-S-E
    let cellaSSE = nextCella(Tarallo,index,-2*index)
    moveLikeAHorse(cellaSSE)

    //S-S-W
    let cellaSSW = nextCella(Tarallo,-1*index,-2*index)
    moveLikeAHorse(cellaSSW)

    //S-W-W
    let cellaSWW = nextCella(Tarallo,-2*index,-1*index)
    moveLikeAHorse(cellaSWW)

    //N-W-W
    let cellaNWW = nextCella(Tarallo,-2*index,index)
    moveLikeAHorse(cellaNWW)

    //N-N-W
    let cellaNNW = nextCella(Tarallo,-1*index,2*index)
    moveLikeAHorse(cellaNNW)

    //movimenti orizzontali
    //su
    moveInDirection(Tarallo,0,index)
    //destra
    moveInDirection(Tarallo,index,0)
    //giu
    moveInDirection(Tarallo,0,-1*index)
    //sinistra
    moveInDirection(Tarallo,-1*index,0)
}
