import { Injectable } from '@angular/core';
import { MyQuotesService, MyQuotesCommonVM, MyQuoteModel } from '@xapp/my-quotes';

@Injectable()
export class MyQuotesVM extends MyQuotesCommonVM {

  quoteToEdit: MyQuoteModel;

  constructor(myQuotesService: MyQuotesService) {
    super(myQuotesService);
  }

  editQuote(quote: MyQuoteModel) {
    this.quoteToEdit = quote;
  }

  deleteQuote(quote: MyQuoteModel) {
    // Instead of using browser confirm dialog it is preferrable to use any
    // other custom dialog like of mdl or bootstrap. Because in chrome,
    // a checkbox to prevent dialog appears and if user tick that, this code will
    // fail.
    if (confirm('Are you sure you want to delete this quote?')) {
      super.deleteQuote(quote);
      if (this.quoteToEdit && this.quoteToEdit.id === quote.id) {
        this.quoteToEdit = null;
      }
    }
  }

  onFormReset() {
    this.quoteToEdit = null;
  }
}
