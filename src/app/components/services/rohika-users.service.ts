import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RohikaUsersService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(`${this.baseUrl}/users/list`);
  }

  getUsersByType(type: string) {
    return this.http.get<any>(`${this.baseUrl}/users/listByUser/${type}`);
  }

  getUsersByTypeAndCurrentMonth(type: string, month: number, year: number) {
    return this.http.get<any>(
      `${this.baseUrl}/users/listByUserCurrentMonth/${type}?month=${month}&year=${year}`
    );
  }

  updateAddressById(object: any) {
    return this.http.post<any>(`${this.baseUrl}/users/updateAddress`, object);
  }
}