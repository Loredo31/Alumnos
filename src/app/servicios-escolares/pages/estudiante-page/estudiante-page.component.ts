import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service';
import { ConsecutivoService } from '../../../services/consecutivo.service';

@Component({
  selector: 'app-estudiante-page',
  templateUrl: './estudiante-page.component.html',
  styleUrls: ['./estudiante-page.component.css']
})
export class EstudiantePageComponent implements OnInit {
  consecutivo: number = 1;
  correoAlumno: string = '';
  alumno: any = {
    matricula: '888889',
    foto: 'DND',
    apellido_paterno: 'MNKNK',
    apellido_materno: 'MN',
    nombre: 'NJ',
    fecha_nacimiento: new Date(),
    sexo: 'M',
    telefonos: [],
    correos: [],
    promedio_bachillerato: 9.5,
    especialidad_bachillerato: 'Programacion',
    rfc: 'SHBDBHDBHJD',
    contrasenia: 'brandon',
    domicilio: {
      calle: 'Cantarranas',
      numero_interior: '121',
      numero_exterior: '121',
      colonia: 'Los Aztecas',
      codigo_postal: '7619',
      ciudad: 'Guanajuato'
    },
    tutores: [{
      nombre: 'Brandon',
      apellido_paterno: 'Gustavo',
      apellido_materno: 'Amaro',
      telefonos: [],
      correos: [],
      domicilio: {
        calle: 'XD',
        numero_exterior: '88',
        colonia: '89',
        ciudad: '89',
        codigo_postal: '889'
      }
    }],
    carrera: {
      nombre: 'xd',
      especialidad: 'xd'
    },
    certificado_bachillerato: 1,
    photo: 'njssbhsshjs'
  };

  areas: string[] = ['Área Económico Administrativo', 'Área Industrial, Eléctrica y Electrónica', 'Área en Tecnologías de la Información'];
  specialties: string[] = [];

  photoPreview: string | ArrayBuffer | null = null;
  registroExitoso: boolean = false;

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

  agregarCorreo(): void {
    if (this.alumno.correos?.includes(this.correoAlumno.trim())) {
      alert("La imagen ya existe en la lista.");
      return;
    }
    this.alumno.correos?.push(this.correoAlumno.trim());
    this.correoAlumno = ''; 
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
    // this.generateMatricula();
    console.log(this.alumno)
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
