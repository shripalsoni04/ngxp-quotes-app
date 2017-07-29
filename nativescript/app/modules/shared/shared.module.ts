import { NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { TNSFontIconModule, TNSFontIconPipe } from 'nativescript-ngx-fonticon';
import { SIDEDRAWER_DIRECTIVES } from 'nativescript-telerik-ui/sidedrawer/angular';

import { NGXPSideDrawerComponent } from './side-drawer.component';
import { BorderlessBtnDirective } from './borderless-btn.directive';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    TNSFontIconModule
  ],
  declarations: [
    NGXPSideDrawerComponent,
    SIDEDRAWER_DIRECTIVES,
    NGXPSideDrawerComponent,
    BorderlessBtnDirective
  ],
  exports: [
    NGXPSideDrawerComponent,
    NGXPSideDrawerComponent,
    BorderlessBtnDirective,
    TNSFontIconPipe
  ]
})
export class SharedModule { }
