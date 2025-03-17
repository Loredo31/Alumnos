import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObservacionDialogComponent } from './observacion-dialog/observacion-dialog.component';
import { ObservacionService } from '../../../services/observacion.service';

interface Observation {
  teacherId: string;
  teacherName: string;
  studentName: string;
  subject: string;
  semester: number;
  year: number;
  description: string;
  createdAt: string;  // Fecha de creación
  updatedAt: string;  // Fecha de última modificación
}


@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit {
  observations: Observation[] = [];
  filteredObservations: Observation[] = [];
  profesorId: string = '12345'; // Este es el ID del profesor, cámbialo según corresponda
  

  constructor(
    private observacionService: ObservacionService,
    public dialog: MatDialog // Agregar MatDialog
  ) {}

  ngOnInit() {
    this.loadObservations();
  }

  loadObservations() {
    this.observacionService.obtenerObservacionesPorProfesor(this.profesorId).subscribe(
      (data: Observation[]) => {
        this.observations = data;
        this.filteredObservations = [...this.observations];
      },
      (error) => console.error('Error al cargar observaciones:', error)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ObservacionDialogComponent, {
      width: '400px',
      data: {} // Datos vacíos para nueva observación
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.guardarObservacion(result);
      }
    });
  }

  guardarObservacion(newObservation: Observation) {
    newObservation.teacherId = this.profesorId;  // Asegúrate de que teacherId sea el ID del profesor
    newObservation.teacherName = 'Profesor Simulado';

    this.observacionService.agregarObservacion(newObservation).subscribe(
      (response) => {
        console.log('Observación guardada:', response);
        this.loadObservations();
      },
      (error) => console.error('Error al guardar observación:', error)
    );
  }
}
