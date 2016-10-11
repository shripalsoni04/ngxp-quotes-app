import { MyQuotesService } from './my-quotes.service';
import { MyQuoteModel } from './my-quote.model';

export class NewQuoteCommonVM {

  dataModel: MyQuoteModel = new MyQuoteModel();

  constructor(protected myQuotesService: MyQuotesService) {

  }

  saveQuote(quote: MyQuoteModel) {
    if (quote.id) {
      return this.myQuotesService.update(quote);
    } else {
      return this.myQuotesService.create(quote);
    }
  }

  resetForm() {
    this.dataModel = new MyQuoteModel();
  }
}
