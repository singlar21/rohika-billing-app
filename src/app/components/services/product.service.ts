import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';  // ✅ import environment

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiBaseUrl;  // ✅ centralized API prefix

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any>(`${this.baseUrl}/products/list`);
  }
}
