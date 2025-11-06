import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '@app/core/services/movies';
import { MovieDetail } from '@app/core/models/movie-detail';
import { Cast } from '@app/core/models/movie-credits';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetailComponent implements OnInit {
    
  @ViewChild('actorsScroll') actorsScroll?: ElementRef;
  
 

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly movieService = inject(MovieService);

  movie = signal<MovieDetail | null>(null);
  loading = signal<boolean>(true);
  backdropLoaded = signal<boolean>(false);
  actors = signal<Cast[]>([]);


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadMovieDetail(Number(id));
      this.loadMovieCredits(Number(id));
    } else {
      // Si no hay ID, volver a la lista
      this.router.navigate(['/movies']);
    }
  }

loadMovieDetail(id: number): void {
  this.loading.set(true);

  this.movieService.getMovieById(id).subscribe({
    next: (movie) => {
      this.movie.set(movie);
      this.loading.set(false);
      console.log('Película cargada:', movie);
    },
    error: (error) => {
      console.error('Error al cargar película:', error);
      this.loading.set(false);
      this.router.navigate(['/movies']);
    }
  });
}

loadMovieCredits(id: number): void {
  this.movieService.getMovieCredits(id).subscribe({
    next: (credits) => {
      this.actors.set(credits.cast);
      this.loading.set(false);
    },
    error: (error) => {
      console.error('Error al cargar actor:', error);
    }
  });
}

goBack(): void {
  this.router.navigate(['/movies']);
}

getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) {
    return 'https://via.placeholder.com/500x750?text=Sin+imagen';
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

onBackdropLoad(): void {
  this.backdropLoaded.set(true);
}
  getProductionCountries(): string {
    if (!this.movie()) return '';
    return this.movie()!
      .production_countries
      .slice(0, 2)
      .map(c => c.name)
      .join(', ');
  }

  getProductionCompanies(): string {
    if (!this.movie()) return '';
    return this.movie()!
      .production_companies
      .slice(0, 3)
      .map(c => c.name)
      .join(', ');
  }

 scrollActors(direction: 'left' | 'right'): void {
    if (!this.actorsScroll) return;
    
    const scrollAmount = 500; // 2 tarjetas (160px cada una)
    const container = this.actorsScroll.nativeElement;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }}

}
