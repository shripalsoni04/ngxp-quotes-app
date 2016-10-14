import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterExtensions } from 'nativescript-angular/router';

import { AuthorService } from '../x-shared/app/authors/author.service';
import { CategoryService } from '../x-shared/app/categories/category.service';

@Component({
  selector: 'quotes',
  templateUrl: 'quotes/quotes.component.html',
  styleUrls: ['quotes/quotes.component.css']
})
export class QuotesComponent implements OnInit {

  /**
   * Route parameter.
   */
  quotesBy: string = 'all';

  /**
   * Author/Category Id
   */
  entityId: number;

  title: string = 'Quotes';

  constructor(
    private route: ActivatedRoute,
    private routerExptension: RouterExtensions,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.quotesBy = params['quotesBy'] || 'all';
      this.entityId = params['entityId'];
      this.setTitle();
    });
    // let params = this.route.snapshot.params;
    // this.quotesBy = params['quotesBy'] || 'all';
    // this.entityId = params['entityId'];
    // console.log('quotes parameters are ', this.quotesBy, this.entityId);
  }

  goBack() {
    this.routerExptension.backToPreviousPage();
  }

  private setTitle() {
    if (this.quotesBy === 'author') {
      this.authorService.getNameById(+this.entityId).then((authorName) => {
        this.title = authorName;
      });
    } else if (this.quotesBy === 'category') {
      this.categoryService.getNameById(+this.entityId).then((categoryName) => {
        this.title = categoryName;
      });
    } else if (this.quotesBy === 'favourites') {
      this.title = 'Favourites';
    } else {
      this.title = 'Quotes';
    }
  }
}
