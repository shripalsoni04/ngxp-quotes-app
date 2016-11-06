import { Injectable } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';
import { Pagination } from '../shared/models';

@Injectable()
export class AuthorService {
  private path: string = 'authors';

  /**
   * As authors are not going to change frequently, caching them.
   */
  private lstAuthors: any[];

  constructor(private firebaseService: FirebaseService) {

  }

  get(pagination?: Pagination) {
    return new Promise((resolve, reject) => {
      if (this.lstAuthors && this.lstAuthors.length) {
        resolve(this.lstAuthors);
      } else {
        this.firebaseService.getListOnce(this.path, pagination).then((lstAuthors) => {
          this.lstAuthors = lstAuthors;
          resolve(lstAuthors);
        }, (error) => {
          reject(error);
        });
      }
    });
  }

  getAuthorById(authorId: number): Promise<any> {
    return this.get().then((lstAuthors: any[]) => {
      return lstAuthors.filter(item => item.id === authorId)[0];
    });
  }

  getNameById(authorId: number): Promise<string> {
    return this.getAuthorById(authorId).then((author) => {
      return author.name;
    });
  }
}
