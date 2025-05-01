import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
export function validateChat(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({ message: Joi.string().min(1).required(), conversationId: Joi.number().optional() });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  next();
}