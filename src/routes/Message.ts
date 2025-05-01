// src/models/Message.ts

import {
    DataTypes,
    Model,
    Optional,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin
  } from 'sequelize';
  import { sequelize } from '../database';
  import { Conversation } from './Conversation';
  
  // Atributos que o modelo Message possui
  interface MessageAttributes {
    id: number;
    conversationId: number;
    role: 'user' | 'model';
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  // Atributos opcionais ao criar uma nova Message
  interface MessageCreationAttributes
    extends Optional<MessageAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
  
  // Definição do modelo Message
  export class Message
    extends Model<MessageAttributes, MessageCreationAttributes>
    implements MessageAttributes {
    public id!: number;
    public conversationId!: number;
    public role!: 'user' | 'model';
    public text!: string;
  
    // Timestamps gerenciados automaticamente pelo Sequelize
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    // Mixins para relacionamento N→1 com Conversation
    public getConversation!: BelongsToGetAssociationMixin<Conversation>;
    public setConversation!: BelongsToSetAssociationMixin<Conversation, number>;
    public createConversation!: BelongsToCreateAssociationMixin<Conversation>;
  }
  
  // Inicialização do modelo
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      conversationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('user', 'model'),
        allowNull: false
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'messages',
      timestamps: true
    }
  );
  
  // Configura associação N→1
  Message.belongsTo(Conversation, {
    foreignKey: 'conversationId',
    as: 'conversation'
  });
  