import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-est',
  templateUrl: './buscar-est.component.html',
  styleUrls: ['./buscar-est.component.css'] // Verifica esta ruta
})

export class BuscarEstComponent {
  searchTerm: string = '';
  students: any[] = [
    { firstName: 'Juan', paternalSurname: 'Pérez', maternalSurname: 'Gómez', matricula: '2301', career: 'Ingeniería en Sistemas', role: 1 },
    { firstName: 'Ana', paternalSurname: 'López', maternalSurname: 'Martínez', matricula: '2302', career: 'Ingeniería en Electrónica', role: 1 },
    { firstName: 'Carlos', paternalSurname: 'Ramírez', maternalSurname: 'Díaz', matricula: '2303', career: 'Ingeniería Mecánica', role: 1 }
  ];
  filteredStudents: any[] = [];

  // Variables para el modal
  showModal: boolean = false;
  modalMessage: string = '';
  studentToDelete: any = null;

  constructor(private router: Router) {
    // Inicializamos la lista de estudiantes filtrados
    this.filteredStudents = this.students;
  }

  // Función de búsqueda
  onSearch(): void {
    if (this.searchTerm) {
      this.filteredStudents = this.students.filter(student =>
        student.matricula.includes(this.searchTerm) || 
        `${student.firstName} ${student.paternalSurname} ${student.maternalSurname}`.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredStudents = this.students;
    }
  }

  // Función para redirigir a la página de edición
  onEdit(student: any): void {
    this.router.navigate(['/edit', student.matricula]);  // Redirige a la página de edición con la matrícula del estudiante
  }

  // Mostrar el modal de confirmación para dar de baja
  onDelete(student: any): void {
    this.studentToDelete = student;
    this.modalMessage = `¿Estás seguro de que deseas dar de baja a ${student.firstName} ${student.paternalSurname}?`;
    this.showModal = true;
  }

  // Cerrar el modal
  closeModal(): void {
    this.showModal = false;
  }

  // Confirmar la acción de baja (temporal o definitiva)
  onConfirmDelete(action: string): void {
    if (action === 'temp') {
      // Baja temporal (cambiar rol a 5)
      if (this.studentToDelete) {
        this.studentToDelete.role = 5;  // Cambiar rol a 5 (baja temporal)
        alert(`${this.studentToDelete.firstName} ha sido dado de baja temporalmente.`);

        // Filtrar al estudiante de la lista de estudiantes activos y moverlo a los estudiantes dados de baja temporal
        this.students = this.students.filter(student => student !== this.studentToDelete);
        this.filteredStudents = this.filteredStudents.filter(student => student !== this.studentToDelete);
      }
    } else if (action === 'permanent') {
      // Baja definitiva (eliminar estudiante)
      if (this.studentToDelete) {
        this.filteredStudents = this.filteredStudents.filter(student => student !== this.studentToDelete);
        this.students = this.students.filter(student => student !== this.studentToDelete);
        alert(`${this.studentToDelete.firstName} ha sido dado de baja definitivamente.`);
      }
    }

    // Cerrar el modal después de la acción
    this.closeModal();
  }
}
