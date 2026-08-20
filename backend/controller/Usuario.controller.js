import { generateJwt } from "../middlewares/generateJwt.js";
import { Usuario } from "../model/Usuario.model.js";

export const controllerUsuario = {
  cadastrar: async (req, res) => {
    try {
      const usuario = req.body;

      console.log(usuario);

      const response = await Usuario.create(usuario);

      res.status(200).json({
        message: "Usuário criado com sucesso",
        content: response,
        sucess: true
      });
    } catch (err) {
      console.error(err.message);

      res.status(501).json({
        message: "Erro no banco de dados",
        erro: err.message,
        sucess:  false
      });
    }
  },
  login: async (req, res) => {
    try {
      const usuario = req.body;

      console.log(usuario);

      const response = await Usuario.findOne({
        where: { email: usuario.email, senha: usuario.senha },
      });

      if (response) {
        const data = response.dataValues;

        const payload = {
          id: data.id,
          nome: data.id,
          email: data.id,
        };
        const token = generateJwt(payload);

        res.status(200).json({
          message: "Login bem sucedido",
          token,
          sucess: true
        });
      } else {
        res.status(401).json({
          message: "Falha no login",
          data: response,
          sucess:  false
        });
      }
    } catch (err) {
      console.error(err.message);

      res.status(501).json({
        message: "Erro no banco de dados",
        erro: err.message,
        sucess: false
      });
    }
  },
};
