import { Routes } from '@angular/router';
import { ListAllBreedsComponent } from './dogs/components/list-all-breeds/list-all-breeds.component';
import { BrowseBreedComponent } from './dogs/components/browse-breed/browse-breed.component';

export const routes: Routes = [
  { path: 'browse-breed', component: BrowseBreedComponent },
  { path: '', pathMatch: 'full', component: ListAllBreedsComponent },
];
