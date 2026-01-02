const express = require('express');
const path = require('path');
const session = require('express-session'); 
const authRoutes = require('./src/routes/auth.js');
const { fetchAndInsertCards} = require("./src/api/fetchFirstGenCards.js");
const { Card } = require('./src/models/cards.js');
const app = express();
const PORT = 8080;

// archivos estáticos 
app.use(express.static(path.join(__dirname, 'public')));

// middleware para formularios
app.use(express.urlencoded({ extended: true }));

// plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'my_secret',
    resave: false,
    saveUninitialized: false
}));

// poder utilizar el modelo User en cualquier sitio

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use('/auth', authRoutes);



app.get("/", async (req, res) => {
      const popularCards = [
    { name: 'Pikachu', image: '/img/cards/pikachuEX.webp' },
    { name: 'Charizard', image: '/img/cards/charizardEX.webp' },
    { name: 'Mewtwo', image: '/img/cards/mewtwoEX.webp' },
    { name: 'Mew', image: '/img/cards/mewEX.webp' },
    { name: 'Mega-altaria', image: '/img/cards/mega-altariaEX.webp' }
  ];

  console.log('Cargando index con cartas populares...'); // para verificar en terminal

    const cards = await Card.findAll();
    res.render("index", { popularCards, cards });
});

async function init() {
    try {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en ➜ http://localhost:${PORT}`);
        });

        // Llamada a la API en background
        fetchAndInsertCards().catch(err => console.error("Error importando cartas:", err.message));
    } catch (err) {
        console.error("Error iniciando la app:", err);
    }
}

init();



