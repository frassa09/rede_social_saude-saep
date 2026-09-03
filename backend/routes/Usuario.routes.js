import { Router } from "express";
import { controllerUsuario } from "../controller/Usuario.controller.js";


export const routerUsuario = Router()


routerUsuario.post('/cadastrar', controllerUsuario.cadastrar)
routerUsuario.post('/login', controllerUsuario.login)