import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-observacion-dialog',
  templateUrl: './observacion-dialog.component.html',
  styleUrls: ['./observacion-dialog.component.css']
})
export class ObservacionDialogComponent {
  newObservation = {
    studentName: '',
    subject: '',
    semester: 1,
    year: new Date().getFullYear(),
    description: '',
    teacherId: '', // Asegúrate de que este ID sea el correcto para el profesor
    teacherName: ''  // Asegúrate de asignar un nombre para el profesor
  };

  teachers: { id: string, name: string }[] = [];
  semesters: number[] = [];
  specialties: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ObservacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.teachers = data.teachers;
      this.semesters = data.semesters;
      this.specialties = data.specialties;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.newObservation); // Ahora el teacherId es parte de los datos enviados
  }
}
