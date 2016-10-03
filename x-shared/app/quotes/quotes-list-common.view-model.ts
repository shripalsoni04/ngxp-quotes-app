import { QuoteService } from './quotes.service';
import { Pagination } from '../shared/models';

export class QuotesListCommonVM {

  pagination: Pagination = new Pagination();

  lstQuotes: any[] = [];

  constructor(protected quotesService: QuoteService) {

  }

  getQuotes() {
    return this.quotesService.get(this.pagination);
  }

  loadQuotes() {
    return this.getQuotes().then((quotes) => {
      Array.prototype.push.apply(this.lstQuotes, quotes);
    });
  }

  getQuotesByCategoryId() {

  }

  getQuotesByAuthorId() {

  }
}
