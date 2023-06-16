import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.models';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import { ResponseService } from '../services/response.service';
import { BehaviorSubject, Observable, timeout } from 'rxjs';
import { MessageService } from 'primeng/api';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = Object.create(null);
  errorMessage: string = "";
  charge: Observable<any> = new Observable<any>();
  user: any;
  constructor(private http: ResponseService, private formBuilder: FormBuilder,private messageService: MessageService, private router: Router,private httpService:ResponseService) {
    this.user = JSON.parse(this.httpService.getUser());
  }

  ngOnInit(): void {
    // if (this.user?.id) {
    //   this.router.navigate(['/admin/dashboard']);
    //    return;
    //  }

    this.loginForm =  this.formBuilder.group({

        email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        password : new FormControl('', [Validators.required, Validators.minLength(4)])
    });


  }


  loginUser(){
    let loginRequest= {
      email :this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    return this.http.postElement(API_URI + url.login, loginRequest).subscribe(data => {

      console.log(data);
      this.http.sessionset('token', JSON.stringify(data.token));
      this.http.sessionset('user', JSON.stringify(data.user));
      this.http.sessionset('username', JSON.stringify(data.user.username));
      this.router.navigate(['/admin/dashboard']);
        // this.reloadPage();
    }, error => {
      console.log(error);
       this.messageService.add({
            severity:'error',
            summary: 'Erreur de connexion',
            detail: error.error.message,
            life: 3000
          });
    }
    )



  }

    reloadPage() {
      window.location.reload();
  }

  get email(){
     return this.loginForm.controls['email'];
  }
  get password(){
    return this.loginForm.controls['password'];
 }


}
