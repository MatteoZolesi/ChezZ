const boardStatus = Array.from({ length: 8 }, () => Array(8).fill(null));
let GAMERTURN = "Light";
let SELECTEDPIECE = null;

//ti Manda alla pagina di Url
function goTo(url) {
  window.location.href = url;
}

//se cella contiene un pezzo lo ritorna
//altrimenti ritorna null
function getPiece(cella) {
  for (let classe of cella.classList) {
    if (classe.includes("-")) {
      return classe.split("-")[0];
    }
  }
  return null;
}

//se cella contiene un pezzo ritorna il suo colore
//altrimenti ritorna null
function getPieceColor(cella) {  
  for (let classe of cella.classList) {
    if (classe.includes("-")) {
      return classe.split("-")[1];
    }
  }
  return null;
}

//start e la cella di partenza, DIRX e lo spostamento laterale, DIRY e lo spostamento verticale
// restituisce (return) la cella in quella direzione
//se non puo returna false
function nextCella(start, DIRX, DIRY) {
  let [letteraIniz, numeroIniz] = start.id.split("-");
  numeroIniz = parseInt(numeroIniz);
  let vet = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let indexLettera = vet.indexOf(letteraIniz);
  if (
    indexLettera + DIRX > 8 ||
    indexLettera + DIRX < 0 ||
    numeroIniz + DIRY > 8 ||
    numeroIniz + DIRY < 0
  ) {
    return false;
    //fine scacchiera in questa direzione
  }
  let IndexNuovaLettera = indexLettera + DIRX;
  let NuovoNumero = numeroIniz + DIRY;
  let nuovaCella = document.getElementById(
    vet[IndexNuovaLettera] + "-" + NuovoNumero,
  );
  return nuovaCella;
}

//funzione che ruota la scacchiera
function rotateChessBoard() {
  //Ruoto le celle
  let vettore = [...document.querySelectorAll(".Cella")];
  let ChessBoard = document.getElementById("ChessBoard");
  ChessBoard.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 8; j++) {
      let td = vettore[63 - (i * 8 + j)];
      tr.appendChild(td);
    }
    tr.classList.add("Riga");
    ChessBoard.appendChild(tr);
  }
  
  //Ruoto i numeri
  let Numeri = [...document.querySelectorAll(".Numero")];
  for (let num of Numeri) {
    num.classList.toggle("SX");
    num.classList.toggle("DX");
  }
  let Lettere = [...document.querySelectorAll(".Lettera")];
  for (let lett of Lettere) {
    lett.classList.toggle("DX");
    lett.classList.toggle("UP");
  }
  
  //Rimuovo i disegni (le celle colorate di rosso)
  let colorati = [...document.querySelectorAll(".Colorata")];
  for (let c of colorati) {
    c.classList.remove("Colorata");
  }
  
  //cambio GAMETURN
  if (GAMERTURN === "Light") {
    GAMERTURN = "Dark";
  } else {
    GAMERTURN = "Light";
  }
  
}

//funzione che restituisce un vettore di celle che contengono i pezzi di GAMERTURN
function getAllGamerPieces() {
  let vettoreCelle = [...document.querySelectorAll(".Cella")];
  let Pezzi = vettoreCelle.filter((cella) =>
    [...cella.classList].some((classe) => classe.includes("-" + GAMERTURN)),
  );
  return Pezzi;
}

//funzione che rimuove TUTTI i pezzi dalla scacchiera
//e da boardStatus
function removeAllPiece() {
  let Temp = GAMERTURN;
  GAMERTURN = "Light";
  let pezzi = getAllGamerPieces();
  for (let p of pezzi) {
    removePiece(p);
  }
  GAMERTURN = "Dark";
  pezzi = getAllGamerPieces();
  for (let p of pezzi) {
    removePiece(p);
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        boardStatus[i][j]=null;
    }
  }

  GAMERTURN = Temp;
}

