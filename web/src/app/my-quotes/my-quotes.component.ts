import {
  Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef
} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { MyQuotesCommonVM, MyQuoteModel } from '../../x-shared/app/my-quotes';
import { AppService } from '../app.service';
import { MdlDialogComponent, MdlDialogService } from '@angular-mdl/core/components/dialog';
import { UtilityService } from '../core/utility.service';

@Component({
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
  providers: [MyQuotesCommonVM]
  // TODO: Enable OnPush once angular2-mdl has its support.
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyQuotesComponent implements OnInit {

  @ViewChild(MdlDialogComponent) mdlDialogComponent: MdlDialogComponent;

  isSmallScreen: boolean = false;

  quoteToEdit: MyQuoteModel;

  constructor(
    public cvm: MyQuotesCommonVM,
    private appService: AppService,
    private utilityService: UtilityService,
    private mdlDialogService: MdlDialogService
  ) {
    this.appService.setTitle('My Quotes');
  }

  ngOnInit() {
    this.cvm.loadMyQuotes();
    this.isSmallScreen = this.utilityService.isSmallScreen();
  }

  editQuote(quote: MyQuoteModel) {
    this.quoteToEdit = quote;
    this.showQuoteDialogForSmallScreen();
  }

  deleteQuote(quote: MyQuoteModel) {
    return this.mdlDialogService.confirm(
      'Are you sure you want to delete this quote?', 'No', 'Yes'
    ).toPromise().then(() => this.cvm.deleteQuote(quote), () => void 0);
  }

  onSave(quote: MyQuoteModel) {
    this.cvm.updateQuoteInList(quote);
    this.closeQuoteDialog();
  }

  onCancel() {
    this.quoteToEdit = null;
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
