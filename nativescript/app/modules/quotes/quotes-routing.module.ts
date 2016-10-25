import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { QuotesComponent } from './quotes.component';

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild([
      { path: 'quotes', component: QuotesComponent },
      { path: 'quotes/:quotesBy', component: QuotesComponent },
      { path: 'quotes/:quotesBy/:entityId', component: QuotesComponent },
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class QuotesRoutingModule {

}
