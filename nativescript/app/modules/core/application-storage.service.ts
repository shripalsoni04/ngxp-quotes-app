import { Injectable } from '@angular/core';

import { StorageService } from '../../x-shared/app/core';

import * as appSettings from 'application-settings';

@Injectable()
export class ApplicationStorageService extends StorageService {

  getItem(key: string) {
    return appSettings.getString(key);
  }

  setItem(key: string, value: any) {
    return appSettings.setString(key, value);
  }

  removeItem(key: string) {
    return appSettings.remove(key);
  }
}