//disegna un Dot in cellaDot, ovvero appende un div con classe dot-style in cella
function drawDot(cella) {
  let dot = document.createElement("div");
  dot.classList.add("dot-style");
  cella.classList.add("Dot");
  cella.appendChild(dot);
  if (cella.clickFunction) {
    cella.clickFunction = cella.clickFunction.filter((fn) => fn !== clearDraws);
  }
}

//disegna un cerchio in cella, ovvero appende un div con classe circle-style in cella
function drawCircle(cella) {
  let cerchio = document.createElement("div");
  cerchio.classList.add("CerchioGrigio");
  cella.classList.add("Cerchio");
  cella.appendChild(cerchio);
  if (cella.clickFunction) {
    cella.clickFunction = cella.clickFunction.filter((fn) => fn !== clearDraws);
  }
}

//funzione che serve a rimuovere tutti i Circle e i Dot
function clearDraws() {
  console.log("Pulisco la scacchiera dai disegni");

  if (SELECTEDPIECE === null) {
    return;
  }
  //prende tutti i Dot e li rimuove
  let DOT = [...document.querySelectorAll(".Dot")];
  for (let D of DOT) {
    D.classList.remove("Dot");
    //rimetto che se clicco pulisco (ora e una cella libera)
    D.clickFunction = [];
    D.clickFunction.push(clearDraws);
    //tolgo il dot
    let figlio = D.querySelector(".dot-style");
    figlio.remove();
  }
  //prende tutti i Cerchi e li rimuove
  let CERCHIO = [...document.querySelectorAll(".Cerchio")];
  for (let C of CERCHIO) {
    C.classList.remove("Cerchio");
    
    C.clickFunction = [];
    //lo rimuovo perche se clicco NON voglio piu muovermi li

    C.clickFunction.push(clearDraws);
    //rimetto il listenre per pulire (ora e una cella libera)
    let figlio = C.querySelector(".CerchioGrigio");
    figlio.remove();
  }
  SELECTEDPIECE = null;
  setAllTryMove();
}

//funzione che ritorna true se il giocatore color, ha mosse legali basandosi su boardStatus
function hasLegalMoves(color) {
  const board = boardStatus.map((row) => [...row]);

  const pieces = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const cell = board[r][c];
      if (cell && cell.split("-")[1] === color) {
        pieces.push({ r, c, cell });
      }
    }
  }
  for (let p of pieces) {
    const tipo = p.cell.split("-")[0];
    let moves = [];

    switch (tipo) {
      case "Pawn":
        moves = getPawnMoves(board, p.r, p.c, color);
        break;
      case "Knight":
        moves = getKnightMoves(board, p.r, p.c, color);
        break;
      case "Bishop":
        moves = getBishopMoves(board, p.r, p.c, color);
        break;
      case "Rook":
        moves = getRookMoves(board, p.r, p.c, color);
        break;
      case "Queen":
        moves = getQueenMoves(board, p.r, p.c, color);
        break;
      case "King":
        moves = getKingMoves(board, p.r, p.c, color);
        break;
      case "Camel":
        moves = getCamelMoves(board, p.r, p.c, color);
        break;
      case "Tarallo":
        moves = getTaralloMoves(board, p.r, p.c, color);
        break;
      case "Cavolfiore":
        moves = getCavolfioreMoves(board, p.r, p.c, color);
        break;
    }
    for (let move of moves) {
      const tempBoard = board.map((row) => [...row]);
      const idstart = `${String.fromCharCode(97 + p.c)}-${p.r + 1}`;
      const idend = `${String.fromCharCode(97 + move.c)}-${move.r + 1}`;
      let startCell = document.getElementById(idstart);
      let endCell = document.getElementById(idend);

      if (movePieceOnBoard(tempBoard, startCell, endCell)) {
        if (isLegal(tempBoard, color)) {
          return true;
        }
      }
    }
  }
  return false;
}

