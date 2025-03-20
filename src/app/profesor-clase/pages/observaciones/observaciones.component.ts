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
  createdAt: string; // Fecha de creación
  updatedAt: string; // Fecha de última modificación
}

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit {
  observations: Observation[] = [];
  filteredObservations: Observation[] = [];
  profesorId: string = ''; // Este es el ID del profesor, cámbialo según corresponda

  // Profesores por defecto
  teachers: { id: string, name: string }[] = [
    { id: '1', name: 'Profesor A' },
    { id: '2', name: 'Profesor B' },
    { id: '3', name: 'Profesor C' }
  ];

  // Semestres (1-6)
  semesters: number[] = [1, 2, 3, 4, 5, 6];

  // Asignaturas por carrera
  specialties: string[] = [];

  // Carreras disponibles
  careers: string[] = ['Ingeniería en Sistemas', 'Ingeniería en Electrónica', 'Ingeniería Mecánica'];

  selectedCareer: string = ''; // Carreras seleccionadas

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
      data: {
        teachers: this.teachers,
        semesters: this.semesters,
        specialties: this.specialties
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.guardarObservacion(result);
      }
    });
  }

  guardarObservacion(newObservation: Observation) {
    newObservation.teacherId = this.profesorId;  // Asegúrate de que teacherId sea el ID del profesor
    newObservation.teacherName = ''; // Este debería ser el nombre del profesor

    this.observacionService.agregarObservacion(newObservation).subscribe(
      (response) => {
        console.log('Observación guardada:', response);
        this.loadObservations();
      },
      (error) => console.error('Error al guardar observación:', error)
    );
  }

  onCareerChange(event: any): void {
    const selectedCareer = event.target.value;
    if (selectedCareer === 'Ingeniería en Sistemas') {
      this.specialties = ['Redes', 'Desarrollo de Software'];
    } else if (selectedCareer === 'Ingeniería en Electrónica') {
      this.specialties = ['Automatización', 'Electrónica Analógica'];
    } else if (selectedCareer === 'Ingeniería Mecánica') {
      this.specialties = ['Diseño Mecánico', 'Mantenimiento Industrial'];
    }
  }
}
