import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject,Injectable, PLATFORM_ID } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}/api/`;
@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }

  getArticles(): Observable<any> {
    return this.http.get(API_URI + url);
  }

   postElement(url: string, data: any): Observable<any> {
   return this.http.post(url, data);
  }

    getElement(url: string): Observable<any> {

   return this.http.get(url);
  }


    putElement(url: string, data: any): Observable<any> {
    return this.http.put(url, data);
  }
    deleteElement(url: string): Observable<any> {
    return this.http.delete(url);
  }

    sessionsetJson(variable: string, valeur: any): void {
    let js: string;
    js = JSON.stringify(valeur);
    sessionStorage.setItem(variable, js);
  }


  sessionclear(): void {
    sessionStorage.clear();
  }

  sessionget(variable: string): String | any {
    if(isPlatformBrowser(this.platformId)){
    return sessionStorage.getItem(variable);
    }

    return;

  }
    sessionremove(variable: string): void {
    sessionStorage['remove'](variable);
  }



  sessionset(variable: string, valeur: string): void {
    if(isPlatformBrowser(this.platformId)){
      sessionStorage.setItem(variable, valeur);
    }
  }
    //Pour envoyer le token
  getToken(): String |any{
    return this.sessionget('token');
  }

  getUserName(): String |any{
    return this.sessionget('username');
  }


  getUser(): any {
    return this.sessionget('user');
  }

}


