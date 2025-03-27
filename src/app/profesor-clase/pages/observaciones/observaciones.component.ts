import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObservacionDialogComponent } from './observacion-dialog/observacion-dialog.component';
import { ObservacionService } from '../../../services/observacion.service';
import { AlumnoService } from '../../../services/alumno.service';
import { AuthService } from '../../../services/auth.service';  // Importamos el servicio de autenticación

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
  teacherId: string = ''; // Este ID será dinámico, basado en el login
  students: { id: string, name: string }[] = []; // Lista de estudiantes
  semesters: number[] = [1, 2, 3, 4, 5, 6]; // Semestres (1-6)
  subjects: string[] = ['Programación', 'Redes', 'Calidad de Producción', 'Electromagnetismo', 'Química Aplicada', 'Base de Datos']; // Asignaturas

  constructor(
    private observacionService: ObservacionService,
    private alumnoService: AlumnoService,
    private authService: AuthService,  // Inyectamos el servicio de autenticación
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTeacherId();  // Obtener el ID del profesor desde el servicio de autenticación
    this.loadObservations();
    this.loadStudents(); // Cargar los estudiantes al inicio
  }

  loadTeacherId() {
    const token = this.authService.getToken(); // Obtener el token
    if (token) {
      // Si tienes el token, puedes extraer la matrícula o ID del profesor desde él
      // Suponiendo que el token contiene el `matricula` del profesor
      const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Decodificar el token JWT
      this.teacherId = decodedToken.matricula;  // Usamos el `matricula` del token como ID del profesor
    } else {
      console.error('No se encontró el token');
    }
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
    newObservation.teacherId = this.teacherId;  // Asignamos el ID del profesor de la sesión

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
