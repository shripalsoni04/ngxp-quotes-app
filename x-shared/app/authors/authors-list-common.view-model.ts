import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthorService } from './author.service';

@Injectable()
export class AuthorsListCommonVM {

  lstAuthors: any[] = [];

  authors$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.lstAuthors);

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