//funzione che restituisce le mosse che i Pedoni
//possono fare su board
function getPawnMoves(board, r, c, color) {
  const moves = [];
  const dir = color === "Light" ? 1 : -1;

  // mossa in avanti
  if (r + dir >= 0 && r + dir < 8 && !board[r + dir][c])
    moves.push({ r: r + dir, c: c });

  // doppio passo iniziale
  if ((color === "Light" && r === 1) || (color === "Dark" && r === 6)) {
    if (!board[r + dir][c] && !board[r + 2 * dir][c])
      moves.push({ r: r + 2 * dir, c: c });
  }

  // cattura diagonale
  if (
    r + dir >= 0 &&
    r + dir < 8 &&
    c - 1 >= 0 &&
    board[r + dir][c - 1] &&
    board[r + dir][c - 1].split("-")[1] !== color
  )
    moves.push({ r: r + dir, c: c - 1 });
  if (
    r + dir >= 0 &&
    r + dir < 8 &&
    c + 1 < 8 &&
    board[r + dir][c + 1] &&
    board[r + dir][c + 1].split("-")[1] !== color
  )
    moves.push({ r: r + dir, c: c + 1 });

  // En Passant
  const epClass = color === "Light" ? "EnPassant" : "EnPassant";
  if (c - 1 >= 0 && board[r][c - 1] && board[r][c - 1].includes(epClass))
    moves.push({ r: r + dir, c: c - 1 });
  if (c + 1 < 8 && board[r][c + 1] && board[r][c + 1].includes(epClass))
    moves.push({ r: r + dir, c: c + 1 });

  return moves;
}

//funzione che restituisce le mosse che i Cavalli
//possono fare su board
function getKnightMoves(board, r, c, color) {
  const moves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];
  const result = [];
  for (let [dr, dc] of moves) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
      const target = board[nr][nc];
      if (!target || target.split("-")[1] !== color)
        result.push({ r: nr, c: nc });
    }
  }
  return result;
}

//funzione che restituisce le mosse che i Alfieri
//possono fare su board
function getBishopMoves(board, r, c, color) {
  const result = [];
  const dirs = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  for (let [dr, dc] of dirs) {
    let nr = r + dr;
    let nc = c + dc;
    while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
      if (!board[nr][nc]) {
        result.push({ r: nr, c: nc });
      } else {
        if (board[nr][nc].split("-")[1] !== color)
          result.push({ r: nr, c: nc });
        break;
      }
      nr += dr;
      nc += dc;
    }
  }
  return result;
}

//funzione che restituisce le mosse che le Torri
//possono fare su board
function getRookMoves(board, r, c, color) {
  const result = [];
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (let [dr, dc] of dirs) {
    let nr = r + dr;
    let nc = c + dc;
    while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
      if (!board[nr][nc]) result.push({ r: nr, c: nc });
      else {
        if (board[nr][nc].split("-")[1] !== color)
          result.push({ r: nr, c: nc });
        break;
      }
      nr += dr;
      nc += dc;
    }
  }
  return result;
}

//funzione che restituisce le mosse che le Regine
//possono fare su board
function getQueenMoves(board, r, c, color) {
  return [
    ...getRookMoves(board, r, c, color),
    ...getBishopMoves(board, r, c, color),
  ];
}

//funzione che restituisce le mosse che i Re
//possono fare su board
function getKingMoves(board, r, c, color) {
  const result = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        const target = board[nr][nc];
        if (!target || target.split("-")[1] !== color)
          result.push({ r: nr, c: nc });
      }
    }
  }

  return result;
}
//funzione che restituisce le mosse che i Cammelli
//possono fare su board
function getCamelMoves(board, r, c, color) {
  const moves = [
    [1, 3],
    [3, 1],
    [3, -1],
    [1, -3],
    [-1, -3],
    [-3, -1],
    [-3, 1],
    [-1, 3],
  ];
  const result = [];
  for (let [dr, dc] of moves) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
      const target = board[nr][nc];
      if (!target || target.split("-")[1] !== color)
        result.push({ r: nr, c: nc });
    }
  }
  return result;
}

//funzine che restuisce le mosse che i Taralli
//possono fare su board
function getTaralloMoves(board, r, c, color) {
  return [
    ...getKnightMoves(board, r, c, color),
    ...getRookMoves(board, r, c, color),
  ];
}


