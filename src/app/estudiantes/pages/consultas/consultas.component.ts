import { Component } from '@angular/core';
import { ObservacionService } from '../../../services/observacion.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  materia: string = '';
  profesor: string = '';
  observaciones: any[] = [];  // Aquí se guardarán las observaciones que retornemos

  // Definir las columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['teacherName', 'subject', 'description', 'year'];

  constructor(private observacionService: ObservacionService) {}

  // Método para realizar la consulta
  consultar() {
    console.log('Consultando por materia: ', this.materia, ' y profesor: ', this.profesor);

    // Filtrar las observaciones por materia y/o profesor
    let params: any = {};

    if (this.materia) {
      params.subject = this.materia;
    }
    
    if (this.profesor) {
      params.teacherName = this.profesor;
    }

    // Llamar al servicio para obtener las observaciones filtradas
    this.observacionService.consultarObservaciones(params).subscribe(
      (data) => {
        this.observaciones = data;  // Almacenar las observaciones obtenidas
        if (data.length === 0) {
          console.log('No se encontraron observaciones');
        }
      },
      (error) => {
        console.error('Error al consultar observaciones:', error);
      }
    );
  }
}
