import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { click } from '../../testing';
import { FakeCategoryService, CATEGORIES } from '@xapp/categories/testing';
import { CategoryService } from '@xapp/categories';

import { CategoriesListComponent } from './categories-list.component';
import { SharedModule } from '../shared/shared.module';
import { UtilityService } from '../core/utility.service';

let fixture: ComponentFixture<CategoriesListComponent>;
let comp: CategoriesListComponent;
let page: Page;

describe('CategoriesListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        CategoriesListComponent
      ],
      providers: [
        UtilityService,
        { provide: CategoryService, useClass: FakeCategoryService }
      ]
    });

    fixture = TestBed.createComponent(CategoriesListComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(comp).not.toBeNull();
  });

  it('should render categories', async(() => {
    fixture.detectChanges();
    createPageOnStable().then(() => {
      expect(page.categoryRows.length).toBeGreaterThan(0);
    });
  }));

  it('should select first category if loaded on large screen and selectedCategoryId is not set',
    async(() => {
      comp.selectedCategoryId = null;
      let utilityService = fixture.debugElement.injector.get(UtilityService);
      spyOn(utilityService, 'isSmallScreen').and.returnValue(false);

      fixture.detectChanges();
      createPageOnStable().then(() => {
        let classes = page.categoryRows[0].className.split(' ');
        expect(classes.indexOf('selected')).toBeGreaterThan(-1);
      });
    }));

  it('should not select any category if loaded on small screen', async(() => {
    let utilityService = fixture.debugElement.injector.get(UtilityService);
    spyOn(utilityService, 'isSmallScreen').and.returnValue(true);

    fixture.detectChanges();
    createPageOnStable().then(() => {
      let selectedCategory = page.categoryRows.filter((ele) => {
        let classes = ele.className.split(' ');
        return classes.indexOf('selected') > -1;
      });
      expect(selectedCategory.length).toBe(0);
    });
  }));


  it('should select category given in selectedCategoryId input on large screen', async(() => {
    comp.selectedCategoryId = CATEGORIES[2].id;
    let utilityService = fixture.debugElement.injector.get(UtilityService);
    spyOn(utilityService, 'isSmallScreen').and.returnValue(false);

    fixture.detectChanges();
    createPageOnStable().then(() => {
      let selectedCategory = fixture.debugElement.query(By.css('mdl-list-item.selected')).context.$implicit;
      expect(selectedCategory.id).toBe(comp.selectedCategoryId);
    });
  }));

  it('should select category on click', fakeAsync(() => {
    let expectedCategory = CATEGORIES[1];
    fixture.detectChanges();
    createPageOnStable().then(() => {
      click(page.categoryRows[1]);
      tick();
      expect(comp.selectedCategoryId).toBe(expectedCategory.id);
    });
  }));

  it('should raise selectCategory event on click', fakeAsync(() => {
    let expectedCategory = CATEGORIES[1];
    let selectedCategoryId;
    comp.categorySelect.subscribe(category => selectedCategoryId = category);

    fixture.detectChanges();
    createPageOnStable().then(() => {
      click(page.categoryRows[1]);
      tick();
      expect(selectedCategoryId).toBe(expectedCategory.id);
    });
  }));
});

function createPageOnStable() {
  return fixture.whenStable().then(() => {
    // got the categories and updated component
    // change detection updates the view
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  categoryRows: HTMLLIElement[];

  constructor() {
    this.categoryRows = fixture.debugElement.queryAll(By.css('mdl-list-item')).map(de => de.nativeElement);
  }
}
