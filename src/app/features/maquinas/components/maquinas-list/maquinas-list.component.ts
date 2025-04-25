import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaquinaService, Maquina} from '../../services/maquina.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-maquinas-list',
  templateUrl: './maquinas-list.component.html',
  styleUrls: ['./maquinas-list.component.scss']
})
export class MaquinasListComponent implements OnInit {
  maquinas: Maquina[] = [];
  mostrarModal = false;
  modoEdicion = false;
  // maquinaActual: Maquina = this.nuevaMaquina();
  //maquinaActual: Maquina = this.nuevaMaquina();
  maquinaActual: Maquina | null = null;

  loading = false;
  error = '';
  maquinaForm!: FormGroup;
  modo: 'agregar' | 'editar' = 'agregar';
  maquinaSeleccionada: Maquina | null = null;

    nuevaMaquina(): Maquina {
    return {
      id: undefined,
      nombre: '',
      fechaInstalacion: '',
      estado: 'ACTIVA'
    };
  }

  constructor(private maquinaService: MaquinaService) {}

  ngOnInit(): void {
    this.cargarMaquinas();
  }

  abrirModalAgregar() {
    this.modoEdicion = false;
    this.maquinaActual = {
      nombre: '',
      fechaInstalacion: '',
      estado: 'ACTIVA'
    };
    this.mostrarModal = true;
  }
  

  abrirModalEditar(maquina: Maquina) {
    this.modoEdicion = true;
    // Hacer copia para no afectar el listado si cancelan
    this.maquinaActual = { ...maquina };
    this.mostrarModal = true;
  }
  

  cerrarModal() {
    this.mostrarModal = false;
    this.maquinaActual = null;
    this.modoEdicion = false;
  }
  

  guardarMaquina() {
    if (this.modoEdicion && this.maquinaActual && this.maquinaActual.id) {
      // EDITAR
      this.maquinaService.updateMaquina(this.maquinaActual.id, this.maquinaActual).subscribe({
        next: (data) => {
          // Actualizar la máquina en el array local
          const idx = this.maquinas.findIndex(m => m.id === this.maquinaActual?.id);
          if (idx !== -1) this.maquinas[idx] = data;
          this.cerrarModal();
          Swal.fire('¡Editada!', 'La máquina fue editada correctamente', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo editar la máquina', 'error')
      });
    } else if (this.maquinaActual) {
      // AGREGAR
      const { id, ...maquinaSinId } = this.maquinaActual;
      this.maquinaService.createMaquina(maquinaSinId).subscribe({
        next: (data) => {
          this.maquinas.push(data);
          this.cerrarModal();
          Swal.fire('¡Agregada!', 'La máquina fue registrada exitosamente', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo agregar la máquina', 'error')
      });
    }
  }
  

  verMaquina(maquina: Maquina) {
    // Por ahora puedes mostrar un alert o guardar la máquina en una variable
    alert(`Ver detalles de la máquina: ${maquina.nombre}`);
    // O puedes abrir un modal de detalles, según tu flujo
  }

  cargarMaquinas(): void {
    this.loading = true;
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

  agregarMaquina() {
    alert('Función para agregar máquina (pendiente de implementar)');
    // Aquí puedes redirigir a un formulario o abrir un modal en el futuro
  }

  editarMaquina(maquina: Maquina) {
    alert(`Editar máquina ID: ${maquina.id} (pendiente de implementar)`);
    // Aquí puedes redirigir a editar, abrir modal, etc.
  }

  eliminarMaquina(maquina: Maquina) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar la máquina: "${maquina.nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.maquinaService.deleteMaquina(maquina.id!).subscribe({
          next: () => {
            // Actualiza el listado quitando la máquina eliminada
            this.maquinas = this.maquinas.filter(m => m.id !== maquina.id);
            Swal.fire('Eliminada', 'La máquina fue eliminada exitosamente.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la máquina.', 'error');
          }
        });
      }
    });
  }
  
}


