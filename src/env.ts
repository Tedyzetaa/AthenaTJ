import { cleanEnv, str, port } from 'envalid';
export const env = cleanEnv(process.env, {
  GEMINI_API_KEY: str(),
  SESSION_SECRET: str(),
  PORT: port({ default: 3000 }),
  DB_URL: str(),
});