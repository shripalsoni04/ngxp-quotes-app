import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CoreModule } from './core/core.module';
import { QuotesModule } from './quotes/quotes.module';
import { MyQuotesModule } from './my-quotes/my-quotes.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    appRouting,
    CoreModule,
    QuotesModule,
    MyQuotesModule,
    SharedModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
