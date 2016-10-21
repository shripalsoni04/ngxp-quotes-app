import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterExtensions } from 'nativescript-angular/router';
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

import { alert } from 'ui/dialogs';

import { NewQuoteCommonVM, MyQuoteModel } from '../../../x-shared/app/my-quotes';

@Component({
  selector: 'new-quote',
  templateUrl: 'modules/my-quotes/new-quote/new-quote.component.html',
  styleUrls: ['modules/my-quotes/new-quote/new-quote.component.css'],
  providers: [NewQuoteCommonVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewQuoteComponent implements OnInit {

  constructor(
    public cvm: NewQuoteCommonVM,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private changeDetectorRef: ChangeDetectorRef,
    private fonticon: TNSFontIconService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.cvm.loadQuoteDetailsById(+id).then(() => {
        // as when data is loaded, it is actually not causing any input changes
        // for the compoennt and as changeDetectionStrategy is set to OnPush,
        // calling markForCheck so that this compoennt's change will be reflected
        // whenever zone run's next time.
        this.changeDetectorRef.markForCheck();
      });
    }
  }

  save(quote: MyQuoteModel) {
    this.cvm.saveQuote(quote).then(() => {
      this.routerExtensions.backToPreviousPage();
    }, (error) => {
      if (error.validationErrors) {
        alert('Please enter missing data.');
      }
    });
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }
}
