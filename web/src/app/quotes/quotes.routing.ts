import { RouterModule, Routes } from '@angular/router';
import { QuotesComponent } from './quotes.component';

const quotesRoutes: Routes = [
  { path: 'quotes', component: QuotesComponent },
  { path: 'quotes/:quotesBy', component: QuotesComponent }
];

export const quotesRouting = RouterModule.forChild(quotesRoutes);
