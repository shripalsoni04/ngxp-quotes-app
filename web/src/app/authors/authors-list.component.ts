import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AuthorsListVM } from './authors-list.view-model';
import { UtilityService } from '../core/utility.service';

@Component({
  selector: 'authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
  providers: [AuthorsListVM]
})
export class AuthorsListComponent {

  @Input() selectedAuthorId: number;

  @Output() authorSelect: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    public vm: AuthorsListVM,
    private utilityService: UtilityService
  ) {
    this.vm.loadAuthorList().subscribe(() => {
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
      let firstAuthor = this.vm.lstAuthors && this.vm.lstAuthors[0];
      this.selectAuthor(firstAuthor.id);
    }
  }
}
