// secundario.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Datos } from '../../../datos';

@Component({
  selector: 'app-secundario',
  templateUrl: './secundario.component.html',
  styleUrls: ['./secundario.component.css'],
})
export class SecundarioComponent {
  @Output() enviarDatos = new EventEmitter<Datos>();

  datos: Datos = {
    nombre: 'Juan Camilo',
    apellido: 'Pedraza',
    edad: 19,
    telefono: '3044163214',
  };

  enviarDatosAlPrincipal(): void {
    this.enviarDatos.emit(this.datos);
  }
}
