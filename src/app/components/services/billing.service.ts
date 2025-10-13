import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'; // ✅ import environment

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private baseUrl = environment.apiBaseUrl; // ✅ centralized API prefix

  constructor(private http: HttpClient) { }

  getBill(billId: number) {
    return this.http.get<any>(`${this.baseUrl}/products/list`); 
  }
}
