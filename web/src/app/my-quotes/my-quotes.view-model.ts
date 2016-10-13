import { Injectable } from '@angular/core';
import { MyQuotesService, MyQuotesCommonVM, MyQuoteModel } from '@xapp/my-quotes';
import { MdlDialogService } from 'angular2-mdl';

@Injectable()
export class MyQuotesVM extends MyQuotesCommonVM {

  quoteToEdit: MyQuoteModel;

  constructor(
    myQuotesService: MyQuotesService,
    private mdlDialogService: MdlDialogService) {
    super(myQuotesService);
  }

  editQuote(quote: MyQuoteModel) {
    this.quoteToEdit = quote;
  }

  deleteQuote(quote: MyQuoteModel) {
    return this.mdlDialogService.confirm(
      'Are you sure you want to delete this quote?', 'No', 'Yes'
    ).toPromise().then(() => super.deleteQuote(quote), () => void 0);
  }

  onFormReset() {
    this.quoteToEdit = null;
  }
}
