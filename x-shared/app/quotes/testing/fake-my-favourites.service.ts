import { ClassProvider } from '@angular/core';

import { MyFavouritesService } from '../my-favourites.service';
import { getMockFavQuotes } from './my-favourites.mock';

export { MyFavouritesService } from '../my-favourites.service';

export class FakeMyFavouritesService {
  lstFavQuotes = getMockFavQuotes();

  addToFavourites(quoteObj) {
    quoteObj.isFavourite = true;
    this.lstFavQuotes.push(quoteObj);
    return Promise.resolve(quoteObj);
  }

  getList() {
    return Promise.resolve(this.lstFavQuotes);
  }

  removeFromFavourite(quoteObj) {
    quoteObj.isFavourite = false;
    // just removing last item as in test we just want to test that fav quotes list should be reduced by 1.
    this.lstFavQuotes.pop();
    return Promise.resolve();
  }
}

export let fakeMyFavouriteServiceProvider: ClassProvider = {
  provide: MyFavouritesService,
  useClass: FakeMyFavouritesService
};
