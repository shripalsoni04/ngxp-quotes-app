import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { click } from '../../testing';
import { FakeAuthorService, AUTHORS } from '@xapp/authors/testing';
import { AuthorService } from '@xapp/authors';

import { AuthorsListComponent } from './authors-list.component';
import { SharedModule } from '../shared/shared.module';
import { UtilityService } from '../core/utility.service';

let fixture: ComponentFixture<AuthorsListComponent>;
let comp: AuthorsListComponent;
let page: Page;

describe('AuthorListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        AuthorsListComponent
      ],
      providers: [
        UtilityService,
        { provide: AuthorService, useClass: FakeAuthorService }
      ]
    });

    fixture = TestBed.createComponent(AuthorsListComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(comp).not.toBeNull();
  });

  it('should render authors', async(() => {
    fixture.detectChanges();
    createPageOnStable().then(() => {
      expect(page.aurhorRows.length).toBeGreaterThan(0);
    });
  }));

  it('should select first author if loaded on large screen and selectedAuthorId is not set',
    async(() => {
      comp.selectedAuthorId = null;
      let utilityService = fixture.debugElement.injector.get(UtilityService);
      spyOn(utilityService, 'isSmallScreen').and.returnValue(false);

      fixture.detectChanges();
      createPageOnStable().then(() => {
        let classes = page.aurhorRows[0].className.split(' ');
        expect(classes.indexOf('selected')).toBeGreaterThan(-1);
      });
    }));

  it('should not select any author if loaded on small screen', async(() => {
    let utilityService = fixture.debugElement.injector.get(UtilityService);
    spyOn(utilityService, 'isSmallScreen').and.returnValue(true);

    fixture.detectChanges();
    createPageOnStable().then(() => {
      let selectedAuthor = page.aurhorRows.filter((ele) => {
        let classes = ele.className.split(' ');
        return classes.indexOf('selected') > -1;
      });
      expect(selectedAuthor.length).toBe(0);
    });
  }));


  it('should select author given in selectedAuthorId input on large screen', async(() => {
    comp.selectedAuthorId = AUTHORS[2].id;
    let utilityService = fixture.debugElement.injector.get(UtilityService);
    spyOn(utilityService, 'isSmallScreen').and.returnValue(false);

    fixture.detectChanges();
    createPageOnStable().then(() => {
      let selectedAuthor = fixture.debugElement.query(By.css('mdl-list-item.selected')).context.$implicit;
      expect(selectedAuthor.id).toBe(comp.selectedAuthorId);
    });
  }));

  it('should select author on click', fakeAsync(() => {
    let expectedAuthor = AUTHORS[1];
    fixture.detectChanges();
    createPageOnStable().then(() => {
      click(page.aurhorRows[1]);
      tick();
      expect(comp.selectedAuthorId).toBe(expectedAuthor.id);
    });
  }));

  it('should raise selectAuthor event on click', fakeAsync(() => {
    let expectedAuthor = AUTHORS[1];
    let selectedAuthorId;
    comp.authorSelect.subscribe(author => selectedAuthorId = author);

    fixture.detectChanges();
    createPageOnStable().then(() => {
      click(page.aurhorRows[1]);
      tick();
      expect(selectedAuthorId).toBe(expectedAuthor.id);
    });
  }));
});

function createPageOnStable() {
  return fixture.whenStable().then(() => {
    // got the authors and updated component
    // change detection updates the view
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  aurhorRows: HTMLLIElement[];

  constructor() {
    this.aurhorRows = fixture.debugElement.queryAll(By.css('mdl-list-item')).map(de => de.nativeElement);
  }
}
