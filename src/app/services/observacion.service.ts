import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservacionService {
  private apiUrl = 'http://localhost:3000/api/observaciones';  // URL del backend

  constructor(private http: HttpClient) { }

  // Obtener las observaciones de un profesor específico
  obtenerObservacionesPorProfesor(profesorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesor/${profesorId}`);
  }

  // Agregar una nueva observación
  agregarObservacion(observacion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, observacion);
  }

  // Eliminar una observación por ID
  eliminarObservacion(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
