import { Injectable } from '@angular/core';

import {
  CategoriesListCommonVM, CategoryService
} from '../x-shared/app/categories';

@Injectable()
export class CategoriesListVM extends CategoriesListCommonVM {

  constructor(categoryService: CategoryService) {
    super(categoryService);
  }
}
