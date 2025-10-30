
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '@core/models/movie';
import { MovieService } from '@core/services/movies';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieListComponent implements OnInit {
  @ViewChild('scrollTrigger') scrollTrigger?: ElementRef;


  private readonly movieService = inject(MovieService);
  private readonly router = inject(Router);

  movies = signal<Movie[]>([]);
  loading = signal<boolean>(true);
  currentPage = signal<number>(1);
  loadingMore = signal<boolean>(false);
  totalPages = signal<number>(1);
  hasMore = signal<boolean>(true);

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading.set(true);

    this.movieService.getPopularMovies(this.currentPage()).subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.totalPages.set(response.total_pages);
        this.hasMore.set(this.currentPage() < response.total_pages);
        this.loading.set(false);

      },
      error: (error) => {

        this.loading.set(false);
      }
    });
  }


  loadMore(): void {
    if (this.loadingMore() || !this.hasMore()) return;

    this.loadingMore.set(true);
    this.currentPage.update(page => page + 1);

    this.movieService.getPopularMovies(this.currentPage()).subscribe({
      next: (response) => {

        this.movies.update(current => [...current, ...response.results]);
        this.hasMore.set(this.currentPage() < response.total_pages);
        this.loadingMore.set(false);
      },
      error: (error) => {

        this.loadingMore.set(false);
      }
    });
  }

  setupIntersectionObserver(): void {

    setTimeout(() => {
      if (!this.scrollTrigger) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !this.loadingMore() && this.hasMore()) {
            this.loadMore();
          }
        },
        {
          rootMargin: '200px' 
        }
      );

      observer.observe(this.scrollTrigger.nativeElement);
    }, 100);
  }


  getImageUrl(posterPath: string | null): string {
    if (!posterPath) {
      return 'https://via.placeholder.com/500x750?text=Sin+imagen';
    }
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  goToDetail(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }

}
