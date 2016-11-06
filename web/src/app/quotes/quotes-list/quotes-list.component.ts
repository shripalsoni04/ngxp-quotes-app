import {
  Component, OnChanges, Input, SimpleChanges, ChangeDetectionStrategy,
  ChangeDetectorRef
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

  @Input() quotesBy: quotesByType;

  constructor(
    public cvm: QuotesListCommonVM,
    private changeDetectorRef: ChangeDetectorRef) {

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

  toggleFav(quoteCardEle: HTMLElement, quote: any, quotesBy: quotesByType) {
    // If it is a favourite qutoes' screen, then performing slide transition and
    // then removing the quote from favourites list.
    if (quotesBy === 'favourites') {
      quoteCardEle.className += ' removed';
      setTimeout(() => {
        this.cvm.toggleFav(quote, quotesBy).then(() => {
          this.changeDetectorRef.markForCheck();
        });
      }, 300);
    } else {
      this.cvm.toggleFav(quote, quotesBy);
    }
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
