import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarradiaComponent } from './barradia/barradia.component';
import { MesComponent } from './mes/mes.component';
//%%%%%%%%% inicio barradia %%%%%%%%%%//
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppComponent } from '../../app.component';
import { AppModule } from '../../app.module';
//%%%%%%%%% fin barradia %%%%%%%%%%//



@NgModule({
  declarations: [
    BarradiaComponent,
    MesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,   
   
  ]
})
export class GraficasModule { }
