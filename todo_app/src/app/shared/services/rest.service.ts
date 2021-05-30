import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private base = environment.api_base;

  private headers = {
    headers: new HttpHeaders(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${localStorage.getItem('token')}`
      }
    )
  };

  constructor(private http: HttpClient) { }

  login(path: string, data: any): Observable<any> {
    let token = btoa(`${data.email}:${data.password}`);

    let headers = {
      headers: new HttpHeaders(
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${token}`
        }
      )
    };    
    return this.http.post(`${this.base}${path}`, data, headers);
  }

  get(path: string): Observable<any> {    
    return this.http.get(`${this.base}${path}`, this.headers);
  }

  post(path: string, data: any): Observable<any> {
    return this.http.post(`${this.base}${path}`, data, this.headers);
  }

  update(path:string, data: any): Observable<any> {
    return this.http.put(`${this.base}${path}`, data, this.headers);
  }

  delete(path: string) {
    return this.http.delete(`${this.base}${path}`,  this.headers);
  }
}
