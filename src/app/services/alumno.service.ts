import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private apiUrl = 'http://localhost:3000/api/alumnos';  // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo alumno
  registrarAlumno(alumno: any): Observable<any> {
    return this.http.post(this.apiUrl, alumno);
  }

  // Método para obtener los datos del alumno por su ID
  obtenerAlumno(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  actualizarAlumno(id: string, alumno: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, alumno);
  }

  // Método para obtener todos los alumnos
obtenerAlumnos(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}
}
