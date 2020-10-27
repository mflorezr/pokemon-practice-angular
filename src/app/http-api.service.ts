import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private httpApi: HttpClient) { }

  getAll(url: string) {
    return this.httpApi.get(url);
  }

}
