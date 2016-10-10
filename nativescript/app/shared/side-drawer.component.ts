import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

import { Page } from 'ui/page';
import { isAndroid, isIOS } from 'platform';
import { ActionItem } from 'ui/action-bar';
import {
  RadSideDrawerComponent, SideDrawerType
} from 'nativescript-telerik-ui/sidedrawer/angular';
import {
  PushTransition, SlideInOnTopTransition
} from 'nativescript-telerik-ui/sidedrawer';

@Component({
  selector: 'ngxp-side-drawer',
  templateUrl: 'shared/side-drawer.component.html',
  styleUrls: ['shared/side-drawer.component.css']
})
export class NGXPSideDrawerComponent implements AfterViewInit {
  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;

  /**
   * On tap of any side-drawer item, hiding content if this flag is true.
   */
  isContentVisible: boolean = true;

  /**
   * For android using SlideOnTop transition and for iOS, push transition.
   */
  drawerTransition: any;

  private drawer: SideDrawerType;

  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private page: Page
  ) {
    this.setActionBarIcon(this.page);
    this.setDrawerTransition();
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  toggleSideDrawer() {
    this.drawer.toggleDrawerState();
  }

  navigateTo(routeCommands: any[]) {
    this.drawer.closeDrawer();
    let currentUrl = this.activatedRoute.snapshot.url.toString();

    // as main navigation has simple urls, comparing only first part of the
    // route command. For any complex url (ie. url with parameter), this logic
    // will not work)
    if (currentUrl !== routeCommands[0].substring(1)) {
      this.isContentVisible = false;

      // starting navigation after drawer is closed.
      setTimeout(() => {
        this.routerExtensions.navigate(routeCommands,
          {
            clearHistory: true,
            animated: false
          });
        this.isContentVisible = true;
      }, 300);
    }
  }

  private setDrawerTransition() {
    if (isAndroid) {
      this.drawerTransition = new SlideInOnTopTransition();
    }

    if (isIOS) {
      this.drawerTransition = new PushTransition();
    }
  }

  private setActionBarIcon(page: Page) {
    if (isAndroid) {
      page.actionBar.navigationButton = this.getNavigationButton();
    }

    if (isIOS) {
      page.actionBar.actionItems.addItem(this.getNavigationButton());
    }
  }

  private getNavigationButton() {
    let navActionItem = new ActionItem();
    navActionItem.icon = 'res://ic_menu_black';
    if (navActionItem.ios) {
      navActionItem.ios.position = 'left';
    }
    navActionItem.on('tap', this.toggleDrawer.bind(this));
    return navActionItem;
  }

  private toggleDrawer() {
    this.drawer.toggleDrawerState();
  }
}
