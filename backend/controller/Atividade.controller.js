import { Atividade } from "../model/Atividade.model";

export const controlletAtividade = {
  criar: async (req, res) => {
    try {

        const atividade = req.body

        const response = await Atividade.create(atividade)


        
    } catch (err) {
        console.error(err.message)

        res.status(501).json({
            error: err,
            success: false
        })
    }
  },
};
