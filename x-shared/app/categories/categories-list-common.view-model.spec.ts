import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { CategoriesListCommonVM } from './categories-list-common.view-model';
import { CategoryService } from './category.service';
import { FakeCategoryService } from './testing';

let categoriesListCommonVM: CategoriesListCommonVM;

describe('CategoriesListCommonVM', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoriesListCommonVM,
        { provide: CategoryService, useClass: FakeCategoryService }
      ]
    });

    categoriesListCommonVM = TestBed.get(CategoriesListCommonVM);

  });

  it('lstCategories should be blank array', () => {
    expect(categoriesListCommonVM.lstCategories).toEqual([]);
  });

  it('categories$ should be defined', () => {
    expect(categoriesListCommonVM.categories$).toBeDefined();
  });

  it('#loadCategoriesList should load categories', fakeAsync(() => {
    categoriesListCommonVM.loadCategoriesList();
    tick();
    expect(categoriesListCommonVM.lstCategories.length).toBeGreaterThan(0);
  }));

  it('#loadCategoriesList should emit loaded categories', async(() => {
    categoriesListCommonVM.categories$.subscribe((lstCategories) => {
      expect(lstCategories.length).toBeGreaterThan(0);
    });
    categoriesListCommonVM.loadCategoriesList();
  }));
});
