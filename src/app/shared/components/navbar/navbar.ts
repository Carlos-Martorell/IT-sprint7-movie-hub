import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
    authService = inject(AuthService);  // ← Inyectar servicio
  private router = inject(Router);
  
  async logout() {
    const result = await this.authService.logout();
    if (result.success) {
      this.router.navigate(['/']);
    }
}
}