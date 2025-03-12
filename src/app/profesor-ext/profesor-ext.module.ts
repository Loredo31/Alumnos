import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorExtRoutingModule } from './profesor-ext-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    HomeComponent,
    ActividadesComponent,
    EstudiantesComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    ProfesorExtRoutingModule,
    MaterialModule
  ]
})
export class ProfesorExtModule { }
