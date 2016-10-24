/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  RouterOutletStubComponent, RouterLinkStubDirective, click
} from '../testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppService } from './app.service';


let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutletStubComponent,
        RouterLinkStubDirective
      ],
      imports: [
        SharedModule
      ],
      providers: [
        AppService
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;
  });

  it('should create the app component', async(() => {
    expect(comp).not.toBeNull();
  }));

  it('should set title in layout header', async(() => {
    let appService: AppService = TestBed.get(AppService);
    let titleEle = fixture.debugElement.query(By.css('mdl-layout-title')).nativeElement;

    appService.setTitle('All Quotes');
    fixture.detectChanges();
    expect(titleEle.textContent).toEqual('All Quotes');
  }));

  it('should set page title', async(() => {
    let appService: AppService = TestBed.get(AppService);
    let titleService: Title = fixture.debugElement.injector.get(Title);
    let setTitleSpy = spyOn(titleService, 'setTitle');

    appService.setTitle('All Quotes');
    expect(setTitleSpy.calls.first().args[0]).toEqual('All Quotes');
  }));

  it('should create dynamic navigation links ', async(() => {
    let totalNavLinks = comp.navMenu.length;
    fixture.detectChanges();
    let navLinksEle = fixture.debugElement.queryAll(By.css('.mdl-navigation__link')).length;
    expect(navLinksEle).toEqual(totalNavLinks);
  }));

  routerLinkTests();
});

function routerLinkTests() {
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  describe('template', () => {
    beforeEach(() => {
      // trigger initial data binding
      fixture.detectChanges();

      // find DebugElements with an attached RouterLinkStubDirective
      linkDes = fixture.debugElement
        .queryAll(By.directive(RouterLinkStubDirective));

      // get the attached link directive instances using the DebugElement injectors
      links = linkDes
        .map(de => de.injector.get(RouterLinkStubDirective));
    });

    it('should set RouterLinks', () => {
      expect(links[0].linkParams).toEqual(['/quotes'], '1st link should go to All Quotes');
    });

    it('should have clickable My Quotes link and should navigate to that page on click', () => {
      const myQuotesLinkDe = linkDes[4];
      const myQuotesLink = links[4];

      expect(myQuotesLink.navigatedTo).toBeNull('link should not have navigated yet');
      click(myQuotesLinkDe);
      fixture.detectChanges();
      expect(myQuotesLink.navigatedTo).toEqual(['/my-quotes']);
    });
  });
}
