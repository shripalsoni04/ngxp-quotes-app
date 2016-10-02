import { Injectable } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';
import { Pagination } from '../../models/pagination';

@Injectable()
export class CategoryService {
  private path: string = 'categories';

  constructor(private firebaseService: FirebaseService) {

  }

  get(pagination?: Pagination) {
    return this.firebaseService.getOnce(this.path, pagination);
  }
}
