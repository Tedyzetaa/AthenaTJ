"use strict";
// src/models/Message.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const Conversation_1 = require("./Conversation");
// Definição do modelo Message
class Message extends sequelize_1.Model {
}
exports.Message = Message;
// Inicialização do modelo
Message.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    conversationId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('user', 'model'),
        allowNull: false
    },
    text: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'messages',
    timestamps: true
});
// Configura associação N→1
Message.belongsTo(Conversation_1.Conversation, {
    foreignKey: 'conversationId',
    as: 'conversation'
});
