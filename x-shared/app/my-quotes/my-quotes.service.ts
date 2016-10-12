import { Injectable } from '@angular/core';

import { LocalDatabaseService } from '../core';
import { MyQuoteModel } from './my-quote.model';

@Injectable()
export class MyQuotesService {
  private collectionName: string = 'my_quotes';

  constructor(private localDatabaseService: LocalDatabaseService) {

  }

  getList(): Promise<MyQuoteModel[]> {
    return this.localDatabaseService.getList(this.collectionName);
  }

  getById(id: number): Promise<MyQuoteModel> {
    return this.localDatabaseService.getById(this.collectionName, id);
  }

  create(quote: MyQuoteModel) {
    return this.localDatabaseService.insert(this.collectionName, quote);
  }

  update(quote: MyQuoteModel) {
    return this.localDatabaseService.update(this.collectionName, quote);
  }

  remove(quote: MyQuoteModel) {
    return this.localDatabaseService.delete(this.collectionName, quote);
  }
}
