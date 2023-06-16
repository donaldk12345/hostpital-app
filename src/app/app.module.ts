import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import {PaginatorModule} from 'primeng/paginator';
import { AdminModule } from './pages/admin/admin.module';
import { authInterceptorProviders } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    DialogModule,
    PasswordModule,
    TableModule,
    ConfirmDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    PaginatorModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
