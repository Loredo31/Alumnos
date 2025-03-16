

import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  //styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label:'Pantalla de inicio',icon:'home',url:'./home'},
    {label:'Agregar estudiante',icon:'person_add',url:'./nuevo-estuduante'},
    {label:'Buscar estudiante',icon:'search',url:'./buscar-estudiante'},
    {label:'Bajas temporales', icon:'person_remove', url:'./baja-estudiantes'},
    {label:'Cerrar sesión', icon:'exit_to_app', url:'./'}
  ]
}