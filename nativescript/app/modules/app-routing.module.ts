import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'quotes' }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {

}
