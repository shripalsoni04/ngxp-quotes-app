import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {

  private title$: Subject<string> = new Subject<string>();

  title: Observable<string> = this.title$.asObservable();

  constructor() { }

  setTitle(title: string) {
    this.title$.next(title);
  }
}
