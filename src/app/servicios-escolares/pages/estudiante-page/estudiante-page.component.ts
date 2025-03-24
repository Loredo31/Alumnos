import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service';
import { ConsecutivoService } from '../../../services/consecutivo.service';

@Component({
  selector: 'app-estudiante-page',
  templateUrl: './estudiante-page.component.html',
  styleUrls: ['./estudiante-page.component.css']
})
export class EstudiantePageComponent implements OnInit{
  consecutivo: number = 1;
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

  areas: string[] = ['Área Económico Administrativo', 'Área Industrial, Eléctrica y Electrónica', 'Área en Tecnologías de la Información'];
  specialties: string[] = [];

  photoPreview: string | ArrayBuffer | null = null;
  registroExitoso: boolean = false;

  edadInvalida: boolean = false;

   ultimoConsecutivo: string | null = null;

  constructor(private alumnoService: AlumnoService, private consecutivoService: ConsecutivoService) {}

  ngOnInit(): void {
    this.obtenerConsecutivo(); // Obtener el último consecutivo al iniciar el componente
  }

  obtenerConsecutivo() {
    this.consecutivoService.obtenerUltimoConsecutivo().subscribe(
      (data) => {
        this.consecutivo = data.consecutivo;
        this.generateMatricula();
      },
      (error) => {
        console.error('Error al obtener el consecutivo:', error);
      }
    );
  }

  // Generación automática de matrícula
  generateMatricula(): void {
    if (this.consecutivo) {
      const year = new Date().getFullYear().toString().slice(-2);
      const semester = new Date().getMonth() < 6 ? '1' : '2';
      const firstLetterOfSurname = this.alumno.apellido_paterno.charAt(0).toUpperCase();
      const matriculaNumber = (Number(this.consecutivo) + 1).toString().padStart(4, '0');
      //const matriculaNumber = (parseInt(this.consecutivo, 10) + 1).toString().padStart(4, '0'); // Incrementar el consecutivo

      this.alumno.matricula = `${year}${semester}${firstLetterOfSurname}${matriculaNumber}`;
    } else {
      // En caso de que no se obtenga el consecutivo
      console.error('No se pudo obtener el último consecutivo');
    }
  }

  // Manejo de la foto
  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result ?? null;
        this.photoPreview = result;
        this.alumno.photo = result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Manejo del cambio de área/carrera
  onCareerChange(event: any): void {
    const selectedCareer = event.target.value;
    if (selectedCareer === 'Área Económico Administrativo') {
      this.specialties = ['Licenciatura en Administración', 'TSU en Gestión de Capital Humano', 'Licenciatura en Contaduría',
        'TSU en Contaduría', 'Licenciatura en Negocios y Mercadotecnia', 'TSU en Mercadotecnia', 
        'Licenciatura en Gestión y Desarrollo Turístico', 'TSU en Turismo'];
    } else if (selectedCareer === 'Área Industrial, Eléctrica y Electrónica') {
      this.specialties = ['Licenciatura en Ingeniería en Mecatrónica', 'TSU en Instalaciones Eléctricas', 'Licenciatura en Ingeniería en Mecatrónica',
        'TSU en Automatización', 'Licenciatura en Ingeniería Industrial', 'TSU en Procesos Productivos', 
        'Licenciatura en Ingeniería en Energía y Desarrollo Sostenible', 'TSU en Energía Turbo Solar'];
    } else if (selectedCareer === 'Área en Tecnologías de la Información') {
      this.specialties = ['Licenciatura en Diseño Digital y Producción Audiovisual', 'TSU en Diseño y Animación Digital', 'Licenciatura en Ingeniería en Tecnologías de la Información y Innovación',
        'TSU en Desarrollo de Software Multiplataforma', 'Licenciatura en Ingeniería en Tecnologías de la Información y Innovación', 'TSU en Infraestructura de Redes Digitales',
        'Licenciatura en Ingeniería en Tecnologías de la Información y Innovación', 'TSU en Entornos Virtuales y Negocios Digitales'];
    }
  }

  validarTelefonosYCorreos(): boolean {
    const telefonoRegex = /^\d{10}$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const telefonosValidos = this.alumno.telefonos.every((tel: string) => telefonoRegex.test(tel));
    const correosValidos = this.alumno.correos.every((correo: string) => correoRegex.test(correo));
    const tutorTelefonosValidos = this.alumno.tutores[0].telefonos.every((tel: string) => telefonoRegex.test(tel));
    const tutorCorreosValidos = this.alumno.tutores[0].correos.every((correo: string) => correoRegex.test(correo));
  
    return telefonosValidos && correosValidos && tutorTelefonosValidos && tutorCorreosValidos;
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
    this.generateMatricula();
    if (this.edadInvalida || !this.validarTelefonosYCorreos()) {
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

  trackByIndex(index: number, obj: any): any {
    return index;
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