import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieResponse } from '../models/movie';
import { MovieDetail } from '../models/movie-detail';
import { MovieCredits } from '../models/movie-credits';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.tmdbBaseUrl;
  private readonly API_KEY = environment.tmdbApiKey;

  getPopularMovies(page: number = 1): Observable<MovieResponse> {
    const url = `${this.API_URL}/movie/popular`;
    const params = {
      api_key: this.API_KEY,
      language: 'es-ES',
      page: page.toString()
    };

    return this.http.get<MovieResponse>(url, { params });
  }

  getMovieById(id: number): Observable<MovieDetail> {
    const url = `${this.API_URL}/movie/${id}`;
    const params = {
      api_key: this.API_KEY,
      language: 'es-ES'
    };

    return this.http.get<MovieDetail>(url, { params });
  }


  getMovieCredits(id: number): Observable<MovieCredits> {
    
    const url = `${this.API_URL}/movie/${id}/credits`;
    const params = {
      api_key: this.API_KEY,
      language: 'es-ES'
    };

    return this.http.get<MovieCredits>(url,{params})

  }

 

}
