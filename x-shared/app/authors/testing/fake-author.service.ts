import { ClassProvider } from '@angular/core';

import { Pagination } from '../../shared/models';
import { AuthorService } from '../author.service';
import { AUTHORS } from './mock-authors';

export { AuthorService } from '../author.service';

export class FakeAuthorService {

  get(pagination?: Pagination) {
    return Promise.resolve(AUTHORS);
  }

  getAuthorById(authorId: number) {
    return Promise.resolve(AUTHORS.filter(item => item.id === authorId)[0]);
  }

  getNameById(authorId: number) {
    return this.getAuthorById(authorId).then((author) => {
      return author.name;
    });
  }
}

export let fakeAuthorServiceProvider: ClassProvider = {
  provide: AuthorService,
  useClass: FakeAuthorService
};
