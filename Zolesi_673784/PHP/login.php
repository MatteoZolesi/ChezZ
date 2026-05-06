<?php
session_start();
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function showError($message)
{
    echo ("Errore: $message");
    exit();
}

// controllo dati
if (!isset($_POST['Username'], $_POST['Password'])) {
    showError('Dati mancanti');
}


$username = trim($_POST['Username']);
$password = $_POST['Password'];
$loginType = $_POST['login_type'] ?? 'main';

//Controllo Nome Avversario
if (
    $loginType === 'temp' &&
    isset($_SESSION['Username']) &&
    $username === $_SESSION['Username']
) {
    showError('Non puoi usare questo utente 2 volte');
}

if ($username === '') {
    showError('Username vuoto');
}

if ($password === '') {
    showError('Password vuota');
}

try {

    
    // connessione DB 
    $db_connection = mysqli_connect('localhost', 'root', '', 'utentichezz');

    if (mysqli_connect_errno()) {
        showError('Connessione fallita');
    }

    
    // REGISTRAZIONE
    if (isset($_POST['register'])) {

        $hash = password_hash($password, PASSWORD_BCRYPT);

        $query = "INSERT INTO utenti (Username, hash) VALUES (?, ?)";
        $stmt = mysqli_prepare($db_connection, $query);
        if (!$stmt) throw new Exception(mysqli_error($db_connection));

        mysqli_stmt_bind_param($stmt, "ss", $username, $hash);

        try {
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
            mysqli_close($db_connection);

            session_regenerate_id(true);

            if ($loginType === 'temp') {
                $_SESSION['TempLogin'] = true;
                $_SESSION['TempUsername'] = $username;
            } else {
                $_SESSION['Loggato'] = true;
                $_SESSION['Username'] = $username;
            }

            echo "OK";
            exit();

        } catch (mysqli_sql_exception $e) {
            mysqli_stmt_close($stmt);
            mysqli_close($db_connection);
            showError('Utente già registrato');
        }
    }

    
    // LOGIN
    $query = "SELECT hash FROM utenti WHERE Username = ?";
    $stmt = mysqli_prepare($db_connection, $query);
    if (!$stmt) throw new Exception(mysqli_error($db_connection));

    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $hash);

    if (mysqli_stmt_fetch($stmt)) {

        if ($hash!==null && password_verify($password, $hash)) {

            mysqli_stmt_close($stmt);
            mysqli_close($db_connection);

            session_regenerate_id(true);

            if ($loginType === 'temp') {
                $_SESSION['TempLogin'] = true;
                $_SESSION['TempUsername'] = $username;
            } else {
                $_SESSION['Loggato'] = true;
                $_SESSION['Username'] = $username;
            }

            echo "OK";
            exit();
        }
    }

    mysqli_stmt_close($stmt);
    mysqli_close($db_connection);

    showError('Nome utente o password sbagliati');

} catch (Exception $e) {

    if (isset($db_connection)) {
        mysqli_close($db_connection);
    }

    showError('Sistema in manutenzione');
}
?>
