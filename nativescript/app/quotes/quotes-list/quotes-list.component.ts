import {
  Component, OnChanges, Input, ChangeDetectionStrategy
} from '@angular/core';

import { QuotesListVM } from './quotes-list.view-model';

@Component({
  selector: 'quotes-list',
  templateUrl: 'quotes/quotes-list/quotes-list.component.html',
  styleUrls: ['quotes/quotes-list/quotes-list.component.css'],
  providers: [QuotesListVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesListComponent implements OnChanges {

  @Input() entityId: number;

  @Input() quotesBy: 'author' | 'category' | 'all' | 'favourites';

  constructor(public vm: QuotesListVM) {

  }

  ngOnChanges() {
    this.vm.loadQuotesByCriteria(this.quotesBy, this.entityId);
  }
}
