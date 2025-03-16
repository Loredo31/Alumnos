import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservacionService {
  private apiUrl = 'http://localhost:3000/api/observaciones';  // URL del backend

  constructor(private http: HttpClient) { }

  obtenerObservaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
