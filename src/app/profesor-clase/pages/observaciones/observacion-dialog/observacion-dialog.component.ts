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
    teacherId: '12345', // Asegúrate de que este ID sea el correcto para el profesor
    teacherName: 'Profesor Simulado'  // Asegúrate de asignar un nombre para el profesor
  };


  constructor(
    public dialogRef: MatDialogRef<ObservacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.newObservation = { ...data };
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.newObservation); // Ahora el teacherId es parte de los datos enviados
  }
}
