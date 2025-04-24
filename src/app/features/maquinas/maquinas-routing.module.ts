import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaquinasComponent } from './maquinas.component';
import { MaquinasListComponent } from './components/maquinas-list/maquinas-list.component';
import { AuthGuard } from '../../core/auth/auth.guard';


const routes: Routes = [
  { path: '', component: MaquinasListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaquinasRoutingModule { }
