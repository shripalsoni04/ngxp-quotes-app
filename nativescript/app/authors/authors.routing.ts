import { RouterModule, Routes } from '@angular/router';

import { AuthorsListComponent } from './authors-list.component';

const authorsRoutes: Routes = [
  { path: 'authors', component: AuthorsListComponent }
];

export const authorsRouting = RouterModule.forRoot(authorsRoutes);
