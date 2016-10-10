import { NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SIDEDRAWER_DIRECTIVES } from 'nativescript-telerik-ui/sidedrawer/angular';
import { NGXPSideDrawerComponent } from './side-drawer.component';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule
  ],
  declarations: [
    NGXPSideDrawerComponent,
    SIDEDRAWER_DIRECTIVES
  ],
  exports: [NGXPSideDrawerComponent]
})
export class SharedModule { }
