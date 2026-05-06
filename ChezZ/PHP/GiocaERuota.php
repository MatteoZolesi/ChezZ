<?php
session_start();

unset($_SESSION['TempLogin']);
unset($_SESSION['TempUsername']);
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../CSS/stile-ChessBoard.css">
    <link rel="stylesheet" href="../CSS/stile-Gioca&Ruota.css">
    <link rel="stylesheet" href="../CSS/stile-gameTraker.css">
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" rel="stylesheet" />
    <script src="../JS/utility.js"></script>
    <script src="../JS/createChessBoard.js"></script>
    <script src="../JS/funzioniBoxLogin.js"></script>
    <script src="../JS/placePieces.js"></script>
    <script src="../JS/PiecesScripts/pawns-script.js"></script>
    <script src="../JS/PiecesScripts/bishop-script.js"></script>
    <script src="../JS/PiecesScripts/knight-script.js"></script>
    <script src="../JS/PiecesScripts/rook-script.js"></script>
    <script src="../JS/PiecesScripts/queen-script.js"></script>
    <script src="../JS/PiecesScripts/king-script.js"></script>

    <script>
        function removeLoginBox() {
            let LoginMenu = document.getElementById("LoginMenu");
            LoginMenu.remove();
        }
        //Quando viene caricato il DOM
        document.addEventListener("DOMContentLoaded", scriviBianco);

        function scriviBianco() {
            let Giocatore = document.getElementById("Giocatore");
            let giocatoreNome = <?= json_encode($_SESSION['Username'] ?? null) ?>;
            Giocatore.textContent = giocatoreNome;
        }

        document.addEventListener("DOMContentLoaded", AppendiLoginBlock)

        function AppendiLoginBlock(e) {

            if (document.getElementById("LoginMenu")) {
                return;
            }

            let ChessBoardcontainer = document.getElementById("ChessBoard-container");
            ChessBoardcontainer.prepend(createLoginBlock("temp"));
        }

        //Quando viene fatto il login 
        document.addEventListener("UserLoggedIn", UserLoggedIn)

        function UserLoggedIn(e) {
            let username = e.detail.username;
            let Avversario = document.getElementById("Avversario");
            Avversario.textContent = username;
            placePiecesOnChessBoard();
        }

        //Quando la partita e finita
        document.addEventListener("PartitaFinita", initBtnRigioca)

        function initBtnRigioca() {
            let btn = document.getElementById("BtnReset");
            btn.addEventListener("click", reset);
        }

        function reset() {
            removeAllPiece();
            let endGameBlock = document.getElementById("endGameBlock");
            endGameBlock.remove();
            if (GAMERTURN === "Dark") {
                rotateChessBoard()
            }
            removeListenersOnChessBoard();
            placePiecesOnChessBoard();
        }
    </script>
    <script>
        document.addEventListener("DOMContentLoaded", InitBottone)

        function InitBottone() {
            let MenuPrincipaleBTN = document.getElementById("MenuPrincipaleBTN")
            MenuPrincipaleBTN.addEventListener("click", () => {
                goTo("../index.php");
            })
        }
    </script>
    <title>Gioca&Ruota</title>

</head>

<body>
    <div id="ChessBoard-container">
    </div>
    <div id="GameTracker">
        <button id="MenuPrincipaleBTN">Menu Principale</button>

        <div id="Nomi">
            <p id="Giocatore"></p>
            vs <br>
            <p id="Avversario"></p>
        </div>
    </div>
</body>

</html>
