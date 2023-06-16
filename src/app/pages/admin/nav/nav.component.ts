import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  user: any;
  username: String = '';
  currentUser: any;
  constructor(private http: ResponseService, private router: Router) {

    // this.user = JSON.parse(this.http.getUser());

  }

  ngOnInit(): void{

    this.username = JSON.parse(this.http.getUserName());
    this.isUser();
    this.user = JSON.parse(this.http.getUser());
    //console.log('user', this.user);

  }

  isUser() {
    return this.http.sessionget('username');
  }

    logOut() {
      this.http.sessionclear();
      this.router.navigate(['/login']);

  }



}
