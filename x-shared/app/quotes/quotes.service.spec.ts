import { TestBed, async } from '@angular/core/testing';

import { QuoteService } from './quotes.service';

import { fakeFirebaseServiceProvider, FirebaseService } from '../core/testing';
import { fakeMyFavouriteServiceProvider, MyFavouritesService, getMockQuotes } from './testing';

let quoteService: QuoteService;
let myFavourtesService: MyFavouritesService;
let firebaseService: FirebaseService;

describe('QuoteService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteService,
        fakeMyFavouriteServiceProvider,
        fakeFirebaseServiceProvider
      ]
    });

    quoteService = TestBed.get(QuoteService);
    myFavourtesService = TestBed.get(MyFavouritesService);
    firebaseService = TestBed.get(FirebaseService);
  });

  it('#get should hit correct api and return list of quotes with total count', async(() => {
    let expectedPath = 'quotes/data';
    let apiPath;
    let mockQuoetes = getMockQuotes();

    spyOn(firebaseService, 'getListOnce').and.callFake((path, pagination) => {
      apiPath = path;
      return Promise.resolve(mockQuoetes);
    });

    spyOn(quoteService, 'getTotalCount').and.returnValue(Promise.resolve(mockQuoetes.length));

    quoteService.get().then((result) => {
      expect(apiPath).toBe(expectedPath, 'API Path for getting all quotes is incorrect.');
      expect(result.lstQuotes.length).toBeGreaterThan(0, 'List of quotes are not fetched');
      expect(result.count).toBeDefined('Count should be defined in response');
    });
  }));

  it('#getByAuthorId should hit correct api and return all quotes by the aurhor', async(() => {
    let expectedPath = `quotes/data`;
    let expectedFilterProp = 'authorId';
    let entityId;
    let filterProp;
    let apiPath;
    let mockQuoetes = getMockQuotes();

    spyOn(firebaseService, 'filterOnce').and.callFake((path, prop, id) => {
      apiPath = path;
      filterProp = prop;
      entityId = id;
      return Promise.resolve(mockQuoetes);
    });

    quoteService.getByAuthorId(1).then((lstQuotes) => {
      expect(apiPath).toBe(expectedPath, 'API Path for getting quotes by author is incorrect.');
      expect(filterProp).toBe(expectedFilterProp, 'Filter entity is wrong');
      expect(entityId).toBeDefined('Author id must be passed to filter api.');
      expect(lstQuotes.length).toBeGreaterThan(0, 'Filtered quotes not returned');
    });
  }));

  it('#getByCategoryId should hit correct api and return all quotes by the category', async(() => {
    let expectedPath = `quotes/data`;
    let expectedFilterProp = 'categoryId';
    let entityId;
    let filterProp;
    let apiPath;
    let mockQuoetes = getMockQuotes();

    spyOn(firebaseService, 'filterOnce').and.callFake((path, prop, id) => {
      apiPath = path;
      filterProp = prop;
      entityId = id;
      return Promise.resolve(mockQuoetes);
    });

    quoteService.getByCategoryId(1).then((lstQuotes) => {
      expect(apiPath).toBe(expectedPath, 'API Path for getting quotes by category is incorrect.');
      expect(filterProp).toBe(expectedFilterProp, 'Filter entity is wrong');
      expect(entityId).toBeDefined('Category id must be passed to filter api.');
      expect(lstQuotes.length).toBeGreaterThan(0, 'Filtered quotes not returned');
    });
  }));

  it('#getTotalCount should return count of total quotes', async(() => {
    let expectedPath = 'quotes/count';
    let apiPath;

    spyOn(firebaseService, 'getOnce').and.callFake((path) => {
      apiPath = path;
      return Promise.resolve(3);
    });

    quoteService.getTotalCount().then((result) => {
      expect(apiPath).toBe(expectedPath, 'API Path for getting total count of quotes is wrong');
      expect(result).toBeDefined('Total count not returned');
    });
  }));
});