//funzine che restuisce le mosse che i Cavolfiori
//possono fare su board
function getCavolfioreMoves(board, r, c, color) {
  return [
    ...getKnightMoves(board, r, c, color),
    ...getBishopMoves(board, r, c, color),
  ];
}

//funzione che serve per Muovere SELECTEDPIECE
//nel caso in cui c'è una promozione di un pedone aspetta che venga scelto il pezzo
async function movePiece(e) {
  if (SELECTEDPIECE === null) {
    return;
  }

  let end = e.currentTarget;
  let start = SELECTEDPIECE;
  if (getPiece(start) === "King" || getPiece(start) === "Rook") {
    start.nonSiEMossa = false;
  }

  if (puoiPromuovere(start, end)) {
    await mostraPezziPerPromuovere(end);
    //aspetta
  } else {
    if (end.classList.contains("EnPassant")) {
      //aggiorna la boardStatus per enPassant
      let i = GAMERTURN === "Light" ? -1 : 1;
      let [rf, cf] = getIndexForStatusBoard(end);
      boardStatus[rf + i][cf] = null;
      let pezzoDatogliere = document.getElementById(
        end.id.split("-")[0] + "-" + (rf + i + 1),
      );
      removePiece(pezzoDatogliere);
    }
    moveFromStartToEnd(start, end);
    movePieceOnBoard(boardStatus, start, end);
  }
  //controllo scaccomatto
  let altroGiocatore = GAMERTURN === "Light" ? "Dark" : "Light";
  let giocatoreBianco = document.getElementById("Giocatore");
  let giocatoreNero = document.getElementById("Avversario");
  if (giocatoreBianco && giocatoreNero) {
    giocatoreBianco = document.getElementById("Giocatore").textContent;
    giocatoreNero = document.getElementById("Avversario").textContent;
  } else {
    giocatoreBianco = "Bianco";
    giocatoreNero = "Nero";
  }
  if (!hasLegalMoves(altroGiocatore)) {
    if (isKingCheck(boardStatus, altroGiocatore)) {
      switch (GAMERTURN) {
        case "Light":
          finePartita(giocatoreBianco, giocatoreNero, "white_win");
          break;
        case "Dark":
          finePartita(giocatoreBianco, giocatoreNero, "black_win");
          break;
      }
    } else {
      finePartita(giocatoreBianco, giocatoreNero, "draw");
    }
    clearDraws();
    console.log("rimuovo le tryMove");
    removeAllTryMove();
    return;
  }

  setAllPieceClearMode();
  rotateChessBoard();
  setAllTryMove();
  
  console.log("Ho spostato "+ getPiece(end) + " " +start.id +" in "+ end.id );
  clearDraws();
  console.log("BoardStatus: ")
  console.log(boardStatus);
  console.log( "Turno del giocatore: "+ GAMERTURN);


}

//funzione che ritorna il div da appendere a fine partita
function endGameBlock(userBianco, userNero, risultato) {
  let div = document.createElement("div");
  let msg = document.createElement("p");
  if (risultato === "draw") {
    msg.innerText = "Patta";
  } else if (risultato === "white_win") {
    msg.innerText = userBianco + " vince!";
  } else if (risultato === "black_win") {
    msg.innerText = userNero + " vince!";
  }
  div.appendChild(msg);

  let btnReset = document.createElement("button");
  btnReset.id = "BtnReset";
  btnReset.innerText = "Rigioca";
  div.appendChild(btnReset);
  div.id = "endGameBlock";
  return div;
}

