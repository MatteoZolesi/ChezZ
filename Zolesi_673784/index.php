<?php
session_start();
?>

<!doctype html>
<html lang="it">

<head>
  <meta charset="UTF-8" />
  <title>ChezZ</title>
  <link rel="stylesheet" href="CSS/stile-menu.css" />
  <link
    href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="CSS/stile-ChessBoard.css" />
  <script src="JS/createChessBoard.js"></script>
  <script src="JS/utility.js"></script>
  <script src="JS/funzioniBoxLogin.js"></script>
  <script src="JS/initButtonMenu.js"></script>

  <script>
    let Loggato = <?= json_encode($_SESSION['Loggato'] ?? false) ?>;

    function removeLoginBox() {
      let LoginMenu = document.getElementById("LoginMenu");
      if (LoginMenu) {
        LoginMenu.remove();
        Login.classList.remove("Azzurro");
        Login.classList.add("cliccabile");
      }
    }

    // Dopo un Login
    document.addEventListener("UserLoggedIn", UserLoggedIn)

    function UserLoggedIn(e) {
      Loggato = true;
      let username = e.detail.username;
      let Login = document.getElementById("Login");
      Login.textContent = (username === null) ? "Login" : username;
      let GiocaERuota = document.getElementById("GiocaERuota");
      GiocaERuota.disabled = false;

    }

    //Quando viene caricato il DOM
    document.addEventListener("DOMContentLoaded", initLogin);

    function initLogin() {
      let Login = document.getElementById("Login");
      Loggato = <?= json_encode($_SESSION['Loggato'] ?? false) ?>;
      if (Loggato) {
        let username = <?= json_encode($_SESSION['Username'] ?? null) ?>;
        Login.textContent = (username === null) ? "Login" : username;

        let GiocaERuota = document.getElementById("GiocaERuota");
        GiocaERuota.disabled = false;
      }
      Login.addEventListener("click", AppendiLoginBlock);
    }

    function AppendiLoginBlock(e) {

      if (document.getElementById("LoginMenu")) {
        return;
      }
      let Login = e.target;
      Login.classList.remove("cliccabile");
      Login.classList.add("Azzurro");

      let GiocaERuota = document.getElementById("GiocaERuota");
      GiocaERuota.disabled = true;

      let ChessBoardcontainer = document.getElementById("ChessBoard-container");
      ChessBoardcontainer.prepend(createLoginBlock("main", Loggato));
      if (Loggato) {
        let div = document.getElementById("LoginMenu");
        let testo = document.createElement("p");
        testo.innerText = "Accedi con nuovo Utente:";
        div.prepend(testo);
      }
    }
  </script>

</head>

<body>
  <header id="TopBar">
    <div id="Titolo" class="no-select">ChezZ.it</div>

    <nav id="menu">
      <p id="Login" class="no-select cliccabile">Login</p>
    </nav>
  </header>
  <div id="Corpo">
    <div id="BarraLaterale">
      <p id="LOGO" class="no-select">ChezZ</p>
      <button id="GiocaERuota" class="tooltip-btn" disabled data-tooltip="Questa modalità richiede il Login">
        Gioca & Ruota
      </button>
      <button id="ScoreBoard">Classifica</button>
      <button id="PartitaPersonalizzata">Partita Personalizzata</button>
      <button id="MossePezzi">Mosse Pezzi</button>
      <button id="InfoProgetto">Info Progetto</button>
    </div>

    <div id="box">
      <div id="ChessBoard-container"></div>

    </div>
  </div>
</body>

</html>
