import { MyQuotesService } from './my-quotes.service';
import { MyQuoteModel } from './my-quote.model';

export class NewQuoteCommonVM {

  dataModel: MyQuoteModel = new MyQuoteModel();

  validationErrors: { [key: string]: string } = {};

  validationMsg = {
    body: 'Quote Body is required.',
    authorName: 'Author Name is required.'
  };

  constructor(protected myQuotesService: MyQuotesService) {

  }

  saveQuote(quote: MyQuoteModel) {
    this.validationErrors = this.validateQuoteModel(quote);
    if (Object.keys(this.validationErrors).length) {
      return Promise.reject({ validationErrors: this.validationErrors });
    }

    if (quote.id) {
      return this.myQuotesService.update(quote);
    } else {
      return this.myQuotesService.create(quote);
    }
  }

  resetForm() {
    this.dataModel = new MyQuoteModel();
  }

  validateQuoteModel(quote: MyQuoteModel): { [key: string]: string } {
    let validationErrors = {};
    if (!quote.body || !quote.body.trim().length) {
      validationErrors['body'] = this.validationMsg.body;
    }

    if (!quote.authorName || !quote.authorName.trim().length) {
      validationErrors['authorName'] = this.validationMsg.authorName;
    }
    return validationErrors;
  }
}
