import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { CategoriesListCommonVM } from '../../x-shared/app/categories';

@Component({
  selector: 'categories-list',
  templateUrl: 'modules/categories/categories-list.component.html',
  providers: [CategoriesListCommonVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent {

  constructor(
    public cvm: CategoriesListCommonVM,
    private routerExtensions: RouterExtensions
  ) {
    this.cvm.loadCategoriesList();
  }

  showQuotesByCategory(categoryId: number) {
    this.routerExtensions.navigate(['quotes', 'category', categoryId]);
  }
}
