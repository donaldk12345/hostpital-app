import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import { User } from '../models/user.models';

const API_URI= `${environment.BASE_URL}`
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User> | undefined;

  constructor(private http: HttpClient) {

  }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }

  // login(user: User): Observable<any> {
  //   return this.http.post<any>(API_URI + url.login, user).pipe(
  //     map(response => {
  //       if (response) {
  //         localStorage.setItem('currentUser', JSON.stringify(response));
  //         this.currentUserSubject.next(response);
  //       }
  //       return response;
  //     })
  //   );
  // }

  register(user: User): Observable<any> {
    return this.http.post(API_URI + 'sign-up', user);
  }

  // logOut() {
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(new User);
  // }
}
