import {
  Component, OnChanges, Input, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';

import { QuotesListVM } from './quotes-list.view-model';

@Component({
  selector: 'quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss'],
  providers: [QuotesListVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesListComponent implements OnChanges {

  @Input() authorId: number;

  @Input() categoryId: number;

  @Input() quotesBy: 'author' | 'category' | 'all';

  constructor(public vm: QuotesListVM) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.quotesBy === 'all') {
      this.vm.loadQuotes();
    } else if (this.quotesBy === 'author' && this.authorId) {
      this.vm.loadQuotesByAuthorId(+this.authorId);
    } else if (this.quotesBy === 'category' && this.categoryId) {
      this.vm.loadQuotesByCategoryId(+this.categoryId);
    }
  }
}
