import { TestBed, async } from '@angular/core/testing';

import { FirebaseService } from '../core';
import { FakeFirebaseService } from '../core/testing';
import { AuthorService } from './author.service';
import { AUTHORS } from './testing/authors.mock';


let authorService: AuthorService;
let firebaseService: FakeFirebaseService;
let getAuthorListSpy: jasmine.Spy;

describe('AuthorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorService,
        { provide: FirebaseService, useClass: FakeFirebaseService }
      ]
    });

    firebaseService = TestBed.get(FirebaseService);
    authorService = TestBed.get(AuthorService);
    getAuthorListSpy = spyOn(firebaseService, 'getListOnce').and
      .returnValue(Promise.resolve(AUTHORS));
  });

  it('should return promise of list of authors', async(() => {
    authorService.get().then((lstAuthors: any[]) => {
      expect(lstAuthors.length).toEqual(AUTHORS.length);
    });
  }));

  it('should reject promise with error in case of any issue with api',
    async(() => {
      getAuthorListSpy.and.returnValue(Promise.reject('Some error occurred'));
      authorService.get().then(null, (error) => {
        expect(error).toBeDefined();
      });
    }));

  it('should return cached authors if available in cache', async(() => {
    authorService.get().then(() => {
      authorService.get().then((lstAuthors: any[]) => {
        expect(lstAuthors.length).toEqual(AUTHORS.length);
        expect(getAuthorListSpy.calls.count()).toBe(1);
      });
    });
  }));

  it('should return author by id', async(() => {
    authorService.getAuthorById(AUTHORS[0].id).then((oAuthor) => {
      expect(oAuthor).toEqual(AUTHORS[0]);
    });
  }));

  it('should return author name by id', async(() => {
    authorService.getNameById(AUTHORS[0].id).then((authorName) => {
      expect(authorName).toBe(AUTHORS[0].name);
    });
  }));

});
