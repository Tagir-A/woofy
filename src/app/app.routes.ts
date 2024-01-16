import { Routes } from '@angular/router';
import { ListAllBreedsComponent } from './dogs/components/list-all-breeds/list-all-breeds.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListAllBreedsComponent },
];
