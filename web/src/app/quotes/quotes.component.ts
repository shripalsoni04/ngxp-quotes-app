import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../app.service';
import { AuthorService } from '@xapp/authors';
import { CategoryService } from '@xapp/categories';

@Component({
  selector: 'quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  /**
   * Route parameter.
   */
  quotesBy: string = 'all';

  /**
   * Route query parameter.
   */
  authorId: number;

  /**
   * Route query parameter.
   */
  categoryId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private appService: AppService,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.quotesBy = params['quotesBy'] || 'all';
      this.setTitle();
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.authorId = +queryParams['authorId'];
      this.categoryId = +queryParams['categoryId'];
      this.setTitle();
    });
  }

  onAuthorSelect(authorId) {
    // we can just set authorId here, but to have navigation history
    // navigating the component with authorId in query parameter.
    this.router.navigate(['quotes', 'author'], {
      queryParams: { authorId: authorId }
    });
  }

  onCategorySelect(categoryId) {
    // we can just set category here, but to have navigation history
    // navigating the component with categoryId in query parameter.
    this.router.navigate(['quotes', 'category'], {
      queryParams: { categoryId: categoryId }
    });
  }

  private setTitle() {
    if (this.quotesBy === 'all') {
      this.appService.setTitle('All Quotes');
    } else if (this.quotesBy === 'author' && this.authorId) {
      this.authorService.getNameById(this.authorId).then((authorName: string) => {
        this.appService.setTitle(`Quotes by ${authorName}`);
      });
    } else if (this.quotesBy === 'category' && this.categoryId) {
      this.categoryService.getNameById(this.categoryId).then((categoryName) => {
        this.appService.setTitle(`${categoryName} Quotes`);
      });
    } else if (this.quotesBy === 'favourites') {
      this.appService.setTitle('My Favourites');
    }
  }
}
