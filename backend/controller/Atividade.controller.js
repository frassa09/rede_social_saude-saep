import { Atividade } from "../model/Atividade.model.js";

export const controllerAtividade = {
  criar: async (req, res) => {
    try {
      const atividade = req.body;

      const response = await Atividade.create(atividade);
    } catch (err) {
      console.error(err.message);

      res.status(501).json({
        error: err,
        success: false,
      });
    }
  },
  buscarTodasPaginadas: async (req, res) => {
    
    const params = req.params

    const page = Number(params.page)
    const limit = Number(params.limit)

    const offset = (page - 1) * limit

    try {

      const response = await Atividade.findAndCountAll({ offset: offset, limit: limit})

      
      res.status(200).json({
        success: true,
        data: response
      })
    } catch (err) {
      console.error(err.message);

      res.status(501).json({
        error: err,
        success: false,
      });
    }
  },
};
