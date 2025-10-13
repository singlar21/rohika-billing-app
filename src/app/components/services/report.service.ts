import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = environment.apiBaseUrl; // ✅ centralized prefix

  constructor(private http: HttpClient) { }

  getReport() {
    return this.http.get<any>(`${this.baseUrl}/report/totalSale`);
  }

  getBestSelling() {
    return this.http.get<any>(`${this.baseUrl}/report/bestSelling`);
  }

  getExpenseReport() {
    return this.http.get<any>(`${this.baseUrl}/report/monthlyExpenseReport`);
  }
}
