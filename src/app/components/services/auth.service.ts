import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        tap(res => localStorage.setItem('jwtToken', res.token)) // ✅ store token
      );
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
