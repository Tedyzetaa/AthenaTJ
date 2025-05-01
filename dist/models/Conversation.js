"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
class Conversation extends sequelize_1.Model {
}
exports.Conversation = Conversation;
Conversation.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    sessionId: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
}, { sequelize: database_1.sequelize, tableName: 'conversations' });
