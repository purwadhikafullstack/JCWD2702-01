import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import routers from './routers';
require('dotenv').config();
import { PORT } from './config';

const app: Express = express();
app.use(cors());
app.use(express.json())


// Import index.ts /routers

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Purwadhika Student!');
});

app.use(routers);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const statusMessage = err.message || 'Error';

  res.status(statusCode).send({
    error: true,
    message: statusMessage,
    data: null,
  });
});

module.exports = app.listen(PORT, () => {
  console.log(`[SERVER] Server Running on Port ${PORT}`);
});