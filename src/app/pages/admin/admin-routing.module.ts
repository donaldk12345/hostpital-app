import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { UsersComponent } from "./users/users.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EtatComponent } from "./etat/etat.component";
import { ProfileComponent } from "./profile/profile.component";
import { RolesComponent } from "./roles/roles.component";
import { PartientsComponent } from "./partients/partients.component";


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent, children: [
      { path: 'users', component: UsersComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'profile', component: ProfileComponent },
      {path: 'patients', component: PartientsComponent}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class AdminRoutingModule {}
