import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SIDEDRAWER_DIRECTIVES } from 'nativescript-telerik-ui/sidedrawer/angular';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { QuotesModule } from './quotes/quotes.module';
import { appRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    SIDEDRAWER_DIRECTIVES
  ],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    CoreModule,
    QuotesModule,
    appRouting
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
