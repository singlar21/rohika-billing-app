import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  getReport() {
    let url = "https://rohikastore-5826a7d1db3c.herokuapp.com/report/totalSale";
    return this.http.get<any>(url);
  }

}
