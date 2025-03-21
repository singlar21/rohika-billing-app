import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient) { }

  saveExpense(data:any) {
    let url = "https://rohikastore-5826a7d1db3c.herokuapp.com/expense/save";
    // let url = "http://localhost:8080/expense/save";
    return this.http.post<any>(url,data,{ responseType: 'text' as 'json' });
  }

  getExpenseList() {
    let url = "https://rohikastore-5826a7d1db3c.herokuapp.com/expense/list";
    return this.http.get<any>(url);
  }
}
