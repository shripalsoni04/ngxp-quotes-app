import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { MyQuotesComponent } from './my-quotes.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild([
      { path: 'my-quotes', component: MyQuotesComponent },
      { path: 'my-quotes/create', component: NewQuoteComponent },
      { path: 'my-quotes/:id', component: NewQuoteComponent },
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class MyQuotesRoutingModule {

}
