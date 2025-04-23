import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecaudosRoutingModule } from './recaudos-routing.module';
import { RecaudosComponent } from './recaudos.component';


@NgModule({
  declarations: [
    RecaudosComponent
  ],
  imports: [
    CommonModule,
    RecaudosRoutingModule
  ]
})
export class RecaudosModule { }
