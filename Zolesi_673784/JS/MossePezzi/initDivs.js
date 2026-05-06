document.addEventListener("DOMContentLoaded",initDivs)

function initDivs(){
    let divs = document.querySelectorAll(".BoxInfoPezzo")
    for(let d of divs){
        d.addEventListener("click", (e)=>{
            let Pezzo = e.target.id.split("-")[1]
            let pezzi = document.querySelectorAll(".Cella")
            for(let p of pezzi){
                if(getPiece(p) !== null){
                    removePiece(p)
                }
            }
            clearDrawsPrivata()
            let Spiegazioni = document.querySelector("#Spiegazioni")
            if(Spiegazioni){
                let corpo = document.querySelector("#corpo")
                corpo.removeChild(Spiegazioni)
            }
            let BoxPromozione = document.getElementById("BoxPromozione")
            if(BoxPromozione){
                let ChessBoardContainer = document.getElementById("ChessBoard-container")
                ChessBoardContainer.removeChild(BoxPromozione)
            }
            switch(Pezzo){
                case "Pawn":
                    Pawn()
                    break
                case "Rook":
                    Rook()
                    break
                case "Bishop":
                    Bishop()
                    break
                case "Knight":
                    Knight()
                    break
                case "Queen":
                    Queen()
                    break
                case "King":
                    King()
                    break
                case "Arrocco":
                    Arrocco()
                    break
                case "EnPassant":
                    EnPassant()
                    break
                case "Promozione":
                    Promozione()
                    break
                case "Cammello":
                    Camello()
                    break
                case "Tarallo":
                    Tarallo()
                    break
                case "Cavolfiore":
                    Cavolfiore()
                    break
            }
        })   
    }
}

function clearDrawsPrivata(){
    //prende tutti i Dot e li rimuove
    let DOT = [...document.querySelectorAll(".Dot")]
    for(let D of DOT){
        D.classList.remove("Dot")
        //tolgo il dot
        let figlio = D.querySelector(".dot-style")
        figlio.remove()
    }
    //prende tutti i Cerchi e li rimuove
    let CERCHIO = [...document.querySelectorAll(".Cerchio")]
    for(let C of CERCHIO){
        C.classList.remove("Cerchio")
        let figlio = C.querySelector(".CerchioGrigio")
        figlio.remove()
    }
}

function Pawn(){
    let Pawn1 = document.getElementById("d-5")
    placePiece("Pawn","Light",Pawn1)
    let King = document.getElementById("c-6")
    placePiece("King","Dark",King)
    let cella1 = document.getElementById("d-6")
    drawDot(cella1)
    drawCircle(King)

    let Pawn2 = document.getElementById("f-2")
    placePiece("Pawn", "Light",Pawn2)
    let cella2 = document.getElementById("f-3")
    drawDot(cella2)
    let cella3 = document.getElementById("f-4")
    drawDot(cella3)
    
    createBoxSpiegazioni("Pedone","Pawn")

}

function Rook(){
    let Rook = document.getElementById("d-5")
    placePiece("Rook","Light",Rook)

    let s1 = document.getElementById("d-6")
    drawDot(s1)
    let s2 = document.getElementById("d-7")
    drawDot(s2)
    let s3 = document.getElementById("d-8")
    drawDot(s3)

    let sx1 = document.getElementById("c-5")
    drawDot(sx1)
    let sx2 = document.getElementById("b-5")
    drawDot(sx2)
    let sx3 = document.getElementById("a-5")
    drawDot(sx3)

    let g1 = document.getElementById("d-4")
    drawDot(g1)
    let g2 = document.getElementById("d-3")
    drawDot(g2)
    let g3 = document.getElementById("d-2")
    placePiece("Pawn","Light",g3)

    let dx1 = document.getElementById("e-5")
    drawDot(dx1)
    let dx2 = document.getElementById("f-5")
    drawDot(dx2)

    let King = document.getElementById("g-5")
    placePiece("King","Dark",King)
    drawCircle(King)

    createBoxSpiegazioni("Torre","Rook")
}

