import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected baseUrl = 'http://localhost:1337/';
  constructor(private httpClient: HttpClient) {}

  register(user: any): Observable<any> {
    return this.httpClient
      .post(this.baseUrl + 'users', {
        email: user.email,
        password: user.password,
        username: user.username
      })
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not register user :-('))
      );
  }

  update(user: any, token: string): Observable<any> {
    return this.httpClient
      .put(this.baseUrl + 'users/' + user.id, user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not update user :-('))
      );
  }

  login(user: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'auth/local', {
      identifier: user.username,
      password: user.password
    });
  }

  getMe(token: string): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + 'users/me', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not retrive user data'))
      );
  }
}