//funzione che gestisce la fine della partita
function finePartita(userBianco, userNero, risultato) {
  //metto il nome del vincitore nel box
  let GameTracker = document.getElementById("GameTracker");
  let div = endGameBlock(userBianco, userNero, risultato);
  GameTracker.appendChild(div);

  //controllo se sono
  if (userBianco === "Bianco" || userNero === "Nero") {
    document.dispatchEvent(new CustomEvent("PartitaFinita"));
    return;
  }

  // form virtuale con i dati
  let formData = new FormData();
  formData.append("user1", userBianco);
  formData.append("user2", userNero);
  formData.append("risultato", risultato);

  fetch("aggiornaPunti.php", {
    method: "POST",
    body: formData,
  })
    .then((r) => r.text())
    .then((data) => {
      if (data === "OK") {
        console.log("Punti aggiornati correttamente!");
      } else {
        console.error("Errore server:", data);
      }
    })
    .catch((e) => console.error("Errore fetch:", e));

  document.dispatchEvent(new CustomEvent("PartitaFinita"));
}

//funzione che mette il pezzo type di colore color in cella
function placePiece(type, color, cella) {
  cella.classList.add(type + "-" + color);
  let immagine = document.createElement("img");
  immagine.src = "../immagini/" + color + type + ".webp";
  immagine.alt = "Pezzo";
  immagine.classList.add("Immagine");
  cella.appendChild(immagine);
}

//funzione che ritorna true se puoi promuovere
function puoiPromuovere(start, end) {
  let tipo = getPiece(start);
  let colore = getPieceColor(start);
  let riga = end.id.split("-")[1];
  return (
    tipo === "Pawn" &&
    ((colore === "Dark" && riga === "1") ||
      (colore === "Light" && riga === "8"))
  );
}

//funzione che toglie dal vettore clickFunction tutte le funzioni eccetto le clearDraws
function removeAllTryMove() {
  let pezzi = getAllGamerPieces();
  for (let p of pezzi) {
    p.clickFunction = p.clickFunction.filter((fn) => fn === clearDraws);
  }
}

//funzione che sostituisce il pedone con il pezzo in cui l'hai promosso
function sostituisciCon(tipo, start, end) {
  removePiece(start);
  if (getPiece(end) !== null) {
    removePiece(end);
  }
  let [ri, ci] = getIndexForStatusBoard(start);
  boardStatus[ri][ci] = null;
  let [rf, cf] = getIndexForStatusBoard(end);
  boardStatus[rf][cf] = tipo + "-" + GAMERTURN;
  placePiece(tipo, GAMERTURN, end);
  let BoxPromozione = document.getElementById("BoxPromozione");
  BoxPromozione.innerHTML = "";
  let ChessBoardcontainer = document.getElementById("ChessBoard-container");
  ChessBoardcontainer.removeChild(BoxPromozione);
}

//funzione che mostra i pezzi che puoi scegliere per promuovere
function mostraPezziPerPromuovere(end) {
  return new Promise((resolve) => {
    let start = SELECTEDPIECE;
    clearDraws();
    removeAllTryMove();

    let div = document.createElement("div");
    div.id = "BoxPromozione";

    let Rook = document.createElement("div");
    let Knight = document.createElement("div");
    let Bishop = document.createElement("div");
    let Queen = document.createElement("div");

    // Funzione che gestisce il click: sostituisce e risolve la Promise
    function PezzoCliccato(type) {
      sostituisciCon(type, start, end);
      resolve(type); // Sblocca chi fa await
      div.remove(); // Rimuove la finestra di promozione
    }

    Queen.addEventListener("click", (e) => {
      e.stopPropagation();
      PezzoCliccato("Queen");
    });
    Bishop.addEventListener("click", (e) => {
      e.stopPropagation();
      PezzoCliccato("Bishop");
    });
    Knight.addEventListener("click", (e) => {
      e.stopPropagation();
      PezzoCliccato("Knight");
    });
    Rook.addEventListener("click", (e) => {
      e.stopPropagation();
      PezzoCliccato("Rook");
    });

    function placePieceInBox(type, color, cella) {
      cella.classList.add(type + "-" + color);
      let immagine = document.createElement("img");
      immagine.src = "../immagini/" + color + type + ".webp";
      immagine.alt ="Pezzo";
      cella.appendChild(immagine);
    }

    // Metti i pezzi nei div
    placePieceInBox("Queen", GAMERTURN, Queen);
    placePieceInBox("Bishop", GAMERTURN, Bishop);
    placePieceInBox("Knight", GAMERTURN, Knight);
    placePieceInBox("Rook", GAMERTURN, Rook);

    // Append dei div all'ordine corretto
    div.appendChild(Queen);
    div.appendChild(Bishop);
    div.appendChild(Knight);
    div.appendChild(Rook);

    let ChessBoard = document.getElementById("ChessBoard-container");
    ChessBoard.appendChild(div);
  });
}

