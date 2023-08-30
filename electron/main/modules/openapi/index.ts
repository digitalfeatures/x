import express from 'express';

import * as http from 'http';

import * as _ from 'lodash';

import { Service, RegisterService } from '../../libraries/http-framework/express';
import { BookService } from './services/book';

export class Server {
  private cache: string;
  private port: number;

  private server: http.Server;

  constructor(cache: string, port: number) {
    this.cache = cache;
    this.port = port;
  }

  private async initSqlLite3Database() {
    const { cache } = this;
    const name = 'x';
    await Service.Init(cache, name);
  }

  async start() {
    await this.initSqlLite3Database();

    const { port } = this;
    const app = express();

    RegisterService(app, [BookService]);

    const server = app.listen(port, () => {
      console.log(`the server listening on port ${port}`);
    });

    this.server = server;
  }

  close() {
    if (this.server) {
      this.server.close(() => {
        console.log('the server will be close!');
      });
    }
  }
}
