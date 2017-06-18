import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';

import { QuoteService, MyFavouritesService } from '../../x-shared/app/quotes';

import { SharedModule } from '../shared/shared.module';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { QuotesComponent } from './quotes.component';
import { QuotesRoutingModule } from './quotes-routing.module';

@NgModule({
  imports: [
    NativeScriptModule,
    SharedModule,
    QuotesRoutingModule
  ],
  declarations: [
    LISTVIEW_DIRECTIVES,
    QuotesListComponent,
    QuotesComponent
  ],
  providers: [QuoteService, MyFavouritesService]
})
export class QuotesModule { }
