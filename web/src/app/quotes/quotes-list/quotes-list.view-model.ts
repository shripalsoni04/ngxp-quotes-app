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

  getPaginationString() {
    let start = (this.pagination.page - 1) * this.pagination.size + 1;
    let end = this.pagination.page * this.pagination.size;
    let total = this.pagination.count;
    end = end > total ? total : end;
    return `${start} - ${end} of ${total}`;
  }
}
