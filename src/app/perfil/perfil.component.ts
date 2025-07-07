import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  constructor(private router: Router) {} 
  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']); 
    console.log('Sesión cerrada');
  }

  verHistorial() {
    this.router.navigate(['/perfil/historial']);
  }
  descargarRDF() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const idusuario = usuario.idusuario;
    localStorage.getItem('usuario');

    const url = `https://app-38bd8802-6852-491d-a0f9-794881613c9b.cleverapps.io/ontologia/dinamico/${idusuario}`;
  
    this.forceDownload(url, `usuario_${idusuario}.ttl`);
  }
  
  forceDownload(url: string, filename: string) {
    fetch(url)
  .then(response => {
    if (!response.ok) throw new Error('Error al descargar RDF');
    return response.blob();
  })
  .then(blob => {
    const link = document.createElement('a');
    const blobUrl = window.URL.createObjectURL(blob);
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link); // Necesario en Firefox
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl); // Limpieza
  })
  .catch(console.error);

  }
  
}
