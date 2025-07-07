import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { HttpClientModule } from '@angular/common/http';
//AYUDAAA, CAMBIE BASTANTES COSITAS
@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  historialNoticias: any[] = [];
  usuarioId!: number;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      console.error('No hay usuario en localStorage');
      return;
    }

    try {
      const usuario = JSON.parse(usuarioStr);
      this.usuarioId = usuario.idusuario;
    } catch (e) {
      console.error('Error al parsear usuario:', e);
      return;
    }

    this.cargarHistorialNoticias();
  }

  cargarHistorialNoticias() {
    this.authService.getHistorialNoticias(this.usuarioId).subscribe({
      next: (res) => {
        this.historialNoticias = res;
      },
      error: (err) => {
        console.error('Error al obtener historial de noticias:', err);
      }
    });
  }
}
