import { RouterModule, Routes } from '@angular/router';

import { QuotesComponent } from './quotes.component';
import { AllQuotesComponent } from './all-quotes/all-quotes.component';
import { QuotesByComponent } from './quotes-by/quotes-by.component';

const quotesRoutes: Routes = [
  { path: 'quotes', component: QuotesComponent },
  { path: 'quotes/:quotesBy', component: QuotesComponent },
  { path: 'quotes/:quotesBy/:entityId', component: QuotesComponent },
];

export const quotesRouting = RouterModule.forChild(quotesRoutes);
