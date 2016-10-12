import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  navMenu = [
    { name: 'All Quotes', commands: ['quotes'] },
    { name: 'Quotes By Author', commands: ['quotes', 'author'] },
    { name: 'Quotes By Categories', commands: ['quotes', 'category'] },
    { name: 'My Favourites', commands: ['quotes', 'favourites'] },
    { name: 'My Quotes', commands: ['my-quotes'] }
  ];

  title: string;

  constructor(private appService: AppService) {
    this.appService.title.subscribe((title) => {
      this.title = title;
    })
  }
}
