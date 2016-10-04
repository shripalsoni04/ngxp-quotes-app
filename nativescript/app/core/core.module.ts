import { NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';

import { FirebaseService } from '../x-shared/app/core';

import { NativeFirebaseService } from './native-firebase.service';

@NgModule({
  imports: [NativeScriptModule],
  providers: [
    { provide: FirebaseService, useExisting: NativeFirebaseService },
    NativeFirebaseService
  ],
})
export class CoreModule { }
