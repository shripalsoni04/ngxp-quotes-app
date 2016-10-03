import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'quotes' }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
