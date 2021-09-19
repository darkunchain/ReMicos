import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './componentes/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { RemicosModule } from './remicos/remicos.module';
import { AcordeonComponent } from './componentes/acordeon/acordeon.component';
import { Error404Component } from './componentes/error404/error404.component';
import { PopupformComponent } from './componentes/popupform/popupform.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    AcordeonComponent,
    Error404Component,
    PopupformComponent,
  ],
  imports: [
    RouterModule.forRoot([]),
    RouterModule,
    BrowserModule,
    AuthModule,
    SharedModule,
    RemicosModule,
    NgbModule,
  ],
  exports: [
    AppComponent,
    AcordeonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
