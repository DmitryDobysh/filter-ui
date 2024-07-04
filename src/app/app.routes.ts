import { Routes } from '@angular/router';
import { FiltersComponent } from './pages/filters/filters.component';

export const routes: Routes = [
  { path: '', redirectTo: 'filters', pathMatch: 'full' },
  { path: 'filters', component: FiltersComponent }
];
