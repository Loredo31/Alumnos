import { Component, OnInit } from '@angular/core';
import { ObservacionService } from './observacion.service';

interface Observation {
  teacherName: string;
  subject: string;
  semester: number;
  year: number;
  description: string;
}

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit {
  searchQuery: string = '';
  observations: Observation[] = [];
  filteredObservations: Observation[] = [];

  constructor(private observacionService: ObservacionService) {}

  ngOnInit() {
    this.loadObservations();
  }

  loadObservations() {
    this.observacionService.obtenerObservaciones().subscribe(
      (data: Observation[]) => {
        this.observations = data;
        this.filteredObservations = [...this.observations];
      },
      (error) => console.error('Error al cargar observaciones:', error)
    );
  }

  searchObservations() {
    if (this.searchQuery) {
      this.filteredObservations = this.observations.filter(observation =>
        observation.teacherName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        observation.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        observation.year.toString().includes(this.searchQuery)
      );
    } else {
      this.filteredObservations = [...this.observations];
    }
  }

  addObservation() {
    console.log('Abrir formulario para agregar observación');
  }

  editObservation(observation: Observation) {
    console.log('Editar observación:', observation);
  }

  deleteObservation(observation: Observation) {
    this.filteredObservations = this.filteredObservations.filter(obs => obs !== observation);
    console.log('Eliminar observación:', observation);
  }
}
