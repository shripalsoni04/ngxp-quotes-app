import { FirebaseService } from '../firebase.service';
import { Pagination } from '../../shared/models';

export class FakeFirebaseService implements FirebaseService {

  getOnce(path: string) { }
  getListOnce(path: string, pagination?: Pagination) { }
  filterOnce(path: string, filterBy: string, filterValue: any) { }
  initializeFirebase(config: any) { }
}
