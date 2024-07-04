import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const environment = {
  apiUrl: 'http://localhost:8080/',
}

interface RequestConfig {
  route: string;
  payload?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  requestPost<T>({ route, payload }: RequestConfig): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}${route}`, { ...payload });
  }

  requestGet<T>({ route, payload }: RequestConfig): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${route}`, { params: payload });
  }

  requestPut<T>({ route, payload }: RequestConfig): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${route}`, { ...payload });
  }

  requestDelete({ route, payload }: RequestConfig): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${route}`, { params: payload });
  }
}
