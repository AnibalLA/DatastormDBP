import { Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  estaLogueado: boolean = false;
  usuario: any;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    const data = localStorage.getItem('usuario');
    if (data) {
      this.usuario = JSON.parse(data);
      this.estaLogueado = this.authService.estaAutenticado();
    }
  }
}
