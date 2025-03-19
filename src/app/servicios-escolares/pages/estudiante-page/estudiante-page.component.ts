import { Component } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service';

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
  registroExitoso: boolean = false;

  edadInvalida: boolean = false;
  telefonoInvalido: boolean = false;

  constructor(private alumnoService: AlumnoService) {}

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

  // Validación de edad
  validarEdad(): void {
    const fechaNacimiento = new Date(this.alumno.fecha_nacimiento);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    const mes = new Date().getMonth() - fechaNacimiento.getMonth();

    if (edad < 15 || (edad === 15 && mes < 0)) {
      this.edadInvalida = true;
    } else {
      this.edadInvalida = false;
    }
  }

  // Validación de teléfono (10 dígitos)
  validarTelefono(): void {
    const telefono = this.alumno.telefonos[0];
    if (telefono && telefono.length === 10 && /^[0-9]+$/.test(telefono)) {
      this.telefonoInvalido = false;
    } else {
      this.telefonoInvalido = true;
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
    if (this.edadInvalida || this.telefonoInvalido) {
      return; // Si la edad o el teléfono son inválidos, no se realiza el registro
    }

    this.alumnoService.registrarAlumno(this.alumno).subscribe(
      (response) => {
        console.log('Alumno registrado con éxito:', response);
        // Limpiar los datos del formulario
        this.limpiarFormulario();
        // Mostrar el mensaje de éxito
        this.registroExitoso = true;
        setTimeout(() => {
          this.registroExitoso = false;  // Ocultar el mensaje de éxito después de 3 segundos
        }, 3000);
      },
      (error) => {
        console.error('Error al registrar alumno:', error);
        // Aquí puedes manejar el error si la solicitud no se realiza correctamente
      }
    );
  }

  // Limpiar el formulario
  limpiarFormulario(): void {
    this.alumno = {
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
    this.photoPreview = null; // Limpiar la vista previa de la foto
  }
}
