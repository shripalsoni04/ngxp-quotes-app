import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AuthorService } from './author.service';

@Injectable()
export class AuthorsListCommonVM {

  lstAuthors: any[] = [];

  authors$: Subject<any[]> = new Subject<any[]>();

  constructor(protected authorService: AuthorService) {

  }

  loadAuthorList() {
    this.authorService.get().then((lstAuthors) => {
      this.lstAuthors.length = 0;
      Array.prototype.push.apply(this.lstAuthors, lstAuthors);
      this.authors$.next(this.lstAuthors);
    });
    return this.authors$;
  }
}
