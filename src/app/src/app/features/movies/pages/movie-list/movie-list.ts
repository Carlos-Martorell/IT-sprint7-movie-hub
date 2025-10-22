
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '@core/models/movie';
import { MovieService } from '@core/services/movies';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieListComponent implements OnInit {
  private readonly movieService = inject(MovieService);

  // Signal para almacenar las películas
  movies = signal<Movie[]>([]);

  // Signal para saber si está cargando
  loading = signal<boolean>(true);

  // Signal para página actual
  currentPage = signal<number>(1);


  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading.set(true);

    this.movieService.getPopularMovies(this.currentPage()).subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.loading.set(false);
        console.log('Películas cargadas:', response.results);
      },
      error: (error) => {
        console.error('Error al cargar películas:', error);
        this.loading.set(false);
      }
    });
  }

  getImageUrl(posterPath: string | null): string {
    if (!posterPath) {
      return 'https://via.placeholder.com/500x750?text=Sin+imagen';
    }
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

}
