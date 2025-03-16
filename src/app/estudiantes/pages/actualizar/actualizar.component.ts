import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service'; // Importamos el servicio correcto

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  user: any = { 
    telefonos: [], 
    correos: [], 
    domicilio: {}, 
    tutor: { domicilio: {}, telefonos: [], correos: [] }
  };  // Inicializamos con valores predeterminados

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    // Obtener el ID del estudiante desde el localStorage
    const alumnoId = localStorage.getItem('estudianteId');

    if (alumnoId) {
      // Usamos el servicio para obtener los datos del alumno por su ID
      this.alumnoService.obtenerAlumno(alumnoId).subscribe(
        (data) => {
          // Aseguramos que telefonos y correos sean siempre arrays
          this.user = { 
            ...data, 
            telefonos: Array.isArray(data.telefonos) ? data.telefonos : [],  
            correos: Array.isArray(data.correos) ? data.correos : [],  
            domicilio: data.domicilio || {},
            tutor: data.tutores && data.tutores[0] || { domicilio: {}, telefonos: [], correos: [] }
          };
        },
        (error) => {
          console.error('Error al obtener los datos del estudiante', error);
        }
      );
    } else {
      console.log('ID del estudiante no encontrado');
    }
  }

  actualizar() {
    const alumnoId = localStorage.getItem('estudianteId');
    
    if (alumnoId) {
      this.alumnoService.actualizarAlumno(alumnoId, this.user).subscribe(
        () => {
          alert('Perfil actualizado correctamente');
        },
        (error) => {
          console.error('Error al actualizar el perfil', error);
        }
      );
    } else {
      console.log('No se pudo obtener el ID del estudiante');
    }
  }

  cancelar() {
    alert('Edición cancelada');
  }
}
