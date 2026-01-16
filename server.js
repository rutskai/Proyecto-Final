const express = require('express');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./src/routes/auth.js');
const userRoutes = require('./src/routes/user.js');
const { Card } = require('./src/models/cards.js');
const app = express();
const PORT = 8080;

// Archivos estáticos 
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para formularios
app.use(express.urlencoded({ extended: true }));
// Plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sesiones
app.use(session({
    secret: 'my_secret',
    resave: false,
    saveUninitialized: false
}));

// Usuario disponible en todas las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);


app.get("/", async (req, res) => {
    try {
        const popularCards = [
            { name: 'Pikachu', image: '/img/cards/pikachuEX.webp' },
            { name: 'Charizard', image: '/img/cards/charizardEX.webp' },
            { name: 'Mewtwo', image: '/img/cards/mewtwoEX.webp' },
            { name: 'Mew', image: '/img/cards/mewEX.webp' },
            { name: 'Mega-altaria', image: '/img/cards/mega-altariaEX.webp' }
        ];


        const cards = await Card.findAll();
        res.render("index", { popularCards, cards });
        
    } catch (err) {
        console.error("Error cargando cartas:", err);
        res.status(500).send("Error cargando cartas");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en ➜ http://localhost:${PORT}`);
});
