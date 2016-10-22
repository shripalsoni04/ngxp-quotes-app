import { Pagination } from '../../shared/models';
import { AUTHORS } from './mock-authors';

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
