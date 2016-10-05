import { Injectable } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';

import { Pagination } from '../shared/models';

@Injectable()
export class QuoteService {
  private basePath: string = 'quotes';

  private quotesListPath: string = `${this.basePath}/data`;

  private quotesCountPath: string = `${this.basePath}/count`;

  constructor(private firebaseService: FirebaseService) {

  }

  get(pagination?: Pagination) {
    return this.firebaseService
      .getListOnce(this.quotesListPath, pagination)
      .then((lstQuotes) => {
        return this.getTotalCount().then((count) => {
          return {
            lstQuotes: lstQuotes,
            count: count
          };
        });
      });
  }

  getByAuthorId(authorId: number) {
    return this.firebaseService.filterOnce(this.quotesListPath, 'authorId', authorId);
  }

  getByCategoryId(categoryId: number) {
    return this.firebaseService.filterOnce(this.quotesListPath, 'categoryId', categoryId);
  }

  getTotalCount() {
    return this.firebaseService.getOnce(this.quotesCountPath);
  }
}
