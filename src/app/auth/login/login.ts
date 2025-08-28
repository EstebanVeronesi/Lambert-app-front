import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login';
import { LoginRequest } from '../../services/auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = signal(false);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    // inicializamos el form en el constructor
    this.loginForm = this.formBuilder.group({
      email: ['esteban@gmail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loginService.currentUserLogInService.subscribe((loggedIn) => {
      this.isLoggedIn.set(loggedIn);
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      const credentials: LoginRequest = this.loginForm.value as LoginRequest;
      this.loginService.login(credentials).subscribe({
        next: () => {
          alert('Login exitoso. ¡Bienvenido!');
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        },
        error: (err) => {
          console.error('Error en login:', err);
          alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert('Formulario inválido. Por favor, revisa los campos.');
    }
  }

  logout() {
    this.loginService.logout().subscribe(() => {
      alert('Has cerrado sesión.');
      this.router.navigateByUrl('/iniciar-sesion');
    });
  }
}
