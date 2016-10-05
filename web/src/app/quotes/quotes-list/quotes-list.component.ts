import {
  Component, OnChanges, Input, SimpleChanges, ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { QuotesListVM } from './quotes-list.view-model';

@Component({
  selector: 'quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss'],
  providers: [QuotesListVM]
})
export class QuotesListComponent implements OnChanges {

  @Input() authorId: number;

  @Input() categoryId: number;

  @Input() quotesBy: 'author' | 'category' | 'all';

  constructor(public vm: QuotesListVM, private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnChanges(changes: SimpleChanges) {
    let promise;
    if (this.quotesBy === 'all') {
      promise = this.vm.loadQuotes();
    } else if (this.quotesBy === 'author' && this.authorId) {
      promise = this.vm.loadQuotesByAuthorId(+this.authorId);
    } else if (this.quotesBy === 'category' && this.categoryId) {
      promise = this.vm.loadQuotesByCategoryId(+this.categoryId);
    }

    // if (!promise) {
    //   return;
    // }

    // promise.then(() => {
    //   this.changeDetectorRef.markForCheck();
    // });
  }
}
