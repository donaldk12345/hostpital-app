import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnChanges{
  @Input() data:any;
  @Input() monSort:any;
  @Input() colum:any[]=[];
  @Input() loading:any;
  selectedProducts: any[] = [];
  @Output() datas: EventEmitter<any> = new EventEmitter<any>()
  static valuetab=0;
  // @Output() datas2: EventEmitter<any> = new EventEmitter<any>()

  // loading :boolean = true
  constructor() {
    console.log("sssssssss",this.data);

    this.selectedProducts = this.data
    if(this.selectedProducts && this.selectedProducts.length >0){

      TablesComponent.valuetab= this.selectedProducts.length
    }

  }

  ngOnInit(): void {
/*     console.log(this.data);

    console.log("Mon tableau date", this.data);
    console.log("Mon tableau couml", this.colum); */

    console.log("Mon dis data ", this.data);

  }

  ngOnChanges() :void {
    console.log("Mon tableau date chancge", this.data);
    console.log("Mon tableau couml chancge", this.colum);
    if(this.data){}
    if(this.data && this.data.length!=TablesComponent.valuetab){

      this.loading = false
      this.selectedProducts=[];
    }

  }

  onRowSelect(dat: any) : void {
    let tr= []
    tr = this.selectedProducts.filter(r => r!= null && r.id != null && r.id > 0 );
    this.datas.emit(tr)
  }


}
