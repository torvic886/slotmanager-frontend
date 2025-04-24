import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaquinaService, Maquina} from '../../services/maquina.service';


@Component({
  selector: 'app-maquinas-list',
  templateUrl: './maquinas-list.component.html',
  styleUrls: ['./maquinas-list.component.scss']
})
export class MaquinasListComponent implements OnInit {
  maquinas: Maquina[] = [];
  mostrarModal = false;
  // maquinaActual: Maquina = this.nuevaMaquina();
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
    this.maquinaActual = null; // Si es agregar, limpia los datos
    this.mostrarModal = true;
  }

  abrirModalEditar(maquina: any) {
    this.maquinaActual = { ...maquina }; // Clona la máquina seleccionada
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarMaquina() {
    if (this.maquinaActual && this.maquinaActual.id) {
      this.maquinaService.updateMaquina(this.maquinaActual.id, this.maquinaActual).subscribe({
        next: (actualizada) => {
          // Actualiza la lista local sin volver a pedir a la API (opcional)
          const idx = this.maquinas.findIndex(m => m.id === actualizada.id);
          if (idx > -1) {
            this.maquinas[idx] = actualizada;
          }
          this.cerrarModal();
        },
        error: () => {
          this.error = 'Error al actualizar máquina';
        }
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
    const confirmacion = confirm(`¿Seguro que deseas eliminar la máquina "${maquina.nombre}"?`);
    if (confirmacion) {
      alert(`Eliminar máquina ID: ${maquina.id} (pendiente de implementar)`);
      // Aquí pones la lógica real para eliminar en el futuro
    }
  }
}


