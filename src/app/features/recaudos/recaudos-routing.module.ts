import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecaudosComponent } from './recaudos.component';

const routes: Routes = [{ path: '', component: RecaudosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecaudosRoutingModule { }
