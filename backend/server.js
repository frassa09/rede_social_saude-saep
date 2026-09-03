import 'dotenv/config'
import express from 'express'
import { seedUsers, Usuario } from './model/Usuario.model.js'
import { Atividade, seedAtividades } from './model/Atividade.model.js'
import './model/relations.js'
import { sequelize } from './database/init.js'
import { corsConfig } from './middlewares/cors.config.js'
import { routerUsuario } from './routes/Usuario.routes.js'
import { routerAuthUsuario } from './routes/Usuario.auth.routes.js'


const app = express()

const port = process.env.APP_PORT


app.use(express.json())
app.use(corsConfig)



app.use('/usuario', routerUsuario)
app.use('/usuario/auth', routerAuthUsuario)

app.get('/', (req, res) => {

    res.status(200).json({
        message: 'Servidor Rodando!'
    })
})



sequelize.sync({alter: true}).then(async () => {
    try {
        await seedUsers()
        await seedAtividades()
    } catch (erro) {
        // Ignora erro de seed duplicado e segue o baile!
        console.log("Seeds já existem no banco. Ignorando...")
    }

    app.listen(port, () => {
        console.log(`Aplicação rodando com sucesso em http://localhost:${port}`)
    })
})

