import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

const routes: Routes = [
  {
    path: '',
    component:LayoutPageComponent,
    children:[
      {path: 'actividades', component: ActividadesComponent},
      {path: 'buscar-estudiantes', component: EstudiantesComponent},
      {path: 'home', component: HomeComponent},
      {path: '**', redirectTo: 'home'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorExtRoutingModule { }
