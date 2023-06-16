import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'patients',
  templateUrl: './partients.component.html',
  styleUrls: ['./partients.component.css']
})
export class PartientsComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;
 charge: Observable<any> = new Observable<any>();
  users: any[]=[];
  display: boolean = false;
  sexes: any[] = [];
  detailDialog: boolean = false;
   label: string = '';
  addPatientForm: FormGroup = Object.create(null);
  nom_antecedent = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);
  date_ante = new FormControl('',[Validators.required]);
  addUpdateForm: boolean = false;
  selectElement: any;
  maSelection: any[] = [];
  modifierbtn: boolean =false;
  activatebtn: boolean = false;
  unactivatebtn: boolean = false;
  detailbtn: boolean = false;
  displayBasic: boolean = false;
  updatebtn: boolean = false;
  deletebtn: boolean = false;
  id: any;
  permission: any[] = [];
  roles: any[]=[];
  patients: any[] = [];
  cols: any[] = [];
    exportColumns: any[] | undefined;
    patientID: any;
  antecedents: any[]=[];
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
      this.manageDetailsBtn();


}
onRowUnselect(dat: any) {

    }
  ngOnInit(): void {
        this.addPatientForm = new FormGroup({
          'nom': new FormControl('', [Validators.required]),
          'prenom': new FormControl('', [Validators.required]),
          'quartier': new FormControl('', [Validators.required]),
          'numero_cni': new FormControl('', [Validators.required]),
          'profession': new FormControl('', [Validators.required]),
          'date_naiss': new FormControl('', [Validators.required]),
          'telephone': new FormControl('', [Validators.required]),
          'sexe': new FormControl('', [Validators.required]),
          'ville': new FormControl('', [Validators.required]),
          'antecedents': new FormControl([this.antecedents])
        });


    this.getPatients();
    this.sexPatient();


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

  manageDetailsBtn() {
         if(this.selectElement.length == 0 || this.selectElement.length > 1){
        this.detailbtn = false;
      } else {
        this.detailbtn = true;
      }

  }

   showDialog() {
        this.display = true;
}
  hideDialog() {
  this.display= false;


}

    addPatient(){
    let addRequest= {
      nom :this.addPatientForm.value.nom,
      prenom: this.addPatientForm.value.prenom,
      quartier :this.addPatientForm.value.quartier,
      numero_cni: this.addPatientForm.value.numero_cni,
      profession :this.addPatientForm.value.profession,
      date_naiss: this.addPatientForm.value.date_naiss,
      telephone :this.addPatientForm.value.telephone,
      sexe: this.addPatientForm.value.sexe,
      ville: this.addPatientForm.value.ville,
      antecedents: this.antecedents

    };

    this.charge = this.http.postElement(API_URI + url.patient, addRequest);
    this.chargement(this.charge);
      this.addPatientForm.reset();
      this.hideDialog();

  }


    getPatients(){
    this.http.getElement(API_URI + url.patient).subscribe({
      next: data => {
        if (data) {
          console.log("Mes patients ", data);
          this.patients = data;

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



  getPatientByID() {

    this.http.getElement(API_URI + url.paatient_detail + '/' + this.id).subscribe({

      next: data => {
        if (data) {
          console.log("Mon patient ", data);
          this.detailDialog = true;
          this.patientID = data;

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


  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('setails-patient.pdf');
    });
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
          this.getPatients();
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

  sexPatient() {
    this.sexes = [
      { nom: 'Masculin', 'id': 1 },
      { nom :  'Feminin', 'id':2}
     ]
  }

    deleteAntecedent(nom_antecedent: string) {
    this.antecedents.forEach((antecedent,index) => {
      if(antecedent.nom_antecedent == nom_antecedent)
        this.antecedents.splice(index,1);
    })
    this.nom_antecedent.reset();
    this.description.reset();
    this.date_ante.reset();
    this.type.reset();
  }

  addAntecedent(nom_antecedent: any, description: any, type: any, date_ante:any) {
    const antecedent: any = {};
    antecedent.nom_antecedent= nom_antecedent.value;
    antecedent.description = description.value;
    antecedent.type = type.value;
    antecedent.date_ante = date_ante.value;
    console.log(antecedent);
    return this.http.postElement(API_URI + url.antecedent, antecedent).subscribe(data => {
    this.antecedents.push(data);
    this.nom_antecedent.reset();
    this.description.reset();
    this.date_ante.reset();
    this.type.reset();
    })

  }

  get nom() {

     return this.addPatientForm.controls['nom'];
  }

  get prenom(){
     return this.addPatientForm.controls['prenom'];
  }
    get quartier() {

     return this.addPatientForm.controls['quartier'];
  }

  get numero_cni(){
     return this.addPatientForm.controls['numero_cni'];
  }
    get profession() {

     return this.addPatientForm.controls['nom'];
  }

  get date_naiss(){
     return this.addPatientForm.controls['date_naiss'];
  }
    get telephone() {

     return this.addPatientForm.controls['telephone'];
  }

  get sexe(){
     return this.addPatientForm.controls['sexe'];
  }

    get ville() {

     return this.addPatientForm.controls['ville'];
  }


}
