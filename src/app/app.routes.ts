import { Routes } from '@angular/router';
import { MovieListComponent } from './src/app/features/movies/pages/movie-list/movie-list';

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
