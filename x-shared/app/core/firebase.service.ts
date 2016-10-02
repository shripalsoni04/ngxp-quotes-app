import { Pagination } from '../../models';
import * as firebase from 'firebase';

export abstract class FirebaseService {
  abstract getOnce(path: string, pagination?: Pagination): firebase.Thenable<any>;
  abstract filterOnce(path: string, filterBy: string, filterValue: any): firebase.Thenable<any>;
  abstract initializeFirebase(config: any): void;
}
