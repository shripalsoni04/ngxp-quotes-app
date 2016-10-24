import { Injectable } from '@angular/core';

import { StorageService } from '../../x-shared/app/core';

@Injectable()
export class LocalStorageService extends StorageService {

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
