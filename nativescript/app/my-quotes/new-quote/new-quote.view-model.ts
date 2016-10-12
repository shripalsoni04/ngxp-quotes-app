import { Injectable } from '@angular/core';

import {
  MyQuotesService, NewQuoteCommonVM, MyQuoteModel
} from '../../x-shared/app/my-quotes';

@Injectable()
export class NewQuoteVM extends NewQuoteCommonVM {

  constructor(myQuotesService: MyQuotesService) {
    super(myQuotesService);
  }

  loadQuoteDetailsById(id: number) {
    return this.myQuotesService.getById(id).then((myQuote) => {
      this.dataModel = new MyQuoteModel(myQuote.id, myQuote.body, myQuote.authorName);
    });
  }
}
