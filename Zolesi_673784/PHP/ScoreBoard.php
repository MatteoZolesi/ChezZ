<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function showError($message)
{
    echo "<p>Errore: $message</p>";
    exit();
}

try {

    $db_connection = mysqli_connect('localhost', 'root', '', 'utentichezz');

    if (mysqli_connect_errno()) {
        showError("Connessione fallita");
    }

    // prende tutti gli utenti ordinati per punti
    $query = "SELECT Username, punti 
              FROM utenti
              ORDER BY punti DESC";

    $result = mysqli_query($db_connection, $query);

    mysqli_close($db_connection);
} catch (Exception $e) {
    showError("Sistema in manutenzione");
}
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../CSS/stile-ScoreBoard.css">
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" rel="stylesheet" />
    <title>Classifiche</title>

    <script src="../JS/utility.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", InitBottone)

        function InitBottone() {
            let MenuPrincipaleBTN = document.getElementById("MenuPrincipaleBTN")
            MenuPrincipaleBTN.addEventListener("click", () => {
                goTo("../index.php");
            })
        }
    </script>

</head>

<body>

    <div id="BoxClassifica">

        <div id="ScoreTable">

            <div class="tableHead">
                <p>N°</p>
                <p>Username</p>
                <p>Punti</p>
            </div>

            <?php
            $posizione = 1;

            while ($row = mysqli_fetch_assoc($result)) {
                echo '<div class="Elemento">';
                echo '<p>' . $posizione . '.</p>';
                echo '<p>' . htmlspecialchars($row['Username']) . '</p>';
                echo '<p>' . $row['punti'] . '</p>';
                echo '</div>';

                $posizione++;
            }
            ?>

        </div>

        <button id="MenuPrincipaleBTN">Menu Principale</button>

    </div>

</body>

</html>
