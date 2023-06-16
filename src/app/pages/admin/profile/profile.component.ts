import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent {
    user: any;
  username: String = '';
  currentUser: any;
  updatePasswordForm: FormGroup = Object.create(null);
  errorMessage: string = "";
  charge: Observable<any> = new Observable<any>();
  pass: any;
  id: any;
  constructor(private http: ResponseService,private formBuilder: FormBuilder,private messageService: MessageService, private router: Router) {

    // this.user = JSON.parse(this.http.getUser());

  }

  ngOnInit(): void{

    this.username = JSON.parse(this.http.getUserName());
    this.user = JSON.parse(this.http.getUser());

    this.id = this.user.id;
    console.log('user', this.id);
    this.updatePasswordForm = this.formBuilder.group({
       password : new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(4)])

    });

  }

  updatePassword() {
    let passwordRequest= {
      password: this.updatePasswordForm.value.password,
      confirm_password: this.updatePasswordForm.value.confirm_password,
    };

    return this.http.putElement(API_URI + url.updatePassword + this.id,passwordRequest).subscribe(data=>{

            this.messageService.add({
            severity: 'success',
            summary: '',
            detail: 'Mot de passe modifier avec succés',
            life: 3000
          });
          console.log("Mon password", data);



    }, error => {
            this.messageService.add({
            severity: 'error',
            summary: '',
            detail: error.error.message,
            life: 3000
          });
          console.log(error);

    })
  }



  get password(){
     return this.updatePasswordForm.controls['password'];
  }
  get confirm_password(){
    return this.updatePasswordForm.controls['confirm_password'];
  }



}
