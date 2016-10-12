import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { MyQuotesVM } from './my-quotes.view-model';
import { AppService } from '../app.service';

@Component({
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
  providers: [MyQuotesVM]
  // TODO: Enable OnPush once angular2-mdl has its support.
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyQuotesComponent implements OnInit {

  constructor(
    public vm: MyQuotesVM,
    private appService: AppService
  ) {
    this.appService.setTitle('My Quotes');
  }

  ngOnInit() {
    this.vm.loadMyQuotes();
  }
}
