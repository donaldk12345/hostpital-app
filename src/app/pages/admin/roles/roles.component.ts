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
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {

  charge: Observable<any> = new Observable<any>();
  users: any[]=[];
  display: boolean = false;
  display1: boolean = false;
   label: string = '';
  addRoleForm: FormGroup = Object.create(null);
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
  permission: any[] = [];

  permissionsElt: any[] = [];
  roles: any[]=[];

    constructor(private http: ResponseService,private formBuilder: FormBuilder,private messageService: MessageService, private router: Router) {

    // this.user = JSON.parse(this.http.getUser());

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

  ngOnInit(): void {
        this.addRoleForm = new FormGroup({
       'name': new FormControl('',[Validators.required]),
       'permissions': new FormControl([],[Validators.required])
        });

    this.getPermissions();
    this.getRoles();

  }

getData(dat : any) : void {



}
        /**
     * Gérer le bouton Activer
     */
       manageActivateBtn(){
        if(this.selectElement.length == 0 || this.selectElement.length > 1 ){
          this.activatebtn = false;
        } else{
          this.activatebtn = true;
        }
      }

        /**
       * Gérer le bouton Désactiver
       */
      manageUnactivateBtn(){
        if(this.selectElement.length == 0 || this.selectElement.length > 1  ){
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
    getPermissions() {
      this.http.getElement(API_URI + url.permissions).subscribe({
      next: data => {
        if (data) {
          console.log("Mes permissions ", data);
          this.permission = data;

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
  this.display= false;
    this.addRoleForm.reset();
   this.addUpdateForm = false;
}


    getRoles(){
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
            detail: 'Role créer avec succéss'
          })
          this.getRoles();
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



  addRole(){
    let addRequest= {
      name :this.addRoleForm.value.name,
      permissions: this.addRoleForm.value.permissions,
    };

    this.charge = this.http.postElement(API_URI + url.role_list, addRequest);
    this.chargement(this.charge);
    this.hideDialog();
    this.addRoleForm.reset();

  }
  updateRoleUser() {

  let recupere: any[] = []
    this.permission.forEach(elt => {

      if (this.selectElement.data.permissions.id > 0) {
         recupere.push(elt.id);
      }


    })

    console.log("recuperer", recupere);
       this.addRoleForm.patchValue({
           'name': this.selectElement.data.name,
           'permissions': recupere
    })


    this.addUpdateForm = true;
  }


  get name() {

     return this.addRoleForm.controls['name'];
  }

  get permissions(){
     return this.addRoleForm.controls['permissions'];
  }


}
