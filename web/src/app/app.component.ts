import { Component, ViewContainerRef } from '@angular/core';

import {
  MdlDialogOutletService
} from 'angular2-mdl/components/dialog-outlet/mdl-dialog-outlet.service';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  navMenu = [
    { name: 'All Quotes', commands: ['/quotes'] },
    { name: 'Quotes By Author', commands: ['/quotes', 'author'] },
    { name: 'Quotes By Categories', commands: ['/quotes', 'category'] },
    { name: 'My Favourites', commands: ['/quotes', 'favourites'] },
    { name: 'My Quotes', commands: ['/my-quotes'] }
  ];

  title: string;

  constructor(
    private appService: AppService,
    private viewContainerRef: ViewContainerRef,
    private mdlDialogOutletService: MdlDialogOutletService) {
    this.appService.title.subscribe((title) => {
      this.title = title;
    });

    // This is a temporary workaround for issue https://github.com/mseemann/angular2-mdl/issues/147
    // TODO: Remove this from here and put <dialog-outlet> in app.component.html once its issue
    // with router is resolved.
    this.mdlDialogOutletService.setDefaultViewContainerRef(this.viewContainerRef);
  }
}
