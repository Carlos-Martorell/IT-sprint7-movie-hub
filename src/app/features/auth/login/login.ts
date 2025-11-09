import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = signal<boolean>(false);
  errorMessage = signal<string>('');
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit() {

    if (this.loginForm.invalid) {
      this.errorMessage.set('Por favor, completa todos los campos correctamente');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loading.set(true);
    this.errorMessage.set('');

    const result = await this.authService.login(email!, password!);

    if (result.success) {
      this.router.navigate(['/movies']);
    } else {
      this.errorMessage.set(this.getErrorMessage(result.error));
    }
    this.loading.set(false);
  }

 private getErrorMessage(error: string): string {
    if (error.includes('invalid-credential')) {
      return 'Email o contraseña incorrectos';
    }
    if (error.includes('user-not-found')) {
      return 'Usuario no encontrado';
    }
    if (error.includes('wrong-password')) {
      return 'Contraseña incorrecta';
    }
    if (error.includes('too-many-requests')) {
      return 'Demasiados intentos. Espera un momento';
    }
    return 'Error al iniciar sesión. Inténtalo de nuevo';
  }
}


