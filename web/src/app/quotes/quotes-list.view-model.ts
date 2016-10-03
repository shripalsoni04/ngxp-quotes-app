import { Injectable } from '@angular/core';

import { QuotesListCommonVM, QuoteService } from '@xapp/quotes';

@Injectable()
export class QuotesListVM extends QuotesListCommonVM {

  constructor(quotesService: QuoteService) {
    super(quotesService);
  }
}
