let index

//questa funzione viene chiamata quando clicco su un Pawn
function tryMovePawn(e){
    
    clearDraws()

    index = (GAMERTURN === "Light")? 1:-1;
    
    let Pawn = e.currentTarget
    //se prima di quello che ho selezionato ora c'era gia un altro pezzo selezionato
    //tolgo la clearDraws, cosi che se lo riclicco non cancello
    if(SELECTEDPIECE){    
        SELECTEDPIECE.clickFunction = SELECTEDPIECE.clickFunction.filter(fn =>fn !==clearDraws)
    }
    selectPiece(Pawn)

    function mettiIPallini(cella,enpassantDisponibile){
        let board = boardStatus.map(row => [...row])
        if(movePieceOnBoard(board,SELECTEDPIECE,cella)){
            if(!isLegal(board,GAMERTURN)){
                return false
            }
            if(!getPiece(cella)){
                drawDot(cella,Pawn)
                cella.clickFunction = cella.clickFunction.filter(fn =>fn !==clearDraws)
                cella.clickFunction.push(movePiece)
                if(enpassantDisponibile){
                    cella.clickFunction.push(addEnpassant)
                }
                return true
            }
        }
        return false
    }
    function mettiICerchi(cella){
        if(!cella)return
        let board = boardStatus.map(row => [...row])
        if(movePieceOnBoard(board,SELECTEDPIECE,cella)){
            if(!isLegal(board,GAMERTURN)){
                return false
            }
            if((getPiece(cella)&& GAMERTURN !== getPieceColor(cella)) || 
                cella.classList.contains("EnPassant") ){
                drawCircle(cella,Pawn)
                cella.clickFunction = cella.clickFunction.filter(fn =>fn !==clearDraws)
                cella.clickFunction.push(movePiece)
                return true
            }
        }
        return false
    }

    //movimenti verticali
    let cellaAvanti1 = nextCella(Pawn, 0, index)
    if(mettiIPallini(cellaAvanti1,false)&& pawnNeverMoved(Pawn)){
        let cellaAvanti2 = nextCella(Pawn,0,2*index)
        mettiIPallini(cellaAvanti2,true)
    } 

    //movimenti orizzontali
    let SX = nextCella(Pawn, -1*index,index)
    mettiICerchi(SX)
    let DX = nextCella(Pawn,index,index)
    mettiICerchi(DX)
}

//ritorna true se Pawn si trova in posizione 
// di partenza 
function pawnNeverMoved(Pawn){
    let numero = Pawn.id.split("-")[1]
    if((numero === "2" && GAMERTURN === "Light") || 
    (numero === "7" && GAMERTURN === "Dark") ){
        return true
    }
    return false
}

function addEnpassant(e){
    let cellaEnpassant = nextCella(e.currentTarget,0,-1*index)
    cellaEnpassant.classList.add("EnPassant")
}
