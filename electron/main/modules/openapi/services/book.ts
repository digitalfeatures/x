import * as _ from 'lodash';

import { Book } from '../../datasource/entry/book';

import { Path, GET, POST, PathParam, Body } from '../../../libraries/http-framework/express';
import { Service } from '../../../libraries/http-framework/express/service';

@Path('/book')
export class BookService extends Service {
  @GET('/:uuid')
  async getBook(@PathParam('uuid') uuid: string) {
    const executer = this.database.getRepository(Book);

    const entry = await executer.findOneBy({
      uuid,
    });

    return entry;
  }

  @POST('')
  async createBook(@Body data: Pick<Book, 'name' | 'referenceResourceId' | 'referenceResourceSource'>) {
    const book = new Book();
    _.assign(book, data);
    const executer = this.database.getRepository(Book);
    const entry = await executer.save(book);
    const { uuid } = entry;
    return {
      uuid,
    };
  }
}
