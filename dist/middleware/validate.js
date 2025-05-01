"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChat = validateChat;
const joi_1 = __importDefault(require("joi"));
function validateChat(req, res, next) {
    const schema = joi_1.default.object({ message: joi_1.default.string().min(1).required(), conversationId: joi_1.default.number().optional() });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).json({ error: error.message });
    next();
}
