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
        success: true
      });
    } catch (err) {
      console.error(err.message);

      res.status(501).json({
        message: "Erro no banco de dados",
        erro: err.message,
        success:  false
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
          success: true
        });
      } else {
        res.status(401).json({
          message: "Falha no login",
          data: response,
          success:  false
        });
      }
    } catch (err) {
      console.error(err.message);

      res.status(501).json({
        message: "Erro no banco de dados",
        erro: err.message,
        success: false
      });
    }
  },
  returnLogin: async (req, res) => {

    res.status(200).json({
      message: 'Login realizado',
      success: true
    })
  }
};
