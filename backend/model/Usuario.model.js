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



export const seedUsers = async () => await Usuario.bulkCreate(
    [
        {nome: 'saepsaude', email: 'saepsaude@email.com', nome_usuario: 'saepsaude', imagem: 'saepsaude.png', senha: '123456'},
        {nome: 'usuario1', email: 'usuario1@email.com', nome_usuario: 'usuario01', imagem: 'usuario01.jpg', senha: '123456'},
        {nome: 'usuario2', email: 'usuario2@email.com', nome_usuario: 'usuario02', imagem: 'usuario02.jpg', senha: '123456'},
        {nome: 'usuario3', email: 'usuario3@email.com', nome_usuario: 'usuario03', imagem: 'usuario03.jpg', senha: '123456'},
    ],
    {validate: true, updateOnDuplicate: ['nome', 'email', 'nome_usuario', 'imagem', 'senha']}
)