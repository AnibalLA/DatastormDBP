import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './menu/menu.component';



@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DataStorm';

//Mostrar Componentes
  msignUp = false;
  mlogIn = false;
  mmenu = false;

  mostrarInicio() {
    this.mlogIn = false;
    this.msignUp = false;
    this.mmenu = false;
  }

  mostrarSignUp() {
    this.mlogIn = false;
    this.msignUp = true;
  }
  
  mostrarLogIn() {
    this.msignUp = false;
    this.mlogIn = true;
  }
  
  mostrarMenu() {
    this.mmenu = !this.mmenu;
  }
}
