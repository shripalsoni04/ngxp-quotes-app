import { Injectable } from '@angular/core';

import { AuthorsListCommonVM, AuthorService } from '@xapp/authors';

@Injectable()
export class AuthorsListVM extends AuthorsListCommonVM {

  constructor(authorService: AuthorService) {
    super(authorService);
  }
}
