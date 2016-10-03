import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { QuoteService } from '@xapp/quotes';

import { QuotesListComponent } from './quotes-list.component';
import { quotesRouting } from './quotes.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    quotesRouting
  ],
  declarations: [QuotesListComponent],
  providers: [QuoteService]
})
export class QuotesModule { }
