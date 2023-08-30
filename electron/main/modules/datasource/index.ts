import * as path from 'path';

import { Book } from './entry/book';
import { DataSource } from 'typeorm';

const DatabaseSourceInstanceCache = new Map<string, DataSource>();

export class Database {
  static async getSource(dir: string, name: string): Promise<DataSource | null> {
    const filepath = path.resolve(dir, `${name}.db`);

    const key = Buffer.from(filepath).toString('base64');
    const target = DatabaseSourceInstanceCache.get(key);
    if (target) {
      return target;
    }

    const database = new DataSource({
      type: 'better-sqlite3',
      driver: require('better-sqlite3-multiple-ciphers'),
      database: filepath,
      key: 'linksystem',
      synchronize: true,
      entities: [Book],
      logging: false,
    });

    try {
      await database.initialize();
    } catch (error) {
      console.warn(`database connect failed! the reason is ${error.message}`);
      return;
    }

    DatabaseSourceInstanceCache.set(key, database);

    return database;
  }
}
