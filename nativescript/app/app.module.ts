import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { QuotesModule } from './quotes/quotes.module';
import { CategoriesModule } from './categories/categories.module';
import { appRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    CoreModule,
    QuotesModule,
    CategoriesModule,
    appRouting
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
