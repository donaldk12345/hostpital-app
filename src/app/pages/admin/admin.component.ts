import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ResponseService } from "src/app/services/response.service";





@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit{

  user: any;
  currentUser: any;
  constructor(private httpService: ResponseService, private router: Router) {

    // this.user = JSON.parse(this.http.getUser());
      this.user = JSON.parse(this.httpService.getUser());

  }
    ngOnInit(): void{
    if (this.user?.id==null) {
      this.router.navigate(['/login']);
       return;
      }

      console.log(this.user);


  }
}
