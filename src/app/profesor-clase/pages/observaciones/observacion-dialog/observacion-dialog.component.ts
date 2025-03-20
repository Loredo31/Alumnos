import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Definimos tipos claros para las propiedades teachers y students
interface Teacher {
  id: string;
  name: string;
}

interface Student {
  id: string;
  name: string;
}

@Component({
  selector: 'app-observacion-dialog',
  templateUrl: './observacion-dialog.component.html',
  styleUrls: ['./observacion-dialog.component.css']
})
export class ObservacionDialogComponent {
  // Inicializamos las propiedades con los tipos correspondientes
  newObservation = {
    studentName: '',
    subject: '',
    semester: 1,
    year: new Date().getFullYear(),
    description: '',
    teacherId: '',  // ID del profesor
    teacherName: ''  // Nombre del profesor
  };

  students: Student[] = [];  // Lista de estudiantes
  subjects: string[] = [];   // Lista de asignaturas
  semesters: number[] = [];  // Lista de semestres
  teachers: Teacher[] = [];  // Lista de profesores

  constructor(
    public dialogRef: MatDialogRef<ObservacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibimos los datos desde el componente principal
  ) {
    // Inicializamos las propiedades con los datos proporcionados
    if (data) {
      this.students = data.students || [];
      this.subjects = data.subjects || [];
      this.semesters = data.semesters || [];
      this.teachers = data.teachers || []; // Asignamos la lista de profesores
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    // Guardamos la observación con los datos actuales
    this.dialogRef.close(this.newObservation); // Enviamos la nueva observación con los valores seleccionados
  }
}
