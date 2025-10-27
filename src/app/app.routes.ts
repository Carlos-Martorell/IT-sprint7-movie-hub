import { Routes } from '@angular/router';
import { MovieListComponent } from './features/movies/movie-list/movie-list';
import { MovieDetailComponent } from './features/movies/movie-detail/movie-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    component: MovieListComponent
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent
  }

];
