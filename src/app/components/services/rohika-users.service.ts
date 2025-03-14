import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RohikaUsersService {


  constructor(private http:HttpClient) { }


  getUsers() {
    let url = "https://rohikastore-5826a7d1db3c.herokuapp.com/users/list"
        // let url = "http://localhost:8080/users/list"
    return this.http.get<any>(url);
  }

}
