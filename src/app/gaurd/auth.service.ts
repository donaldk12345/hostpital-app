import { Injectable } from "@angular/core";
import { ResponseService } from "../services/response.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  role: any;
  constructor(private http: ResponseService) {

  }

  isLogin() {
    return this.http.sessionget('token');
  }

  isRole() {
    this.role = JSON.parse(this.http.sessionget('role'));
    return this.role;
  }



}
