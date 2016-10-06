import { RouterModule, Routes } from '@angular/router';

import { QuotesListComponent } from './quotes-list.component';

const quotesRoutes: Routes = [
  { path: 'quotes', component: QuotesListComponent },
  { path: 'quotes/:quotesBy/:id', component: QuotesListComponent }
];

export const quotesRouting = RouterModule.forChild(quotesRoutes);
