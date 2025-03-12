import { Component } from '@angular/core';

@Component({
  selector: 'app-estudiante-page',
  templateUrl: './estudiante-page.component.html',
  styleUrls: ['./estudiante-page.component.css']
})
export class EstudiantePageComponent {
  alumno: any = {
    matricula: '',
    foto: '',
    apellido_paterno: '',
    apellido_materno: '',
    nombre: '',
    fecha_nacimiento: '',
    sexo: '',
    telefonos: [''],
    correos: [''],
    promedio_bachillerato: null,
    especialidad_bachillerato: '',
    rfc: '',
    contrasenia: '',
    domicilio: {
      calle: '',
      numero_interior: '',
      numero_exterior: '',
      colonia: '',
      codigo_postal: '',
      ciudad: ''
    },
    tutores: [{
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      telefonos: [''],
      correos: [''],
      domicilio: {
        calle: '',
        numero_exterior: '',
        colonia: '',
        ciudad: '',
        codigo_postal: ''
      }
    }],
    carrera: {
      nombre: '',
      especialidad: ''
    },
    certificado_bachillerato: 0,
    photo: ''
  };

  areas: string[] = ['Ingeniería en Sistemas', 'Ingeniería en Electrónica', 'Ingeniería Mecánica'];
  specialties: string[] = [];

  photoPreview: string | ArrayBuffer | null = null;

  constructor() {}

  // Generación automática de matrícula
  generateMatricula(): void {
    const year = new Date().getFullYear().toString().slice(-2);
    const semester = new Date().getMonth() < 6 ? '1' : '2';
    const firstLetterOfSurname = this.alumno.apellido_paterno.charAt(0).toUpperCase();
    const matriculaCount = 1001;
    const matriculaNumber = matriculaCount.toString().padStart(4, '0');

    this.alumno.matricula = `${year}${semester}${firstLetterOfSurname}${matriculaNumber}`;
  }

  // Manejo de la foto
  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result ?? null;
        this.photoPreview = result;
        this.alumno.photo = file.name;
      };
      reader.readAsDataURL(file);
    }
  }

    // Manejo del cambio de área/carrera
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

  // Manejo de los teléfonos del alumno
  addPhone(): void {
    this.alumno.telefonos.push('');
  }

  removePhone(index: number): void {
    this.alumno.telefonos.splice(index, 1);
  }

  // Manejo de los correos del alumno
  addEmail(): void {
    this.alumno.correos.push('');
  }

  removeEmail(index: number): void {
    this.alumno.correos.splice(index, 1);
  }

  // Manejo de los teléfonos del tutor
  addTutorPhone(): void {
    this.alumno.tutores[0].telefonos.push('');
  }

  removeTutorPhone(index: number): void {
    this.alumno.tutores[0].telefonos.splice(index, 1);
  }

  // Manejo de los correos del tutor
  addTutorEmail(): void {
    this.alumno.tutores[0].correos.push('');
  }

  removeTutorEmail(index: number): void {
    this.alumno.tutores[0].correos.splice(index, 1);
  }

  // Registrar alumno
  registrarAlumno(): void {
    console.log(this.alumno);
  }
}
