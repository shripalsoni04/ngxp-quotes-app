import { Injectable } from '@angular/core';

import { LocalDatabaseService } from '../core';

@Injectable()
export class MyFavouritesService {
  private collectionName: string = 'fav_quotes';

  constructor(private localDatabaseService: LocalDatabaseService) {

  }

  addToFavourites(quoteObj: any) {
    quoteObj.isFavourite = true;
    return this.localDatabaseService.insert(this.collectionName, quoteObj);
  }

  getList() {
    return this.localDatabaseService.getList(this.collectionName);
  }

  removeFromFavourite(quoteObj: any) {
    quoteObj.isFavourite = false;
    return this.localDatabaseService.delete(this.collectionName, quoteObj);
  }
}
