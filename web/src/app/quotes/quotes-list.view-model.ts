import { Injectable } from '@angular/core';

import { QuotesListCommonVM, QuoteService } from '@xapp/quotes';

@Injectable()
export class QuotesListVM extends QuotesListCommonVM {

  constructor(quotesService: QuoteService) {
    super(quotesService);
  }

  isBackPaginationDisabled() {
    return this.pagination.page === 1;
  }

  isForwardPaginationDisabled() {
    return this.pagination.page === this.getMaxPageNumber();
  }

  loadFirstPage() {
    this.clearQuotesList();
    this.pagination.page = 1;
    return this.loadQuotes();
  }

  loadPreviousPage() {
    this.clearQuotesList();
    this.pagination.page -= 1;
    return this.loadQuotes();
  }

  loadNextPage() {
    this.clearQuotesList();
    this.lstQuotes.length = 0;
    return super.loadNextPage();
  }

  loadLastPage() {
    this.clearQuotesList();
    this.pagination.page = this.getMaxPageNumber();
    return this.loadQuotes();
  }

  private clearQuotesList(){
    this.lstQuotes.length = 0;
  }
}
