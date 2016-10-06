import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.quotesBy = params['quotesBy'] || 'all';
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.authorId = queryParams['authorId'];
      this.categoryId = queryParams['categoryId'];
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
}
