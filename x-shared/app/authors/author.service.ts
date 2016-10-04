import { Injectable } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';
import { Pagination } from '../shared/models';

@Injectable()
export class AuthorService {
  private path: string = 'authors';

  constructor(private firebaseService: FirebaseService) {

  }

  get(pagination?: Pagination) {
    return this.firebaseService.getOnce(this.path, pagination);
  }
}
