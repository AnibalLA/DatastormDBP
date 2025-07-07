import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';
import {Router} from '@angular/router'

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  user = {
    Correo: '',
    Contrasena: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

 onSubmit() {

  this.authService.login(this.user).subscribe({
    next: (response) => {
      console.log('Login exitoso: ', response);
    
      const usuario = {
        idusuario: response.usuario.id, // ✅ aquí se incluye correctamente
        UserName: response.usuario.UserName,
        Correo: response.usuario.Correo,
        Anio: parseInt(response.usuario.Anio),
        Mes: parseInt(response.usuario.Mes),
        Dia: parseInt(response.usuario.Dia)
      };
    
      localStorage.setItem('usuario', JSON.stringify(usuario)); // ✅ ahora incluye idusuario
    
      console.log('ID de usuario guardado:', usuario.idusuario);
      alert('¡Inicio de sesión exitoso!');
      this.router.navigate(['/perfil/info']); 
    },
    
    error: (error) => {
      console.error('Error al iniciar sesión:', error);
      alert('Correo o contraseña incorrectos.'); 
    }
  });
}
}
