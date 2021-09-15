import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from '../remicos/clientes/clientes.component';
import { ClienteComponent } from '../remicos/cliente/cliente.component';

const routes: Routes = [
  {path: '', component: ClientesComponent},
  {path: 'client', component: ClienteComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RemicosRoutingModule { }
