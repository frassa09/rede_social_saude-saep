import 'dotenv/config'
import express from 'express'
import { seedUsers, Usuario } from './model/Usuario.model.js'
import { Atividade, seedAtividades } from './model/Atividade.model.js'
import './model/relations.js'
import { sequelize } from './database/init.js'


const app = express()
const port = process.env.APP_PORT


app.use(express.json())

app.get('/', (req, res) => {

    res.status(200).json({
        message: 'Servidor Rodando!'
    })
})



sequelize.sync({alter: true, force: true}).then(async () => {
    await seedUsers()
    await seedAtividades()
    app.listen(port, () => {
        console.log(`Aplicação rodando com sucesso em http://localhost:${port}`)
    })
})

