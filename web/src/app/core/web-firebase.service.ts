import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { Pagination } from '../../x-shared/app/shared';
import { FirebaseService } from '../../x-shared/app/core';

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

  getOnce(path: string) {
    let query: firebase.database.Query;

    query = firebase.database().ref(path).orderByKey()

    return query.once('value').then((snapshot) => {
      return snapshot.val();
    });
  }

  getListOnce(path: string, pagination?: Pagination) {
    let query: firebase.database.Query, startAt, endAt;

    query = firebase.database().ref(path).orderByKey()

    if (pagination) {
      startAt = (pagination.page - 1) * pagination.size;
      endAt = pagination.page * pagination.size - 1;

      query = query.startAt(startAt.toString())
        .endAt(endAt.toString());
    }

    return query.once('value').then((snapshot) => {
      return this.prepareResultListFromSnapshot(snapshot);
    });
  }

  filterOnce(path: string, filterBy: string, filterValue: any) {
    return firebase.database()
      .ref(path)
      .orderByChild(filterBy)
      .equalTo(filterValue)
      .once('value')
      .then((snapshot) => {
        return this.prepareResultListFromSnapshot(snapshot);
      });
  }

  initializeFirebase(config: any) {
    firebase.initializeApp(config);
  }

  private prepareResultListFromSnapshot(snapshot) {
    let lstData = [];
    snapshot.forEach(function (item) {
      lstData.push(item.val());
    });
    return lstData;
  }
}
