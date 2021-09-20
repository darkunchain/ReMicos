import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/componentes/auth/login/login.component';
import { RegisterComponent } from '../app/componentes/auth/register/register.component';
import { ResetPasswordComponent } from '../app/componentes/auth/reset-password/reset-password.component';
import { ClientesComponent } from '../app/remicos/clientes/clientes.component';
import { AcordeonComponent } from './componentes/acordeon/acordeon.component';
import { Error404Component } from './componentes/error404/error404.component';
import { PopupformComponent } from './componentes/popupform/popupform.component';

const routes: Routes = [

  //{path: '', redirectTo: '/client', pathMatch: 'full'},
  //{path: '', component: AcordeonComponent},
  {path: 'newclient', component: PopupformComponent},
  {path: 'acordeon', component: AcordeonComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'zonae', component: ClientesComponent,children:[
    {path: 'popupformPath', outlet: 'popupformol', component: PopupformComponent},
    {path: 'popup', component: PopupformComponent},
  ]},
  {path: 'client', component: ClientesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error404', component: ClientesComponent, pathMatch: 'full'},
  // {path: '**', redirectTo: 'error404', pathMatch: 'full'},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
