// src/models/Conversation.ts

import {
    DataTypes,
    Model,
    Optional,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin
  } from 'sequelize';
  import { sequelize } from '../database';
  import { Message } from './Message';  // Certifique-se de que o arquivo se chama exatamente Message.ts
  
  // Atributos que o modelo Conversation contém
  interface ConversationAttributes {
    id: number;
    sessionId: string;
  }
  
  // Atributos opcionais ao criar uma nova Conversation
  interface ConversationCreationAttributes
    extends Optional<ConversationAttributes, 'id'> {}
  
  // Definição do modelo Conversation
  export class Conversation
    extends Model<ConversationAttributes, ConversationCreationAttributes>
    implements ConversationAttributes {
    public id!: number;
    public sessionId!: string;
  
    // Mixins para relacionamento 1→N com Message
    public getMessages!: HasManyGetAssociationsMixin<Message>;
    public addMessage!: HasManyAddAssociationMixin<Message, number>;
    public hasMessage!: HasManyHasAssociationMixin<Message, number>;
    public countMessages!: HasManyCountAssociationsMixin;
    public createMessage!: HasManyCreateAssociationMixin<Message>;
  
    // timestamps gerenciados automaticamente
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  // Inicialização do modelo
  Conversation.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      sessionId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      tableName: 'conversations',
      timestamps: true
    }
  );
  
  // Configura associação 1→N
  Conversation.hasMany(Message, {
    sourceKey: 'id',
    foreignKey: 'conversationId',
    as: 'messages'
  });
  