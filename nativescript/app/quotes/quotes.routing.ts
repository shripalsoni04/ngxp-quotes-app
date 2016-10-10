import { RouterModule, Routes } from '@angular/router';

import { AllQuotesComponent } from './all-quotes/all-quotes.component';
import { QuotesByComponent } from './quotes-by/quotes-by.component';

const quotesRoutes: Routes = [
  { path: 'quotes', component: AllQuotesComponent },
  { path: 'quotes/:quotesBy/:entityId', component: QuotesByComponent },
];

export const quotesRouting = RouterModule.forChild(quotesRoutes);
