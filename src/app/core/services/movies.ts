import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieResponse } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.tmdbBaseUrl;
  private readonly API_KEY = environment.tmdbApiKey;

  /**
   * Obtiene películas populares con paginación
   * @param page Número de página (por defecto 1)
   */
  getPopularMovies(page: number = 1): Observable<MovieResponse> {
    const url = `${this.API_URL}/movie/popular`;
    const params = {
      api_key: this.API_KEY,
      language: 'es-ES',
      page: page.toString()
    };

    return this.http.get<MovieResponse>(url, { params });
  }
}
