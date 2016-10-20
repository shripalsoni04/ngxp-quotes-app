import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { AuthorsListVM } from './authors-list.view-model';

@Component({
  selector: 'authors-list',
  templateUrl: 'modules/authors/authors-list.component.html',
  providers: [AuthorsListVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsListComponent {

  constructor(
    public vm: AuthorsListVM,
    private routerExtensions: RouterExtensions
  ) {
    this.vm.loadAuthorList();
  }

  showQuotesByAuthor(authorId: number) {
    this.routerExtensions.navigate(['quotes', 'author', authorId]);
  }
}
