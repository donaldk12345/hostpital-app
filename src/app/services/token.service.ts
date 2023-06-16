import { HttpClient } from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor( private http: HttpClient,
    private route: Router,
    private messageService: MessageService,@Inject(PLATFORM_ID) private platformId: Object) { }


  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem('jwt');
    window.sessionStorage.setItem('jwt', JSON.stringify(user));
  }



  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem('jwt');
    if (user) {
      return true;
    }

    return false;
  }
}


