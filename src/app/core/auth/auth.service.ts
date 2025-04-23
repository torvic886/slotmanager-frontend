import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // private API_URL = 'http://localhost:8080/api/auth'; // Cambia si tu backend tiene otra URL

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${API_URL}/auth/login`, body);
  }

  // login(data: LoginData): Observable<any> {
  //   return this.http.post(`${this.API_URL}/login`, data);
  // }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${API_URL}/register`, data);
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
