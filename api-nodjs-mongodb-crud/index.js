// config initial
require('dotenv').config()
const express = require('express')

const mongoose = require('mongoose')

const app = express()

// form to read the JSON / middlewares_________________________

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
//------------------------------------------------------------

// initial route / endpoint___________________________________

app.get('/', (req, res) => {
    res.json({ massage: 'olá express eu sou o Yuri Rego'})
})

//________________________________________________________________

// rotas da api_________________________________________________

const personRouters = require('./routes/personRoutes')

app.use('/person', personRouters)

//_FIM_______________________________________________________________

// give a port_____________________________________________________

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.gnsnk.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log('conectamos ao mongodb'),
        app.listen(3000)
    })
    .catch((err)=> {
        console.log(err)
    })

// mongodb+srv://yuri:W4hEXJdCmWXbtCm8@apicluster.gnsnk.mongodb.net/bancodaapi?retryWrites=true&w=majority

// W4hEXJdCmWXbtCm8 - atlas