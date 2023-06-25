import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { UsersComponent } from './users/users.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminRoutingModule } from "./admin-routing.module";
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ButtonModule} from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChartModule } from 'primeng/chart';
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import {PaginatorModule} from 'primeng/paginator';
import { BrowserModule } from "@angular/platform-browser";
import { ConfirmationService, MessageService } from 'primeng/api';
import { EtatComponent } from './etat/etat.component';
import { ProfileComponent } from './profile/profile.component';
import { RolesComponent } from './roles/roles.component';
import { PartientsComponent } from './partients/partients.component';
import { CalendarModule } from "primeng/calendar";
import { TabViewModule } from 'primeng/tabview';
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DropdownModule } from "primeng/dropdown";
import { ComposantModule } from "../../composant/composant.module";


@NgModule({
    declarations: [
        UsersComponent,
        AdminComponent,
        NavComponent,
        DashboardComponent,
        EtatComponent,
        ProfileComponent,
        RolesComponent,
        PartientsComponent
    ],
    providers: [MessageService, ConfirmationService],
    bootstrap: [AdminComponent],
    imports: [
        CommonModule,
        RouterModule,
        AdminRoutingModule,
        HttpClientModule,
      FormsModule,
        ReactiveFormsModule,
        ConfirmPopupModule,
        ButtonModule,
      MessagesModule,
        ToastModule,
        TableModule,
      DialogModule,
        ChartModule,
        MultiSelectModule,
      ConfirmPopupModule,
        PasswordModule,
        TableModule,
        ConfirmDialogModule,
        BrowserModule,
        ScrollingModule,
        DropdownModule,
        BrowserAnimationsModule,
        PaginatorModule,
        InputTextModule,
        CalendarModule,
    ToolbarModule,
        TabViewModule,
        ComposantModule
    ]
})
export class AdminModule {}
