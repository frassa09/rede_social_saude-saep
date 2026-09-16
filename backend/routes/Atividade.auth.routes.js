import { Router } from "express"
import { verifyJwt } from "../middlewares/verifyJwt.js"
import { controllerAtividade } from "../controller/Atividade.controller.js"

export const routerAtividades = Router()



routerAtividades.get('/all/:page/:limit', verifyJwt, controllerAtividade.buscarTodasPaginadas)