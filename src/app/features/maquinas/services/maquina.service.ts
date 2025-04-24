import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Maquina {
  id: number;
  nombre: string;
  fechaInstalacion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {
  private apiUrl = 'http://localhost:8080/api/maquinas';

  constructor(private http: HttpClient) {}

  // Obtener todas las máquinas
  getMaquinas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(this.apiUrl);
  }

  // Crear máquina
  createMaquina(maquina: Maquina): Observable<Maquina> {
    return this.http.post<Maquina>(this.apiUrl, maquina);
  }

  // Actualizar máquina
  updateMaquina(id: number, maquina: Maquina): Observable<Maquina> {
    return this.http.put<Maquina>(`${this.apiUrl}/${id}`, maquina);
  }

  // Eliminar máquina
  deleteMaquina(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
