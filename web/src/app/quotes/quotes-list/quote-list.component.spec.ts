import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


import { advance, click } from '../../../testing';
import { QuotesListComponent } from './quotes-list.component';
import { SharedModule } from '../../shared/shared.module';
import {
  fakeMyFavouriteServiceProvider, fakeQuotesServiceProvider
} from '@xapp/quotes/testing';

let fixture: ComponentFixture<TestHostComponent>;
let comp: QuotesListComponent;
let hostComp: TestHostComponent;
let page: Page;

@Component({
  selector: 'test-host',
  template: `<quotes-list [entityId]="entityId" [quotesBy]="quotesBy"></quotes-list>`,
})
class TestHostComponent {
  quotesBy: string;
  entityId: number;
}

describe('QuotesListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        QuotesListComponent
      ],
      imports: [
        SharedModule
      ],
      providers: [
        fakeMyFavouriteServiceProvider,
        fakeQuotesServiceProvider
      ]
    });

    createComponent();

  }));

  it('should render quotes when quotesBy is "all"', fakeAsync(() => {
    hostComp.quotesBy = 'all';
    fixture.detectChanges();
    advance(fixture);
    expect(page.getQuoteRows().length).toBeGreaterThan(0);
  }));

  it('should render quotes when quotesBy is "author"', fakeAsync(() => {
    hostComp.quotesBy = 'author';
    hostComp.entityId = 1;
    fixture.detectChanges();
    advance(fixture);
    expect(page.getQuoteRows().length).toBeGreaterThan(0);
  }));

  it('should render quotes when quotesBy is "category"', fakeAsync(() => {
    hostComp.quotesBy = 'category';
    hostComp.entityId = 1;
    fixture.detectChanges();
    advance(fixture);
    expect(page.getQuoteRows().length).toBeGreaterThan(0);
  }));

  it('should render quotes when quotesBy is "favourites"', fakeAsync(() => {
    hostComp.quotesBy = 'favourites';
    fixture.detectChanges();
    advance(fixture);
    expect(page.getQuoteRows().length).toBeGreaterThan(0);
  }));

  it('should show pagination only when quotesBy is "all"', fakeAsync(() => {
    hostComp.quotesBy = 'all';
    fixture.detectChanges();
    expect(page.getPaginationContainer()).not.toBeNull('pagination should be visible when showing all quotes.');

    hostComp.quotesBy = 'author';
    fixture.detectChanges();
    expect(page.getPaginationContainer()).toBeNull('pagination should not be visible when showing quotes by author.');

    hostComp.quotesBy = 'category';
    fixture.detectChanges();
    expect(page.getPaginationContainer()).toBeNull('pagination should not be visible when showing quotes by category.');

    hostComp.quotesBy = 'favourites';
    fixture.detectChanges();
    expect(page.getPaginationContainer()).toBeNull('pagination should not be visible when showing favourite quotes.');
  }));

  it('should load first page quotes when clicked on first page button', fakeAsync(() => {
    hostComp.quotesBy = 'all';
    fixture.detectChanges();  // propogate input value.
    tick(); // wait for all quotes for 1st page to be loaded and rendered.
    comp.cvm.pagination.page = 2;
    fixture.detectChanges(); // propogate new page value
    click(page.getFirstPageBtn());
    advance(fixture); // loads quote for next page
    expect(comp.cvm.pagination.page).toBe(1, 'new page number should be 1');
    expect(page.getQuoteRows().length).toBeGreaterThan(0, 'quotes not loaded on click of first page button.');
  }));

  it('should load next page quotes when clicked on next page button', fakeAsync(() => {
    hostComp.quotesBy = 'all';
    fixture.detectChanges();  // propogate input value.
    tick(); // wait for all quotes for 1st page to be loaded and rendered.
    click(page.getNextPageBtn());
    advance(fixture); // loads quote for next page
    expect(comp.cvm.pagination.page).toBe(2, 'new page number should be 2');
    expect(page.getQuoteRows().length).toBeGreaterThan(0, 'quotes not loaded on click of next page button.');
  }));

  it('should load prev page quotes when clicked on previous page button', fakeAsync(() => {
    hostComp.quotesBy = 'all';
    fixture.detectChanges();  // propogate input value.
    tick();
    comp.cvm.pagination.page = 2;
    fixture.detectChanges(); // propogate new page value
    click(page.getPrevPageBtn());
    advance(fixture); // loads quote for previous page
    expect(comp.cvm.pagination.page).toBe(1, 'page should be 1');
    expect(page.getQuoteRows().length).toBeGreaterThan(0, 'quotes not loaded on click of previous page button.');
  }));

  it('should load last page quotes when clicked on last page button', fakeAsync(() => {
    hostComp.quotesBy = 'all';
    fixture.detectChanges();  // propogate input value.
    tick();  // wait for all quotes for 1st page to be loaded and rendered.
    click(page.getLastPageBtn());
    advance(fixture); // loads quote for last page
    expect(comp.cvm.pagination.page).toBe(comp.cvm.getMaxPageNumber(), `page should be ${comp.cvm.getMaxPageNumber()}`);
    expect(page.getQuoteRows().length).toBeGreaterThan(0, 'quotes not loaded on click of last page button.');
  }));

  it('should have back pagination buttons disabled if current page is the first page', fakeAsync(() => {
    hostComp.quotesBy = 'all';
    fixture.detectChanges();
    tick();
    expect(page.getFirstPageBtn().disabled).toBe(true, 'first page button should be disabled.');
    expect(page.getPrevPageBtn().disabled).toBe(true, 'previous page button should be disabled.');
  }));

  it('should have next pagination buttons disabled if current page is the last page', fakeAsync(() => {
    hostComp.quotesBy = 'all';
    fixture.detectChanges();
    tick();
    comp.cvm.pagination.page = comp.cvm.getMaxPageNumber();
    fixture.detectChanges();
    expect(page.getNextPageBtn().disabled).toBe(true, 'next page button should be disabled.');
    expect(page.getLastPageBtn().disabled).toBe(true, 'last page button should be disabled.');
  }));

  it('should display current pagination data in proper format', fakeAsync(() => {
    hostComp.quotesBy = 'all';
    fixture.detectChanges();  // propogate input value
    advance(fixture); // wait for quotes of 1st page to be loaded and rendered.
    let paginationText = page.getPaginationLabel().textContent;
    expect(paginationText).toMatch(/\d+ - \d+ of \d+/);
  }));

  it('should toggle favourite icon as per favourite status of the quote', fakeAsync(() => {
    hostComp.quotesBy = 'all';
    fixture.detectChanges();  // propogate input value
    advance(fixture); // wait for quotes of 1st page to be loaded and rendered.
    let quoteRow = page.getQuoteRows()[0];
    let iconEle = quoteRow.querySelector('.fav-button mdl-icon');
    expect(iconEle.textContent).toBe('favorite_border', 'when quote is not marked as favourite its icon should be favorite_border');
    click(<HTMLButtonElement>quoteRow.querySelector('.actions-container .fav-button'));
    advance(fixture);
    expect(iconEle.textContent).toBe('favorite', 'when quote is marked as favourite its icon should be favorite');
  }));
});

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  hostComp = fixture.componentInstance;
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    comp = fixture.debugElement.query(By.css('quotes-list')).componentInstance;
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {

  quotesListDe = fixture.debugElement.query(By.css('quotes-list'));

  constructor() {

  }

  getQuoteRows(): HTMLElement[] {
    return this.quotesListDe.queryAll(By.css('.quote-card')).map(de => de.nativeElement);
  }

  getPaginationContainer(): HTMLElement {
    let de = this.quotesListDe.query(By.css('.pagination-container'));
    return de ? de.nativeElement : null;
  }

  getFirstPageBtn(): HTMLButtonElement {
    return this.getPaginationContainer().querySelectorAll('button')[0];
  }

  getPrevPageBtn(): HTMLButtonElement {
    return this.getPaginationContainer().querySelectorAll('button')[1];
  }

  getNextPageBtn(): HTMLButtonElement {
    return this.getPaginationContainer().querySelectorAll('button')[2];
  }

  getLastPageBtn(): HTMLButtonElement {
    return this.getPaginationContainer().querySelectorAll('button')[3];
  }

  getPaginationLabel(): HTMLLabelElement {
    return this.getPaginationContainer().querySelector('label');
  }
}
