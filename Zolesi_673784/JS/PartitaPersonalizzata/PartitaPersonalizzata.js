let TIPOPEZZODAINSERIRE;
let COLOREPEZZODAINSERIRE;

let selezionato = null;
let mode = null; // sposta, piazza, null

//funzioni di utilita ====================================================================

function mettiToltip(cella, stringa) {
  cella.classList.add("tooltip-cella");
  cella.setAttribute("data-tooltip", stringa);
}

function coloraDiAzzurro(cella) {
  rimuoviAzzurro();
  cella.classList.add("Azzurro");
}

function rimuoviAzzurro() {
  let Azzurro = document.querySelector(".Azzurro");
  if (Azzurro) {
    Azzurro.classList.remove("Azzurro");
  }
}

function CellaCliccata(e) {

  let cella = e.currentTarget;
  if (getPiece(cella)&&cella.id !== "cestino") {
    switch (mode) {
      case null:
      case "piazza":
      case "sposta":
        selezionato = cella;
        mode = cella.classList.contains("Cella")? "sposta": "piazza";
        break;
    }
    coloraDiAzzurro(cella);
  } else {
    switch (mode) {
      case null:
        break;
      case "piazza":
        piazza(cella);
        selezionato = null;
        mode = null;
        break;
      case "sposta":
        if(cella.id==="cestino"){
          rimuovi()
        }else{
          sposta(cella);
        }
        selezionato = null;
        mode = null;
        break;
    }
    cella.classList.remove("Selezionabile");
    rimuoviAzzurro();
  }
  
  console.log("Casella selezionata: "); 
  console.log(selezionato);
  console.log("Modalita: " + mode);
  console.log("boardStatus:");
  console.log(boardStatus);

  let gioca = document.getElementById("Gioca");
  gioca.disabled = !checkForStart();
}

function piazza(end) {
  placePiece(getPiece(selezionato), getPieceColor(selezionato), end);
  setPieceFromImage(selezionato);
  let [r, c] = getIndexForStatusBoard(end);
  boardStatus[r][c] = TIPOPEZZODAINSERIRE + "-" + COLOREPEZZODAINSERIRE;
}

function rimuovi(){
  let [r,c] = getIndexForStatusBoard(selezionato);
  boardStatus[r][c] = null;
  removePiece(selezionato)
}

function sposta(end) {
  moveFromStartToEnd(selezionato, end);
  movePieceOnBoard(boardStatus, selezionato, end);
}

function setPieceFromImage(cella) {
  let immaginesrc = cella.querySelector("img").src;

  // prendi solo l'ultimo pezzo del path
  let immagine = immaginesrc.split("/").pop();

  // rimuovi l'estensione .webp
  immagine = immagine.split(".webp")[0];

  if (immagine[0] === "D") {
    COLOREPEZZODAINSERIRE = "Dark";
    TIPOPEZZODAINSERIRE = immagine.slice(4);
  } else {
    COLOREPEZZODAINSERIRE = "Light";
    TIPOPEZZODAINSERIRE = immagine.slice(5);
  }
}

function PiuDiUnReColor(color) {
  let temp = boardStatus.map((row) => [...row]);
  let [r, c] = findKingOnBoardStatus(temp, color);
  temp[r][c] = null;
  if (findKingOnBoardStatus(temp, color)) {
    return true;
  }
  return false;
}

function SoloIRe() {
  function contieneRe(str) {
    if (str === null) {
      return true;
    }
    let tipo = str.split("-")[0];
    if (tipo === "King") {
      return true;
    } else {
      return false;
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (!contieneRe(boardStatus[i][j])) {
        return false;
      }
    }
  }
  return true;
}

function checkForStart() {
  if (
    findKingOnBoardStatus(boardStatus, "Light") &&
    findKingOnBoardStatus(boardStatus, "Dark") &&
    !isKingCheck(boardStatus, "Light") &&
    !isKingCheck(boardStatus, "Dark") &&
    hasLegalMoves("Light") &&
    !PiuDiUnReColor("Light") &&
    !PiuDiUnReColor("Dark") &&
    !SoloIRe()
  ) {
    return true;
  }
  return false;
}