function Knight(){
    let Knight = document.getElementById("d-5")
    placePiece("Knight","Light",Knight)
    let cella1 = document.getElementById("d-6")
    placePiece("Pawn","Dark", cella1)
    let cella2 = document.getElementById("c-6")
    placePiece("Pawn","Dark", cella2)
    let cella3 = document.getElementById("e-6")
    placePiece("Pawn","Dark", cella3)
    let cella4 = document.getElementById("e-5")
    placePiece("Pawn","Dark", cella4)
    let cella5 = document.getElementById("e-4")
    placePiece("Pawn","Dark", cella5)
    let cella6 = document.getElementById("d-4")
    placePiece("Pawn","Dark", cella6)
    let cella7 = document.getElementById("c-4")
    placePiece("Pawn","Dark", cella7)
    let cella8 = document.getElementById("c-5")
    placePiece("Pawn","Dark", cella8)

    let king = document.getElementById("f-4")
    placePiece("King","Dark",king)
    drawCircle(king)

    let d1 = document.getElementById("e-7")
    drawDot(d1)
    let d2 = document.getElementById("f-6")
    drawDot(d2)
    let d3 = document.getElementById("e-3")
    drawDot(d3)
    let d4 = document.getElementById("c-3")
    drawDot(d4)
    let d5 = document.getElementById("b-4")
    drawDot(d5)
    let d6 = document.getElementById("b-6")
    drawDot(d6)
    let d7 = document.getElementById("c-7")
    placePiece("Pawn","Light",d7)

    createBoxSpiegazioni("Cavallo","Knight")
}

function Bishop(){
    let Bishop = document.getElementById("c-5")
    placePiece("Bishop","Light",Bishop)

    let ssx1 = document.getElementById("b-6")
    drawDot(ssx1)
    let ssx2 = document.getElementById("a-7")
    drawDot(ssx2)

    let gsx1 = document.getElementById("b-4")
    drawDot(gsx1)
    let gsx2 = document.getElementById("a-3")
    drawDot(gsx2)

    let king = document.getElementById("e-7")
    placePiece("King","Dark",king)
    drawCircle(king)
    let Pawn = document.getElementById("e-3")
    placePiece("Pawn","Light",Pawn)

    let sdx = document.getElementById("d-6")
    drawDot(sdx)
    let gdx = document.getElementById("d-4")
    drawDot(gdx)

    createBoxSpiegazioni("Alfiere","Bishop")
}

function Queen(){
    let  Queen = document.getElementById("d-4")
    placePiece("Queen","Light",Queen)
    
    let King = document.getElementById("f-4")
    placePiece("King","Dark",King)
    drawCircle(King)

    let Rook = document.getElementById("f-6")
    placePiece("Rook","Dark",Rook)
    drawCircle(Rook)
    
    let Bishop = document.getElementById("d-1")
    placePiece("Bishop","Dark",Bishop)
    drawCircle(Bishop)
    
    let Knight = document.getElementById("b-4")
    placePiece("Knight","Dark",Knight)
    drawCircle(Knight)

    let  Pawn1 = document.getElementById("b-6")
    placePiece("Pawn","Light",Pawn1)
    let  Pawn2 = document.getElementById("d-7")
    placePiece("Pawn","Light",Pawn2)

    drawDot(document.getElementById("c-4"))
    drawDot(document.getElementById("c-5"))
    drawDot(document.getElementById("d-5"))
    drawDot(document.getElementById("d-6"))
    drawDot(document.getElementById("e-5"))
    drawDot(document.getElementById("e-4"))
    drawDot(document.getElementById("e-3"))
    drawDot(document.getElementById("f-2"))
    drawDot(document.getElementById("g-1"))
    drawDot(document.getElementById("d-3"))
    drawDot(document.getElementById("d-2"))
    drawDot(document.getElementById("c-3"))
    drawDot(document.getElementById("b-2"))
    drawDot(document.getElementById("a-1"))

    createBoxSpiegazioni("Regina","Queen")
}

function King(){
    placePiece("King","Light",document.getElementById("d-4"))
    placePiece("Rook","Dark",document.getElementById("e-6"))
    placePiece("Pawn","Dark",document.getElementById("c-4"))
    drawCircle(document.getElementById("c-4"))

    drawDot(document.getElementById("c-3"))
    drawDot(document.getElementById("c-5"))
    drawDot(document.getElementById("d-5"))
    drawDot(document.getElementById("d-3"))

    createBoxSpiegazioni("Re","King")
}

function Arrocco(){
    placePiece("King","Light",document.getElementById("e-1"))
    placePiece("Rook","Light",document.getElementById("a-1"))
    placePiece("Rook","Light",document.getElementById("h-1"))

    drawDot(document.getElementById("c-1"))
    drawDot(document.getElementById("g-1"))

    placePiece("King","Light",document.getElementById("g-3"))
    placePiece("Rook","Light",document.getElementById("f-3"))
    
    placePiece("King","Light",document.getElementById("c-5"))
    placePiece("Rook","Light",document.getElementById("d-5"))

    createBoxSpiegazioni("Arrocco","Arrocco")
    
}

