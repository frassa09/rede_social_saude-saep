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
        unique: true,
        validate: {
            isEmail: true
        }
    },
    duracao_atividade: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    quantidade_calorias: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {timestamps: true, tableName: 'atividade'})