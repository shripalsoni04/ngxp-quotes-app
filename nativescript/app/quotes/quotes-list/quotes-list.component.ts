import {
  Component, OnChanges, Input, ChangeDetectionStrategy
} from '@angular/core';

import { QuotesListVM } from './quotes-list.view-model';

import { TNSFontIconService } from 'nativescript-ng2-fonticon';

declare const UITableViewCellSelectionStyle: any;

@Component({
  selector: 'quotes-list',
  templateUrl: 'quotes/quotes-list/quotes-list.component.html',
  providers: [QuotesListVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesListComponent implements OnChanges {

  @Input() entityId: number;

  @Input() quotesBy: 'author' | 'category' | 'all' | 'favourites';

  constructor(public vm: QuotesListVM, private fonticon: TNSFontIconService) {

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
}
