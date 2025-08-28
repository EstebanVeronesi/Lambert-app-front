import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLoggedIn = signal(false);

  constructor(private loginService: LoginService) {
    // ⚡ Inicializamos el estado real al cargar la app
    this.loginService.isLoggedIn().subscribe();

    // ⚡ Sincronizamos el BehaviorSubject con la signal
    this.loginService.currentUserLogInService.subscribe((loggedIn) => {
      this.isLoggedIn.set(loggedIn);
    });
  }

  logout(): void {
    this.loginService.logout().subscribe(() => {
      alert('Has cerrado sesión.');
    });
  }
}
