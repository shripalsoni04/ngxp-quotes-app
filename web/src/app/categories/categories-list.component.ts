import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

import { CategoriesListVM } from './categories-list.view-model';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  providers: [CategoriesListVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent {

  @Input() selectedCategoryId: number;

  @Output() categorySelect: EventEmitter<number> = new EventEmitter<number>();

  constructor(public vm: CategoriesListVM) {
    this.vm.loadCategoriesList().subscribe(() => {
      this.selectFirst();
    });
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.categorySelect.emit(categoryId);
  }

  private selectFirst() {
    // if selectedCategoryId is set, then not selecting first record by default.
    if (!this.selectedCategoryId) {
      let firstCategory = this.vm.lstCategories && this.vm.lstCategories[0];
      this.selectCategory(firstCategory.id);
    }
  }
}
