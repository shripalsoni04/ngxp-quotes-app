import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/platform';

import { SharedModule } from '../shared/shared.module';
import { AuthorService } from '../../x-shared/app/authors';
import { AuthorsListComponent } from './authors-list.component';
import { AuthorsRoutingModule } from './authors-routing.module';

@NgModule({
  imports: [
    NativeScriptModule,
    SharedModule,
    AuthorsRoutingModule
  ],
  declarations: [AuthorsListComponent],
  providers: [AuthorService]
})
export class AuthorsModule { }