//Quando viene caricato il DOM ================================================
document.addEventListener("DOMContentLoaded", placePieceContainer);

function placePieceContainer() {
  document.body.appendChild(creaPieceContainer());
  createChoosingTable();
}

function createChoosingTable() {
  let table = document.createElement("table");
  table.classList.add("TabellaPezziDaScegliere");

  for (let i = 0; i < 3; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 6; j++) {
      let td = document.createElement("td");
      td.classList.add("PezziDaScegliere");
      td.id = i + "-" + j;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  let PieceContainer = document.getElementById("PieceContainer");
  PieceContainer.appendChild(table);
  placePiece("Rook", "Dark", document.getElementById("0-0"));
  mettiToltip(document.getElementById("0-0"), "Torre Nera");
  placePiece("Knight", "Dark", document.getElementById("0-1"));
  mettiToltip(document.getElementById("0-1"), "Cavallo Nero");
  placePiece("Bishop", "Dark", document.getElementById("0-2"));
  mettiToltip(document.getElementById("0-2"), "Alfiere Nero");
  placePiece("Pawn", "Dark", document.getElementById("0-3"));
  mettiToltip(document.getElementById("0-3"), "Pedone Nero");
  placePiece("Queen", "Dark", document.getElementById("0-4"));
  mettiToltip(document.getElementById("0-4"), "Regina Nera");
  placePiece("King", "Dark", document.getElementById("0-5"));
  mettiToltip(document.getElementById("0-5"), "Re Nero");

  placePiece("Camel", "Dark", document.getElementById("1-0"));
  mettiToltip(document.getElementById("1-0"), "Cammello Nero");
  placePiece("Cavolfiore", "Dark", document.getElementById("1-1"));
  mettiToltip(document.getElementById("1-1"), "Cavolfiore Nero");
  placePiece("Tarallo", "Dark", document.getElementById("1-2"));
  mettiToltip(document.getElementById("1-2"), "Tarallo Nero");
  placePiece("Tarallo", "Light", document.getElementById("1-3"));
  mettiToltip(document.getElementById("1-3"), "Tarallo Bianco");
  placePiece("Cavolfiore", "Light", document.getElementById("1-4"));
  mettiToltip(document.getElementById("1-4"), "Cavolfiore Bianco");
  placePiece("Camel", "Light", document.getElementById("1-5"));
  mettiToltip(document.getElementById("1-5"), "Cammello Bianco");

  placePiece("Rook", "Light", document.getElementById("2-0"));
  mettiToltip(document.getElementById("2-0"), "Torre Bianca");
  placePiece("Knight", "Light", document.getElementById("2-1"));
  mettiToltip(document.getElementById("2-1"), "Cavallo Bianco");
  placePiece("Bishop", "Light", document.getElementById("2-2"));
  mettiToltip(document.getElementById("2-2"), "Alfiere Bianco");
  placePiece("Pawn", "Light", document.getElementById("2-3"));
  mettiToltip(document.getElementById("2-3"), "Pedone Bianco");
  placePiece("Queen", "Light", document.getElementById("2-4"));
  mettiToltip(document.getElementById("2-4"), "Regina Bianca");
  placePiece("King", "Light", document.getElementById("2-5"));
  mettiToltip(document.getElementById("2-5"), "Re Bianco");

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
      let c = document.getElementById(i + "-" + j);
      c.addEventListener("click", CellaCliccata);
    }
  }
  let celle = document.querySelectorAll(".Cella");

  for (let c of celle) {
    c.classList.add("Selezionabile");
    c.addEventListener("click", CellaCliccata);
  }
}

document.addEventListener("DOMContentLoaded", initBTNGioca);

function initBTNGioca() {
  let Gioca = document.getElementById("Gioca");
  Gioca.addEventListener("click", iniziaGioco);
}

