import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { MyQuotesVM } from './my-quotes.view-model';

@Component({
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
  providers: [MyQuotesVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyQuotesComponent implements OnInit {

  constructor(public vm: MyQuotesVM) { }

  ngOnInit() {
    this.vm.loadMyQuotes();
  }
}
