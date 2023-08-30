import { IpcMain } from 'electron';

import * as _ from 'lodash';

export interface IPCOptions {
  dataCacheDirPath: string;
}

export class IPC {
  private readonly options: IPCOptions;

  private cache: string;
  private port: number;

  private ipcMain: IpcMain;

  constructor(ipcMain: IpcMain, options: IPCOptions) {
    this.options = options;
    this.ipcMain = ipcMain;
  }

  async start() {}
}
