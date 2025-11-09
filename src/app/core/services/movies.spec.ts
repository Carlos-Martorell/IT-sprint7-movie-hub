import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MovieService } from './movies';


const httpClientMock = {
  get: jasmine.createSpy('get')  
};


const moviesMock = {
  page: 1,
  results: [
    {
      id: 550,
      title: 'Fight Club',
      poster_path: '/test.jpg',
      vote_average: 8.4,
      release_date: '1999-10-15',
      overview: 'Test overview'
    },
    {
      id: 551,
      title: 'Inception',
      poster_path: '/test2.jpg',
      vote_average: 8.8,
      release_date: '2010-07-16',
      overview: 'Test overview 2'
    }
  ],
  total_pages: 10,
  total_results: 200
};

const movieDetailMock = {
  id: 550,
  title: 'Fight Club',
  overview: 'An insomniac office worker...',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.4,
  runtime: 139,
  release_date: '1999-10-15',
  budget: 63000000,
  revenue: 100853753
};

const similarMoviesMock = {
  results: [
    { id: 551, title: 'Similar Movie 1', poster_path: '/similar1.jpg' },
    { id: 552, title: 'Similar Movie 2', poster_path: '/similar2.jpg' }
  ]
};

const creditsMock = {
    cast: [
    { id: 287, name: 'Brad Pitt', character: 'Tyler Durden', profile_path: '/brad.jpg' },
    { id: 819, name: 'Edward Norton', character: 'The Narrator', profile_path: '/edward.jpg' }
    ]
};

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        { provide: HttpClient, useValue: httpClientMock }  
      ]
    });
    service = TestBed.inject(MovieService);
    
});

  // ✅ Test 1: El servicio se crea
  it('Deberia crearse', () => {
    expect(service).toBeTruthy();
  });

  // ✅ Test 2: getPopularMovies hace la llamada HTTP
  it('El metodo "getPopularMovies" deberia retornar el listado de peliculas populares', (done: DoneFn) => {
    // 🎬 Configuramos el mock para devolver datos
    httpClientMock.get.and.returnValue(of(moviesMock));

    // 🚀 Ejecutamos el método
    service.getPopularMovies(1).subscribe(response => {
      // ✅ Verificaciones
      expect(httpClientMock.get).toHaveBeenCalled();
      expect(response.results.length).toBe(2);
      expect(response.results[0].title).toBe('Fight Club');
      expect(response.results[1].title).toBe('Inception');
      done();  // 🏁 Test asíncrono terminado
    });
  });

  // ✅ Test 3: getMovieById retorna detalle de película
  it('El metodo "getMovieById" deberia retornar el detalle de una pelicula', (done: DoneFn) => {
    httpClientMock.get.and.returnValue(of(movieDetailMock));

    service.getMovieById(550).subscribe(movie => {
      expect(httpClientMock.get).toHaveBeenCalled();
      expect(movie.id).toBe(550);
      expect(movie.title).toBe('Fight Club');
      expect(movie.runtime).toBe(139);
      done();
    });
  });

  // ✅ Test 4: getMovieSimilars retorna películas similares
  it('El metodo "getMovieSimilars" deberia retornar peliculas similares', (done: DoneFn) => {
    httpClientMock.get.and.returnValue(of(similarMoviesMock));

    service.getMovieSimilars(550).subscribe(response => {
      expect(httpClientMock.get).toHaveBeenCalled();
      expect(response.results.length).toBe(2);
      expect(response.results[0].title).toBe('Similar Movie 1');
      done();
    });
  });

  // ✅ Test 5: getMovieCredits retorna actores
  it('El metodo "getMovieCredits" deberia retornar el reparto de la pelicula', (done: DoneFn) => {
  

    httpClientMock.get.and.returnValue(of(creditsMock));

    service.getMovieCredits(550).subscribe(credits => {
      expect(httpClientMock.get).toHaveBeenCalled();
      expect(credits.cast.length).toBe(2);
      expect(credits.cast[0].name).toBe('Brad Pitt');
      expect(credits.cast[1].character).toBe('The Narrator');
      done();
    });
  });
});
