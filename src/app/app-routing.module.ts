import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

// Estructura recomendada de rutas
const routes: Routes = [
  // Redirige raíz a login
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Rutas de autenticación (login, register, recovery, etc.)
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },

  // CRUD Máquinas (protegido)
  { path: 'maquinas', 
    loadChildren: () => import('./features/maquinas/maquinas.module').then(m => m.MaquinasModule), 
    canActivate: [AuthGuard] 
  },

  // CRUD Recaudos (protegido)
  { path: 'recaudos', 
    loadChildren: () => import('./features/recaudos/recaudos.module').then(m => m.RecaudosModule), 
    canActivate: [AuthGuard] 
  },

  // CRUD Usuarios (protegido)
  { path: 'usuarios', 
    loadChildren: () => import('./features/usuarios/usuarios.module').then(m => m.UsuariosModule), 
    canActivate: [AuthGuard] 
  },

  // Wildcard: rutas no encontradas
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
