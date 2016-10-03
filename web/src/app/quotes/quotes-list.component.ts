import { Component, OnInit, Input } from '@angular/core';

import { QuotesListVM } from './quotes-list.view-model';

@Component({
  selector: 'quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss'],
  providers: [QuotesListVM]
})
export class QuotesListComponent implements OnInit {

  // private isInit: boolean = false;

  // private _authorId: number;

  // private _categoryId: number;

  // @Input()
  // set authorId(authorId: number) {
  //   if (authorId) {
  //     this._authorId = authorId;
  //   }
  // }

  // @Input()
  // set categoryId(categoryId: number) {
  //   if (categoryId) {

  //   }
  // }

  constructor(public vm: QuotesListVM) { }

  ngOnInit() {
    this.vm.loadQuotes();
  }
}
