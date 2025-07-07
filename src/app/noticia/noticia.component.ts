import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

export interface Noticia {
  idnoticias: number;
  titulo: string;
  autor: string;
  fecha_publicacion: string;
  contenido: string;
  LIKES: number;
}

export interface Comentario {
  idcomentarios: number;
  idnoticia: number;
  idusuario: number; 
  username: string;
  fechacoment: string;
  contenido: string;
}

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})
export class NoticiaComponent implements OnInit {
  noticias: Noticia[] = [];
  comentarios: Comentario[] = [];
  comentariosMostrados: Comentario[] = [];
  comentariosVisibles: number = 5;
  indiceActual: number = 0;
  nuevoComentario: string = '';
  usuarioActual: number = 0;
  estaLogueado: boolean = false;
  historialComentariosUsuario: number[] = [];
  historialNoticiasUsuario: number[] = [];
  likesPorNoticia: { [key: number]: number } = {};
  usuarioDioLike: { [key: number]: boolean } = {};
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }
  cargarUsuario(): void {
  const usuarioString = localStorage.getItem('usuario');
  if (usuarioString) {
    try {
      const usuarioParseado = JSON.parse(usuarioString);
      this.usuarioActual = usuarioParseado.idusuario;
      this.estaLogueado = true;
      this.cargarLikesDelUsuario(); 

      this.authService.getHistorialComentarios(this.usuarioActual).subscribe({
        next: (res) => {
          this.historialComentariosUsuario = res.map((item: any) => item.idcomentariosHC);
        },
        error: (err) => {
          console.error('Error al obtener historial de comentarios:', err);
        }
      });

      this.authService.getHistorialNoticias(this.usuarioActual).subscribe({
        next: (res) => {
          const hoy = new Date().toISOString().slice(0, 10);
          this.historialNoticiasUsuario = res
            .filter((item: any) => item.fecha_vistah.slice(0, 10) === hoy)
            .map((item: any) => item.idnoticiaHN);

          // ✅ Solo cuando todo el historial esté cargado:
          this.cargarNoticias();
        },
        error: (err) => {
          console.error('Error al obtener historial de noticias:', err);
        }
      });
    } catch (error) {
      console.error('Error al parsear el usuario desde localStorage:', error);
    }
  } else {
    console.warn('No se encontró el usuario en localStorage');
  }
}
  cargarNoticias(): void {
    this.authService.getNoticias().subscribe({
      next: (res) => {
        this.noticias = res;
        if (this.noticias.length > 0) {
          this.indiceActual = 0;
          this.cargarComentarios();
          this.registrarHistorialNoticia();
          this.noticias.forEach(noticia => {
            this.likesPorNoticia[noticia.idnoticias] = noticia.LIKES || 0;
          });
        }
      },
      error: (err) => console.error('Error al cargar noticias:', err)
    });
  }

  cargarLikesNoticia(idnoticia: number): void {
    this.authService.getLikes(idnoticia).subscribe({
      next: (res) => {
        this.likesPorNoticia[idnoticia] = res.totalLikes;
      },
      error: (err) => console.error('Error al cargar likes:', err)
    });
  }
  toggleLike(noticia: Noticia): void {
    if (!this.usuarioActual) {
      alert('Debes iniciar sesión para dar like');
      return;
    }

    const noticiaId = noticia.idnoticias;
    const dioLike = this.usuarioDioLike[noticiaId];

    if (dioLike) {
      this.authService.deleteLike({
        idusuarioLI: this.usuarioActual,
        idnoticiaLI: noticiaId
      }).subscribe({
        next: () => {
          this.usuarioDioLike[noticiaId] = false;
          this.likesPorNoticia[noticiaId] = Math.max(0, this.likesPorNoticia[noticiaId] - 1);
        },
        error: (err) => console.error('Error al quitar like:', err)
      });
    } else {
      this.authService.postLike({
        idusuarioLI: this.usuarioActual,
        idnoticiaLI: noticiaId,
        fecha_like: new Date().toISOString()
      }).subscribe({
        next: () => {
          this.usuarioDioLike[noticiaId] = true;
          this.likesPorNoticia[noticiaId] = (this.likesPorNoticia[noticiaId] || 0) + 1;
        },
        error: (err) => {
          if (err.status === 409) { // Conflicto - ya dio like
            this.usuarioDioLike[noticiaId] = true;
            this.cargarLikesNoticia(noticiaId);
          }
          console.error('Error al dar like:', err);
        }
      });
    }
  }

  noticiaActual(): Noticia | null {
    return this.noticias.length > 0 && this.indiceActual < this.noticias.length
      ? this.noticias[this.indiceActual]
      : null;
  }

  enviarComentario(): void {
    console.log('Método enviarComentario llamado');
  
    const noticia = this.noticiaActual();
    if (!this.nuevoComentario.trim()) {
      console.warn('Comentario vacío');
      return;
    }
    if (!noticia) {
      console.error('No hay noticia seleccionada');
      return;
    }
    const comentarioData = {
      contenido: this.nuevoComentario.trim(),
      fechacoment: new Date().toISOString().slice(0, 10),
      idusuario: this.usuarioActual,
      idnoticias: noticia.idnoticias
    };
  
    console.log('Datos a enviar:', comentarioData);
  
    this.authService.postComentario(comentarioData).subscribe({
      next: (res) => {
        this.nuevoComentario = '';
        alert('Comentario posteado');
        this.cargarComentarios();

        const comentarioId = res.idcomentarios;
  
        const historialData = {
          idusuarioHC: this.usuarioActual,
          idnoticiaHC: noticia.idnoticias,
          idcomentariosHC: comentarioId,
          fecha_vista: new Date().toISOString().slice(0, 10) // opcional si lo manejas
        };
  
        this.authService.postHistorialComentario(historialData).subscribe({
          next: () => {
            console.log('Historial registrado');
          },
          error: (err) => {
            console.error('Error al registrar historial:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al enviar comentario:', err);
      }
    });
  }
  cargarLikesDelUsuario(): void {
  if (!this.usuarioActual) return;

  this.authService.getLikesDeUsuario(this.usuarioActual).subscribe({
    next: (likes) => {
      likes.forEach((like) => {
        this.usuarioDioLike[like.idnoticiaLI] = true;
      });
    },
    error: (err) => {
      console.error('Error al cargar likes del usuario:', err);
    }
  });
}
  cargarComentarios(): void {
    const noticia = this.noticiaActual();
    if (noticia) {
      this.authService.getComentarios(noticia.idnoticias).subscribe({
        next: (res) => {
          this.comentarios = res;
          this.comentariosVisibles = 5;
          this.actualizarComentariosMostrados();
          this.comentariosMostrados.forEach(comentario => {
            if ( comentario.idusuario !== this.usuarioActual && !this.historialComentariosUsuario.includes(comentario.idcomentarios)) {
              this.registrarHistorialComentario(comentario.idcomentarios);
              this.historialComentariosUsuario.push(comentario.idcomentarios); // opcional: agregarlo localmente
            }
          });
        },
        error: (err) => {
          console.error('Error al obtener comentarios:', err);
        }
      });
    } else {
      console.warn('No hay noticia para cargar comentarios');
    }
  }

  actualizarComentariosMostrados(): void {
    this.comentariosMostrados = this.comentarios.slice(0, this.comentariosVisibles);
  }

  mostrarMasComentarios(): void {
    this.comentariosVisibles += 5;
    this.actualizarComentariosMostrados();
  }

  siguiente(): void {
    if (this.indiceActual < this.noticias.length - 1) {
      this.indiceActual++;
      this.cargarComentarios();
      this.registrarHistorialNoticia();
    }
  }

  anterior(): void {
    if (this.indiceActual > 0) {
      this.indiceActual--;
      this.cargarComentarios();
      this.registrarHistorialNoticia();

    }
  }
  registrarHistorialComentario(idcomentario: number): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const datos = {
        fecha_vista: null, // o puedes poner nueva Date() como string si quieres hacerlo desde frontend
        idnoticiaHC: this.noticias[this.indiceActual].idnoticias,
        idusuarioHC: JSON.parse(usuario).idusuario,
        idcomentariosHC: idcomentario
      };
      this.authService.postHistorialComentario(datos).subscribe({
        next: () => {
          console.log('Historial registrado');
        },
        error: (err) => {
          console.error('Error registrando historial de comentario:', err);
        }
      });
    }
  }
  registrarHistorialNoticia(): void {
    const noticia = this.noticiaActual();
    if (!noticia || this.historialNoticiasUsuario.includes(noticia.idnoticias)) {
      return; // Ya vista hoy, no registrar
    }
    const historialData = {
      idusuarioHN: this.usuarioActual,
      idnoticiaHN: noticia.idnoticias,
      fecha_vistah: new Date().toISOString().slice(0, 10)
    };
    this.authService.postHistorialNoticias(historialData).subscribe({
      next: () => {
        console.log('Historial de noticia registrado');
        this.historialNoticiasUsuario.push(noticia.idnoticias); // agregar para evitar futuros duplicados
        },
        error: (err) => {
          console.error('Error al registrar historial de noticia:', err);
        }
      });
    }

}