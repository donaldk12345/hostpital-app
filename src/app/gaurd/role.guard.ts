import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ResponseService } from '../services/response.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService,private messageService: MessageService) {

  }
  canActivate() {


    if (this.auth.isRole() == 'ADMIN' || this.auth.isRole() == 'EDITOR') {
          return true;
    }
        this.messageService.add({
            severity:'warn',
            summary: 'Vous n’êtes pas autoriser ',
            detail: "Veillez contacter votre administrateur.",
            life: 3000
          });

    return false;

  }

}
