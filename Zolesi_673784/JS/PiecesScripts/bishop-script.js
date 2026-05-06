
function tryMoveBishop(e){
    clearDraws()
    index = (GAMERTURN === "Light")? 1:-1;
    let Bishop = e.currentTarget
    if(SELECTEDPIECE){
        //se prima di quello che ho selezionato ora c'era gia un altro pezzo selezionato
        //tolgo la clearDraws, cosi che se lo riclicco non cancello
        SELECTEDPIECE.clickFunction = SELECTEDPIECE.clickFunction.filter(fn =>fn !==clearDraws)
    }
    selectPiece(Bishop)

    //movimenti
    //movimenti Alto sx
    moveInDirection(Bishop,-1*index,index)
    //movimenti Alto dx
    moveInDirection(Bishop,index,index)
    //movimenti Basso dx
    moveInDirection(Bishop,index,-1*index)
    //movimenti Basso sx
    moveInDirection(Bishop,-1*index,-1*index)
}
