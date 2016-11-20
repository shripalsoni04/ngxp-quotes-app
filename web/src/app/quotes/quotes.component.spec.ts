import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { fakeAuthorServiceProvider, AUTHORS } from '@xapp/authors/testing';
import { fakeCategoryServiceProvider, CATEGORIES } from '@xapp/categories/testing';
import {
  fakeQuotesServiceProvider, fakeMyFavouriteServiceProvider
} from '@xapp/quotes/testing';
import {
  advance, ActivatedRouteStub, ActivatedRoute, Router, RoutingStubsModule
} from '../../testing';

import { QuotesComponent } from './quotes.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { AuthorsListComponent } from '../authors/authors-list.component';
import { CategoriesListComponent } from '../categories/categories-list.component';
import { SharedModule } from '../shared/shared.module';
import { UtilityService } from '../core/utility.service';
import { AppService } from '../app.service';

let fixture: ComponentFixture<QuotesComponent>;
let comp: QuotesComponent;
let page: Page;
let activatedRoute: ActivatedRouteStub;
let appService: AppService;
let utilityService: UtilityService;
let router: Router;

describe('QuotesComponent', () => {
  beforeEach(async(() => {

    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [
        QuotesComponent,
        QuotesListComponent,
        AuthorsListComponent,
        CategoriesListComponent
      ],
      imports: [
        SharedModule,
        RoutingStubsModule
      ],
      providers: [
        AppService,
        UtilityService,
        fakeAuthorServiceProvider,
        fakeCategoryServiceProvider,
        fakeQuotesServiceProvider,
        fakeMyFavouriteServiceProvider,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    });

    createComponent();
    appService = TestBed.get(AppService);
    utilityService = TestBed.get(UtilityService);
    router = TestBed.get(Router);

  }));

  it('should create component', () => {
    expect(comp).toBeDefined();
  });

  it('should set quotesBy and entityId from route params', fakeAsync(() => {
    activatedRoute.testParams = { quotesBy: 'author', entityId: 1 };
    expect(comp.quotesBy).toEqual('author', 'quotesBy is not set from route params');
    expect(comp.entityId).toEqual(1, 'entityId is not set from route params');
  }));

  it('should set proper title as per quotesBy and entityId when screen size is not small', fakeAsync(() => {
    let title: string;
    spyOn(appService, 'setTitle').and.callFake((titleStr) => {
      title = titleStr;
    });

    spyOn(utilityService, 'isSmallScreen').and.returnValue(false);
    activatedRoute.testParams = { quotesBy: 'all' };
    expect(title).toEqual('All Quotes', 'title is incorrect when quotesBy is "all"');

    activatedRoute.testParams = { quotesBy: 'author' };
    expect(title).toEqual('Authors', 'title is incorrect when quotesBy is "author"');

    activatedRoute.testParams = { quotesBy: 'category' };
    expect(title).toEqual('Categories', 'title is incorrect when quotesBy is "category"');

    activatedRoute.testParams = { quotesBy: 'favourites' };
    expect(title).toEqual('My Favourites', 'title is incorrect when quotesBy is "favourites"');

    activatedRoute.testParams = { quotesBy: 'author', entityId: AUTHORS[0].id };
    tick();
    expect(title).toEqual(`Quotes by ${AUTHORS[0].name}`, 'title is incorrect when quotesBy is "author" and entityId is set.');

    activatedRoute.testParams = { quotesBy: 'category', entityId: CATEGORIES[0].id };
    tick();
    expect(title).toEqual(`${CATEGORIES[0].name} Quotes`, 'title is incorrect when quotesBy is "category" and entityId is set.');
  }));

  it('should set proper title when screen size is small', fakeAsync(() => {
    let title: string;

    spyOn(appService, 'setTitle').and.callFake((titleStr) => {
      title = titleStr;
    });

    spyOn(utilityService, 'isSmallScreen').and.returnValue(true);

    activatedRoute.testParams = { quotesBy: 'author', entityId: AUTHORS[0].id };
    tick();
    expect(title).toEqual(
      AUTHORS[0].name,
      'title is incorrect when quotesBy is "author" and entityId is set and screen size is small.'
    );

    activatedRoute.testParams = { quotesBy: 'category', entityId: CATEGORIES[0].id };
    tick();
    expect(title).toEqual(
      CATEGORIES[0].name,
      'title is incorrect when quotesBy is "category" and entityId is set and screen size is small.'
    );
  }));

  it('should navigate to quotes of the selected author', fakeAsync(() => {
    let routeCommands: any[];

    spyOn(router, 'navigate').and.callFake((commands) => {
      routeCommands = commands;
    });

    activatedRoute.testParams = { quotesBy: 'author', entityId: AUTHORS[0].id };
    advance(fixture); // load quotes by the author
    page.getAuthorsListDe().triggerEventHandler('authorSelect', AUTHORS[1].id);
    fixture.detectChanges();
    expect(routeCommands).toEqual(['quotes', 'author', AUTHORS[1].id]);
  }));

  it('should navigate to quotes of the selected category', fakeAsync(() => {
    let routeCommands: any[];

    spyOn(router, 'navigate').and.callFake((commands) => {
      routeCommands = commands;
    });

    activatedRoute.testParams = { quotesBy: 'category', entityId: CATEGORIES[0].id };
    advance(fixture); // load quotes by the author
    page.getCategoriesListDe().triggerEventHandler('categorySelect', CATEGORIES[1].id);
    fixture.detectChanges();
    expect(routeCommands).toEqual(['quotes', 'category', CATEGORIES[1].id]);
  }));

  it('should show quotes by section when quotesBy is "author" or "category" and screen is not small', fakeAsync(() => {
    spyOn(utilityService, 'isSmallScreen').and.returnValue(false);

    activatedRoute.testParams = { quotesBy: 'author', entityId: AUTHORS[0].id };
    fixture.detectChanges();
    expect(page.getQuotesBySectionEle()).not.toBeNull();

    activatedRoute.testParams = { quotesBy: 'category', entityId: CATEGORIES[0].id };
    fixture.detectChanges();
    expect(page.getQuotesBySectionEle()).not.toBeNull();
  }));

  it('should not show quotes by section when quotesBy is "all" or "favourites"', fakeAsync(() => {
    spyOn(utilityService, 'isSmallScreen').and.returnValue(false);

    activatedRoute.testParams = { quotesBy: 'all' };
    fixture.detectChanges();
    expect(page.getQuotesBySectionEle()).toBeNull();

    activatedRoute.testParams = { quotesBy: 'favourites' };
    fixture.detectChanges();
    expect(page.getQuotesBySectionEle()).toBeNull();
  }));

  it('should not show quotes by section when screen is small and entityId is set', fakeAsync(() => {
    spyOn(utilityService, 'isSmallScreen').and.returnValue(true);

    activatedRoute.testParams = { quotesBy: 'author', entityId: 1 };
    fixture.detectChanges();
    expect(page.getQuotesBySectionEle()).toBeNull();

    activatedRoute.testParams = { quotesBy: 'category', entityId: 1 };
    fixture.detectChanges();
    expect(page.getQuotesBySectionEle()).toBeNull();
  }));

  it('should always show quotes list when screen is not small', fakeAsync(() => {
    spyOn(utilityService, 'isSmallScreen').and.returnValue(false);

    activatedRoute.testParams = { quotesBy: 'all' };
    fixture.detectChanges();
    expect(page.getQuotesListContainerEle()).not.toBeNull();
  }));

  it('should always show quotes list when screen is small and quotes by is "all" or "favourites"', fakeAsync(() => {
    spyOn(utilityService, 'isSmallScreen').and.returnValue(true);

    activatedRoute.testParams = { quotesBy: 'all' };
    fixture.detectChanges();
    expect(page.getQuotesListContainerEle()).not.toBeNull();

    activatedRoute.testParams = { quotesBy: 'favourites' };
    fixture.detectChanges();
    expect(page.getQuotesListContainerEle()).not.toBeNull();
  }));

  it('should show quotes list when screen is small and entityId is set', fakeAsync(() => {
    spyOn(utilityService, 'isSmallScreen').and.returnValue(true);

    activatedRoute.testParams = { quotesBy: 'author', entityId: 1 };
    fixture.detectChanges();
    expect(page.getQuotesListContainerEle()).not.toBeNull();

    activatedRoute.testParams = { quotesBy: 'category', entityId: 1 };
    fixture.detectChanges();
    expect(page.getQuotesListContainerEle()).not.toBeNull();
  }));

  it('should not show quotes list when screen is small and entityId is not set', fakeAsync(() => {
    spyOn(utilityService, 'isSmallScreen').and.returnValue(true);

    activatedRoute.testParams = { quotesBy: 'author' };
    fixture.detectChanges();
    expect(page.getQuotesListContainerEle()).toBeNull();

    activatedRoute.testParams = { quotesBy: 'category' };
    fixture.detectChanges();
    expect(page.getQuotesListContainerEle()).toBeNull();
  }));
});

function createComponent() {
  fixture = TestBed.createComponent(QuotesComponent);
  comp = fixture.componentInstance;
  activatedRoute.testParams = { quotesBy: 'all' };
  fixture.detectChanges();
  fixture.whenStable().then(() => {
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  constructor() {

  }

  getQuotesBySectionEle(): HTMLElement {
    let de = fixture.debugElement.query(By.css('.quotes-by-container'));
    return de ? de.nativeElement : null;
  }

  getAuthorsListDe() {
    return fixture.debugElement.query(By.css('authors-list'));
  }

  getCategoriesListDe() {
    return fixture.debugElement.query(By.css('categories-list'));
  }

  getQuotesListContainerEle(): HTMLElement {
    let de = fixture.debugElement.query(By.css('.quotes-list-container'));
    return de ? de.nativeElement : null;
  }
}
