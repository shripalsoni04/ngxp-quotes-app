import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit
} from '@angular/core';

import { CategoriesListCommonVM } from '@xapp/categories';
import { UtilityService } from '../core/utility.service';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  providers: [CategoriesListCommonVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent implements OnInit {

  @Input() selectedCategoryId: number;

  @Output() categorySelect: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    public cvm: CategoriesListCommonVM,
    private utilityService: UtilityService
  ) {

  }

  ngOnInit() {
    this.cvm.loadCategoriesList().subscribe(() => {
      // On small screens, not selecting first category by default, as we are
      // not showing quotes of the category besides category list because screen
      // size constraint.
      if (!this.utilityService.isSmallScreen()) {
        this.selectFirst();
      }
    });
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.categorySelect.emit(categoryId);
  }

  private selectFirst() {
    // if selectedCategoryId is set, then not selecting first record by default.
    if (!this.selectedCategoryId) {
      let firstCategory = this.cvm.lstCategories && this.cvm.lstCategories[0];
      this.selectCategory(firstCategory.id);
    }
  }
}
