const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Archivos estáticos 
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para formularios
app.use(express.urlencoded({ extended: true }));

// plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  const popularCards = [
    { name: 'Pikachu', image: '/img/cards/pikachuEX.webp' },
    { name: 'Charizard', image: '/img/cards/charizardEX.webp' },
    { name: 'Mewtwo', image: '/img/cards/mewtwoEX.webp' },
    { name: 'Mew', image: '/img/cards/mewEX.webp' },
    { name: 'Mega-altaria', image: '/img/cards/mega-altariaEX.webp' }
  ];

  console.log('Cargando index con cartas populares...'); // para verificar en terminal
  res.render('index', { popularCards });
});
app.get('/auth/register', (req, res) => res.render('auth/register'));
app.get('/auth/login', (req, res) => res.render('auth/login'));

app.post('/auth/register', (req, res) => {
  const { username, password } = req.body;
  console.log('Nuevo registro:', username, password);
  res.send('Usuario registrado con éxito');
});


app.listen(PORT, () =>
  console.log(`Servidor corriendo en ➜ http://localhost:${PORT}`)
);
