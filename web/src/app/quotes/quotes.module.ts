import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { QuoteService, MyFavouritesService } from '@xapp/quotes';

import { AuthorsModule } from '../authors/authors.module';
import { CategoriesModule } from '../categories/categories.module';
import { QuotesListComponent } from './quotes-list';
import { QuotesComponent } from './quotes.component';
import { quotesRouting } from './quotes.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AuthorsModule,
    CategoriesModule,
    quotesRouting
  ],
  declarations: [QuotesComponent, QuotesListComponent],
  providers: [QuoteService, MyFavouritesService]
})
export class QuotesModule { }
