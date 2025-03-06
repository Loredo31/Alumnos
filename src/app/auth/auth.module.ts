import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layoutPage/layout-Page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginPageComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    RouterModule
  ]
})
export class AuthModule { }
