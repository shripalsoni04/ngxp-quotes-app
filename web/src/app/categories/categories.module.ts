import { NgModule } from '@angular/core';

import { CategoryService } from '../../x-shared/app/categories';
import { CategoriesListComponent } from './categories-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [CategoriesListComponent],
  providers: [CategoryService],
  exports: [CategoriesListComponent]
})
export class CategoriesModule { }
