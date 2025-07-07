import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
interface HistorialComentario {
  fecha_vista: string;
  contenido: string;
  titulo: string;
}

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class comentariosComponent implements OnInit {
  historial: HistorialComentario[] = [];
  usuarioId: number = 0;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioId = JSON.parse(usuario).idusuario;
      this.cargarHistorial();
    }
  }

  cargarHistorial(): void {
    this.http.get<HistorialComentario[]>(`https://app-38bd8802-6852-491d-a0f9-794881613c9b.cleverapps.io/historialcomentarios/${this.usuarioId}`).subscribe({
      next: (res) => {
        this.historial = res;
      },
      error: (err) => {
        console.error('Error al obtener historial:', err);
      }
    });
  }
}