import { Injectable } from '@angular/core';

import { CategoriesListCommonVM, CategoryService } from '@xapp/categories';

@Injectable()
export class CategoriesListVM extends CategoriesListCommonVM {

  constructor(categoryService: CategoryService) {
    super(categoryService);
  }
}
