import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { TNSFontIconService } from 'nativescript-ng2-fonticon';
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
  providers: [{
    provide: TNSFontIconService,
    useFactory: () => {
      return new TNSFontIconService({
        'mdi': 'material-design-icons.css'
      }, false);
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
