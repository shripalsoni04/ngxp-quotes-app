import { Injectable } from '@angular/core';

import * as firebase from 'nativescript-plugin-firebase';

import { Pagination } from '../x-shared/app/shared';
import { FirebaseService } from '../x-shared/app//core';

@Injectable()
export class NativeFirebaseService extends FirebaseService {
  constructor() {
    super();
    this.initializeFirebase({
      persist: false
    });
  }

  getOnce(path: string, pagination?: Pagination) {
    let startAt, endAt;

    let options: firebase.QueryOptions = {
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.KEY
      }
    };

    if (pagination) {
      startAt = (pagination.page - 1) * pagination.size;
      endAt = pagination.page * pagination.size - 1;
      options.ranges = [
        {
          type: firebase.QueryRangeType.START_AT,
          value: startAt.toString()
        },
        {
          type: firebase.QueryRangeType.END_AT,
          value: endAt.toString()
        }
      ];
    }

    return new Promise((resolve, reject) => {
      firebase.query(
        (result: any) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result.value);
          }
        },
        path,
        options
      );
    });
  }

  filterOnce(path: string, filterBy: string, filterValue: any) {

    let options: firebase.QueryOptions = {
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.CHILD,
        value: filterBy
      },
      range: {
        type: firebase.QueryRangeType.EQUAL_TO,
        value: filterValue
      }
    }

    return new Promise((resolve, reject) => {
      firebase.query(
        (result: any) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result.value);
          }
        },
        path,
        options
      );
    });
  }

  initializeFirebase(config?: any) {
    firebase.init(config);
  }
}
