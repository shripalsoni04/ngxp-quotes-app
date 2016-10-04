import { Injectable } from '@angular/core';

import { QuotesListCommonVM, QuoteService } from '../x-shared/app/quotes';

@Injectable()
export class QuotesListVM extends QuotesListCommonVM {

  constructor(quotesService: QuoteService) {
    super(quotesService);
  }
}
