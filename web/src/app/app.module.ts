import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
import { CoreModule } from './core/core.module';
import { QuotesModule } from './quotes/quotes.module';
import { MyQuotesModule } from './my-quotes/my-quotes.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouting,
    CoreModule,
    QuotesModule,
    MyQuotesModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
