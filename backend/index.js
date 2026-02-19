const express = require('express');
const cors = require('cors');
const { scanNetwork } = require('./scanner');

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:5001'
}));
app.use(express.json());

app.get('/api/scan', async (req, res) => {
    try {
        console.log("Starting network scan...");
        const devices = await scanNetwork();
        console.log("Scan complete. Found:", devices.length, "devices");
        res.json(devices);
    } catch (error) {
        console.error("Scan error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Scanner running at http://localhost:${PORT}`);
});
