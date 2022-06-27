
const router = require('express').Router()

const res = require('express/lib/response')
const { findOne } = require('../models/Person')
const Person = require('../models/Person')

// creat - criação de dados_____________________________________________________________________

router.post('/', async (req, res) => {

    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'nenhum dado foi enviado, o nome é obrigatório!' })
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        // criando dados
        await Person.create(person)

        res.status(201).json({ message: 'pessoa criada com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})
// fim criação de daods_____________________________________________________________

// read -leitura de dados___________________________________________________________

router.get('/', async (req, res) => {
    try {
        
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})
//FIM______________________________________________________________________________

// 

router.get('/:id', async (req, res) => {
    try {
        
        const id = req.params.id

        const person = await Person.findOne({_id: id})

        if (!person) {
            res.status(422).json({ error: 'Pessoa não encontrada!' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//_________update - patch and put_________________________________________
router.patch('/:id', async (req, res) => {
    const { name, salary, approved } = req.body

    const id = req.params.id

    const person = {
        name,
        salary,
        approved
    }

    try {
        // atualizando dados
        const updateperson = await Person.updateOne({ _id: id}, person)
        if (updateperson.matchedCount === 0) {
            res.status(422).json({ error: 'nenhum dado a ser atualizado!' })
            return
        }

        res.status(200).json({ message: 'pessoa atualizada com sucesso', pessoa: person })

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// _____________Delete________________________________________________________________________

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ error: 'Pessoa não encontrada!' })
        return
    }

    try {
        const deletePerson = await Person.deleteOne({ _id: id })
        res.status(200).json({ message: 'eliminado com sucesso!'})
    } catch (error) {
        res.status(422).json({ error: error })
    }
})
module.exports = router