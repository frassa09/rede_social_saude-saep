import { Atividade } from "./Atividade.model.js";
import { Usuario } from "./Usuario.model.js";

Usuario.hasMany(Atividade, {foreignKey: 'usuario_id'})
Atividade.belongsTo(Usuario, {foreignKey: 'usuario_id'})