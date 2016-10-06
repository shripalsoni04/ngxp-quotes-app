import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CategoryService } from '@xapp/categories';
import { CategoriesListComponent } from './categories-list.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [CategoriesListComponent],
  providers: [CategoryService],
  exports: [CategoriesListComponent]
})
export class CategoriesModule { }
