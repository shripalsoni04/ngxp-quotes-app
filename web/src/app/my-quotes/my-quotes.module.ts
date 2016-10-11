import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyQuotesService } from '@xapp/my-quotes';
import { MyQuotesComponent } from './my-quotes.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { MyQuotesRoutingModule } from './my-quotes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyQuotesRoutingModule
  ],
  declarations: [
    MyQuotesComponent,
    NewQuoteComponent
  ],
  providers: [MyQuotesService]
})
export class MyQuotesModule { }
