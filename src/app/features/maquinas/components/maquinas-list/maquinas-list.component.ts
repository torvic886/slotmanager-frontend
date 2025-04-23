//prueba
import { Component } from '@angular/core';

@Component({
  selector: 'app-maquinas-list',
  templateUrl: './maquinas-list.component.html',
  styleUrls: ['./maquinas-list.component.scss']
})
export class MaquinasListComponent {
  maquinas = [
    { id: 1, nombre: 'SlotMaster 3000', fecha_instalacion: '2023-05-10', estado: 'activa' },
    { id: 2, nombre: 'MegaJackpot', fecha_instalacion: '2022-12-01', estado: 'inactiva' },
    { id: 3, nombre: 'LuckyStar', fecha_instalacion: '2021-07-15', estado: 'en reparación' }
  ];
}

