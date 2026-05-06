function createLoginBlock(tipo, loggato = false) {
  const div = document.createElement("div");
  div.id = "LoginMenu";

  // input username
  const user = document.createElement("input");
  user.placeholder = tipo === "temp" ? "Username" : "Username";
  div.appendChild(user);

  // input password
  const pass = document.createElement("input");
  pass.type = "password";
  pass.placeholder = "Password";
  div.appendChild(pass);

  // bottone login
  const loginBtn = document.createElement("button");
  loginBtn.textContent = "Login";

  loginBtn.onclick = async () => {
    const risposta = await inviaLogin(user.value, pass.value, tipo, false);

    if (risposta === "OK") {
      document.dispatchEvent(
        new CustomEvent("UserLoggedIn", {
          detail: {
            username: user.value,
          },
        }),
      );
      removeLoginBox();
    } else {
      user.value = "";
      pass.value = "";
      alert(risposta);
    }
  };
  loginBtn.classList.add("bottoneLogin");
  div.appendChild(loginBtn);

  const registerBtn = document.createElement("button");
  registerBtn.textContent = "Registrati";

  registerBtn.onclick = async () => {
    const risposta = await inviaLogin(user.value, pass.value, tipo, true);

    if (risposta === "OK") {
      alert("Registrazione completata");
      document.dispatchEvent(
        new CustomEvent("UserLoggedIn", {
          detail: {
            username: user.value,
          },
        }),
      );

      removeLoginBox();
    } else {
      user.value = "";
      pass.value = "";
      alert(risposta);
    }
  };
  registerBtn.classList.add("bottoneLogin");
  div.appendChild(registerBtn);

  //bottone annulla SOLO per main 
  if (tipo === "main") {
    const annulla = document.createElement("button");
    annulla.textContent = "Annulla";

    annulla.onclick = () => {
      removeLoginBox();

      if (loggato) {
        document.getElementById("GiocaERuota").disabled = false;
        document.getElementById("PartitaPersonalizzata").disabled = false;
      }
    };
    annulla.classList.add("bottoneLogin");
    div.appendChild(annulla);
  }

  //metto un p davanti SOLO per temp
  if (tipo === "temp") {
    const p = document.createElement("p");
    p.textContent = "Login Avversario:";
    div.prepend(p);
  }

  return div;
}

async function inviaLogin(username, password, tipo, register = false) {
  // prepara i dati da inviare
  const formData = new FormData();
  formData.append("Username", username);
  formData.append("Password", password);
  formData.append("login_type", tipo);

  if (register) {
    formData.append("register", "1");
  }

  try {
    const res = await fetch("/Zolesi_673784/PHP/login.php", {
      method: "POST",
      body: formData,
      credentials: "same-origin",
    });

    const text = await res.text();

    return text; // "OK" oppure "Errore: ..."
  } catch (e) {
    return "Errore: impossibile contattare il server";
  }
}
