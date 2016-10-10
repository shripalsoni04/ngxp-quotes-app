import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'quotes-by',
  templateUrl: 'quotes/quotes-by/quotes-by.component.html',
  styleUrls: ['quotes/quotes-by/quotes-by.component.css']
})
export class QuotesByComponent implements OnInit {

  /**
   * Route parameter.
   */
  quotesBy: string = 'all';

  /**
   * Author/Category Id
   */
  entityId: number;

  title: string = 'Quotes By';

  constructor(
    private route: ActivatedRoute,
    private routerExptension: RouterExtensions
  ) {

  }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.quotesBy = params['quotesBy'] || 'all';
    this.entityId = params['entityId'];
  }

  goBack() {
    this.routerExptension.backToPreviousPage();
  }
}
