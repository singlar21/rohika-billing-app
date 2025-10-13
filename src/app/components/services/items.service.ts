import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';  // ✅ import environment

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private baseUrl = environment.apiBaseUrl;  // ✅ centralized prefix

  constructor(private http: HttpClient) { }

  getItemsByUserId(userId: number) {
    return this.http.get<any>(`${this.baseUrl}/items/listByUser/${userId}`);
  }

  deleteUser(userId: number) {
    return this.http.delete<any>(
      `${this.baseUrl}/users/delete/${userId}`,
      { responseType: 'text' as 'json' }
    );
  }
}
