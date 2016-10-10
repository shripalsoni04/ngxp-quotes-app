import { NgModule } from '@angular/core';

import { FirebaseService, StorageService } from '@xapp/core';

import { WebFirebaseService } from './web-firebase.service';
import { LocalStorageService } from './local-storage.service';
import { LocalDatabaseService } from '@xapp/core/local-database.service';

@NgModule({
  providers: [
    WebFirebaseService,
    LocalStorageService,
    LocalDatabaseService,
    { provide: FirebaseService, useExisting: WebFirebaseService },
    { provide: StorageService, useExisting: LocalStorageService },
  ],
})
export class CoreModule { }
