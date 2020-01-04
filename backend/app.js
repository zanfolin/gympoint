import express from 'express';

import cors from 'cors';

import routes from './src/routes';

import './src/database';

class App {
  constructor() {
    this.server = express();
    this.middleswares();
    this.routes();
  }

  middleswares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
