import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../app/shared/header/header.component';
import { LoginComponent } from '../app/componentes/auth/login/login.component';
import { RegisterComponent } from '../app/componentes/auth/register/register.component';
import { ResetPasswordComponent } from '../app/componentes/auth/reset-password/reset-password.component';
import { ClientesComponent } from '../app/remicos/clientes/clientes.component';

const routes: Routes = [
  {path: '', component: HeaderComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'zonae', component: ClientesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
