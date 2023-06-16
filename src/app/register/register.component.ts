import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResponseService } from '../services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup = Object.create(null);
  user: any;
  constructor(private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService, private router: Router, private httpService: ResponseService) {
        this.user = JSON.parse(this.httpService.getUser());
  }

  ngOnInit(): void {
        if (this.user?.id) {
      this.router.navigate(['/']);
       return;
     }

    this.registerForm =  this.formBuilder.group({

       username: new FormControl('',[Validators.required, Validators.minLength(4)]),
       email : new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
       password : new FormControl('', [Validators.required ,Validators.minLength(4)])
     });

  }

  registerUser(){
    let registerRequest= {
      username :this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.http.postElement(API_URI + url.register, registerRequest).subscribe(data =>{

          console.log('register', data);
          this.router.navigate(['/login']);
          this.messageService.add({
            severity: 'success',
            summary: 'Compte créer ',
            detail: 'votre compte à été créer avec succés !',
            life: 3000
          });
    }, error => {
       this.messageService.add({
            severity:'error',
            summary: 'Erreur de création du compte',
            detail: 'veillez vérifié les champs à saisir !',
            life: 3000
          });
    })
  }

  get username(){
     return this.registerForm.controls['username'];
  }

  get email(){
     return this.registerForm.controls['email'];
  }
  get password(){
    return this.registerForm.controls['password'];
 }

 /* get confirm_password(){
     return this.registerForm.controls['confirm_password'];
  }*/


}
