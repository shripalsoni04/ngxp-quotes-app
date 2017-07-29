import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { SharedModule } from '../shared/shared.module';
import { CategoryService } from '../../x-shared/app/categories';
import { CategoriesListComponent } from './categories-list.component';
import { CategoriesRoutingModule } from './categories-routing.module';


@NgModule({
  imports: [
    NativeScriptModule,
    SharedModule,
    CategoriesRoutingModule
  ],
  declarations: [CategoriesListComponent],
  providers: [CategoryService]
})
export class CategoriesModule { }
