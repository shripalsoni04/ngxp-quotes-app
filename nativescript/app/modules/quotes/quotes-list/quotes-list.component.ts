import {
  Component, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import { StackLayout } from 'ui/layouts/stack-layout';
import { ListView } from 'ui/list-view';
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import * as SocialShare from 'nativescript-social-share';


import { QuotesListCommonVM } from '../../../x-shared/app/quotes';

declare const UITableViewCellSelectionStyle: any;

@Component({
  selector: 'quotes-list',
  templateUrl: 'modules/quotes/quotes-list/quotes-list.component.html',
  styleUrls: ['modules/quotes/quotes-list/quotes-list.component.css'],
  providers: [QuotesListCommonVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesListComponent implements OnChanges {

  @Input() entityId: number;

  @Input() quotesBy: quotesByType;

  constructor(
    public cvm: QuotesListCommonVM,
    private fonticon: TNSFontIconService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnChanges() {
    this.cvm.loadQuotesByCriteria(this.quotesBy, this.entityId);
  }

  onItemLoading(args) {
    // removing item selection style for ios.
    if (args.ios) {
      let cell = args.ios;
      cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
    }
  }

  toggleFav(quoteCardContainer: StackLayout, quote: any, quotesBy) {
    if (quotesBy === 'favourites') {
      // if quotesList is for favourites quotes, then on toggle of favourite
      // button, removing quoteCard by animating it to off the screen.
      quoteCardContainer.animate({
        translate: { x: 1000, y: 0 },
        duration: 300,
        opacity: 0
      }).then(() => {
        this.cvm.toggleFav(quote, quotesBy).then(() => {
          // as angular is not removing the actual stackLayout if the number of
          // items are more than that can be accomodated in screen and it is
          // only changing the data, we need to revert the stackLayout opacity
          // and tranlateX properties.
          quoteCardContainer.opacity = 1;
          quoteCardContainer.translateX = 0;
          this.changeDetectorRef.markForCheck();
        });
      });
    } else {
      this.cvm.toggleFav(quote, quotesBy);
    }
  }

  onLoadMoreItemsRequested(args: any) {
    let lastPage = this.cvm.getMaxPageNumber();
    let listView: ListView = args.object;
    if (this.cvm.pagination.page < lastPage) {
      this.cvm.loadNextPage();
    } else {
      listView.off('loadMoreItems');
    }
  }

  shareQuote(quote: any) {
    let quoteText = this.cvm.getQuoteShareText(quote);
    SocialShare.shareText(quoteText, 'Quote of the Day!');
  }
}
