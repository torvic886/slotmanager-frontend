import { Component, OnInit } from '@angular/core';
import { MaquinaService, Maquina } from './services/maquina.service';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css']
})
export class MaquinasComponent implements OnInit {
  maquinas: Maquina[] = [];
  loading = false;
  error = '';

  // Inyecta el servicio en el constructor
  constructor(private maquinaService: MaquinaService) {}

  ngOnInit() {
    this.cargarMaquinas();
  }

  cargarMaquinas() {
    this.loading = true;
    this.maquinaService.getMaquinas().subscribe({
      next: (data: Maquina[]) => {
        this.maquinas = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar máquinas';
        this.loading = false;
      }
    });
  }
}
