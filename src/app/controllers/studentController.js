const express = require('express');
const { sequelize, QueryTypes } = require('sequelize');
const { upsert } = require('../models/student');

const Student = require('../models/student');

const router = express.Router();

router.get('/', async (req, res) => {

    try {

        const student = await Student.findAll();

        return res.json(student);

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar os estudantes' });
    }
});

router.post('/create', async (req, res) => {
    const { ra, name, email, cpf } = req.body;

    try {

        const uniqueRa = await Student.findAll({
            attributes: ['ra']
        })

        const student = await Student.create({ ra, name, email, cpf });

        return res.json(student);


    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao cadastrar novo estudante' });
    }
});

router.put('/update/:student_id', async (req, res) => {
    const { id } = req.body;

    try {

        return res.json(student);

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar novo estudante' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(400).send({ error: 'Estudante não encontrado' });
        }

        await student.destroy();

        return res.json();

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar novo estudante' });
    }
});

module.exports = app => app.use('/student', router);