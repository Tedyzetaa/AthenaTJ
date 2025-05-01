import { Router } from 'express';
import { Conversation } from '../models/Conversation';
const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const convo = await Conversation.findOne({ where: { sessionId: req.sessionID } });
    if (!convo) return res.json({ history: [], conversationId: null });
    const messages = await convo.getMessages({ order: [['createdAt', 'ASC']] });
    res.json({ history: messages.map(m => ({ role: m.role, text: m.text })), conversationId: convo.id });
  } catch (err) { next(err); }
});
export default router;