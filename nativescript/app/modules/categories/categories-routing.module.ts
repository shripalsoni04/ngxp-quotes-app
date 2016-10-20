import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { CategoriesListComponent } from './categories-list.component';

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild([
      { path: 'categories', component: CategoriesListComponent }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class CategoriesRoutingModule {

}
