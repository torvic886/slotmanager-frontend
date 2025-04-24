import { Component, OnInit } from '@angular/core';

import { MaquinaService, Maquina} from '../../services/maquina.service';


@Component({
  selector: 'app-maquinas-list',
  templateUrl: './maquinas-list.component.html',
  styleUrls: ['./maquinas-list.component.scss']
})
export class MaquinasListComponent implements OnInit {
  maquinas: Maquina[] = [];
  loading = false;
  error: string | null = null

  constructor(private maquinaService: MaquinaService) {}

  ngOnInit(): void {
    this.cargarMaquinas();
  }

  cargarMaquinas(): void {
    this.loading = true;
    this.error = null;
    this.maquinaService.getMaquinas().subscribe({
      next: (data) => {
        this.maquinas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar máquinas';
        this.loading = false;
      }
    });
  }
}


