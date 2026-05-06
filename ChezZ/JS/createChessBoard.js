function initChessBoard(){
    let ChessBoard = document.getElementById("ChessBoard-container")
    let vet = ["a", "b","c","d","e","f","g","h"]

    let table = document.createElement("table")
    table.id = "ChessBoard"
    let counter = 0
    for(let i = 0; i < 8 ; i++){
        let tr = document.createElement("tr")
        for(let j = 0; j < 8 ; j++){
            let td = document.createElement("td")
            td.classList.add("Cella")
            td.addEventListener("contextmenu", colora)
            td.id = vet[j]+"-"+(8-i)
            if(counter%2 === 0){
                td.classList.add("Chiara")
            }else{
                td.classList.add("Scura")
            }
            counter++
            tr.appendChild(td)
            writeCoordinates(i,j,vet,td)
        }
        counter++
        table.appendChild(tr)
    }
    ChessBoard.appendChild(table)
}

function writeCoordinates(riga, colonna, vet, cella){
    if(colonna === 0){
        let p = document.createElement("p")
        p.classList.add("Numero")
        p.classList.add("SX")
        p.classList.add("no-select")
        p.textContent = 8-riga  
        cella.appendChild(p)
    }
    if(riga === 7){
        let p = document.createElement("p")
        p.classList.add("Lettera")
        p.classList.add("DX")
        p.classList.add("no-select")
        p.textContent = vet[colonna]
        cella.appendChild(p)
    }
    
}

function colora(e){
    e.preventDefault()
    e.currentTarget.classList.toggle("Colorata")
}

document.addEventListener("DOMContentLoaded", initChessBoard);
