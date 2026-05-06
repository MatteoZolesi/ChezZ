function tryMoveKing(e) {
  clearDraws();

  index = GAMERTURN === "Light" ? 1 : -1;
  let King = e.currentTarget;
  if (SELECTEDPIECE) {
    //se prima di quello che ho selezionato ora c'era gia un altro pezzo selezionato
    //tolgo la clearDraws, cosi che se lo riclicco non cancello
    SELECTEDPIECE.clickFunction = SELECTEDPIECE.clickFunction.filter(
      (fn) => fn !== clearDraws,
    );
  }
  selectPiece(King);
  //movimenti
  //su
  moveKing(King, 0, index);
  //su-dx
  moveKing(King, index, index);
  //dx
  moveKing(King, index, 0);
  //giu-dx
  moveKing(King, -1 * index, index);
  //giu
  moveKing(King, -1 * index, 0);
  //giu-sx
  moveKing(King, -1 * index, -1 * index);
  //sx
  moveKing(King, 0, -1 * index);
  //su-sx
  moveKing(King, index, -1 * index);

  //arrocchi
  shortCastle(King, 1);
  longCastle(King, -1);
}

function moveKing(king, DIRX, DIRY) {
  let cella = nextCella(king, DIRX, DIRY);
  if (cella) {
    let board = boardStatus.map((row) => [...row]);
    movePieceOnBoard(board, king, cella);
    if (!isLegal(board, GAMERTURN)) {
      return;
    }

    if (getPiece(cella) !== null) {
      if (getPieceColor(cella) !== GAMERTURN) {
        drawCircle(cella);
        cella.clickFunction = [];
        cella.clickFunction.push(movePiece);
      }
    } else {
      drawDot(cella);
      cella.clickFunction = [];
      cella.clickFunction.push(movePiece);
    }
  }
}

function shortCastle(king, DIRX) {
  let colore = getPieceColor(king);
  let coloreNemico = colore === "Light" ? "Dark" : "Light";
  let riga = colore === "Light" ? 0 : 7;
  let Rook = document.getElementById("h-" + (riga + 1));
  if (Rook.nonSiEMossa && king.nonSiEMossa) {
    if (puoiArroccareCorto(riga, coloreNemico)) {
      let cella = nextCella(king, 2 * DIRX, 0);
      drawDot(cella);
      cella.clickFunction = [];
      cella.clickFunction.push(DoShortCastle);
    }
  }
}

//se la cella e attaccata o ha un pezzo ritorna false
function puoiArroccareCorto(riga, coloreNemico) {
  return !(
    boardStatus[riga][5] !== null ||
    isSquareAttacked(boardStatus, riga, 5, coloreNemico) ||
    boardStatus[riga][6] !== null ||
    isSquareAttacked(boardStatus, riga, 6, coloreNemico)
  );
}

function DoShortCastle() {
  index = GAMERTURN === "Light" ? 1 : -1;
  let Rook = nextCella(SELECTEDPIECE, 3, 0);
  let cella2 = nextCella(SELECTEDPIECE, 2, 0);
  let cella1 = nextCella(SELECTEDPIECE, 1, 0);

  moveFromStartToEnd(SELECTEDPIECE, cella2);
  movePieceOnBoard(boardStatus, SELECTEDPIECE, cella2);
  moveFromStartToEnd(Rook, cella1);
  movePieceOnBoard(boardStatus, Rook, cella1);
  SELECTEDPIECE.nonSiEMossa = false;
  Rook.nonSiEMossa = false;

  setAllPieceClearMode();
  rotateChessBoard();
  setAllTryMove();

  console.log(
    "Ho spostato " + getPiece(end) + " " + start.id + " in " + end.id,
  );
  clearDraws();
  console.log("BoardStatus: ");
  console.log(boardStatus);
  console.log("Turno del giocatore: " + GAMERTURN);
}

function longCastle(king, DIRX) {
  let colore = getPieceColor(king);
  let coloreNemico = colore === "Light" ? "Dark" : "Light";
  let riga = colore === "Light" ? 0 : 7;
  let Rook = document.getElementById("a-" + (riga + 1));
  if (Rook.nonSiEMossa && king.nonSiEMossa) {
    if (puoiArroccareLungo(riga, coloreNemico)) {
      let cella = nextCella(king, 2 * DIRX, 0);
      drawDot(cella);
      cella.clickFunction = [];
      cella.clickFunction.push(DoLongCastle);
    }
  }
}

//se le celle sono attaccata o hanno un pezzo ritorna false
function puoiArroccareLungo(riga, coloreNemico) {
  return !(
    boardStatus[riga][1] !== null ||
    isSquareAttacked(boardStatus, riga, 1, coloreNemico) ||
    boardStatus[riga][2] !== null ||
    isSquareAttacked(boardStatus, riga, 2, coloreNemico) ||
    boardStatus[riga][3] !== null ||
    isSquareAttacked(boardStatus, riga, 3, coloreNemico)
  );
}

function DoLongCastle() {
  index = GAMERTURN === "Light" ? 1 : -1;
  let Rook = nextCella(SELECTEDPIECE, -4, 0);
  let cella2 = nextCella(SELECTEDPIECE, -2, 0);
  let cella1 = nextCella(SELECTEDPIECE, -1, 0);

  moveFromStartToEnd(SELECTEDPIECE, cella2);
  movePieceOnBoard(boardStatus, SELECTEDPIECE, cella2);
  moveFromStartToEnd(Rook, cella1);
  movePieceOnBoard(boardStatus, Rook, cella1);

  setAllPieceClearMode();
  rotateChessBoard();
  setAllTryMove();

  console.log("Ho spostato "+ getPiece(end) + " " +start.id +" in "+ end.id );
  clearDraws();
  console.log("BoardStatus: ")
  console.log(boardStatus);
  console.log( "Turno del giocatore: "+ GAMERTURN);
}
