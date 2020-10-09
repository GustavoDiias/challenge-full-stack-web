const express = require('express');

const Student = require('../models/student');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { ra, name, email, cpf } = req.body;

    try {

        const student = await Student.create({ ra, name, email, cpf });

        return res.json(student);

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar novo estudante' });
    }
});

router.get('/', async (req, res) => {

    try {

        const student = await Student.findAll();

        return res.json(student);

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar os estudantes' });
    }
});





module.exports = app => app.use('/student', router);