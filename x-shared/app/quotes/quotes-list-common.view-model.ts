import { QuoteService } from './quotes.service';
import { MyFavouritesService } from './my-favourites.service';
import { Pagination } from '../shared/models';
import { Subject } from 'rxjs/Subject';

export class QuotesListCommonVM {

  pagination: Pagination = new Pagination();

  protected lstQuotes: any[] = [];

  quotes$: Subject<any[]> = new Subject<any[]>();

  constructor(
    protected quotesService: QuoteService,
    protected myFavouritesService: MyFavouritesService
  ) {

  }

  getQuotes(): Promise<any> {
    return this.quotesService.get(this.pagination);
  }

  getQuotesByCategoryId(categoryId: number) {
    return this.quotesService.getByCategoryId(categoryId);
  }

  getQuotesByAuthorId(authorId: number) {
    return this.quotesService.getByAuthorId(authorId);
  }

  getFavouriteQuotes() {
    return this.myFavouritesService.getList();
  }

  getMaxPageNumber() {
    return Math.ceil(this.pagination.count / this.pagination.size);
  }

  loadQuotes() {
    this.getQuotes().then((result) => {
      this.pagination.count = result.count;
      this.loadQuotesInList(result.lstQuotes);
    });
    return this.quotes$;
  }

  loadNextPage() {
    this.pagination.page += 1;
    return this.loadQuotes();
  }

  loadQuotesByAuthorId(authorId: number) {
    this.lstQuotes.length = 0;
    this.getQuotesByAuthorId(authorId).then(this.loadQuotesInList.bind(this));
    return this.quotes$;
  }

  loadQuotesByCategoryId(categoryId: number) {
    this.lstQuotes.length = 0;
    this.getQuotesByCategoryId(categoryId).then(this.loadQuotesInList.bind(this));
    return this.quotes$;
  }

  loadFavouriteQuotes() {
    this.lstQuotes.length = 0;
    this.getFavouriteQuotes().then(this.loadQuotesInList.bind(this));
    return this.quotes$;
  }

  loadQuotesByCriteria(quotesBy: 'category' | 'author' | 'all' | 'favourites', id?: number): Subject<any> {
    let subject;
    if (quotesBy === 'all') {
      subject = this.loadQuotes();
    } else if (quotesBy === 'author' && id) {
      subject = this.loadQuotesByAuthorId(+id);
    } else if (quotesBy === 'category' && id) {
      subject = this.loadQuotesByCategoryId(+id);
    } else if (quotesBy === 'favourites') {
      subject = this.loadFavouriteQuotes();
    }
    return subject;
  }

  /**
   * Toggles quote's favourite status and as per that do changes in local database.
   * If toggleFav is called from favourite quotes' list, then it also removes
   * the quote from quotes' list..
   */
  toggleFav(quote: any, quotesBy: 'category' | 'author' | 'all' | 'favourites') {
    if (quote.isFavourite) {
      return this.myFavouritesService.removeFromFavourite(quote).then(() => {
        if (quotesBy === 'favourites') {
          this.removeQuoteFromList(quote);
        }
        return quote;
      });
    } else {
      return this.myFavouritesService.addToFavourites(quote);
    }
  }

  /**
   * Sets quotes favourite status and loads the quotes into the list.
   */
  private loadQuotesInList(lstQuotes: any[]) {
    Array.prototype.push.apply(this.lstQuotes, lstQuotes);
    this.quotes$.next(this.lstQuotes);
  }

  private removeQuoteFromList(quote: any) {
    this.lstQuotes.splice(this.lstQuotes.indexOf(quote), 1);
  }
}
