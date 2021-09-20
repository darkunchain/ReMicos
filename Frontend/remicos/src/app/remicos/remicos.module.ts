import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { TituloClienteComponent } from './titulo-cliente/titulo-cliente.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [
    ClientesComponent,
    ClienteComponent,
    TituloClienteComponent,    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AppRoutingModule
  ],
  exports: [
    ClientesComponent,
    ClienteComponent,
    TituloClienteComponent
  ]
})
export class RemicosModule { }
