import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserSignup } from '../models/user-signup';
import { Signin } from '../models/signin';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // baseUrl: string = 'http://localhost:3000/api';
  baseUrl: string = `${environment.backendApiUrl}/api`;

  // return Observable for userSignup
  userSignup(userSignup: UserSignup): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/user/signup', userSignup);
  }

  // return Observable for userSignin
  userSignin(userSignin: Signin): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/user/signin', userSignin, { withCredentials: true });
  }

  // return Observable for request service
  reqForService(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/user/service');
  }

  bookService(serviceId: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/user/bookService', {serviceId: serviceId}, { withCredentials: true });
  }

  // return Observable for request service
  viewOrders(): Observable<any> {
    // return this.http.get<any>(this.baseUrl + '/user/viewOrders');
    return this.http.get<any>(this.baseUrl + '/user/viewOrders', { withCredentials: true });
  }

  // return Observable for request service
  userQuickQuote(quickQuote: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/user/quickQuote', quickQuote, { withCredentials: true });
  }

  // return Observable for request service
  userNewInquiry(newInquiry: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/user/newInquiry', {newInquiry: newInquiry}, { withCredentials: true });
  }

}
