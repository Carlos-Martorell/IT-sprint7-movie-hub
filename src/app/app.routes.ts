import { Routes } from '@angular/router';
import { MovieListComponent } from './features/movies/movie-list/movie-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    component: MovieListComponent
  }
];
