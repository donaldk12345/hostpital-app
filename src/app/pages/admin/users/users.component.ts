import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class UsersComponent implements OnInit{

  charge: Observable<any> = new Observable<any>();
  users: any[]=[];
  display: boolean = false;
  display1: boolean = false;
   label: string = '';
  addUserForm: FormGroup = Object.create(null);
  updateForm: FormGroup = Object.create(null);
  addUpdateForm: boolean = false;
  selectElement: any;
  maSelection: any[] = [];
  modifierbtn: boolean =false;
  activatebtn: boolean = false;
  unactivatebtn: boolean = false;
  displayBasic: boolean = false;
  updatebtn: boolean = false;
  deletebtn: boolean = false;
  id: any;
  roles: any[]=[];
  constructor(private confirmationService: ConfirmationService,private http: ResponseService,private messageService: MessageService, private formBuilder: FormBuilder) {

  }

  onRowSelect(dat: any): void {
  console.log('Data : ', dat.data.id);
    this.id = dat.data.id;
    // this.username = dat.data.username;
    // this.email = dat.data.email,
    //   this.role_id= dat.data.role.id
    this.selectElement = dat;
    this.maSelection = dat;
  console.log('mes elements selectionner', this.maSelection);
    this.manageActivateBtn();
  this.manageUnactivateBtn();
  this.manageDeleteBtn();
  this.manageUpdateBtn();


}

  ngOnInit(): void{

       this.addUserForm = new FormGroup({
       'username': new FormControl('',[Validators.required, Validators.minLength(4)]),
       'email' : new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      //  'password': new FormControl('', [Validators.required, Validators.minLength(4)]),
       'role_id': new FormControl('',[Validators.required])
       });

       this.updateForm = new FormGroup({
       'username': new FormControl('',[Validators.required, Validators.minLength(4)]),
       'email' : new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      //  'password': new FormControl('', [Validators.required, Validators.minLength(4)]),
       'role_id': new FormControl('',[Validators.required])
       });


    this.getUsers();
    this.getRoles();
  }


getData(dat : any) : void {



}

        /**
     * Gérer le bouton Activer
     */
       manageActivateBtn(){
        if(this.selectElement.data?.id == 0 || this.selectElement.data?.id > 1 ){
          this.activatebtn = false;
        } else{
          this.activatebtn = true;
        }
      }

        /**
       * Gérer le bouton Désactiver
       */
      manageUnactivateBtn(){
        if(this.selectElement.data.id == 0 || this.selectElement.data.id > 1  ){
          this.unactivatebtn = false;
        } else {
          this.unactivatebtn =true;
        }
      }


   /**
     * Gérer le bouton Supprimer
     */
    manageDeleteBtn(){
      if(this.selectElement.length == 0){
        this.deletebtn = false
      } else {
        this.deletebtn =true;
      }
    }

    /**
     * Gérer le bouton Modifier
     */
     manageUpdateBtn(){
      if(this.selectElement.length == 0 || this.selectElement.length > 1){
        this.updatebtn = false;
      } else {
        this.updatebtn = true;
      }
    }

  getRoles() {
      this.http.getElement(API_URI + url.role_list).subscribe({
      next: data => {
        if (data) {
          console.log("Mes roles ", data);
          this.roles = data;

        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Reésultat',
            detail: data.message,
            life: 3000
          });
        }
      }
    })

  }
 showDialog() {
        this.display = true;
}
  hideDialog() {
    this.display = false;
    this.addUpdateForm = false;
    this.addUserForm.reset();


}


    getUsers(){
    this.http.getElement(API_URI + url.list_users).subscribe({
      next: data => {
        if (data) {
          console.log("Mes users ", data);
          this.users = data;

        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Reésultat',
            detail: data.message,
            life: 3000
          });
        }
      }
    })
    }

    /**
   * Permet de d'afficher le message et le statut de la réponse de requette
   * @param charge
   */
   chargement(charge: Observable<any>): void {
    charge.subscribe(
      {
        next: (success) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Compte créer avec succéss'
          })
          this.getUsers();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Echec',
            detail: 'Erreur ! veillez résseyer '
          });

        },
        complete: () => {

        }
      }
    );
  }

  addUser(){
    let addRequest= {
      username :this.addUserForm.value.username,
      email: this.addUserForm.value.email,
      // password: this.addUserForm.value.password,
      role_id: this.addUserForm.value.role_id
    };

    this.charge = this.http.postElement(API_URI + url.create_Users, addRequest);
    this.chargement(this.charge);
    this.addUserForm.reset();
    this.hideDialog();

  }


  updateUser() {

    let updateRequest = {
      username: this.addUserForm.value.username,
      email: this.addUserForm.value.email,
      role_id: this.addUserForm.value.role_id
    }

    this.http.putElement(API_URI + url.update_users + '/' + this.id, updateRequest).subscribe(x => {

     this.messageService.add({
            severity: 'success',
            summary: '',
            detail: 'compte modifier avec succés !',
            life: 3000
          });
      this.hideDialog();
      this.addUserForm.reset();
      this.getUsers();
    }, error => {
       this.messageService.add({
            severity:'error',
            summary: '',
            detail: 'Erreur ! compte non modifier ',
            life: 3000
       });
    })


  }

  updateCompteUser(val:boolean) {

    if (val) {
      this.label = "Ajouter"
    } else {
      this.label = "Modifier"
         this.addUserForm.patchValue({
           'username': this.selectElement.data.username,
           'email': this.selectElement.data.email,
           'role_id': this.selectElement.data.role?.id
    })
    }

    this.addUpdateForm = true;
  }

  elementId() {
        let id: any;

        this.selectElement.forEach((elt: any) => {
          id.push(elt.id);

          return id;
        });

  }

  deleteUser() {

    // let elementId: any;
    // this.selectElement.forEach((element: any) => {
    //       elementId.push(element.id);
    //     });
    console.log('element', this.selectElement);
      this.http.deleteElement(API_URI + url.delete_users + '/' + this.id).subscribe(data =>{

          this.messageService.add({
            severity: 'success',
            summary: '',
            detail: 'compte supprimer avec succés !',
            life: 3000
          });
        this.getUsers();

    }, error => {
       this.messageService.add({
            severity:'error',
            summary: '',
            detail: 'Erreur ! compte non supprimer ',
            life: 3000
       });

    })



  }


  confirmDelete() {

    if (this.selectElement && this.selectElement.data.id > 0) {

      console.log("Suppression des éléments");

      this.confirmationService.confirm({
        message: 'Voulez vous supprimer cette utilisateur ?',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Oui',
        rejectLabel: 'Nom',
        acceptButtonStyleClass: "p-button-info",
        rejectButtonStyleClass: "p-button-danger",
        accept: () => {
          this.deleteUser()
        }
      });

    }
  }

  get username() {

     return this.addUserForm.controls['username'];
  }

  get email(){
     return this.addUserForm.controls['email'];
  }
  // get password(){
  //   return this.addUserForm.controls['password'];
  // }

  get role_id() {
    return this.addUserForm.controls['role_id'];
  }



}
