import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private baseUrl = 'http://localhost:3000/api';
  baseUrl: string = `${environment.backendApiUrl}/api`;

  // This BehaviorSubject stores the login status with an initial value of false
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // This observable allows other components to subscribe and get real-time updates on the login status
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }
  checkSession(): Observable<any> {
    return this.http.get(`${this.baseUrl}/session-check`, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  // update isLoggedIn status
  setLoggedIn(status:boolean):void{
    this.isLoggedInSubject.next(status);
  }

  // get logged in status
  getLoggedIn(): boolean{
    return this.isLoggedInSubject.value;
    // return false;
  }
}
