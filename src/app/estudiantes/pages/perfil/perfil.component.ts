import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service'; // Importamos el servicio correcto

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any = { 
    telefonos: [], 
    correos: [], 
    domicilio: {}, 
    tutor: { domicilio: {},
            telefonos: [],   // Aseguramos que telefonos del tutor sean un array
            correos: [] }
  };  // Inicializamos con valores predeterminados

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    // Solo establecer un ID si no está presente en el localStorage (para pruebas)
    if (!localStorage.getItem('-_id')) {
      localStorage.setItem('_id', '67d65008899a15cd780c730f');  // Este es un ID de prueba
    }

    const alumnoId = localStorage.getItem('_id');  // Obtener el ID del estudiante desde el localStorage

    if (alumnoId) {
      // Usamos el servicio para obtener los datos del alumno por su ID
      this.alumnoService.obtenerAlumnoPorId(alumnoId).subscribe(  // Cambié a obtenerAlumnoPorId
        (data: any) => {  // Especificamos el tipo de data
          // Aseguramos que telefonos y correos sean siempre arrays
          this.user = { 
            ...data, 
            telefonos: Array.isArray(data.telefonos) ? data.telefonos : [],  // Asegurarse de que telefonos sea un array
            correos: Array.isArray(data.correos) ? data.correos : [],  // Asegurarse de que correos sea un array
            domicilio: data.domicilio || {},
            tutor: data.tutores && data.tutores[0] || { domicilio: {}, telefonos: [], correos: [] }
          };
        },
        (error: any) => {  // Especificamos el tipo de error
          console.error('Error al obtener los datos del estudiante', error);
        }
      );
    } else {
      console.log('ID del estudiante no encontrado');
    }
  }
}
