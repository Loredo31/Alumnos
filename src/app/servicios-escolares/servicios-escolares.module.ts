import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosEscolaresRoutingModule } from './servicios-escolares-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { RegistroEstComponent } from './pages/registro-est/registro-est.component';
import { BuscarEstComponent } from './pages/buscar-est/buscar-est.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { EstudiantePageComponent } from './pages/estudiante-page/estudiante-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    HomeComponent,
    RegistroEstComponent,
    BuscarEstComponent,
    LayoutPageComponent,
    EstudiantePageComponent
  ],
  imports: [
    CommonModule,
    ServiciosEscolaresRoutingModule,
    MaterialModule,
  ]
})
export class ServiciosEscolaresModule { }
