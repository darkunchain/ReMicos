import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { TituloClienteComponent } from './titulo-cliente/titulo-cliente.component';



@NgModule({
  declarations: [
    ClientesComponent,
    ClienteComponent,
    TituloClienteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClientesComponent,
    ClienteComponent,
    TituloClienteComponent
  ]
})
export class RemicosModule { }
