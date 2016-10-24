import { TestBed, async } from '@angular/core/testing';
import {
  fakeLocalDatabaseServiceProvider, LocalDatabaseService
} from '../core/testing';

import { getMockFavQuotes } from './testing';
import { MyFavouritesService } from './my-favourites.service';

describe('MyFavouritesService', () => {

  let myFavouriteService: MyFavouritesService;
  let localDatabaseService: LocalDatabaseService;
  let lstFavQuotes: any[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyFavouritesService,
        fakeLocalDatabaseServiceProvider
      ]
    });

    myFavouriteService = TestBed.get(MyFavouritesService);
    localDatabaseService = TestBed.get(LocalDatabaseService);
    lstFavQuotes = getMockFavQuotes();
  });

  it('should mark quote as favourite', async(() => {
    let quote = lstFavQuotes[0];
    delete quote.isFavourite; // removing isFavourite property to check if it is set after test or not.

    spyOn(localDatabaseService, 'insert').and.callFake((collectionName, quoteObj) => {
      return Promise.resolve(quoteObj);
    });

    myFavouriteService.addToFavourites(quote).then((resultQuote) => {
      expect(resultQuote.isFavourite).toBe(true);
    });
  }));

  it('should return list of favourite quotes', async(() => {
    spyOn(localDatabaseService, 'getList').and.callFake((collectionName) => {
      return Promise.resolve(lstFavQuotes);
    });

    myFavouriteService.getList().then((lstQuotes) => {
      expect(lstQuotes.length).toBe(lstFavQuotes.length);
    });
  }));

  it('should mark quote as unfavourite', async(() => {
    let favQuote = lstFavQuotes[0];

    spyOn(localDatabaseService, 'delete').and.returnValue(Promise.resolve());

    myFavouriteService.removeFromFavourite(favQuote).then(() => {
      expect(favQuote.isFavourite).toBe(false);
    });
  }));
});
