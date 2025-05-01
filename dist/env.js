"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const envalid_1 = require("envalid");
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    GEMINI_API_KEY: (0, envalid_1.str)(),
    SESSION_SECRET: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)({ default: 3000 }),
    DB_URL: (0, envalid_1.str)(),
});
