import { Injectable } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';
import { Pagination } from '../../models/pagination';

@Injectable()
export class QuoteService {
  private path: string = 'quotes';

  constructor(private firebaseService: FirebaseService) {

  }

  get(pagination?: Pagination) {
    return this.firebaseService.getOnce(this.path, pagination);
  }

  getByAuthorId(authorId: number) {
    return this.firebaseService.filterOnce(this.path, 'authorId', authorId);
  }

  getByCategoryId(categoryId: number) {
    return this.firebaseService.filterOnce(this.path, 'categoryId', categoryId);
  }
}
