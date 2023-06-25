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
import { AuthGuard } from "src/app/gaurd/auth.guard";
import { RoleGuard } from "src/app/gaurd/role.guard";
import { TablesComponent } from "src/app/composant/tables/tables.component";


const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard],
    component: AdminComponent, children: [
      { path: 'users', component: UsersComponent, canActivate:[RoleGuard] },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'roles', component: RolesComponent , canActivate:[RoleGuard]},
      { path: 'profile', component: ProfileComponent },
      { path: 'patients', component: PartientsComponent },
      { path: 'tables', component:TablesComponent}

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
