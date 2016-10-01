import { Component } from '@angular/core';
import { AppVM } from './app.view-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppVM]
})
export class AppComponent {

  constructor(public vm: AppVM) {
  }
}