document.addEventListener("DOMContentLoaded", InitBottoneMenu);

function InitBottoneMenu() {
  let MenuPrincipaleBTN = document.getElementById("MenuPrincipale");
  MenuPrincipaleBTN.addEventListener("click", () => {
    goTo("../index.php");
  });
}

//inizio gioco==================================================================
let handler = (e) => {
  [...e.currentTarget.clickFunction].forEach((fn) => fn(e));
};

function iniziaGioco() {
  console.log("GIOCO INIZIATO");
  rimuoviAzzurro();

  let celle = document.querySelectorAll(".Cella");
  for (c of celle) {
    c.removeEventListener("click", CellaCliccata);
    c.clickFunction = [];
    c.addEventListener("click", handler);
    c.clickFunction.push(clearDraws);
  }

  let vuote = document.querySelectorAll(".Selezionabile");
  for (let v of vuote) {
    v.classList.remove("Selezionabile");
  }
  let withepieces = getAllGamerPieces();
  for (let w of withepieces) {
    w.clickFunction = [];
  }

  let PieceContainer = document.getElementById("PieceContainer");
  PieceContainer.innerHTML = "";
  PieceContainer.id = "GameTracker";
  creaGameTracker(PieceContainer);
  setAllTryMove();
}

function creaGameTracker(GameTracker) {
  let btn = document.createElement("button");
  btn.id = "MenuPrincipaleBTN";
  btn.textContent = "Menu Principale";
  btn.addEventListener("click", () => goTo("../index.php"));

  let nomi = document.createElement("div");
  nomi.id = "Nomi";

  let giocatore = document.createElement("p");
  giocatore.innerText = "Bianco";

  let vs = document.createElement("span");
  vs.innerHTML = "vs <br>";

  let avversario = document.createElement("p");
  avversario.innerText = "Nero";

  nomi.appendChild(giocatore);
  nomi.appendChild(vs);
  nomi.appendChild(avversario);

  GameTracker.appendChild(btn);

  GameTracker.appendChild(nomi);
}

//fine gioco==================================================================
document.addEventListener("PartitaFinita", initBtn);

function initBtn() {
  let btn = document.getElementById("BtnReset");
  btn.addEventListener("click", reset);
}

function creaPieceContainer() {
  let pieceContainer = document.createElement("div");
  pieceContainer.id = "PieceContainer";

  let btnContainer = document.createElement("div");
  btnContainer.id = "BtnContainer";

  let menuBtn = document.createElement("button");
  menuBtn.id = "MenuPrincipale";
  menuBtn.textContent = "Menu Principale";

  let giocaBtn = document.createElement("button");
  giocaBtn.id = "Gioca";
  giocaBtn.textContent = "Gioca";
  giocaBtn.disabled = true;
  giocaBtn.className = "tooltip-btn";
  giocaBtn.dataset.tooltip = "Partita non valida";

  let cestino = document.createElement("div");
  cestino.id = "cestino";
  let img = document.createElement("img");
  img.src = "../immagini/cestino.svg";
  img.alt = "Cestino";
  cestino.appendChild(img);
  cestino.className = "tooltip-cella";
  cestino.dataset.tooltip = "Clicca per rimuovere il pezzo selezionato";
  cestino.addEventListener("click", CellaCliccata);

  btnContainer.appendChild(menuBtn);
  btnContainer.appendChild(giocaBtn);
  btnContainer.appendChild(cestino);
  pieceContainer.appendChild(btnContainer);

  return pieceContainer;
}

function reset() {
  let GameTracker = document.getElementById("GameTracker");
  GameTracker.remove();
  document.body.appendChild(creaPieceContainer());
  removeAllPiece();
  if (GAMERTURN === "Dark") {
    rotateChessBoard();
  }
  let celle = document.querySelectorAll(".Cella");
  for (let c of celle) {
    c.removeEventListener("click", handler);
  }
  createChoosingTable();
  initBTNGioca();
  InitBottoneMenu();
}
