import { TestBed, async } from '@angular/core/testing';
import { Pagination } from '../shared';

import {
  fakeQuotesServiceProvider, fakeMyFavouriteServiceProvider,
  QuoteService, MyFavouritesService, getMockQuotes, getMockFavQuotes
} from './testing';
import { QuotesListCommonVM } from './quotes-list-common.view-model';

describe('QuotesListCommonVM', () => {

  let quotesListCommonVM: QuotesListCommonVM;
  let quoteService: QuoteService;
  let myFavouritesService: MyFavouritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuotesListCommonVM,
        fakeQuotesServiceProvider,
        fakeMyFavouriteServiceProvider
      ]
    });

    quotesListCommonVM = TestBed.get(QuotesListCommonVM);
    quoteService = TestBed.get(QuoteService);
    myFavouritesService = TestBed.get(MyFavouritesService);

  });

  it('should have valid initial state', () => {
    expect(quotesListCommonVM.lstQuotes).toEqual([], 'lstQuotes is not initialized with blank array');
    expect(quotesListCommonVM.quotes$).toBeDefined('quotes$ should be defined as Subject');
    expect(quotesListCommonVM.pagination).toEqual(new Pagination(), 'pagination is not initialized with default pagination object.');
  });

  it('#getMaxPageNumber should return max page number', () => {
    quotesListCommonVM.pagination.count = 113;
    quotesListCommonVM.pagination.size = 10;
    let maxPage = quotesListCommonVM.getMaxPageNumber();
    expect(maxPage).toBe(12);
  });

  it('#loadQuotes should set total count and load quotes in lstQuotes', async(() => {
    let subject = quotesListCommonVM.loadQuotes();
    expect(subject.subscribe).toBeDefined('loadQuotes method should return subject');

    subject.subscribe(() => {
      expect(quotesListCommonVM.pagination.count).toBeGreaterThan(0, 'total count of quotes is not set');
      expect(quotesListCommonVM.lstQuotes.length).toBeGreaterThan(0, 'quotes are not loaded in lstQuotes');
    });
  }));

  it('#loadNextPage should load quotes for next page', async(() => {
    quotesListCommonVM.pagination.page = 2;

    let loadQuotesSpy = spyOn(quotesListCommonVM, 'loadQuotes').and.callThrough();

    quotesListCommonVM.loadNextPage().subscribe(() => {
      expect(quotesListCommonVM.pagination.page).toBe(3, 'pagination count is not increased.');
      expect(loadQuotesSpy).toHaveBeenCalled();
    });
  }));

  it('#loadQuotesByAuthorId should load quotes of the author in lstQuotes and return subject', async(() => {
    let spy = spyOn(quoteService, 'getByAuthorId').and.callThrough();

    let subject = quotesListCommonVM.loadQuotesByAuthorId(1);
    expect(subject.subscribe).toBeDefined('loadQuotesByAuthorId method should return subject');
    expect(spy).toHaveBeenCalled();

    subject.subscribe(() => {
      expect(quotesListCommonVM.lstQuotes.length).toBeGreaterThan(0, 'quotes by author not loaded in lstQuotes');
    });
  }));

  it('#loadQuotesByCategoryId should load quotes of the category in lstQuotes and return subject', async(() => {
    let spy = spyOn(quoteService, 'getByCategoryId').and.callThrough();

    let subject = quotesListCommonVM.loadQuotesByCategoryId(1);
    expect(subject.subscribe).toBeDefined('loadQuotesByCategoryId method should return subject');
    expect(spy).toHaveBeenCalled();

    subject.subscribe(() => {
      expect(quotesListCommonVM.lstQuotes.length).toBeGreaterThan(0, 'quotes by category not loaded in lstQuotes');
    });
  }));

  it('#loadFavouriteQuotes should load favourite quotes in lstQuotes and return subject', async(() => {
    let spy = spyOn(myFavouritesService, 'getList').and.callThrough();

    let subject = quotesListCommonVM.loadFavouriteQuotes();
    expect(subject.subscribe).toBeDefined('loadFavouriteQuotes method should return subject');
    expect(spy).toHaveBeenCalled();

    subject.subscribe(() => {
      expect(quotesListCommonVM.lstQuotes.length).toBeGreaterThan(0, 'favourite quotes not loaded in lstQuotes');
    });
  }));

  it('#loadQuotesByCriteria should load all quotes when quotesBy is "all"', async(() => {
    let spy = spyOn(quotesListCommonVM, 'loadQuotes').and.callThrough();
    let subject = quotesListCommonVM.loadQuotesByCriteria('all');

    expect(subject.subscribe).toBeDefined('loadQuotesByCriteria with "all" criteria should return subject');
    expect(spy).toHaveBeenCalled();
  }));

  it('#loadQuotesByCriteria should load quotes by specified author when quotesBy is "author" and id is given', async(() => {
    let spy = spyOn(quotesListCommonVM, 'loadQuotesByAuthorId').and.callThrough();
    let subject = quotesListCommonVM.loadQuotesByCriteria('author', 1);

    expect(subject.subscribe).toBeDefined('loadQuotesByCriteria with "author" criteria should return subject');
    expect(spy).toHaveBeenCalled();
  }));

  it('#loadQuotesByCriteria should load quotes by specified category when quotesBy is "category"', async(() => {
    let spy = spyOn(quotesListCommonVM, 'loadQuotesByCategoryId').and.callThrough();
    let subject = quotesListCommonVM.loadQuotesByCriteria('category', 1);

    expect(subject.subscribe).toBeDefined('loadQuotesByCriteria with "category" criteria should return subject');
    expect(spy).toHaveBeenCalled();
  }));

  it('#loadQuotesByCriteria should load favourite quotes when quotesBy is "favourites"', async(() => {
    let spy = spyOn(quotesListCommonVM, 'loadFavouriteQuotes').and.callThrough();
    let subject = quotesListCommonVM.loadQuotesByCriteria('favourites');

    expect(subject.subscribe).toBeDefined('loadQuotesByCriteria with "favourites" criteria should return subject');
    expect(spy).toHaveBeenCalled();
  }));

  it('#toggleFav should call method to add quote to favourite if quote is not faovurite', async(() => {
    let testQuote = getMockQuotes()[0];
    let spy = spyOn(myFavouritesService, 'addToFavourites').and.callThrough();

    quotesListCommonVM.toggleFav(testQuote, 'all').then((quote) => {
      expect(spy).toHaveBeenCalled();
      expect(quote.isFavourite).toBe(true, 'quote is not marked as favourite');
    });
  }));


  it('#toggleFav should call method to remove quote from favourites if quote is faovurite', async(() => {
    let testFavQuote = getMockFavQuotes()[0];
    let spy = spyOn(myFavouritesService, 'removeFromFavourite').and.callThrough();

    quotesListCommonVM.toggleFav(testFavQuote, 'all').then((quote) => {
      expect(spy).toHaveBeenCalled();
      expect(quote.isFavourite).toBe(false, 'quote is not marked as unfavourite.');
    });
  }));

  it('#toggleFav should remove the quote from lstQuotes if called from favourites screen', async(() => {
    let testFavQuote = getMockFavQuotes()[0];
    Array.prototype.push.apply(quotesListCommonVM.lstQuotes, getMockFavQuotes());
    let initialFavQuotes = quotesListCommonVM.lstQuotes.length;

    quotesListCommonVM.toggleFav(testFavQuote, 'favourites').then((quote) => {
      expect(quotesListCommonVM.lstQuotes.length).toBe(initialFavQuotes - 1);
    });
  }));

  it('#getQuoteShareText should return expected quote share text', () => {
    let quote = getMockQuotes()[0];
    let expectedShareText = `"${quote.body}" - ${quote.authorName}`;

    expect(quotesListCommonVM.getQuoteShareText(quote)).toEqual(expectedShareText);
  });
});
