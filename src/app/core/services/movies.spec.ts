import { TestBed } from '@angular/core/testing';
import {  HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient} from '@angular/common/http';
import { MovieService } from './movies';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  // 🎓 beforeEach se ejecuta ANTES de cada test
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
    //   imports: [HttpClient],  // 🔧 Mock de HttpClient
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);  // 🕵️ Espía HTTP
  });

  // 🎓 afterEach verifica que no haya requests sin responder
//   afterEach(() => {
//     httpMock.verify();
//   });

  // ✅ Test 1: El servicio se crea
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ✅ Test 2: getPopularMovies hace HTTP GET y devuelve datos
  it('should get popular movies', (done: DoneFn) => {

    const mockResponse: any = {
      page: 1,
      results: [
        {
          id: 550,
          title: 'Fight Club',
          poster_path: '/test.jpg',
          vote_average: 8.4,
          release_date: '1999-10-15',
          overview: 'Test'
        }
      ],
      total_pages: 10,
      total_results: 200
    };

    // 🚀 Ejecutamos el método real
    service.getPopularMovies(1).subscribe(response => {
      // ✅ Verificamos que la respuesta sea la esperada
      expect(response).toEqual(mockResponse);
      expect(response.results.length).toBe(1);
      expect(response.results[0].title).toBe('Fight Club');
      done();  // 🏁 Indica que terminó el test asíncrono
    });

    // 🕵️ Interceptamos la petición HTTP
    const req = httpMock.expectOne(request =>
      request.url.includes('/movie/popular')
    );

    // ✅ Verificamos que sea GET
    expect(req.request.method).toBe('GET');
    
    // 📤 Simulamos la respuesta del servidor
    req.flush(mockResponse);
  });

  // ✅ Test 3: getMovieById
  it('should get movie by id', (done: DoneFn) => {
    const mockMovie: any = {
      id: 550,
      title: 'Fight Club',
      overview: 'An insomniac office worker...'
    };

    service.getMovieById(550).subscribe(movie => {
      expect(movie.id).toBe(550);
      expect(movie.title).toBe('Fight Club');
      done();
    });

    const req = httpMock.expectOne(request =>
      request.url.includes('/movie/550')
    );

    req.flush(mockMovie);
  });


  it('should get similar movies', (done: DoneFn) => {
    const mockResponse: any = {
      results: [
        { id: 551, title: 'Similar Movie', poster_path: '/test2.jpg' }
      ]
    };

    service.getMovieSimilars(550).subscribe(response => {
      expect(response.results.length).toBe(1);
      expect(response.results[0].title).toBe('Similar Movie');
      done();
    });

    const req = httpMock.expectOne(request =>
      request.url.includes('/movie/550/similar')
    );

    req.flush(mockResponse);
  });
});