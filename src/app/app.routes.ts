import { Routes } from '@angular/router';
import { ListAllBreedsComponent } from './dogs/components/list-all-breeds/list-all-breeds.component';
import { BrowseBreedComponent } from './dogs/components/browse-breed/browse-breed.component';
import { RandomImageComponent } from './dogs/components/random-image/random-image.component';

export const routes: Routes = [
  { path: 'browse-breed', component: BrowseBreedComponent },
  { path: 'random', component: RandomImageComponent },
  { path: '', pathMatch: 'full', component: ListAllBreedsComponent },
];
