import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { MyQuotesService } from '../../x-shared/app/my-quotes';

import { MyQuotesComponent } from './my-quotes.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { MyQuotesRoutingModule } from './my-quotes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    MyQuotesRoutingModule,
    SharedModule
  ],
  declarations: [
    MyQuotesComponent,
    NewQuoteComponent
  ],
  providers: [MyQuotesService]
})
export class MyQuotesModule { }
