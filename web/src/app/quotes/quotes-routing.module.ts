import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { QuotesComponent } from './quotes.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'quotes', component: QuotesComponent },
      { path: 'quotes/:quotesBy', component: QuotesComponent },
      { path: 'quotes/:quotesBy/:entityId', component: QuotesComponent }
    ])
  ],
  exports: [RouterModule]
})
export class QuotesRoutingModule {

}
