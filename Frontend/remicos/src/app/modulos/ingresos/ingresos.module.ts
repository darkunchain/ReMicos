import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoComponent } from './nuevo/nuevo.component';
import { ListaComponent } from './lista/lista.component';



@NgModule({
  declarations: [
    NuevoComponent,
    ListaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IngresosModule { }
