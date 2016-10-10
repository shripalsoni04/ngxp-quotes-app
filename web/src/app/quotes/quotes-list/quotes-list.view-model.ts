import { Injectable } from '@angular/core';

import {
  QuotesListCommonVM, QuoteService, MyFavouritesService
} from '@xapp/quotes';

@Injectable()
export class QuotesListVM extends QuotesListCommonVM {

  constructor(
    quotesService: QuoteService,
    myFavouritesService: MyFavouritesService
  ) {
    super(quotesService, myFavouritesService);
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

  clearQuotesList() {
    this.lstQuotes.length = 0;
  }
}
