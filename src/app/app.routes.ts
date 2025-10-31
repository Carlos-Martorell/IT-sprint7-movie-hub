import { Routes } from '@angular/router';
import { MovieListComponent } from '@ft/movies/movie-list/movie-list';
import { MovieDetailComponent } from '@ft/movies/movie-detail/movie-detail';
import { HomeComponent } from './features/home/home/home';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
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
