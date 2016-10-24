import { ClassProvider } from '@angular/core';
import { QuoteService } from '../quotes.service';
import { getMockQuotes } from '../testing';
import { Pagination } from '../../shared';

export { QuoteService } from '../quotes.service';

export class FakeQuotesService {
  get(pagination?: Pagination) {
    return Promise.resolve({
      lstQuotes: getMockQuotes(),
      count: 30
    });
  }

  getByAuthorId(authorId: number) {
    return Promise.resolve(getMockQuotes());
  }

  getByCategoryId(categoryId: number) {
    return Promise.resolve(getMockQuotes());
  }

  getTotalCount() {
    return Promise.resolve(3);
  }
}

export let fakeQuotesServiceProvider: ClassProvider = {
  provide: QuoteService,
  useClass: FakeQuotesService
};
