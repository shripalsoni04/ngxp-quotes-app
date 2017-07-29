import { Component } from '@angular/core';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

import { SwissArmyKnife } from 'nativescript-swiss-army-knife';

@Component({
  selector: 'my-app',
  template: '<page-router-outlet></page-router-outlet>'
})
export class AppComponent {
  constructor(private fonticon: TNSFontIconService) {
    SwissArmyKnife.setAndroidStatusBarColor('#161d27');

    // Setting StatusBarStyle to UIBarStyleBlack for iOS.
    SwissArmyKnife.actionBarSetStatusBarStyle(1);
  }
}
