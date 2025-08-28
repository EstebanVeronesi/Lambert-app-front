import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLogInService = new BehaviorSubject<boolean>(false);

  private apiUrl = 'http://localhost:3000/api/auth/login'; // URL del backend

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(this.apiUrl, credentials, { withCredentials: true }).pipe(
      tap(() => {
        // Actualizar el estado del usuario como autenticado
        this.currentUserLogInService.next(true);
      }),
      catchError(this.handleError)
    );
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        // Actualizar el estado del usuario como no autenticado
        this.currentUserLogInService.next(false);
      }),
      catchError(this.handleError)
    );
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/is-logged-in`, { withCredentials: true }).pipe(
      tap((isLoggedIn) => {
        this.currentUserLogInService.next(isLoggedIn);
      }),
      catchError(() => {
        this.currentUserLogInService.next(false);
        return throwError(() => new Error('Error al verificar el estado de autenticación.'));
      })
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se produjo un error:', error.error);
    } else {
      console.error(`Backend retornó el código ${error.status}, body fue: `, error.error);
    }
    return throwError(
      () => new Error('Algo malo ocurrió; por favor, intenta nuevamente más tarde.')
    );
  }
}

// anotacion para el back: utilizamos HttpOnly para inyectar el HttpClient en el servicio de login, lo que nos permite hacer peticiones HTTP al backend de forma segura.
