import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { QuotesListVM } from './quotes-list.view-model';

@Component({
  selector: 'quotes-list',
  templateUrl: 'quotes/quotes-list.component.html',
  styleUrls: ['quotes/quotes-list.component.css'],
  providers: [QuotesListVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesListComponent implements OnInit {

  constructor(public vm: QuotesListVM) { }

  ngOnInit() {
    this.vm.loadQuotes();
  }
}
