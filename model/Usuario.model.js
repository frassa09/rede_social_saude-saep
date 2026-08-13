import { DataTypes } from "sequelize";
import { sequelize } from "../database/init.js";


export const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    nome_usuario: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    imagem: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    senha: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {timestamps: true, tableName: 'usuario'})