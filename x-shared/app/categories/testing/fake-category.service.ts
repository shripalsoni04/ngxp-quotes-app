import { ClassProvider } from '@angular/core';

import { Pagination } from '../../shared/models';
import { CategoryService } from '../category.service';
import { CATEGORIES } from './categories.mock';

export { CategoryService } from '../category.service';

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

export let fakeCategoryServiceProvider: ClassProvider = {
  provide: CategoryService,
  useClass: FakeCategoryService
};
