import { DataTypes } from "sequelize";
import { sequelize } from "../database/init.js";


export const Atividade = sequelize.define('Atividade', {
    tipo_atividade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distancia_percorrida: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    duracao_atividade: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    quantidade_calorias: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {timestamps: true, tableName: 'atividade'})


export const seedAtividades = async () => await Atividade.bulkCreate(
  [
    {tipo_atividade: 'caminhada', distancia_percorrida: '5000', duracao_atividade: '70', quantidade_calorias: '340', usuario_id: 1},
    {tipo_atividade: 'caminhada', distancia_percorrida: '4000', duracao_atividade: '40', quantidade_calorias: '140', usuario_id: 1},
    {tipo_atividade: 'caminhada', distancia_percorrida: '3000', duracao_atividade: '30', quantidade_calorias: '140', usuario_id: 1},
    {tipo_atividade: 'caminhada', distancia_percorrida: '3500', duracao_atividade: '35', quantidade_calorias: '180', usuario_id: 1},
    {tipo_atividade: 'corrida', distancia_percorrida: '6500', duracao_atividade: '40', quantidade_calorias: '280', usuario_id: 1},
    {tipo_atividade: 'corrida', distancia_percorrida: '5500', duracao_atividade: '50', quantidade_calorias: '220', usuario_id: 1},
    {tipo_atividade: 'corrida', distancia_percorrida: '10000', duracao_atividade: '24', quantidade_calorias: '420', usuario_id: 1},
    {tipo_atividade: 'corrida', distancia_percorrida: '5000', duracao_atividade: '23', quantidade_calorias: '320', usuario_id: 1},
    {tipo_atividade: 'trilha', distancia_percorrida: '2000', duracao_atividade: '40', quantidade_calorias: '420', usuario_id: 1},
    {tipo_atividade: 'trilha', distancia_percorrida: '3000', duracao_atividade: '45', quantidade_calorias: '470', usuario_id: 1},
    {tipo_atividade: 'trilha', distancia_percorrida: '3500', duracao_atividade: '45', quantidade_calorias: '420', usuario_id: 1},
    {tipo_atividade: 'trilha', distancia_percorrida: '5000', duracao_atividade: '70', quantidade_calorias: '570', usuario_id: 1}
  ],
  {validate: true}
)