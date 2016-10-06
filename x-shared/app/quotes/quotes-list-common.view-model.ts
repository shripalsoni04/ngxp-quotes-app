import { QuoteService } from './quotes.service';
import { Pagination } from '../shared/models';

export class QuotesListCommonVM {

  pagination: Pagination = new Pagination();

  quotesPromise: Promise<any>;

  protected lstQuotes: any[] = [];

  constructor(protected quotesService: QuoteService) {

  }

  getQuotes(): Promise<any> {
    return this.quotesService.get(this.pagination);
  }

  getQuotesByCategoryId(categoryId: number) {
    return this.quotesService.getByAuthorId(categoryId);
  }

  getQuotesByAuthorId(authorId: number) {
    return this.quotesService.getByAuthorId(authorId);
  }

  getMaxPageNumber() {
    return Math.ceil(this.pagination.count / this.pagination.size);
  }

  loadQuotes(): Promise<any> {
    this.quotesPromise = this.getQuotes().then((result) => {
      Array.prototype.push.apply(this.lstQuotes, result.lstQuotes);
      this.pagination.count = result.count;
      return this.lstQuotes;
    });
    return this.quotesPromise;
  }

  loadNextPage(): Promise<any> {
    this.pagination.page += 1;
    return this.loadQuotes();
  }

  loadQuotesByAuthorId(authorId: number) {
    this.lstQuotes.length = 0;
    this.quotesPromise = this.getQuotesByAuthorId(authorId).then((lstQuotes) => {
      Array.prototype.push.apply(this.lstQuotes, lstQuotes);
      return this.lstQuotes;
    });
    return this.quotesPromise;
  }

  loadQuotesByCategoryId(categoryId: number) {
    this.lstQuotes.length = 0;
    this.quotesPromise = this.getQuotesByCategoryId(categoryId).then((lstQuotes) => {
      Array.prototype.push.apply(this.lstQuotes, lstQuotes);
      return this.lstQuotes;
    });
    return this.quotesPromise;
  }
}
