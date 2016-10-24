import {
  Component, OnChanges, Input, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';

import { QuotesListCommonVM } from '../../../x-shared/app/quotes';

@Component({
  selector: 'quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss'],
  providers: [QuotesListCommonVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesListComponent implements OnChanges {

  @Input() entityId: number;

  @Input() quotesBy: 'author' | 'category' | 'all' | 'favourites';

  constructor(public cvm: QuotesListCommonVM) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['quotesBy']) {
      this.clearQuotesList();
    }
    this.loadQuotesByCriteria();
  }

  loadQuotesByCriteria() {
    this.cvm.loadQuotesByCriteria(this.quotesBy, this.entityId);
  }

  // NOTE: we can keep all the pagination related code to commonVM, but as
  // currently it is required only for web-app, why to increase the size
  // of common code for other platforms.
  isBackPaginationDisabled() {
    return this.cvm.pagination.page === 1;
  }

  isForwardPaginationDisabled() {
    return this.cvm.pagination.page === this.cvm.getMaxPageNumber();
  }

  loadFirstPage() {
    this.clearQuotesList();
    this.cvm.pagination.page = 1;
    this.cvm.loadQuotes();
  }

  loadPreviousPage() {
    this.clearQuotesList();
    this.cvm.pagination.page -= 1;
    this.cvm.loadQuotes();
  }

  loadNextPage() {
    this.clearQuotesList();
    this.cvm.lstQuotes.length = 0;
    this.cvm.loadNextPage();
  }

  loadLastPage() {
    this.clearQuotesList();
    this.cvm.pagination.page = this.cvm.getMaxPageNumber();
    this.cvm.loadQuotes();
  }

  clearQuotesList() {
    this.cvm.lstQuotes.length = 0;
  }

  getPaginationString() {
    let start = (this.cvm.pagination.page - 1) * this.cvm.pagination.size + 1;
    let end = this.cvm.pagination.page * this.cvm.pagination.size;
    let total = this.cvm.pagination.count;
    end = end > total ? total : end;
    return `${start} - ${end} of ${total}`;
  }
}
