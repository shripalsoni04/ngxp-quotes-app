import { NgModule } from '@angular/core';

import { FirebaseService, StorageService } from '../../x-shared/app/core';

import { WebFirebaseService } from './web-firebase.service';
import { LocalStorageService } from './local-storage.service';
import { LocalDatabaseService } from '../../x-shared/app/core/local-database.service';
import { UtilityService } from './utility.service';
import { DISABLE_NATIVE_VALIDITY_CHECKING } from 'angular2-mdl';

@NgModule({
  providers: [
    WebFirebaseService,
    LocalStorageService,
    LocalDatabaseService,
    UtilityService,
    { provide: FirebaseService, useExisting: WebFirebaseService },
    { provide: StorageService, useExisting: LocalStorageService },
    // disabling native browser validations and keeping all validation stuff
    // with angular only to avoid weird behaviour of mdl components.
    { provide: DISABLE_NATIVE_VALIDITY_CHECKING, useValue: true }
  ],
})
export class CoreModule { }
