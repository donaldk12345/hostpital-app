import { Component, OnInit } from '@angular/core';
import { ResponseService } from './services/response.service';
import { Emitters } from './emitters/emitters';
import { Router } from '@angular/router';
import { url } from 'src/environments/url';
import { environment } from 'src/environments/enviroment';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Ynodev';
  authenticated = false;
  user: any;
  currentUser: any;
  constructor(private http: ResponseService, private router: Router) {

    // this.user = JSON.parse(this.http.getUser());

  }

  ngOnInit(): void{

    this.getauthenticate();
    //console.log('user', this.user);
    //     if (!this.user?.id) {
    //   this.router.navigate(['/login']);
    //    return;
    //  }

  }

  isUser() {
    return this.http.sessionget('username');
  }

    logOut() {
      this.http.sessionclear();
      this.router.navigate(['/login']);

  }
  getauthenticate(){
    this.http.getElement(API_URI + url.authenticated).subscribe({
      next: data => {
        if (data) {
          console.log("Mon user ", data);
          this.user = data;

        } else {

        }
      }
    })
    }


}
