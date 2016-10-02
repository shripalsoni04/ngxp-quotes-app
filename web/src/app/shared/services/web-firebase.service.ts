import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { Pagination } from '../../../x-shared/models';
import { FirebaseService } from '../../../x-shared/app/core/firebase.service';

@Injectable()
export class WebFirebaseService extends FirebaseService {
  constructor() {
    super();

    const config = {
      apiKey: 'AIzaSyAyqaNzMgUki_CNomeoCvGA7hMBrcip2bg',
      authDomain: 'ngxp-quotes-app.firebaseapp.com',
      databaseURL: 'https://ngxp-quotes-app.firebaseio.com'
    };

    this.initializeFirebase(config);
  }

  getOnce(path: string, pagination?: Pagination) {
    let dbRef: firebase.database.Reference, startAt, endAt;

    dbRef = firebase.database().ref(path);

    if (pagination) {
      startAt = (pagination.page - 1) * pagination.size;
      endAt = pagination.page * pagination.size;
      dbRef.orderByKey()
        .startAt(startAt.toString())
        .endAt(endAt.toString());
    }

    return dbRef.once('value').then((snapshot) => {
      return snapshot.val();
    });
  }

  filterOnce(path: string, filterBy: string, filterValue: any) {
    return firebase.database()
      .ref(path)
      .orderByChild(filterBy)
      .equalTo(filterValue)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });
  }

  initializeFirebase(config: any) {
    firebase.initializeApp(config);
  }
}
