import { QuoteService } from './quotes.service';
import { Pagination } from '../shared/models';

export class QuotesListCommonVM {

  pagination: Pagination = new Pagination();

  lstQuotes: any[] = [];

  constructor(protected quotesService: QuoteService) {

  }

  getQuotes(): Promise<any> {
    return this.quotesService.get(this.pagination);
  }

  loadQuotes(): Promise<any> {
    return this.getQuotes().then((result) => {
      Array.prototype.push.apply(this.lstQuotes, result.lstQuotes);
      this.pagination.count = result.count;
      return result;
    });
  }

  loadNextPage(): Promise<any> {
    this.pagination.page += 1;
    return this.loadQuotes();
  }

  getQuotesByCategoryId() {

  }

  getQuotesByAuthorId() {

  }

  getMaxPageNumber() {
    return Math.ceil(this.pagination.count / this.pagination.size);
  }
}
