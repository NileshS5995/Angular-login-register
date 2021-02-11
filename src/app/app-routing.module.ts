import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/role';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {
    path: 'login', component: SignInComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin', component:AdminComponent,  canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
