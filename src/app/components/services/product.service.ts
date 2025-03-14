import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  getProducts() {
    let url = "https://rohikastore-5826a7d1db3c.herokuapp.com/products/list"
        // let url = "http://localhost:8080/products/list"
    return this.http.get<any>(url);
  }

}
