document.addEventListener("DOMContentLoaded", initButton)


function initButton(){
    let GiocaERuota = document.getElementById("GiocaERuota");
    GiocaERuota.addEventListener("click",()=>goTo("PHP/GiocaERuota.php"));
    
    let MossePezzi = document.getElementById("MossePezzi");
    MossePezzi.addEventListener("click",()=>goTo("HTML/mossePezzi.html"));

    let PartitaPersonalizzata = document.getElementById("PartitaPersonalizzata");
    PartitaPersonalizzata.addEventListener("click",()=> goTo("HTML/PartitaPersonalizzata.html"));

    let ScoreBoard = document.getElementById("ScoreBoard");
    ScoreBoard.addEventListener("click",()=> goTo("PHP/ScoreBoard.php"));

    let infoProgetto = document.getElementById("InfoProgetto");
    infoProgetto.addEventListener("click",()=> goTo("HTML/infoProgetto.html"));
}
