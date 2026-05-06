let handler = (e) => {
  // lo copio per poter cambiare gli elementi mentre ciclo
  [...e.currentTarget.clickFunction].forEach((fn) => fn(e));
};

function removeListenersOnChessBoard() {
  let celle = document.querySelectorAll(".Cella");
  for (let c of celle) {
    c.removeEventListener("click", handler);
  }
}

function placePiecesOnChessBoard() {
  let vetCelle = [...document.querySelectorAll(".Cella")];

  for (let i = 0; i < 8; i++) {
    // riga 1
    switch (i) {
      case 0:
      case 7:
        boardStatus[0][i] = "Rook-Light";
        break;
      case 1:
      case 6:
        boardStatus[0][i] = "Knight-Light";
        break;
      case 2:
      case 5:
        boardStatus[0][i] = "Bishop-Light";
        break;
      case 3:
        boardStatus[0][i] = "Queen-Light";
        break;
      case 4:
        boardStatus[0][i] = "King-Light";
        break;
    }
  }
  for (let i = 0; i < 8; i++) {
    // riga 2
    boardStatus[1][i] = "Pawn-Light";
  }
  for (let i = 0; i < 8; i++) {
    // riga 8
    switch (i) {
      case 0:
      case 7:
        boardStatus[7][i] = "Rook-Dark";
        break;
      case 1:
      case 6:
        boardStatus[7][i] = "Knight-Dark";
        break;
      case 2:
      case 5:
        boardStatus[7][i] = "Bishop-Dark";
        break;
      case 3:
        boardStatus[7][i] = "Queen-Dark";
        break;
      case 4:
        boardStatus[7][i] = "King-Dark";
        break;
    }
  }
  for (let i = 0; i < 8; i++) {
    // riga 7
    boardStatus[6][i] = "Pawn-Dark";
  }

  for (let c of vetCelle) {
    c.clickFunction = [];
    // per ogni cella imposto un vettore di funzioni
    // aggiungo 1 solo listener che quando registra l'evento
    // scorre il vettore e esegue tutte le funzioni
    c.addEventListener("click", handler);

    let [lettera, numero] = c.id.split("-");
    if (numero === "8") {
      switch (lettera) {
        case "a":
        case "h":
          placePiece("Rook", "Dark", c);
          c.clickFunction.push(clearDraws);
          c.nonSiEMossa = true;
          break;
        case "b":
        case "g":
          placePiece("Knight", "Dark", c);
          c.clickFunction.push(clearDraws);
          break;
        case "c":
        case "f":
          placePiece("Bishop", "Dark", c);
          c.clickFunction.push(clearDraws);
          break;
        case "d":
          placePiece("Queen", "Dark", c);
          c.clickFunction.push(clearDraws);
          break;
        case "e":
          placePiece("King", "Dark", c);
          c.clickFunction.push(clearDraws);
          c.nonSiEMossa = true;
          break;
      }
    } else if (numero === "7") {
      placePiece("Pawn", "Dark", c);
      c.clickFunction.push(clearDraws);
    } else if (numero === "2") {
      placePiece("Pawn", "Light", c);
      c.clickFunction.push(tryMovePawn);
    } else if (numero === "1") {
      switch (lettera) {
        case "a":
        case "h":
          placePiece("Rook", "Light", c);
          c.clickFunction.push(tryMoveRook);
          c.nonSiEMossa = true;
          break;
        case "b":
        case "g":
          placePiece("Knight", "Light", c);
          c.clickFunction.push(tryMoveKnight);
          break;
        case "c":
        case "f":
          placePiece("Bishop", "Light", c);
          c.clickFunction.push(tryMoveBishop);
          break;
        case "d":
          placePiece("Queen", "Light", c);
          c.clickFunction.push(tryMoveQueen);
          break;
        case "e":
          placePiece("King", "Light", c);
          c.clickFunction.push(tryMoveKing);
          c.nonSiEMossa = true;
          break;
      }
    } else {
      c.clickFunction.push(clearDraws);
    }
  }
}
