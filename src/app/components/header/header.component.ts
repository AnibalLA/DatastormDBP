import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  estaLogueado: boolean = false;
  //solicitar cambiar compoinentes
  @Output() solicitarMenu = new EventEmitter<void>();
  constructor(private authService: AuthService) {}
  irMenu(){
    this.solicitarMenu.emit();
    this.estaLogueado = this.authService.estaAutenticado();
  }
}
