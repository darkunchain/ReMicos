import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from '../remicos/clientes/clientes.component';

const routes: Routes = [
  {path: '', component: ClientesComponent},
  {path: 'zonae', component: ClientesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
