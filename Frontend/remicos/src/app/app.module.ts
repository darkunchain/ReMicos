import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './componentes/auth/auth.module';
import { AuthRoutingModule } from './componentes/auth/auth-routing.module';
import { SharedModule } from './shared/shared.module';
import { RemicosModule } from './remicos/remicos.module';
import { RemicosRoutingModule } from './remicos/remicos-routing.module';
import { SharedRoutingModule } from './shared/shared-routing.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot([]),
    RouterModule,
    BrowserModule,
    AuthModule,
    AuthRoutingModule,
    SharedModule,
    SharedRoutingModule,
    RemicosModule,
    RemicosRoutingModule,

  ],
  exports: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
