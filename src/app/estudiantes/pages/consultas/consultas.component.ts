import { Component } from '@angular/core';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  materia: string = '';
  profesor: string = '';

  consultar() {
    console.log('Consultando por materia: ', this.materia, ' y profesor: ', this.profesor);
    // Aquí realizarías la consulta en tu backend si es necesario
  }
}
