import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

import {
  RadSideDrawerComponent, SideDrawerType
} from 'nativescript-telerik-ui/sidedrawer/angular';


@Component({
  selector: 'my-app',
  templateUrl: `app.component.html`
})
export class AppComponent implements AfterViewInit {

  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;

  private drawer: SideDrawerType;

  constructor(
    private routerExtensions: RouterExtensions
  ) {
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  toggleSideDrawer() {
    this.drawer.toggleDrawerState();
  }

  navigateTo(routeCommands: any){
    this.drawer.closeDrawer();
    this.routerExtensions.navigate(routeCommands);
  }
}