function EnPassant(){
    placePiece("Pawn","Light",document.getElementById("e-5"))
    placePiece("Pawn","Dark",document.getElementById("f-5"))

    drawCircle(document.getElementById("f-6"))

    createBoxSpiegazioni("En Passant","EnPassant")

}

function Promozione(){
    placePiece("Pawn","Light",document.getElementById("h-7"))
    drawDot(document.getElementById("h-8"))

    function createBoxPromozione(){
        let div = document.createElement("div")
        div.id = "BoxPromozione"
        let Rook= document.createElement("div")
        let Knight= document.createElement("div")
        let Bishop= document.createElement("div")
        let Queen= document.createElement("div")
        div.appendChild(Queen)
        div.appendChild(Bishop)
        div.appendChild(Knight)
        div.appendChild(Rook)
        function placePieceInBox(type, color,cella){
            cella.classList.add(type+"-"+color)
            let immagine = document.createElement("img")
            immagine.src ="../immagini/"+color+type+".webp"
            immagine.alt="Pezzo"
            cella.appendChild(immagine)
        }
        placePieceInBox("Queen","Light",Queen)
        placePieceInBox("Bishop","Light",Bishop)
        placePieceInBox("Knight","Light",Knight)
        placePieceInBox("Rook","Light",Rook)
        let ChessBoard = document.getElementById("ChessBoard-container")
        ChessBoard.appendChild(div)
    }
    createBoxPromozione()


    createBoxSpiegazioni("Promozione","Promozione")
}

function Camello(){
    placePiece("Camel","Light",document.getElementById("d-4"))
    
    placePiece("King","Dark",document.getElementById("c-7"))
    drawCircle(document.getElementById("c-7"))

    drawDot(document.getElementById("e-7"))
    drawDot(document.getElementById("g-5"))
    drawDot(document.getElementById("g-3"))
    drawDot(document.getElementById("e-1"))
    drawDot(document.getElementById("c-1"))
    drawDot(document.getElementById("a-3"))
    drawDot(document.getElementById("a-5"))

    placePiece("Pawn","Dark",document.getElementById("e-3"))
    placePiece("Pawn","Dark",document.getElementById("e-4"))
    placePiece("Pawn","Dark",document.getElementById("e-5"))
    placePiece("Pawn","Dark",document.getElementById("d-5"))
    placePiece("Pawn","Dark",document.getElementById("c-5"))
    placePiece("Pawn","Dark",document.getElementById("c-4"))
    placePiece("Pawn","Dark",document.getElementById("c-3"))
    placePiece("Pawn","Dark",document.getElementById("d-3"))
    

    createBoxSpiegazioni("Cammello","Cammello")
}

function Tarallo(){
    placePiece("Tarallo","Light",document.getElementById("d-5"))

    drawDot(document.getElementById("d-6"))
    drawDot(document.getElementById("d-7"))
    drawDot(document.getElementById("d-8"))
    drawDot(document.getElementById("c-5"))
    drawDot(document.getElementById("b-5"))
    drawDot(document.getElementById("a-5"))
    drawDot(document.getElementById("d-4"))
    drawDot(document.getElementById("d-3"))
    placePiece("Pawn","Light",document.getElementById("d-2"))
    drawDot(document.getElementById("e-5"))
    drawDot(document.getElementById("f-5"))

    placePiece("King","Dark",document.getElementById("g-5"))
    drawCircle(document.getElementById("g-5"))

    
    drawDot(document.getElementById("c-7"))
    drawDot(document.getElementById("b-6"))
    drawDot(document.getElementById("b-4"))
    drawDot(document.getElementById("c-3"))
    drawDot(document.getElementById("e-3"))
    drawDot(document.getElementById("f-4"))
    drawDot(document.getElementById("f-6"))
    drawDot(document.getElementById("e-7"))

    createBoxSpiegazioni("Tar-allo","Tarallo")
}

