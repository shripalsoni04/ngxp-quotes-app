import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { MyQuotesComponent } from './my-quotes.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'my-quotes', component: MyQuotesComponent }
    ])
  ],
  exports: [RouterModule]
})
export class MyQuotesRoutingModule {

}
