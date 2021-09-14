import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { AuthModule } from './componentes/auth/auth.module';
import { AuthRoutingModule } from './componentes/auth/auth-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    AuthModule,
    RouterModule,
    AuthRoutingModule
  ],
  exports: [
    AppComponent,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
