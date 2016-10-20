import {
  Component, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import { QuotesListVM } from './quotes-list.view-model';

import { TNSFontIconService } from 'nativescript-ng2-fonticon';

import { StackLayout } from 'ui/layouts/stack-layout';

declare const UITableViewCellSelectionStyle: any;

@Component({
  selector: 'quotes-list',
  templateUrl: 'modules/quotes/quotes-list/quotes-list.component.html',
  styleUrls: ['modules/quotes/quotes-list/quotes-list.component.css'],
  providers: [QuotesListVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesListComponent implements OnChanges {

  @Input() entityId: number;

  @Input() quotesBy: 'author' | 'category' | 'all' | 'favourites';

  constructor(
    public vm: QuotesListVM,
    private fonticon: TNSFontIconService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnChanges() {
    this.vm.loadQuotesByCriteria(this.quotesBy, this.entityId);
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
        this.vm.toggleFav(quote, quotesBy).then(() => {
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
      this.vm.toggleFav(quote, quotesBy);
    }
  }
}
