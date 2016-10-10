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

        // using timeout to let code run in ngZone.
        setTimeout(() => {
          resolve(this.lstAuthors);
        })
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

  getNameById(authorId: number) {
    let author = this.lstAuthors.filter(item => item.id === authorId)[0];
    return author.name;
  }
}
