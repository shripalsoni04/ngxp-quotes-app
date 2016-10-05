import { Pagination } from '../shared/models';

export abstract class FirebaseService {
  abstract getOnce(path: string);
  abstract getListOnce(path: string, pagination?: Pagination);
  abstract filterOnce(path: string, filterBy: string, filterValue: any);
  abstract initializeFirebase(config: any): void;
}
