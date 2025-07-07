import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from './noticia/noticia.component';
import { Comentario } from './noticia/noticia.component';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://app-38bd8802-6852-491d-a0f9-794881613c9b.cleverapps.io';
  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data: { Correo: string; Contrasena: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.baseUrl}/noticias`);
  }

  postComentario(comentario: {
    contenido: string;
    fechacoment: string;
    idusuario: number;
    idnoticias: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/comentarios`, comentario);
  }

  getComentarios(idNoticia: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.baseUrl}/comentarios/${idNoticia}`);
  }

  getHistorialComentarios(idusuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/historialcomentarios/${idusuario}`);
  }
  getLikes(idnoticia: number): Observable<{ totalLikes: number }> {
    return this.http.get<{ totalLikes: number }>(`${this.baseUrl}/likes/${idnoticia}`);
  }
  postLike(data: {
  idusuarioLI: number;
  idnoticiaLI: number;
  fecha_like: string;
}): Observable<any> {
  return this.http.post(`${this.baseUrl}/likes`, data);
}

// Quitar un like
deleteLike(data: {
  idusuarioLI: number;
  idnoticiaLI: number;
}): Observable<any> {
  return this.http.request('DELETE', `${this.baseUrl}/likes`, { body: data });
}

// Obtener todos los likes que ha dado un usuario
getLikesDeUsuario(idusuario: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/likes/usuario/${idusuario}`);
}
//agregado
  obtenerUsuarioActual(): number {
    return Number(localStorage.getItem('idusuario') || 0);
  }
  //agregado
  postHistorialNoticias(data: {
    fecha_vistah: string;
    idnoticiaHN: number;
    idusuarioHN: number;
  }): Observable<any> {
    return this.http.post<any>('https://app-38bd8802-6852-491d-a0f9-794881613c9b.cleverapps.io/historialnoticias', data);
  }
  //agregadoooo
  getHistorialNoticias(idusuario: number): Observable<any[]> {
    return this.http.get<any[]>(`https://app-38bd8802-6852-491d-a0f9-794881613c9b.cleverapps.io/historialnoticias/${idusuario}`);
  }
  estaAutenticado(): boolean {
    return localStorage.getItem('usuario') !== null;
  }
  postHistorialComentario(data: any) {
    return this.http.post('https://app-38bd8802-6852-491d-a0f9-794881613c9b.cleverapps.io/historialcomentarios', data);
  }
  getNoticia(idnoticia: number): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.baseUrl}/noticias/${idnoticia}`);
  }
  buscarNoticias(termino: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.baseUrl}/buscar?q=${termino}`);
  }
}
