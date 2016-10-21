import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { MyQuoteModel, NewQuoteCommonVM } from '@xapp/my-quotes';
import { UtilityService } from '../../core/utility.service';

@Component({
  selector: 'new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.scss'],
  providers: [NewQuoteCommonVM]
  // TODO: Enable OnPush once angular2-mdl has its support.
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewQuoteComponent {

  isSmallScreen: boolean = false;

  @Input()
  set quote(quote: MyQuoteModel) {
    if (quote) {
      this.cvm.dataModel = new MyQuoteModel(quote.id, quote.body, quote.authorName);
    } else {
      this.cvm.dataModel = new MyQuoteModel();
    }
  }

  @Output() quoteSave: EventEmitter<MyQuoteModel> = new EventEmitter<MyQuoteModel>();
  @Output() formReset: EventEmitter<any> = new EventEmitter<any>();

  /**
   * A temporary flag which is used to re-create form on form reset.
   * This is a temporary solution as currently angular do not change the
   * form control state to prestine when value is reset programmatically. So
   * we are re-creating form again on resetForm action.
   */
  isActive: boolean = true;

  constructor(
    public cvm: NewQuoteCommonVM,
    private changeDetectorRef: ChangeDetectorRef,
    private utilityService: UtilityService
  ) {
    this.isSmallScreen = this.utilityService.isSmallScreen();
  }

  save(quote: MyQuoteModel) {
    this.cvm.saveQuote(quote).then((updatedQuote) => {
      this.quoteSave.emit(this.getCopy(updatedQuote));
      this.resetForm();
    });
  }

  resetForm() {
    this.isActive = false;
    this.cvm.resetForm();
    this.formReset.emit();
    setTimeout(() => {
      this.changeDetectorRef.markForCheck();
      this.isActive = true;
    });
  }

  private getCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj)); // TODO: Use Object.assign
  }
}
