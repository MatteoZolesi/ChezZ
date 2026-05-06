function tryMoveCamel(e){
    clearDraws()

    index = (GAMERTURN === "Light")? 1:-1;
    let Camel = e.currentTarget
    if(SELECTEDPIECE){
        //se prima di quello che ho selezionato ora c'era gia un altro pezzo selezionato
        //tolgo la clearDraws, cosi che se lo riclicco non cancello
        SELECTEDPIECE.clickFunction = SELECTEDPIECE.clickFunction.filter(fn =>fn !==clearDraws)
    }
    selectPiece(Camel)


    //movimenti
    //N-N-E
    let cellaNNE = nextCella(Camel,index,3*index)
    canCamel(cellaNNE)

    //N-E-E
    let cellaNEE = nextCella(Camel,3*index,index)
    canCamel(cellaNEE)
    
    //S-E-E
    let cellaSEE = nextCella(Camel,3*index,-1*index)
    canCamel(cellaSEE)
    
    //S-S-E
    let cellaSSE = nextCella(Camel,index,-3*index)
    canCamel(cellaSSE)

    //S-S-W
    let cellaSSW = nextCella(Camel,-1*index,-3*index)
    canCamel(cellaSSW)

    //S-W-W
    let cellaSWW = nextCella(Camel,-3*index,-1*index)
    canCamel(cellaSWW)

    //N-W-W
    let cellaNWW = nextCella(Camel,-3*index,index)
    canCamel(cellaNWW)

    //N-N-W
    let cellaNNW = nextCella(Camel,-1*index,3*index)
    canCamel(cellaNNW)

}

function canCamel(cella){
    if(cella){
        let board = boardStatus.map(row => [...row]);
        if(movePieceOnBoard(board,SELECTEDPIECE,cella)){
            if(!isLegal(board,GAMERTURN)){
                return
            }
        }

        if(getPieceColor(cella) === null){
            drawDot(cella)
            cella.clickFunction.push(movePiece)
        }else if(getPieceColor(cella) !== GAMERTURN){
            drawCircle(cella)
            cella.clickFunction.push(movePiece)
        } 
    }
}
