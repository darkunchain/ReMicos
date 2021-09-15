import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/componentes/auth/login/login.component';
import { RegisterComponent } from '../app/componentes/auth/register/register.component';
import { ResetPasswordComponent } from '../app/componentes/auth/reset-password/reset-password.component';
import { ClientesComponent } from '../app/remicos/clientes/clientes.component';
import { ClienteComponent } from '../app/remicos/cliente/cliente.component';

const routes: Routes = [
  {path: '', component: ClientesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'cliente', component: ClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
