import { MyQuotesService } from './my-quotes.service';
import { Subject } from 'rxjs/Subject';

import { MyQuoteModel } from './my-quote.model';

export class MyQuotesCommonVM {

  quotes$: Subject<MyQuoteModel[]> = new Subject<MyQuoteModel[]>();

  lstQuotes: MyQuoteModel[] = [];

  constructor(protected myQuotesService: MyQuotesService) {

  }

  loadMyQuotes() {
    this.myQuotesService.getList().then((lstQuotes) => {
      this.lstQuotes.length = 0;
      Array.prototype.push.apply(this.lstQuotes, lstQuotes);
      this.quotes$.next(this.lstQuotes);
    });
    return this.quotes$;
  }

  updateQuoteInList(quote: MyQuoteModel) {
    let quoteIndex = this.getQuoteIndex(quote);
    if (quoteIndex > -1) {
      this.lstQuotes.splice(quoteIndex, 1, quote);
    } else {
      this.lstQuotes.splice(0, 0, quote);
    }
  }

  deleteQuote(quote: MyQuoteModel) {
    this.myQuotesService.remove(quote).then(() => {
      let quoteIndex = this.getQuoteIndex(quote);
      this.lstQuotes.splice(quoteIndex, 1);
    });
  }

  private getQuoteIndex(quote: MyQuoteModel) {
    let filteredQuote = this.lstQuotes.filter(item => item.id === quote.id);
    if (filteredQuote && filteredQuote.length) {
      return this.lstQuotes.indexOf(filteredQuote[0]);
    } else {
      return -1;
    }
  }
}
