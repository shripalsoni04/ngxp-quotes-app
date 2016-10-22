import { Pagination } from '../../shared/models';
import { CATEGORIES } from './categories.mock';

export class FakeCategoryService {

  get(pagination?: Pagination) {
    return Promise.resolve(CATEGORIES);
  }

  getCategoryById(categoryId: number) {
    return Promise.resolve(CATEGORIES.filter(item => item.id === categoryId)[0]);
  }

  getNameById(categoryId: number) {
    return this.getCategoryById(categoryId).then((category) => {
      return category.name;
    });
  }
}
