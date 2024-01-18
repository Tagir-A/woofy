import { Routes } from '@angular/router';
import { ListAllBreedsComponent } from './dogs/components/list-all-breeds/list-all-breeds.component';
import { BrowseBreedComponent } from './dogs/components/browse-breed/browse-breed.component';
import { RandomImageComponent } from './dogs/components/random-image/random-image.component';
import { ByBreedComponent } from './dogs/components/by-breed/by-breed.component';
import { BySubbreedComponent } from './dogs/components/by-subbreed/by-subbreed.component';

export const routes: Routes = [
  { path: 'browse-breed', component: BrowseBreedComponent },
  { path: 'by-breed', component: ByBreedComponent },
  { path: 'by-subbreed', component: BySubbreedComponent },
  { path: 'random', component: RandomImageComponent },
  { path: '', pathMatch: 'full', component: ListAllBreedsComponent },
];
