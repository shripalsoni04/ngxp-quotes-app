import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthorService } from '@xapp/authors';
import { AuthorsListComponent } from './authors-list.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AuthorsListComponent],
  providers: [AuthorService],
  exports: [AuthorsListComponent]
})
export class AuthorsModule { }
