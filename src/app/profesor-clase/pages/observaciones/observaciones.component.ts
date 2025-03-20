import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObservacionDialogComponent } from './observacion-dialog/observacion-dialog.component';
import { ObservacionService } from '../../../services/observacion.service';
import { AlumnoService } from '../../../services/alumno.service'; // Importar el servicio de alumnos

interface Observation {
  teacherId: string;
  teacherName: string;
  studentName: string;
  subject: string;
  semester: number;
  year: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit {
  observations: Observation[] = [];
  filteredObservations: Observation[] = [];
  teacherId: string = '2'; // ID del profesor
  students: { id: string, name: string }[] = []; // Lista de estudiantes
  teachers: { id: string, name: string }[] = [
    { id: '1', name: 'Apolinar Trejo' },
    { id: '2', name: 'Ricardo Muro' },
    { id: '3', name: 'Gabriel Barron' },
    { id: '4', name: 'Ricardo Ramirez' },
    { id: '5', name: 'Silvia Carrillo' },
    { id: '6', name: 'Hanoi Perez' }
  ];
  semesters: number[] = [1, 2, 3, 4, 5, 6]; // Semestres (1-6)
  subjects: string[] = ['Programación', 'Redes', 'Calidad de Producción', 'Electromagnetismo', 'Química Aplicada', 'Base de Datos']; // Asignaturas

  constructor(
    private observacionService: ObservacionService,
    private alumnoService: AlumnoService, // Inyectar el servicio de alumnos
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadObservations();
    this.loadStudents(); // Cargar los estudiantes al inicio
  }

  loadObservations() {
    if (!this.teacherId) {
      console.error('Teacher ID no encontrado');
      return;
    }

    this.observacionService.obtenerObservacionesPorProfesor(this.teacherId).subscribe(
      (data: Observation[]) => {
        this.observations = data;
        this.filteredObservations = [...this.observations];
      },
      (error) => console.error('Error al cargar observaciones:', error)
    );
  }

  // Cargar los estudiantes desde la base de datos
  loadStudents() {
    this.alumnoService.obtenerAlumnos().subscribe(
      (data: any[]) => {
        this.students = data.map(student => ({
          id: student.matricula,  // Suponiendo que la matricula es el ID
          name: `${student.nombre} ${student.apellido_paterno} ${student.apellido_materno}` // Nombre completo
        }));
      },
      (error) => console.error('Error al cargar estudiantes:', error)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ObservacionDialogComponent, {
      width: '600px',
      data: {
        teachers: this.teachers,
        semesters: this.semesters,
        subjects: this.subjects,
        students: this.students // Pasar la lista de estudiantes al diálogo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.guardarObservacion(result);
      }
    });
  }

  guardarObservacion(newObservation: Observation) {
    // Buscar el teacherId a partir del teacherName seleccionado
    const selectedTeacher = this.teachers.find(t => t.name === newObservation.teacherName);
    if (selectedTeacher) {
      newObservation.teacherId = selectedTeacher.id;  // Asignar el ID del profesor
    } else {
      console.error('Profesor no encontrado');
      return; // Si no se encuentra el profesor, no guardar la observación
    }
  
    // Ahora guardar la observación
    this.observacionService.agregarObservacion(newObservation).subscribe(
      (response) => {
        console.log('Observación guardada:', response);
        this.loadObservations(); // Recargar las observaciones
      },
      (error) => {
        console.error('Error al guardar observación:', error);
      }
    );
  }
}
