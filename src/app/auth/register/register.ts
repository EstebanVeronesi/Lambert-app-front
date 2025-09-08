import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService, RegisterRequest } from '../../services/auth/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  registerForm: FormGroup;
  isRegistered = signal(false);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) {
    // inicializamos el form con todos los campos
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      dni: [
        '', 
        [
        Validators.required, 
        Validators.pattern(/^[0-9]+$/), 
        Validators.minLength(7), 
        Validators.maxLength(8)
      ]], // solo números de 7 u 8 dígitos
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/
          ),
        ],
      ]
    });
  }

  ngOnInit(): void {
    // escuchamos estado global de registro (si querés manejar flags globales)
    this.registerService.currentUserRegisterService.subscribe((registered) => {
      this.isRegistered.set(registered);
    });
  }

  // Getters para acceder a los form controls desde el template
  get email() {
    return this.registerForm.get('email');
  }

  get nombre() {
    return this.registerForm.get('nombre');
  }

  get dni() {
    return this.registerForm.get('dni');
  }

  get password() {
    return this.registerForm.get('password');
  }




  register() {
    if (this.registerForm.valid) {
      const data: RegisterRequest = this.registerForm.value as RegisterRequest;

      this.registerService.register(data).subscribe({
        next: () => {
          alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
          this.router.navigateByUrl('/iniciar-sesion');
          this.registerForm.reset();
        },
        error: (err) => {
          console.error('Error en registro:', err);
          alert(err.error?.error || '❌ Error al registrar usuario.');
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
      alert('Formulario inválido. Revisa los campos.');
    }
  }
}
