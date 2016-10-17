import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { CategoriesListVM } from './categories-list.view-model';

@Component({
  selector: 'categories-list',
  templateUrl: 'categories/categories-list.component.html',
  providers: [CategoriesListVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent {

  constructor(
    public vm: CategoriesListVM,
    private routerExtensions: RouterExtensions
  ) {
    this.vm.loadCategoriesList();
  }

  showQuotesByCategory(categoryId: number) {
    this.routerExtensions.navigate(['quotes', 'category', categoryId]);
  }
}
