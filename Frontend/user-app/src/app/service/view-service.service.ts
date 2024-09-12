import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ViewServiceService {

  constructor(private http: HttpClient) { }

  // baseUrl: string = 'http://localhost:3000/api';
  baseUrl: string = `${environment.backendApiUrl}/api`;

  // return Observable for view Services
  viewServices(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/service');
  }

}
