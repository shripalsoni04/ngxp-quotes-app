import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { MyQuoteModel } from '@xapp/my-quotes';
import { NewQuoteVM } from './new-quote.view-model';

@Component({
  selector: 'new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.scss'],
  providers: [NewQuoteVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewQuoteComponent {

  @Input()
  set quote(quote: MyQuoteModel) {
    if (quote) {
      this.vm.dataModel = new MyQuoteModel(quote.id, quote.body, quote.authorName);
    } else {
      this.vm.dataModel = new MyQuoteModel();
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
    public vm: NewQuoteVM,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  save(quote: MyQuoteModel) {
    this.vm.saveQuote(quote).then((updatedQuote) => {
      this.quoteSave.emit(this.getCopy(updatedQuote));
      this.resetForm();
    });
  }

  resetForm() {
    this.isActive = false;
    this.vm.resetForm();
    this.formReset.emit();
    setTimeout(() => {
      this.changeDetectorRef.markForCheck();
      this.isActive = true;
    });
  }

  private getCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
}
