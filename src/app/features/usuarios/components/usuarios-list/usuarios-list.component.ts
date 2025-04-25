import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { TokenService } from '../../../../core/auth/token.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup;
  mostrarModal = false;
  modoEdicion = false;
  usuarioActual: Usuario | null = null;
  usuarioSeleccionado: Usuario | null = null;
  mostrarPassword = false;
  isAdmin = true;
  loading = false;
  error = '';
  esAdmin = false;
  usuarioEditando: any;
  // Array para controlar visibilidad de cada password
  mostrarPasswords: boolean[] = [];
u: any;


  constructor(private usuarioService: UsuarioService, private fb: FormBuilder,  private tokenService: TokenService) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
    this.verificarRol();
    this.esAdmin = this.tokenService.getRole() === 'ROLE_ADMIN';
  }

  verificarRol() {
    // Asegúrate de inyectar tu TokenService/AuthService que tenga el método getRole
    this.esAdmin = this.tokenService.getRole() === 'ROLE_ADMIN';
  }

  abrirModalAgregar() {
    this.usuarioSeleccionado = null;                  // No hay usuario seleccionado
    this.usuarioForm.reset();                         // Limpia el formulario
    this.mostrarModal = true;                         // Muestra el modal
    this.mostrarPassword = false;                     // Oculta el password por defecto
  }

  cargarUsuarios() {
    this.loading = true;
    this.usuarioService.listarUsuarios().subscribe({
      next: data => {
        this.usuarios = data;
        this.mostrarPasswords = Array(data.length).fill(false);
        this.loading = false;
        // Aquí agregas el console.log
        // console.log('Usuarios recibidos:', this.usuarios);
      },
      error: () => {
        this.error = 'Error al cargar usuarios';
        this.loading = false;
      }
    });
  }
  
  togglePassword(index: number) {
    this.mostrarPasswords[index] = !this.mostrarPasswords[index];
  }

  abrirModal(usuario?: Usuario) {
    this.usuarioSeleccionado = null;
    this.mostrarModal = true;
    if (usuario) {
      this.modoEdicion = true;
      this.usuarioActual = usuario;
      this.usuarioForm.patchValue({
        nombre: usuario.nombre,
        email: usuario.email,
        password: '', // No mostrar la contraseña real
        role: usuario.role
      });
    } else {
      this.modoEdicion = false;
      this.usuarioActual = null;
      this.usuarioForm.reset();
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.usuarioForm.reset();
    this.usuarioActual = null;
    this.modoEdicion = false;
  }

  guardarUsuario() {
    if (this.usuarioForm.invalid) return;

    const usuario: Usuario = this.usuarioForm.value;
    if (this.modoEdicion && this.usuarioActual) {
      this.usuarioService.actualizarUsuario(this.usuarioActual.id!, usuario).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        }
      });
    } else {
      this.usuarioService.crearUsuario(usuario).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        }
      });
    }
  }

  eliminarUsuario(usuario: Usuario) {
    if (confirm(`¿Está seguro de eliminar a ${usuario.nombre}?`)) {
      this.usuarioService.eliminarUsuario(usuario.id!).subscribe({
        next: () => this.cargarUsuarios()
      });
    }
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.usuarioForm.patchValue(usuario);
    // Abre el modal aquí
  }


  verUsuario(usuario: Usuario) {
    // Aquí tu lógica para ver detalles, puedes abrir el mismo modal en modo solo lectura si quieres
  }

}
