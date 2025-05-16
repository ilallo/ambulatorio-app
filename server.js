const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ✅ Serve correttamente la cartella public
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// ✅ Serve admin.html
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public/admin.html"));
});

// ✅ Serve manualmente qrcode.png (per sicurezza)
app.get("/qrcode.jpeg", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/qrcode.jpeg"));
});

// ✅ Gestione pazienti
let pazienti = [];

app.post("/nuovo-paziente", (req, res) => {
    const { cognome, motivo, appuntamento } = req.body;
    if (!cognome || !motivo) {
        return res.status(400).json({ success: false, message: "Dati mancanti" });
    }
    pazienti.push({
        cognome,
        motivo,
        appuntamento,
        orario: new Date().toLocaleTimeString()
    });
    console.log(`➕ Nuovo paziente: ${cognome} - ${motivo}`);
    res.json({ success: true });
});

app.get("/lista-pazienti", (req, res) => {
    res.json(pazienti);
});

app.post("/rimuovi-paziente", (req, res) => {
    const { cognome } = req.body;
    pazienti = pazienti.filter(p => p.cognome !== cognome);
    console.log(`❌ Paziente rimosso: ${cognome}`);
    res.json({ success: true });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`✅ Server avviato su http://0.0.0.0:${port}`);
});
