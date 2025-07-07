import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  usuario: any;
  edad: number = 0;

  ngOnInit() {
    const data = localStorage.getItem('usuario');
    if (data) {
      this.usuario = JSON.parse(data);
      this.edad = this.calcularEdad(this.usuario.Anio, this.usuario.Mes, this.usuario.Dia);
    }
  }

calcularEdad(anio: number, mes: number, dia: number): number {
  const hoy = new Date();
  const nacimiento = new Date(anio, mes - 1, dia);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}
}