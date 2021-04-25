import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

// import routes from './routes';
import AppError from './errors/AppError';
import BlockChain from './models/Blockchain';
import P2pserver from './models/P2pserver';

// import createConnection from './database';

const app = express();

app.use(express.json());

const blockchain = new BlockChain();

const p2pserver = new P2pserver(blockchain);
p2pserver.listen();

app.get('/blocks', (request, response) => {
  response.json(blockchain.chain);
});

app.post('/mine', (request, response) => {
  const { data } = request.body;
  const block = blockchain.addBlock(data);
  console.info('a new block was added s%', block.toString());
  p2pserver.syncChain();
  response.redirect('/blocks');
});
// app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
