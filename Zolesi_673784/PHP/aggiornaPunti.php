<?php
session_start();
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function showError($message)
{
    echo ("Errore: $message");
    exit();
}

// controllo dati
if (!isset($_POST['user1'], $_POST['user2'], $_POST['risultato'])) {
    showError('Dati mancanti');
}

$user1 = trim($_POST['user1']); // giocatore bianco
$user2 = trim($_POST['user2']); // giocatore nero
$risultato = $_POST['risultato']; // "white_win" / "black_win" / "draw"

// controlla giocatori duplicati
if ($user1 === $user2) {
    showError('Giocatori non validi');
}

// calcolo punti
switch ($risultato) {
    case "white_win":
        $punti1 = 3;  
        $punti2 = -3; 
        break;
    case "black_win":
        $punti1 = -3; 
        $punti2 = 3;  
        break;
    case "draw":
        $punti1 = 0;
        $punti2 = 0;
        break;
    default:
        showError('Risultato non valido');
}

try {
    // connessione al database
    $db_connection = mysqli_connect('localhost', 'root', '', 'utentichezz');
    if (mysqli_connect_errno()) {
        showError('Connessione fallita');
    }

    // aggiornamento giocatore 1
    $query1 = "UPDATE utenti
               SET punti = GREATEST(punti + ?, 0)
               WHERE Username = ?";
    $stmt1 = mysqli_prepare($db_connection, $query1);
    if (!$stmt1) throw new Exception(mysqli_error($db_connection));
    mysqli_stmt_bind_param($stmt1, "is", $punti1, $user1);
    mysqli_stmt_execute($stmt1);
    mysqli_stmt_close($stmt1);

    // aggiornamento giocatore 2
    $query2 = "UPDATE utenti
               SET punti = GREATEST(punti + ?, 0)
               WHERE Username = ?";
    $stmt2 = mysqli_prepare($db_connection, $query2);
    if (!$stmt2) throw new Exception(mysqli_error($db_connection));
    mysqli_stmt_bind_param($stmt2, "is", $punti2, $user2);
    mysqli_stmt_execute($stmt2);
    mysqli_stmt_close($stmt2);

    // chiudi connessione
    mysqli_close($db_connection);

    echo "OK";

} catch (Exception $e) {
    if (isset($db_connection)) {
        mysqli_close($db_connection);
    }
    showError('Sistema in manutenzione');
}
?>
