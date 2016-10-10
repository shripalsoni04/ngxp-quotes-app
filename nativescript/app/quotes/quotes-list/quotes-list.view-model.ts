import { Injectable } from '@angular/core';

import { ListView } from 'ui/list-view';

import { QuotesListCommonVM, QuoteService } from '../../x-shared/app/quotes';

@Injectable()
export class QuotesListVM extends QuotesListCommonVM {

  constructor(quotesService: QuoteService) {
    super(quotesService);
  }

  onLoadMoreItemsRequested(args: any) {
    let lastPage = this.getMaxPageNumber();
    let listView: ListView = args.object;
    if (this.pagination.page < lastPage) {
      super.loadNextPage();
    } else {
      listView.off('loadMoreItems');
    }
  }
}
