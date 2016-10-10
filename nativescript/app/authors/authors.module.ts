import { NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SharedModule } from '../shared/shared.module';
import { AuthorService } from '../x-shared/app/authors';
import { AuthorsListComponent } from './authors-list.component';
import { authorsRouting } from './authors.routing';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    SharedModule,
    authorsRouting
  ],
  declarations: [AuthorsListComponent],
  providers: [AuthorService],
  exports: [AuthorsListComponent]
})
export class AuthorsModule { }
