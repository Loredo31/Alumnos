import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label:'Home',icon:'home',url:'./home'},
    {label:'Estudiantes',icon:'account_circle',url:'./estudiantes'},
    {label:'Observaciones',icon:'feedback',url:'./observaciones'},
    {label:'Cerrar Sesion',icon:'exit_to_app',url:'./cerrar'},
    
    
  ]
}

