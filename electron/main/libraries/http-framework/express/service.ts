import { DataSource } from 'typeorm';

import { Database } from '../../../modules/datasource';

let inlineDataCacheDirPath = '';
let inlineDatabaseFileName = '';

let inlineDatasource: DataSource;

export class Service {
  static async Init(dataCacheDirPath: string, databaseFileName: string) {
    inlineDataCacheDirPath = dataCacheDirPath;
    inlineDatabaseFileName = databaseFileName;

    const database = await Database.getSource(inlineDataCacheDirPath, inlineDatabaseFileName);

    inlineDatasource = database;
  }

  database: DataSource;

  constructor() {
    this.database = inlineDatasource;
  }
}
