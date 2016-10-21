import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { AuthorsListCommonVM } from '../../x-shared/app/authors';

@Component({
  selector: 'authors-list',
  templateUrl: 'modules/authors/authors-list.component.html',
  providers: [AuthorsListCommonVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsListComponent {

  constructor(
    public cvm: AuthorsListCommonVM,
    private routerExtensions: RouterExtensions
  ) {
    this.cvm.loadAuthorList();
  }

  showQuotesByAuthor(authorId: number) {
    this.routerExtensions.navigate(['quotes', 'author', authorId]);
  }
}
