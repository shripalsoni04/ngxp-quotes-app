import { AuthorService } from './author.service';
import { Subject } from 'rxjs/Subject';

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
