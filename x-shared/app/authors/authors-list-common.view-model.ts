import { AuthorService } from './author.service';

export class AuthorsListCommonVM {

  lstAuthors: any[] = [];

  constructor(protected authorService: AuthorService) {

  }

  loadAuthorList() {
    return this.authorService.get().then((lstAuthors) => {
      this.lstAuthors.length = 0;
      Array.prototype.push.apply(this.lstAuthors, lstAuthors);
      return lstAuthors;
    });
  }
}
