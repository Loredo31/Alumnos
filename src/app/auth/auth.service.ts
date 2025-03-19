import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Método para cerrar sesión
  logout() {
    // Borra los datos de la sesión (por ejemplo, el token)
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    
    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }

  // Aquí puedes agregar más métodos para el login o la validación del token
}
