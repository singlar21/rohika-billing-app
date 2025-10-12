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

  getUsersByType(type:string) {
    let url = "https://rohikastore-5826a7d1db3c.herokuapp.com/users/listByUser/"+type;
    return this.http.get<any>(url);
  }

getUsersByTypeAndCurrentMonth(type: string, month: number, year: number) {
  const url = `http://localhost:8080/users/listByUserCurrentMonth/${type}?month=${month}&year=${year}`;
  return this.http.get<any>(url);
}


  updateAddressById(object:any) {
    let url = "https://rohikastore-5826a7d1db3c.herokuapp.com/users/updateAddress";
    return this.http.post<any>(url,object);
  }
  
}
