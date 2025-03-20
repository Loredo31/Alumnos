import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label:'Home',icon:'home',url:'./home'},
    {label:'Perfil',icon:'account_circle',url:'./perfil'},
    {label:'Actualizar',icon:'autorenew',url:'./actualizar'},
    {label:'Consultar',icon:'search',url:'./consultas'},
    {label:'Cerrar Sesion',icon:'exit_to_app',url:'./cerrar', action: 'logout'},
    
    
  ];
  constructor(private router: Router, private authService: AuthService) {}

  // Método logout
  logout() {
    this.authService.logout();  // Llama al método de logout del servicio
    this.router.navigate(['/home']);  // Redirige a la página de login
  }
}

