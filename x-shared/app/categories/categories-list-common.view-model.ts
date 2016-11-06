import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CategoryService } from './category.service';

@Injectable()
export class CategoriesListCommonVM {

  lstCategories: any[] = [];

  categories$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.lstCategories);

  constructor(protected categoryService: CategoryService) {

  }

  loadCategoriesList() {
    this.categoryService.get().then((lstCategories) => {
      this.lstCategories.length = 0;
      Array.prototype.push.apply(this.lstCategories, lstCategories);
      this.categories$.next(this.lstCategories);
    });
    return this.categories$;
  }
}
