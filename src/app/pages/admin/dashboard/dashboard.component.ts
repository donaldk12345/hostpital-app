import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Chart, registerables } from 'chart.js'
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @ViewChild('canvasLines', { static: true }) canvasLines!: ElementRef;
  item: any[] = [];
 color: string[] = ['#077b8ade', '#000000de', '#374b17de', '#320d3ede', '#C0C0C0de', '#6a1ec0de', '#c01eb3de', '#1e51c0de', '#0000FFde', '#5c3c92de', '#d9138ade', '#FFFF00de', '#00FFFFde', '#7fffd4de', '#FF00FFde', '#201e20de', '#82c01ede'];
  users: any;
   chart: any;
  patient: any[]=[];
  patients: any;
  exportColumns: any[] | undefined;
    cols: any[] = [];
  basicData: any;

    basicOptions: any;
  constructor(private http: ResponseService,private messageService: MessageService,) {

  }

  ngOnInit(): void{

    this.getItems();
    this.getPatients();
    this.chartView();



  }

  chartView() {

  const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325, 702, 620],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
  }

   getItems(){
    this.http.getElement(API_URI + url.dashboardItems).subscribe({
      next: data => {
        if (data) {

          this.item = data;
          console.log("Mes items ", this.item);

            let u: any[] = []
    this.item.forEach(eltUsers => {
      u.push(eltUsers.users);
      console.log("user push", u);
     })
          this.users = u;
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

    getPatients(){
    this.http.getElement(API_URI + url.dashboard_patient).subscribe({
      next: data => {
        if (data) {

          this.patient = data;
          console.log("patient ", this.patient);

            let p: any[] = []
    this.patient.forEach(eltPatient => {
      p.push(eltPatient.patients);
      console.log("patient push", p);
     })
          this.patients = p;
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
