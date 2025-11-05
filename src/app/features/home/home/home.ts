import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  
  goToMovies() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/movies']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
