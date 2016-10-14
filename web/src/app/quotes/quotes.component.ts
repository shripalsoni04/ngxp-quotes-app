import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../app.service';
import { AuthorService } from '@xapp/authors';
import { CategoryService } from '@xapp/categories';
import { UtilityService } from '../core/utility.service';

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
   * Router parameter. Author/Category Id
   */
  entityId: number;

  isSmallScreen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private appService: AppService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private utilityService: UtilityService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.quotesBy = params['quotesBy'] || 'all';
      this.entityId = params['entityId'] ? +params['entityId'] : null;
      this.isSmallScreen = this.utilityService.isSmallScreen();
      this.setTitle();
    });
  }

  onAuthorSelect(authorId) {
    // we can just set authorId here, but to have navigation history
    // navigating the component with authorId in query parameter.
    this.router.navigate(['quotes', 'author', authorId]);
  }

  onCategorySelect(categoryId) {
    // we can just set category here, but to have navigation history
    // navigating the component with categoryId in query parameter.
    this.router.navigate(['quotes', 'category', categoryId]);
  }

  isShowQuotesBySection() {
    return !this.isSmallScreen || (['all', 'favourites'].indexOf(this.quotesBy) === -1 && !this.entityId);
  }

  isShowQuotesListSection() {
    return !this.isSmallScreen || this.entityId || ['all', 'favourites'].indexOf(this.quotesBy) > -1;
  }

  private setTitle() {
    if (this.quotesBy === 'all') {
      this.appService.setTitle('All Quotes');
    } else if (this.quotesBy === 'author' && this.entityId) {
      this.authorService.getNameById(this.entityId).then((authorName: string) => {
        this.appService.setTitle(
          this.isSmallScreen ? authorName : `Quotes by ${authorName}`
        );
      });
    } else if (this.quotesBy === 'author') {
      this.appService.setTitle('Authors');
    } else if (this.quotesBy === 'category' && this.entityId) {
      this.categoryService.getNameById(this.entityId).then((categoryName) => {
        this.appService.setTitle(
          this.isSmallScreen ? categoryName : `${categoryName} Quotes`
        );
      });
    } else if (this.quotesBy === 'category') {
      this.appService.setTitle('Categories');
    } else if (this.quotesBy === 'favourites') {
      this.appService.setTitle('My Favourites');
    }
  }
}
