import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  constructor() { }

  isSmallScreen() {
    return window.innerWidth <= 580;
  }
}