//funzione che rimuove il pezzo in cella
function removePiece(cella) {
  let oldPiece = [...cella.classList].find((c) => c.includes("-"));
  cella.classList.remove(oldPiece);
  let immagineDatogliere = cella.querySelector(".Immagine");
  immagineDatogliere.remove();
}

//funzione che sposta il pezzo in start in end
function moveFromStartToEnd(start, end) {
  let celleEnpassant = document.querySelector(".EnPassant");
  if (celleEnpassant) {
    celleEnpassant.classList.remove("EnPassant");
  }

  if (getPiece(end)) {
    removePiece(end);
  }
  let newPiece = getPiece(start);
  let colorPiece = getPieceColor(start);
  start.classList.remove(newPiece + "-" + colorPiece);
  let div = start.querySelector(".Immagine");
  end.appendChild(div);
  end.classList.add(newPiece + "-" + colorPiece);
}

//funzione che disegna dot in direzione dirx e diry
function moveInDirection(cella, DIRX, DIRY) {
  let i = 1;
  c = nextCella(cella, DIRX * i, DIRY * i);
  while (c) {
    let board = boardStatus.map((row) => [...row]);
    if (movePieceOnBoard(board, SELECTEDPIECE, c)) {
      if (!isLegal(board, GAMERTURN)) {
        i++;
        c = nextCella(cella, DIRX * i, DIRY * i);
        continue;
      }
    }
    //se trovo un pezzo mi fermo
    if (getPiece(c)) {
      if (getPieceColor(c) !== GAMERTURN) {
        drawCircle(c);
        c.clickFunction = [];
        c.clickFunction.push(movePiece);
      }
      break;
    }
    drawDot(c);
    c.clickFunction = [];
    c.clickFunction.push(movePiece);
    i++;
    c = nextCella(cella, DIRX * i, DIRY * i);
  }
}

//funzione che disegna dot per il cavallo
function moveLikeAHorse(cella) {
  if (cella) {
    let board = boardStatus.map((row) => [...row]);
    if (movePieceOnBoard(board, SELECTEDPIECE, cella)) {
      if (!isLegal(board, GAMERTURN)) {
        return;
      }
    }

    if (getPieceColor(cella) === null) {
      drawDot(cella);
      cella.clickFunction.push(movePiece);
    } else if (getPieceColor(cella) !== GAMERTURN) {
      drawCircle(cella);
      cella.clickFunction.push(movePiece);
    }
  }
}

//funzione che setta SELECTEDPIECE a Piece
function selectPiece(Piece) {
  SELECTEDPIECE = Piece;
  console.log(
    "Pezzo selezionato: " + getPiece(SELECTEDPIECE) + " " + SELECTEDPIECE.id,
  );

  SELECTEDPIECE.clickFunction = [];
  SELECTEDPIECE.clickFunction.push(clearDraws);
}

//funzione che mette in clickfunction di tutte le celle cleeardraws e basta
function setAllPieceClearMode() {
  let Pezzi = getAllGamerPieces();
  for (let P of Pezzi) {
    P.clickFunction = [];
    P.clickFunction.push(clearDraws);
  }
}

//funzione che mette in clickfunction di tutte le celle le relative TryMove
function setAllTryMove() {
  let Pezzi = getAllGamerPieces();
  for (let P of Pezzi) {
    let fun = getFunctionTryMove(P);
    if (!P.clickFunction.includes(fun)) {
      P.clickFunction = [];
      P.clickFunction.push(fun);
    }
  }
}

