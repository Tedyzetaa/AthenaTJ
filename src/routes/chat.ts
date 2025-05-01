// src/routes/chat.ts
import { Router } from 'express';
import { sequelize } from '../database';               // 👈 importe o sequelize
import { Transaction } from 'sequelize';               // 👈 importe o tipo Transaction
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';
import { env } from '../env';

const router = Router();

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-latest',
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ],
});

router.post('/', async (req, res, next) => {
  try {
    let convo = req.body.conversationId
      ? await Conversation.findByPk(req.body.conversationId)
      : null;
    if (!convo || convo.sessionId !== req.sessionID) {
      convo = await Conversation.create({ sessionId: req.sessionID });
    }

    // Carrega histórico
    const past = await convo.getMessages({ order: [['createdAt', 'ASC']] });

    // Inicia chat com todo o histórico
    const chatSession = model.startChat({
      history: past.map(m => ({ role: m.role, parts: [{ text: m.text }] }))
    });
    const result = await chatSession.sendMessage(req.body.message);
    const reply = result.response.text();

    // Salva no banco dentro de transação tipada
    await sequelize.transaction(async (t: Transaction) => {
      await Message.create(
        { conversationId: convo!.id, role: 'user',  text: req.body.message },
        { transaction: t }
      );
      await Message.create(
        { conversationId: convo!.id, role: 'model', text: reply },
        { transaction: t }
      );
    });

    res.json({ reply, conversationId: convo.id });
  } catch (err) {
    next(err);
  }
});

export default router;
