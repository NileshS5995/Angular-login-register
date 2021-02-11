import { Injectable } from '@angular/core';
import { User } from '../models/user'
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get(`API URL`).pipe(map((data) => {
   return data;
  }));
}
}
