import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AdminSignup } from '../models/admin-signup';
import { Signin } from '../models/signin';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // baseUrl: string = 'http://localhost:3000/api';
  baseUrl: string = `${environment.backendApiUrl}/api`;

  // return Observable for adminSignup
  adminSignup(adminSignup: AdminSignup): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/admin/signup', adminSignup);
  }

  // return Observable for adminSignin
  adminSignin(adminSignin: Signin): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/admin/signin', adminSignin, { withCredentials: true });
  }

  // Send add service data to backend
  addService(addService:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/admin/addService', addService, { withCredentials: true });
  }

  // return Observable for view Services
  viewServices(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/admin/service');
  }

  // return Observable for view order
  viewOrder(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/admin/viewOrder');
  }

  viewOrderDetails(bookedService: [any]): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/admin/viewOrderDetails', {bookedService: bookedService});
    
  }

  // return Observable for view Quotes
  viewQuotes(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/admin/viewQuote');
  }

  // return Observable for view Message
  viewMessage(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/admin/viewMessage');
  }
}
