import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import { controllerUsuario } from "../controller/Usuario.controller.js";

export const routerAuthUsuario = Router()


routerAuthUsuario.get('/login', verifyJwt, controllerUsuario.returnLogin)