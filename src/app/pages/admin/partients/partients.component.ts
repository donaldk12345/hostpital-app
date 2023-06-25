import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  create_by: any;
    constructor(private confirmationService: ConfirmationService,private http: ResponseService,private formBuilder: FormBuilder,private messageService: MessageService, private router: Router) {

      // this.user = JSON.parse(this.http.getUser());


  }

    onRowSelect(dat: any): void {
      console.log('Data : ', dat);
      console.log('username', this.create_by);
      // this.id = dat.id;
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

          this.create_by = this.http.sessionget('username');
        this.addPatientForm = new FormGroup({
          'nom':  new FormControl('', [Validators.required]),
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

     this.cols = [
      {field: 'nom', header: 'Nom', type: 'string', width: 250, isFroz: true},
      {field: 'prenom', header: 'Prenom', type: 'string', width: 250, isFroz: false},
       { field: 'ville', header: 'Ville', type: 'string', width: 150, isFroz: false },
       { field: 'telephone', header: 'Téléphone', type: 'string', width: 150, isFroz: false },
        { field: 'sexe', header: 'Sexe', type: 'string', width: 150, isFroz: false },
       { field: 'date_naiss', header: 'Date de Naissance', type: 'jour', width: 250, isFroz: false },
      {field: 'created_at', header: 'Créer le', type: 'date', width: 250, isFroz: false},




    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
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
      if(this.selectElement.length == 0 || this.selectElement.length > 1){
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

  updateDialog() {
    this.addUpdateForm = true;
  }
  hideDialog() {
    this.display = false;
    this.patientID = [];
    this.detailDialog = false;
    this.addUpdateForm = false;

}

  updatePatientView() {
            this.addPatientForm.patchValue({
          'nom': this.selectElement[0].nom,
          'prenom': this.selectElement[0].prenom,
          'quartier': this.selectElement[0].quartier,
          'numero_cni': this.selectElement[0].numero_cni,
          'profession': this.selectElement[0].profession,
          'telephone': this.selectElement[0].telephone,
          'sexe': this.selectElement[0].sexe,
          'ville': this.selectElement[0].ville,

    })
    this.addPatientForm.controls['date_naiss'].setValue(this.selectElement[0].date_naiss);
    this.addUpdateForm = true;
    this.antecedents = this.selectElement[0].antecedents;
  }

  addPatient() {


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
    createdBy: this.create_by,
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

    let id = this.selectElement[0].id;

    console.log('mon id', id);

    this.http.getElement(API_URI + url.paatient_detail + '/' + id).subscribe({

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

  deletePatient() {

    // let elementId: any;
    // this.selectElement.forEach((element: any) => {
    //       elementId.push(element.id);
    //     });
    console.log('element', this.selectElement);
    let id = this.selectElement[0].id;
      this.http.deleteElement(API_URI + url.patient_delete + '/' + id).subscribe(data =>{

          this.messageService.add({
            severity: 'success',
            summary: '',
            detail: 'patient supprimer avec succés !',
            life: 3000
          });
        this.getPatients();

    }, error => {
       this.messageService.add({
            severity:'error',
            summary: '',
            detail: 'Erreur ! patient non supprimer ',
            life: 3000
       });

    })


  }

   confirmDelete() {

    if (this.selectElement && this.selectElement.length > 0) {

      console.log("Suppression des éléments");

      this.confirmationService.confirm({
        message: 'Voulez vous supprimer le patient ?',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Oui',
        rejectLabel: 'Nom',
        acceptButtonStyleClass: "p-button-info",
        rejectButtonStyleClass: "p-button-danger",
        accept: () => {
          this.deletePatient()
        }
      });

    }
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
