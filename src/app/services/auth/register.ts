import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface RegisterRequest {
  nombre: string;
  dni: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000'; // tu backend Express
  private registerStatus = new BehaviorSubject<boolean>(false);

  currentUserRegisterService = this.registerStatus.asObservable();

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  setRegisterStatus(status: boolean) {
    this.registerStatus.next(status);
  }
}