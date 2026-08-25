import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { controllerUsuario } from "../controller/Usuario.controller";

export const routerAuthUsuario = Router()


routerAuthUsuario.get('/auth/login', verifyJwt, controllerUsuario.returnLogin)