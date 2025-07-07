import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  newUser = {
    UserName: '',
    Correo: '',
    Contrasena: '',
    Dia: '',
    Mes: '',
    Anio: ''
  };
  Confirmar: string = ''; 
  edadError: string = '';
  passwordsMatch(): boolean {
    return this.newUser.Contrasena === this.Confirmar;
  }
  esCorreoGmailValido(): boolean {
    return this.newUser.Correo.endsWith('@gmail.com');
  }
  validarEdad(): boolean {
    if (!this.newUser.Dia || !this.newUser.Mes || !this.newUser.Anio) {
      this.edadError = 'Por favor completa todos los campos de fecha';
      return false;
    }
    
    const dia = parseInt(this.newUser.Dia);
    const mes = parseInt(this.newUser.Mes);
    const anio = parseInt(this.newUser.Anio);
    
    // Validar rangos básicos
    if (dia < 1 || dia > 31) {
      this.edadError = 'Día inválido';
      return false;
    }
    
    if (mes < 1 || mes > 12) {
      this.edadError = 'Mes inválido';
      return false;
    }
    
    // Validar año realista (entre 1900 y el año actual)
    const añoActual = new Date().getFullYear();
    if (anio < 1900 || anio > añoActual) {
      this.edadError = 'Año inválido';
      return false;
    }
    
    // Calcular edad exacta
    const fechaNacimiento = new Date(anio, mes - 1, dia);
    const hoy = new Date();
    
    // Validar fecha válida (por ejemplo, 31 de febrero)
    if (fechaNacimiento.getDate() !== dia || 
        fechaNacimiento.getMonth() !== mes - 1 || 
        fechaNacimiento.getFullYear() !== anio) {
      this.edadError = 'Fecha inválida';
      return false;
    }
    
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    
    // Ajustar edad si aún no ha pasado el cumpleaños este año
    if (mesActual < (mes - 1) || (mesActual === (mes - 1) && diaActual < dia)) {
      edad--;
    }
    
    // Validar rango de edad razonable
    if (edad < 13) {
      this.edadError = 'Debes tener al menos 13 años para registrarte';
      return false;
    }
    
    if (edad > 120) {
      this.edadError = 'Por favor ingresa una edad válida';
      return false;
    }
    
    this.edadError = '';
    return true;
  }
  formularioValido(): boolean {
    return this.passwordsMatch() && this.validarEdad();
  }
  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.signup(this.newUser).subscribe({
      next: (res) => {
        console.log('Usuario registrado exitosamente', res);
        alert('¡Registro exitoso!');
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Error al registrar. Verifica los datos.');
      }
    });
  }

}
