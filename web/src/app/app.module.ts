import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WebFirebaseService } from './shared';
import { FirebaseService } from '../x-shared/app/core/firebase.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{provide: FirebaseService, useExisting: WebFirebaseService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
