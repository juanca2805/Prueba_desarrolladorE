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
    nombre: 'EjemploNombre',
    apellido: 'EjemploApellido',
    edad: 25,
    telefono: '123-456-7890',
  };

  enviarDatosAlPrincipal(): void {
    this.enviarDatos.emit(this.datos);
  }
}
