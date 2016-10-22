import { TestBed, async } from '@angular/core/testing';

import { FirebaseService } from '../core';
import { FakeFirebaseService } from '../core/testing';
import { CategoryService } from './category.service';
import { CATEGORIES } from './testing/categories.mock';


let categoryService: CategoryService;
let firebaseService: FakeFirebaseService;
let getCategoryListSpy: jasmine.Spy;

describe('CategoryService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        { provide: FirebaseService, useClass: FakeFirebaseService }
      ]
    });

    firebaseService = TestBed.get(FirebaseService);
    categoryService = TestBed.get(CategoryService);
    getCategoryListSpy = spyOn(firebaseService, 'getListOnce').and
      .returnValue(Promise.resolve(CATEGORIES));
  });

  it('should return promise of list of categories', async(() => {
    categoryService.get().then((lstCategories: any[]) => {
      expect(lstCategories.length).toEqual(CATEGORIES.length);
    });
  }));

  it('should reject promise with error in case of any issue with api',
    async(() => {
      getCategoryListSpy.and.returnValue(Promise.reject('Some error occurred'));
      categoryService.get().then(null, (error) => {
        expect(error).toBeDefined();
      });
    }));

  it('should return cached categories if available in cache', async(() => {
    categoryService.get().then(() => {
      categoryService.get().then((lstCategories: any[]) => {
        expect(lstCategories.length).toEqual(CATEGORIES.length);
        expect(getCategoryListSpy.calls.count()).toBe(1);
      });
    });
  }));

  it('should return category by id', async(() => {
    categoryService.getCategoryById(CATEGORIES[0].id).then((oCategory) => {
      expect(oCategory).toEqual(CATEGORIES[0]);
    });
  }));

  it('should return category name by id', async(() => {
    categoryService.getNameById(CATEGORIES[0].id).then((categoryName) => {
      expect(categoryName).toBe(CATEGORIES[0].name);
    });
  }));

});
