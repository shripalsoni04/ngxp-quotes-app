import { Injectable } from '@angular/core';
import {
  MyQuotesService, MyQuotesCommonVM
} from '../../x-shared/app/my-quotes';

@Injectable()
export class MyQuotesVM extends MyQuotesCommonVM {

  constructor(myQuotesService: MyQuotesService) {
    super(myQuotesService);
  }
}
