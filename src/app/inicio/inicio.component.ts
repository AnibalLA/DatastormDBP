import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  //actualizar fecha y hora
  fecha: string = '';
  hora: string = '';
  ngOnInit(): void {
    this.actualizar();
    setInterval(() => this.actualizar(), 1000);
  }
  actualizar(): void {
    const now = new Date();
    this.fecha = now.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.hora = now.toLocaleTimeString('es-ES');
  }
}