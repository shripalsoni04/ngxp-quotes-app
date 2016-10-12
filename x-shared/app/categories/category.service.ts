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

  getCategoryById(categoryId: number): Promise<any> {
    return this.get().then((lstCategories: any[]) => {
      return lstCategories.filter(item => item.id === categoryId)[0];
    });
  }


  getNameById(categoryId: number) {
    return this.getCategoryById(categoryId).then((category) => {
      return category.name;
    });
  }
}
