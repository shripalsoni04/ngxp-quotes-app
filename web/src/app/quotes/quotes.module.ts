import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { QuoteService, MyFavouritesService } from '@xapp/quotes';

import { AuthorsModule } from '../authors/authors.module';
import { CategoriesModule } from '../categories/categories.module';
import { SharedModule } from '../shared/shared.module';

import { QuotesListComponent } from './quotes-list';
import { QuotesComponent } from './quotes.component';
import { QuotesRoutingModule } from './quotes-routing.module';

@NgModule({
  imports: [
    HttpModule,
    QuotesRoutingModule,
    AuthorsModule,
    CategoriesModule,
    SharedModule
  ],
  declarations: [QuotesComponent, QuotesListComponent],
  providers: [QuoteService, MyFavouritesService]
})
export class QuotesModule { }
