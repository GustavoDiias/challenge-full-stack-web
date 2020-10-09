const express = require('express');

const Student = require('../models/student');

const router = express.Router();

router.get('/', async (req, res) => {

    try {

        const student = await Student.findAll();

        if (!student) {
            return res.status(400).send({ error: 'Estudantes não encontrados' });
        }

        return res.json(student);

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar os estudantes' });
    }
});

router.post('/create', async (req, res) => {
    const { ra, name, email, cpf } = req.body;

    try {

        const student = await Student.create({ ra, name, email, cpf });

        return res.json(student);

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar novo estudante' });
    }
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(400).send({ error: 'Estudante não encontrado' });
        }

        student.name = name;
        student.email = email;

        await student.save();

        return res.json(student);

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao atualizar estudante' });
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
        return res.status(400).send({ error: 'Erro ao excluir estudante' });
    }
});

module.exports = app => app.use('/student', router);