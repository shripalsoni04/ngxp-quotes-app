import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { AuthorsListComponent } from './authors-list.component';

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild([
      { path: 'authors', component: AuthorsListComponent }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class AuthorsRoutingModule {

}
