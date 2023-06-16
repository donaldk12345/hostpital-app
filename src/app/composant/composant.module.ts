import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { TablesComponent } from './tables/tables.component';



@NgModule({
  declarations: [TablesComponent],
  imports: [
    CommonModule,
    DropdownModule,
    TableModule,


  ],
  exports:[TablesComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ComposantModule { }
