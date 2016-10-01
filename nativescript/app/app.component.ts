import { Component } from '@angular/core';
import { AppVM } from './app.view-model';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [AppVM]
})
export class AppComponent {
  constructor(public vm: AppVM) {
  }
}
