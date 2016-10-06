import {
  Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, NgZone
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuotesListVM } from './quotes-list.view-model';

@Component({
  selector: 'quotes-list',
  templateUrl: 'quotes/quotes-list.component.html',
  styleUrls: ['quotes/quotes-list.component.css'],
  providers: [QuotesListVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesListComponent implements OnInit {

  quotesBy: 'author' | 'category' | 'all';

  entityId: number;

  constructor(
    public vm: QuotesListVM,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {

  }

  ngOnInit() {
    let params = this.activatedRoute.snapshot.params;
    this.quotesBy = params['quotesBy'] || 'all';
    this.entityId = params['id'];
    this.vm.loadQuotesByCriteria(this.quotesBy, this.entityId);
  }
}
