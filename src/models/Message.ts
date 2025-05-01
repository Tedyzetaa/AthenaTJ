import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface MessageAttributes { id: number; conversationId: number; role: 'user' | 'model'; text: string; createdAt?: Date; }
interface MessageCreation extends Optional<MessageAttributes, 'id'> {}

export class Message extends Model<MessageAttributes, MessageCreation>
  implements MessageAttributes {
  public id!: number;
  public conversationId!: number;
  public role!: 'user' | 'model';
  public text!: string;
}

Message.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    conversationId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'model'), allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
  },
  { sequelize, tableName: 'messages', timestamps: true }
);

import { Conversation } from './Conversation';
Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });