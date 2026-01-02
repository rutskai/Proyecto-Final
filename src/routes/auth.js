const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

router.get('/register', (req, res) => res.render('auth/register'));
router.get('/login', (req, res) => res.render('auth/login'));
router.get('/user', (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');
});


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send('El email ya está registrado.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).send(`Usuario ${newUser.name} creado con éxito`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send('Email o contraseña incorrecta');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send('Email o contraseña incorrecta');
        }

        req.session.user = { id: user.id, name: user.name };
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/');
    });
});




module.exports = router;
