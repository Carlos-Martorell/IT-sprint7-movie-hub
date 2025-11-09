
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth' 
import { Auth } from '@angular/fire/auth';


const mockAuth = {
    currentUser: null
}

describe (AuthService, () => {

let service: AuthService;

beforeEach(() => {
    TestBed.configureTestingModule({
        providers:[AuthService,
            {  provide: Auth;
               useValue: mockAuth
            }
        ]
    })
    service = TestBed.inject(AuthService)
})

test('To be created', () => {
    expect(service).toBeTruthy()
})


})