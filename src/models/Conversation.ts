import {
  DataTypes,
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import { sequelize } from '../database';
import { Message } from './Message';

interface ConversationAttributes {
  id: number;
  sessionId: string;
}

interface ConversationCreationAttributes extends Optional<ConversationAttributes, 'id'> {}

export class Conversation
  extends Model<ConversationAttributes, ConversationCreationAttributes>
  implements ConversationAttributes
{
  public id!: number;
  public sessionId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public getMessages!: HasManyGetAssociationsMixin<Message>;
  public addMessage!: HasManyAddAssociationMixin<Message, number>;
  public hasMessage!: HasManyHasAssociationMixin<Message, number>;
  public countMessages!: HasManyCountAssociationsMixin;
  public createMessage!: HasManyCreateAssociationMixin<Message>;

  // You can add more methods or properties as needed
}

Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'conversations',
    timestamps: true, // Enable timestamps if you want createdAt and updatedAt
  }
);

// Define associations
Conversation.hasMany(Message, {
  sourceKey: 'id',
  foreignKey: 'conversationId',
  as: 'messages',
});
