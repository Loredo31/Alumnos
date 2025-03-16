import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  studentName: string = 'Juan Pérez';  // Aquí puedes obtener el nombre dinámicamente (por ejemplo, desde un servicio o autenticación)

  constructor() { }

  ngOnInit(): void {
    // Cualquier lógica adicional al inicializar la página
  }


}
