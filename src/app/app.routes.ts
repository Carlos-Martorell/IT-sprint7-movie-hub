import { Routes } from '@angular/router';
import { MovieListComponent } from '@ft/movies/movie-list/movie-list';
import { MovieDetailComponent } from '@ft/movies/movie-detail/movie-detail';
import { HomeComponent } from './features/home/home/home';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

   { 
    path: 'login', 
    component: LoginComponent 

   },

  { path: 'register', 
    component: RegisterComponent 
  },

  {
    path: 'movies',
    component: MovieListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
