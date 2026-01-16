const express = require('express');
const router = express.Router();

app.get("/cards", async (req, res) => {
    try {
        const cards = await Card.findAll();
        res.render("cards", { cards });    
    } catch (err) {
        console.error(err);
        res.status(500).send("Error cargando cartas");
    }
});

module.exports = router;