import { NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';

import {
  FirebaseService, StorageService, LocalDatabaseService
} from '../../x-shared/app/core';

import { NativeFirebaseService } from './native-firebase.service';
import { ApplicationStorageService } from './application-storage.service';

@NgModule({
  imports: [NativeScriptModule],
  providers: [
    { provide: FirebaseService, useExisting: NativeFirebaseService },
    { provide: StorageService, useExisting: ApplicationStorageService },
    NativeFirebaseService,
    ApplicationStorageService,
    LocalDatabaseService
  ],
})
export class CoreModule { }
