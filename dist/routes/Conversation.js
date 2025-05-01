"use strict";
// src/models/Conversation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const Message_1 = require("./Message"); // Certifique-se de que o arquivo se chama exatamente Message.ts
// Definição do modelo Conversation
class Conversation extends sequelize_1.Model {
}
exports.Conversation = Conversation;
// Inicialização do modelo
Conversation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    sessionId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'conversations',
    timestamps: true
});
// Configura associação 1→N
Conversation.hasMany(Message_1.Message, {
    sourceKey: 'id',
    foreignKey: 'conversationId',
    as: 'messages'
});
