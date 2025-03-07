import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  createUser(formattedData: any) {
    let url = "https://invock-backend-prod.invock.in/api/share-statuses/67515001c3ac8909e7b11614/business-profile/tp"
    return this.http.post<any>(url, formattedData);
  }

}
