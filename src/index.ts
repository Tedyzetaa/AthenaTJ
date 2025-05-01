import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './env';
import { logger } from './logger';
import historyRouter from './routes/history';
import chatRouter from './routes/chat';
import { apiLimiter } from './middleware/rateLimiter';
import { validateChat } from './middleware/validate';
import { errorHandler } from './middleware/errorHandler';
import { sequelize } from './database';

const app = express();
app.use(helmet());
app.use(cors({ origin: ['https://seusite.com'], credentials: true }));
app.use(express.json());
app.use(session({ secret: env.SESSION_SECRET, resave: false, saveUninitialized: true, cookie: { secure: 'auto', httpOnly: true } }));
app.get('/health', (req, res) => res.json({ uptime: process.uptime() }));
app.use(apiLimiter);
app.use('/history', historyRouter);
app.use('/chat', validateChat, chatRouter);
app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(env.PORT, () => logger.info(`Server running on http://localhost:${env.PORT}`));
});