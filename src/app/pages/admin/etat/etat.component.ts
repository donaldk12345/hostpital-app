import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
  const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'etat',
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.css']
})

export class EtatComponent implements OnInit{

  @ViewChild('content') popupview !: ElementRef;
  pdfSrc = "";
  pdfUrl = "";
  agents: any[]=[];

    constructor(private http: ResponseService,private messageService: MessageService, private formBuilder: FormBuilder) {

    }
  ngOnInit(): void {


  }



    getAgentReport(){
    this.http.getElement(API_URI + url.agentReport).subscribe({
      next: data => {
        if (data) {
          console.log("Mes users ", data);
        this.agents = data;
        if (typeof (FileReader) !== 'undefined') {
       let reader = new FileReader();

  }

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

}
