import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {

private readonly fb = inject(FormBuilder);
private readonly authService = inject(AuthService);
private readonly router = inject(Router);
  
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');
  
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: this.passwordMatchValidator
  })

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }
 async onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage.set('Por favor, completa todos los campos correctamente');
      return;
    }
    
    const { email, password } = this.registerForm.value;
    
    this.loading.set(true);
    this.errorMessage.set('');
    
    const result = await this.authService.register(email!, password!);
    
    if (result.success) {
      // Registro exitoso → Auto-login y redirect
      this.router.navigate(['/movies']);
    } else {
      this.errorMessage.set(this.getErrorMessage(result.error));
    }
    
    this.loading.set(false);
  }
  
  private getErrorMessage(error: string): string {
    if (error.includes('email-already-in-use')) {
      return 'Este email ya está registrado';
    }
    if (error.includes('weak-password')) {
      return 'La contraseña es demasiado débil';
    }
    if (error.includes('invalid-email')) {
      return 'Email inválido';
    }
    return 'Error al registrarse. Inténtalo de nuevo';
  }

}
