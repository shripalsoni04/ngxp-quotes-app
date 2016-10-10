import { Injectable } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';
import { Pagination } from '../shared/models';

@Injectable()
export class CategoryService {
  private path: string = 'categories';

  /**
   * As categories are not going to change frequently, caching them.
   */
  private lstCategories: any[];

  constructor(private firebaseService: FirebaseService) {

  }

  get(pagination?: Pagination) {
    return new Promise((resolve, reject) => {
      if (this.lstCategories && this.lstCategories.length) {
        // using timeout to let code run in ngZone.
        setTimeout(() => {
          resolve(this.lstCategories);
        })
      } else {
        this.firebaseService.getListOnce(this.path, pagination).then((lstCategories) => {
          this.lstCategories = lstCategories;
          resolve(lstCategories);
        }, (error) => {
          reject(error);
        });
      }
    });
  }

  getNameById(categoryId: number) {
    let category = this.lstCategories.filter(item => item.id === categoryId)[0];
    return category.name;
  }
}
