async function mostraCognome() {
    document.getElementById("domanda").style.display = "none";
    document.getElementById("cognomeInput").style.display = "block";
}

async function mostraOpzioni() {
    document.getElementById("domanda").style.display = "none";
    document.getElementById("opzioni").style.display = "block";
}

async function inviaDati(cognome, motivo) {
    await fetch("http://localhost:3000/nuovo-paziente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cognome, motivo }),
    });
}

async function confermaCognome() {
    let cognome = document.getElementById("cognome").value;
    if (cognome.trim() === "") {
        alert("Inserisci il tuo cognome!");
    } else {
        await inviaDati(cognome, "Appuntamento");
        alert("Registrato! Attendi il tuo turno.");
        reset();
    }
}

async function mostraMessaggio(testo, motivo) {
    await inviaDati("Anonimo", motivo);
    document.getElementById("opzioni").style.display = "none";
    document.getElementById("messaggio").style.display = "block";
    document.getElementById("testoMessaggio").innerText = testo;
}

async function reset() {
    document.getElementById("domanda").style.display = "block";
    document.getElementById("cognomeInput").style.display = "none";
    document.getElementById("opzioni").style.display = "none";
    document.getElementById("messaggio").style.display = "none";
}
