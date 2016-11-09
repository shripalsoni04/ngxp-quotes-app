import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import { RouterExtensions } from 'nativescript-angular/router';

import { Page } from 'ui/page';
import { confirm } from 'ui/dialogs';
import { isAndroid } from 'platform';

import { MyQuotesCommonVM, MyQuoteModel } from '../../x-shared/app/my-quotes';

declare const UITableViewCellSelectionStyle: any;

@Component({
  templateUrl: 'modules/my-quotes/my-quotes.component.html',
  styleUrls: ['modules/my-quotes/my-quotes.component.css'],
  providers: [MyQuotesCommonVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyQuotesComponent {

  isAndroid: boolean = isAndroid;

  constructor(
    public cvm: MyQuotesCommonVM,
    private routerExtensions: RouterExtensions,
    private page: Page,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.page.on('loaded', this.onPageLoad.bind(this));
  }

  createQuote() {
    this.routerExtensions.navigate(['my-quotes', 'create']);
  }

  editQuote(quote: MyQuoteModel) {
    this.routerExtensions.navigate(['my-quotes', quote.id]);
  }

  deleteQuote(quote: MyQuoteModel) {
    confirm('Are you sure you want to delete this quote?').then(
      (isDelete: boolean) => {
        if (isDelete) {
          this.cvm.deleteQuote(quote).then(() => {
            this.changeDetectorRef.markForCheck();
          });
        }
      });
  }

  onItemLoading(args) {
    // removing item selection style for ios.
    if (args.ios) {
      let cell = args.ios;
      cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
    }
  }

  private onPageLoad() {
    this.cvm.loadMyQuotes().subscribe((lstQuotes) => {
      // as page load event is getting executed out of angular scope, manually
      // calling detectChanges, which will run changeDetection for this and its
      // children.
      this.changeDetectorRef.detectChanges();
    })
  }
}
