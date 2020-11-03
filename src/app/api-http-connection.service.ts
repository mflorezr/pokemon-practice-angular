import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpConnection {

  constructor(private httpApi: HttpClient) { }

  getAll(url: string): Observable<Object> {
    return this.httpApi.get(url);
  }

}