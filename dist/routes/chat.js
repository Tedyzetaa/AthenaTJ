"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/chat.ts
const express_1 = require("express");
const database_1 = require("../database"); // 👈 importe o sequelize
const generative_ai_1 = require("@google/generative-ai");
const Conversation_1 = require("../models/Conversation");
const Message_1 = require("../models/Message");
const env_1 = require("../env");
const router = (0, express_1.Router)();
const genAI = new generative_ai_1.GoogleGenerativeAI(env_1.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-latest',
    safetySettings: [
        { category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ],
});
router.post('/', async (req, res, next) => {
    try {
        let convo = req.body.conversationId
            ? await Conversation_1.Conversation.findByPk(req.body.conversationId)
            : null;
        if (!convo || convo.sessionId !== req.sessionID) {
            convo = await Conversation_1.Conversation.create({ sessionId: req.sessionID });
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
        await database_1.sequelize.transaction(async (t) => {
            await Message_1.Message.create({ conversationId: convo.id, role: 'user', text: req.body.message }, { transaction: t });
            await Message_1.Message.create({ conversationId: convo.id, role: 'model', text: reply }, { transaction: t });
        });
        res.json({ reply, conversationId: convo.id });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
