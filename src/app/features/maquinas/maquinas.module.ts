import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaquinasRoutingModule } from './maquinas-routing.module';
import { MaquinasComponent } from './maquinas.component';
import { MaquinasListComponent } from './components/maquinas-list/maquinas-list.component';


@NgModule({
  declarations: [
    MaquinasComponent,
    MaquinasListComponent
  ],
  imports: [
    CommonModule,
    MaquinasRoutingModule
  ]
})
export class MaquinasModule { }
