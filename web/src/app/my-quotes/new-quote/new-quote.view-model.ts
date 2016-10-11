import { Injectable } from '@angular/core';
import { MyQuotesService, NewQuoteCommonVM } from '@xapp/my-quotes';

@Injectable()
export class NewQuoteVM extends NewQuoteCommonVM {

  constructor(myQuotesService: MyQuotesService) {
    super(myQuotesService);
  }
}
