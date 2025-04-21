import dotenv from 'dotenv';

dotenv.config();

import boom from 'express-boom';
import express, { Express } from 'express';
import { HttpLogger, Logger } from './helper';
import cors from 'cors';
import { routes } from './routes';
import { DBConnection } from './config/dbPoolInfra';


const app: Express = express();
const port = 8000

// Middleware
app.use(boom());
app.use(cors({
    origin: 'https://shoping-time-frontend.vercel.app',
}));
app.use(HttpLogger);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
routes.forEach(route => {
    app.use(route.path, route.router);
});

app.listen(port, async (): Promise<void> => {
  try {
      await DBConnection();
      Logger.info(`[Bun-Service] Server is running on port ${port}`);
  } catch (error) {
      if (error instanceof Error) {
          Logger.error(
              `Error starting server: Message: ${error.message} | Stack: ${error.stack}`
          );
      } else {
          Logger.error(`Error starting server: ${String(error)}`);
      }
  }
});