function Cavolfiore(){
    placePiece("Cavolfiore","Light",document.getElementById("e-4"))

    drawDot(document.getElementById("f-6"))
    drawDot(document.getElementById("g-5"))
    drawDot(document.getElementById("g-3"))
    drawDot(document.getElementById("f-2"))
    drawDot(document.getElementById("d-2"))
    drawDot(document.getElementById("c-3"))
    drawDot(document.getElementById("c-5"))
    drawDot(document.getElementById("d-6"))

    placePiece("King","Dark",document.getElementById("c-6"))
    drawCircle(document.getElementById("c-6"))
    drawDot(document.getElementById("d-5"))
    drawDot(document.getElementById("d-3"))
    drawDot(document.getElementById("c-2"))
    drawDot(document.getElementById("b-1"))
    drawDot(document.getElementById("f-3"))
    drawDot(document.getElementById("g-2"))
    drawDot(document.getElementById("h-1"))
    drawDot(document.getElementById("f-5"))
    drawDot(document.getElementById("g-6"))
    drawDot(document.getElementById("h-7"))

    createBoxSpiegazioni("Cav-olfiore","Cavolfiore")
}

function createBoxSpiegazioni(tipo, tipoIng){
    let Spiegazioni = document.createElement("div")
    Spiegazioni.id = "Spiegazioni"
    let body = document.getElementById("corpo")
    body.appendChild(Spiegazioni)

    let titolo = document.createElement("div")
    titolo.classList.add("titolo")
    titolo.textContent=tipo
    titolo.id = tipoIng
    Spiegazioni.appendChild(titolo)

    let testo = document.createElement("div")
    testo.id = "TestoSpiegazione"
    testo.innerHTML = getTextFor(tipo)
    Spiegazioni.appendChild(testo)
}

function getTextFor(tipo){
    switch(tipo){
        case "Pedone":
            return "Il Pedone si può muovere solo in avanti di 1 casella e mangia in diagonale di 1 casella come mostrato.<br>"+
            "Se il Pedone si trova nella sua casella iniziale è possibile muoverlo anche 2 caselle in avanti."
        case "Torre":
            return "La Torre si muove in orizzontale e in verticale finché non trova ostacoli nel mezzo.<br>"+
            "Se l'ostacolo è un pezzo dell'avversario lo può mangiare."
        case "Cavallo":
            return "Il Cavallo si muove a forma di L come mostrato.<br>"+ 
            "Il Cavallo 'salta', ovvero i pezzi nel mezzo non gli impediscono il movimento."
        case "Alfiere":
            return "L'Alfiere si muove in diagonale.<br>" +
            "Ogni Alfiere rimane su caselle dello stesso colore per tutta la partita!"
        case "Regina":
            return "La Regina è il pezzo più forte, perché controlla più caselle di tutti gli altri pezzi.<br>"+
            "Si muove sia come la torre che come l'alfiere.<br>"+"Fai attenzione, perderla potrebbe costarti la partita!"
        case "Re":
            return "Il Re è la 'vita' del giocatore.<br>"+ "L'obbiettivo è proteggerlo dai pezzi avversari.<br>"+
            "Si può muovere e mangiare di 1 casella in ogni direzione, a meno che questa non sia controllata da un pezzo avversario."
        case "Arrocco":
            return "L'arrocco è una mossa difensiva che ti permette di spostare il Re di due caselle orizzontali" +
            " (ovviamente se entrambe le caselle non sono controllate da pezzi avversari).<br>" +
            "Inoltre sposta la torre più vicina alla casella scelta accanto al Re.<br>"+ 
            "L'arrocco è possibile solo se il Re e la Torre coinvolta non si sono mai mossi.<br>" +"Esiste di due tipi: Arrocco Lungo e Arrocco Corto, "+
            "la differenza sta nel lato e nella Torre coinvolta.<br>"+
            "Nella riga 3 c'è un esempio di come risulterebbe l'Arrocco Corto.<br>"+
            "Nella riga 5 c'è un esempio di come risulterebbe l'Arrocco Lungo."
        case "En Passant":
            return "Se l’avversario ha appena mosso uno dei suoi Pedoni di due caselle in avanti partendo " +
            "dalla posizione iniziale e questo si è affiancato al tuo Pedone, puoi catturarlo En Passant.<br>"+
            "La cattura avviene come se il Pedone avversario si fosse mosso di una sola casella."
        case "Promozione":
            return "Se un Pedone arriva in fondo alla scacchiera, dopo aver cliccato per spostarlo compare un rettangolo contenente i pezzi"+
            " che il giocatore può scegliere. Il pedone si trasformerà nel pezzo selezionato."
        case "Cammello":
            return "Il Cammello si muove in modo simile al Cavallo, solo una casella più sul lato lungo."
        case "Tar-allo":
            return "Il Tar-allo è la fusione tra una Torre e un Cavallo, si muove come entrambi."
        case "Cav-olfiore":
            return "Il Cav-olfiore è la fusione tra un Cavallo e un Alfiere, si muove come entrambi."
        default:
            return null
    }
}