//funzione che ritorna la funzione tryMove relativa a Piece
function getFunctionTryMove(Piece) {
  let type = getPiece(Piece);
  switch (type) {
    case "Pawn":
      return tryMovePawn;
    case "Bishop":
      return tryMoveBishop;
    case "Knight":
      return tryMoveKnight;
    case "Rook":
      return tryMoveRook;
    case "Queen":
      return tryMoveQueen;
    case "King":
      return tryMoveKing;
    case "Camel":
      return tryMoveCamel;
    case "Tarallo":
      return tryMoveTarallo;
    case "Cavolfiore":
      return tryMoveCavolfiore;
  }
}

//funzione che ritorna un vettore contenente la posizione di cella in statusBoard
//[0] = riga
//[1] = colonna
function getIndexForStatusBoard(cella) {
  let vet = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let [colonna, riga] = cella.id.split("-");
  colonna = vet.indexOf(colonna);
  riga = parseInt(riga) - 1;
  return [riga, colonna];
}

//funzione che ritorna un vettore contenente la posizione del re di colore "color" in Board:
//[0] = riga
//[1] = colonna
//se non lo trova ritorna null
function findKingOnBoardStatus(Board, color) {
  const kingString = "King-" + color;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (Board[r][c] === kingString) {
        return [r, c];
      }
    }
  }
  return null;
}

//funzione che ritorna true se la cella target e controllata da un pezzo del nemico
//false altrimenti
function isSquareAttacked(board, rigTarget, colTarget, enemyColor) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (!piece) continue;

      const [tipo, colore] = piece.split("-");
      if (colore !== enemyColor) continue;

      if (pieceAttacksSquare(board, tipo, i, j, rigTarget, colTarget)) {
        return true;
      }
    }
  }
  return false;
}

