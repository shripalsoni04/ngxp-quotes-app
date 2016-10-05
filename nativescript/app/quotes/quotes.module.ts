import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';

import { QuoteService } from '../x-shared/app/quotes';

import { QuotesListComponent } from './quotes-list.component';
import { quotesRouting } from './quotes.routing';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    HttpModule,
    quotesRouting
  ],
  declarations: [LISTVIEW_DIRECTIVES, QuotesListComponent],
  providers: [QuoteService]
})
export class QuotesModule { }
