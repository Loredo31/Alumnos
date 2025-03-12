import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-baja-est',
  templateUrl: './baja-est.component.html',
  styleUrls: ['./baja-est.component.css']
})

export class BajaEstComponent {
  searchTerm: string = '';
  students: any[] = [
    { firstName: 'Juan', paternalSurname: 'Pérez', maternalSurname: 'Gómez', matricula: '2301', career: 'Ingeniería en Sistemas', role: 5 },
    { firstName: 'Ana', paternalSurname: 'López', maternalSurname: 'Martínez', matricula: '2302', career: 'Ingeniería en Electrónica', role: 5 },
    { firstName: 'Carlos', paternalSurname: 'Ramírez', maternalSurname: 'Díaz', matricula: '2303', career: 'Ingeniería Mecánica', role: 5 }
  ];
  filteredStudents: any[] = [];

  constructor(private router: Router) {
    // Inicialmente mostramos los estudiantes dados de baja temporal
    this.filteredStudents = this.students.filter(student => student.role === 5);
  }

  onSearch(): void {
    // Filtrar estudiantes por matrícula o nombre
    if (this.searchTerm) {
      this.filteredStudents = this.students.filter(student =>
        student.matricula.includes(this.searchTerm) || 
        `${student.firstName} ${student.paternalSurname} ${student.maternalSurname}`.toLowerCase().includes(this.searchTerm.toLowerCase())
      ).filter(student => student.role === 5); // Solo estudiantes dados de baja temporal
    } else {
      // Si no hay filtro, mostrar todos los estudiantes dados de baja temporal
      this.filteredStudents = this.students.filter(student => student.role === 5);
    }
  }

  onRestore(student: any): void {
    // Cambiar el rol del estudiante de 5 (baja temporal) a 1 (activo)
    student.role = 1;
    alert(`${student.firstName} ha sido restaurado.`);

    // Mover el estudiante restaurado a la lista de estudiantes activos
    this.students = this.students.filter(s => s !== student);
    this.students.push(student);

    // Redirigir a la página de "Buscar Estudiantes" (buscar-est)
    this.router.navigate(['/buscar-estudiante']);
  }

  onDelete(student: any): void {
    if (window.confirm(`¿Estás seguro de que deseas dar de baja definitivamente a ${student.firstName} ${student.paternalSurname}?`)) {
      // Eliminar el estudiante de la lista de baja temporal
      this.filteredStudents = this.filteredStudents.filter(s => s !== student);
      alert(`${student.firstName} ha sido dado de baja definitivamente.`);

      // Eliminar el estudiante completamente de la lista
      this.students = this.students.filter(s => s !== student);
    }
  }
}
