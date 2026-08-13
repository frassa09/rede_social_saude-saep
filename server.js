import 'dotenv/config'
import express from 'express'
import { sequelize } from './database/init.js'


const app = express()
const port = process.env.APP_PORT


app.use(express.json())

app.get('/', (req, res) => {

    res.status(200).json({
        message: 'Servidor Rodando!'
    })
})





sequelize.sync({alter: true, force: true}).then(() => {
    app.listen(port, () => {
        console.log(`Aplicação rodando com sucesso em http://localhost:${port}`)
    })
})

