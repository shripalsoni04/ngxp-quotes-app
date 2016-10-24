import { ClassProvider } from '@angular/core';

import { FirebaseService } from '../firebase.service';
import { Pagination } from '../../shared/models';

export { FirebaseService } from '../firebase.service';

export class FakeFirebaseService implements FirebaseService {

  getOnce(path: string) { }
  getListOnce(path: string, pagination?: Pagination) { }
  filterOnce(path: string, filterBy: string, filterValue: any) { }
  initializeFirebase(config: any) { }
}

export let fakeFirebaseServiceProvider: ClassProvider = {
  provide: FirebaseService,
  useClass: FakeFirebaseService
};
