import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FirebaseService } from '@xapp/core';

import { WebFirebaseService } from './web-firebase.service';

@NgModule({
  imports: [BrowserModule],
  providers: [
    { provide: FirebaseService, useExisting: WebFirebaseService },
    WebFirebaseService
  ],
})
export class CoreModule { }
