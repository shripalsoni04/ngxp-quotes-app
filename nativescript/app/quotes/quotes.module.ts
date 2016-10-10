import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';

import { QuoteService } from '../x-shared/app/quotes';

import { SharedModule } from '../shared/shared.module';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { AllQuotesComponent } from './all-quotes/all-quotes.component';
import { QuotesByComponent } from './quotes-by/quotes-by.component';
import { quotesRouting } from './quotes.routing';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    SharedModule,
    quotesRouting
  ],
  declarations: [
    LISTVIEW_DIRECTIVES,
    QuotesListComponent,
    AllQuotesComponent,
    QuotesByComponent
  ],
  providers: [QuoteService]
})
export class QuotesModule { }
