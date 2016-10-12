import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { QuotesModule } from './quotes/quotes.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { MyQuotesModule } from './my-quotes/my-quotes.module';
import { appRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    CoreModule,
    AuthorsModule,
    CategoriesModule,
    QuotesModule,
    MyQuotesModule,
    appRouting
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
