import { Injectable } from '@angular/core';

import { FirebaseService } from '../core/firebase.service';
import { MyFavouritesService } from './my-favourites.service';

import { Pagination } from '../shared/models';

@Injectable()
export class QuoteService {
  private basePath: string = 'quotes';

  private quotesListPath: string = `${this.basePath}/data`;

  private quotesCountPath: string = `${this.basePath}/count`;

  constructor(
    private firebaseService: FirebaseService,
    private myFavouritesService: MyFavouritesService

  ) {

  }

  get(pagination?: Pagination) {
    return this.firebaseService
      .getListOnce(this.quotesListPath, pagination)
      .then((lstQuotes) => {
        return this.getTotalCount().then((count) => {
          return this.setQuoteFavStatus(lstQuotes).then((lstPreparedQuotes) => {
            return {
              lstQuotes: lstPreparedQuotes,
              count: count
            };
          });
        });
      });
  }

  getByAuthorId(authorId: number) {
    return this.firebaseService.filterOnce(
      this.quotesListPath, 'authorId', authorId
    ).then(this.setQuoteFavStatus.bind(this));
  }

  getByCategoryId(categoryId: number) {
    return this.firebaseService.filterOnce(
      this.quotesListPath, 'categoryId', categoryId
    ).then(this.setQuoteFavStatus.bind(this));
  }

  getTotalCount() {
    return this.firebaseService.getOnce(this.quotesCountPath);
  }

  private setQuoteFavStatus(lstQuotes: any[]) {
    return this.myFavouritesService.getList().then((lstFavQuotes) => {
      let lstFavQuotesId = lstFavQuotes.map(item => item.id);
      lstQuotes.forEach((item) => {
        if (lstFavQuotesId.indexOf(item.id) > -1) {
          item.isFavourite = true;
        }
      });
      return lstQuotes;
    });
  }
}
