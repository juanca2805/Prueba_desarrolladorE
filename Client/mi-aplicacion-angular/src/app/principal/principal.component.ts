// principal.component.ts
import { Component } from '@angular/core';
import { Datos } from '../datos';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  datos: Datos[] = [];

  recibirDatos(datos: Datos): void {
    this.datos.push(datos);
  }
}
