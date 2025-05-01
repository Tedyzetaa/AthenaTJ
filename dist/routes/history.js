"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Conversation_1 = require("../models/Conversation");
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    try {
        const convo = await Conversation_1.Conversation.findOne({ where: { sessionId: req.sessionID } });
        if (!convo)
            return res.json({ history: [], conversationId: null });
        const messages = await convo.getMessages({ order: [['createdAt', 'ASC']] });
        res.json({ history: messages.map(m => ({ role: m.role, text: m.text })), conversationId: convo.id });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
