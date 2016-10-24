import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { AuthorsListCommonVM } from '../../x-shared/app/authors';
import { UtilityService } from '../core/utility.service';

@Component({
  selector: 'authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
  providers: [AuthorsListCommonVM]
})
export class AuthorsListComponent implements OnInit {

  @Input() selectedAuthorId: number;

  @Output() authorSelect: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    public cvm: AuthorsListCommonVM,
    private utilityService: UtilityService
  ) {

  }

  ngOnInit() {
    this.cvm.loadAuthorList().subscribe(() => {
      // On small screens, not selecting first author by default, as we are
      // not showing quotes of the author besides author list because screen
      // size constraint.
      if (!this.utilityService.isSmallScreen()) {
        this.selectFirst();
      }
    });
  }

  selectAuthor(authorId: number) {
    this.selectedAuthorId = authorId;
    this.authorSelect.emit(authorId);
  }

  private selectFirst() {
    // if selectedAuthorId is set, then not selecting first record by default.
    if (!this.selectedAuthorId) {
      let firstAuthor = this.cvm.lstAuthors && this.cvm.lstAuthors[0];
      this.selectAuthor(firstAuthor.id);
    }
  }
}
