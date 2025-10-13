import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';   // ✅ import environment

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = environment.apiBaseUrl;   // ✅ centralized API prefix

  constructor(private http: HttpClient) { }

  saveExpense(data: any) {
    return this.http.post<any>(
      `${this.baseUrl}/expense/save`,
      data,
      { responseType: 'text' as 'json' }
    );
  }

  getExpenseList() {
    return this.http.get<any>(`${this.baseUrl}/expense/list`);
  }
}