import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { AuthorsListCommonVM } from './authors-list-common.view-model';
import { AuthorService } from './author.service';
import { FakeAuthorService } from './testing';

let authorsListCommonVM: AuthorsListCommonVM;

describe('AuthorsListCommonVM', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorsListCommonVM,
        { provide: AuthorService, useClass: FakeAuthorService }
      ]
    });

    authorsListCommonVM = TestBed.get(AuthorsListCommonVM);

  });

  it('lstAuthors should be blank array', () => {
    expect(authorsListCommonVM.lstAuthors).toEqual([]);
  });

  it('authors$ should be defined', () => {
    expect(authorsListCommonVM.authors$).toBeDefined();
  });

  it('#loadAuthorList should load authors', fakeAsync(() => {
    authorsListCommonVM.loadAuthorList();
    tick();
    expect(authorsListCommonVM.lstAuthors.length).toBeGreaterThan(0);
  }));

  it('#loadAuthorList should emit loaded authors', async(() => {
    authorsListCommonVM.authors$.subscribe((lstAuthors) => {
      expect(lstAuthors.length).toBeGreaterThan(0);
    });
    authorsListCommonVM.loadAuthorList();
  }));
});
