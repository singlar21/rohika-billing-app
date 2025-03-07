import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  sendRequest(
    url: string,
    method: string,
    headers: Record<string, string> = {},
    params: Record<string, string> = {},
    body: any = null
  ): Observable<any> {
    const httpHeaders = new HttpHeaders(headers);
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.append(key, params[key]);
    });

    switch (method.toUpperCase()) {
      case 'GET':
        return this.http.get(url, { headers: httpHeaders, params: httpParams });
      case 'POST':
        return this.http.post(url, body, { headers: httpHeaders, params: httpParams });
      case 'PUT':
        return this.http.put(url, body, { headers: httpHeaders, params: httpParams });
      case 'DELETE':
        return this.http.delete(url, { headers: httpHeaders, params: httpParams });
      default:
        throw new Error('Invalid HTTP method');
    }
  }
}