//funzione che ritorna true se il pezzo in input attacca il pezzo target
//false altrimenti
function pieceAttacksSquare(
  board,
  tipo,
  rigaPezzo,
  colonnaPezzo,
  rigTarget,
  colTarget,
) {
  function cerca(dirX, dirY) {
    let r = rigaPezzo + dirY;
    let c = colonnaPezzo + dirX;

    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      if (r === rigTarget && c === colTarget) return true;
      if (board[r][c] !== null) return false;

      r += dirY;
      c += dirX;
    }
    return false;
  }

  function cercaPerCavallo(incC, incR) {
    return rigaPezzo + incR === rigTarget && colonnaPezzo + incC === colTarget;
  }

  switch (tipo) {
    case "Rook":
      if (rigaPezzo === rigTarget) {
        let dirC = colTarget < colonnaPezzo ? -1 : 1;
        return cerca(dirC, 0);
      } else if (colonnaPezzo === colTarget) {
        let dirR = rigTarget < rigaPezzo ? -1 : 1;
        return cerca(0, dirR);
      } else return false;
    case "Bishop":
      if (
        Math.abs(rigaPezzo - rigTarget) === Math.abs(colonnaPezzo - colTarget)
      ) {
        let dirR = rigTarget > rigaPezzo ? 1 : -1;
        let dirC = colTarget > colonnaPezzo ? 1 : -1;
        return cerca(dirC, dirR);
      }
      return false;
    case "Knight":
      return (
        cercaPerCavallo(1, 2) ||
        cercaPerCavallo(2, 1) ||
        cercaPerCavallo(2, -1) ||
        cercaPerCavallo(1, -2) ||
        cercaPerCavallo(-1, -2) ||
        cercaPerCavallo(-2, -1) ||
        cercaPerCavallo(-2, 1) ||
        cercaPerCavallo(-1, 2)
      );
    case "Queen":
      return (
        pieceAttacksSquare(
          board,
          "Rook",
          rigaPezzo,
          colonnaPezzo,
          rigTarget,
          colTarget,
        ) ||
        pieceAttacksSquare(
          board,
          "Bishop",
          rigaPezzo,
          colonnaPezzo,
          rigTarget,
          colTarget,
        )
      );
    case "Pawn":
      let colore = board[rigaPezzo][colonnaPezzo].split("-")[1];
      let inc = colore === "Light" ? 1 : -1;
      return (
        rigaPezzo + inc === rigTarget &&
        (colonnaPezzo + 1 === colTarget || colonnaPezzo - 1 === colTarget)
      );
    case "King":
      return (
        Math.abs(rigTarget - rigaPezzo) <= 1 &&
        Math.abs(colTarget - colonnaPezzo) <= 1
      );
    case "Camel":
      return (
        cercaPerCavallo(1, 3) ||
        cercaPerCavallo(3, 1) ||
        cercaPerCavallo(3, -1) ||
        cercaPerCavallo(1, -3) ||
        cercaPerCavallo(-1, -3) ||
        cercaPerCavallo(-3, -1) ||
        cercaPerCavallo(-3, 1) ||
        cercaPerCavallo(-1, 3)
      );
    case "Tarallo":
      if (rigaPezzo === rigTarget) {
        let dirC = colTarget < colonnaPezzo ? -1 : 1;
        return cerca(dirC, 0);
      } else if (colonnaPezzo === colTarget) {
        let dirR = rigTarget < rigaPezzo ? -1 : 1;
        return cerca(0, dirR);
      } else {
        return (
          cercaPerCavallo(1, 2) ||
          cercaPerCavallo(2, 1) ||
          cercaPerCavallo(2, -1) ||
          cercaPerCavallo(1, -2) ||
          cercaPerCavallo(-1, -2) ||
          cercaPerCavallo(-2, -1) ||
          cercaPerCavallo(-2, 1) ||
          cercaPerCavallo(-1, 2)
        );
      }
    case "Cavolfiore":
      if (
        Math.abs(rigaPezzo - rigTarget) === Math.abs(colonnaPezzo - colTarget)
      ) {
        let dirR = rigTarget > rigaPezzo ? 1 : -1;
        let dirC = colTarget > colonnaPezzo ? 1 : -1;
        return cerca(dirC, dirR);
      }
      return (
        cercaPerCavallo(1, 2) ||
        cercaPerCavallo(2, 1) ||
        cercaPerCavallo(2, -1) ||
        cercaPerCavallo(1, -2) ||
        cercaPerCavallo(-1, -2) ||
        cercaPerCavallo(-2, -1) ||
        cercaPerCavallo(-2, 1) ||
        cercaPerCavallo(-1, 2)
      );
    default:
      return false;
  }
}

//funzione che ritorna true se il re di colore 'colore' e sotto scacco
function isKingCheck(board, colore) {
  let [r, c] = findKingOnBoardStatus(board, colore);
  let coloreNemico = colore === "Light" ? "Dark" : "Light";
  return isSquareAttacked(board, r, c, coloreNemico);
}

//funzione che controlla se "board" e legale considerando che l'ultima mossa e stata fatta dal
//giocatore di colore "color"
function isLegal(board, color) {
  /*  let [kr, kc] = findKingOnBoardStatus(board,color)
    let enemyColor = color === "Light"? "Dark":"Light"
    return !isSquareAttacked(board,kr,kc,enemyColor)
*/
  return !isKingCheck(board, color);
}

//muove il pezzo contenuto in cellaIniz in cellaFin
//se cellafin contiene il proprio re ritorna false
function movePieceOnBoard(board, cellaIniz, cellaFin) {
  let [ri, ci] = getIndexForStatusBoard(cellaIniz);
  let [rf, cf] = getIndexForStatusBoard(cellaFin);
  let pezzo = board[ri][ci];
  let playerColor = pezzo.split("-")[1];
  let pezzoF = board[rf][cf];
  let [pezzoNemico, coloreNemico] = [null, null];
  if (pezzoF !== null) {
    [pezzoNemico, coloreNemico] = pezzoF.split("-");
  }
  if (pezzoNemico === "King" && coloreNemico === playerColor) {
    return false;
    //almeno se la funzione ritorna false posso farla andare avanti
  }
  board[ri][ci] = null;
  board[rf][cf] = pezzo;
  return true;
}
