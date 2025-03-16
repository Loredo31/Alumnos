import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  
  loginForm: FormGroup;
  hidePassword: boolean = true;  // Controla la visibilidad de la contraseña

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login exitoso:', this.loginForm.value);
      alert('Inicio de sesión exitoso 🎉');
    }
  }

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
