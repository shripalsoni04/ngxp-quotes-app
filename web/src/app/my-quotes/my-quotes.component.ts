import {
  Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef
} from '@angular/core';

import { MyQuotesVM } from './my-quotes.view-model';
import { AppService } from '../app.service';
import { MdlDialogComponent } from 'angular2-mdl';
import { UtilityService } from '../core/utility.service';

@Component({
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
  providers: [MyQuotesVM]
  // TODO: Enable OnPush once angular2-mdl has its support.
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyQuotesComponent implements OnInit {

  @ViewChild(MdlDialogComponent) mdlDialogComponent: MdlDialogComponent;

  isSmallScreen: boolean = false;

  constructor(
    public vm: MyQuotesVM,
    private appService: AppService,
    private utilityService: UtilityService
  ) {
    this.appService.setTitle('My Quotes');
  }

  ngOnInit() {
    this.vm.loadMyQuotes();
    this.isSmallScreen = this.utilityService.isSmallScreen();
  }

  editQuote(quote: MyQuotesVM) {
    this.vm.editQuote(quote);
    this.showQuoteDialogForSmallScreen();
  }

  onSave(quote: MyQuotesVM) {
    this.vm.updateQuoteInList(quote);
    this.closeQuoteDialog();
  }

  onCancel() {
    this.vm.onFormReset();
    this.closeQuoteDialog();
  }

  showQuoteDialogForSmallScreen() {
    if (this.isSmallScreen) {
      this.mdlDialogComponent.show();
    }
  }

  private closeQuoteDialog() {
    if (this.isSmallScreen) {
      this.mdlDialogComponent.close();
    }
  }
}
