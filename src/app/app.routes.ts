import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { InfoComponent } from './perfil/info/info.component';
import { HistorialComponent } from './perfil/historial/historial.component';
import { PostComponent } from './perfil/Post/Post.component';
import { comentariosComponent } from './perfil/comentarios/comentarios.component';
export const routes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent,
    children: [
      { path: 'info', component: InfoComponent },
      { path: 'historial', component: HistorialComponent }, // ✅ ahora sí
      { path: 'Post', component: PostComponent},
      {path: 'comentarios', component: comentariosComponent},
      { path: '', redirectTo: 'info', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./inicio/inicio.component').then((m) => m.InicioComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./log-in/log-in.component').then((m) => m.LogInComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./sign-up/sign-up.component').then((m) => m.SignUpComponent)
  },
  {
    path: 'news',
    loadComponent: () =>
      import('./noticia/noticia.component').then((m) => m.NoticiaComponent)
  },
  {
    path: 'searching',
    loadComponent: () =>
      import('./searching/searching.component').then((m) => m.SearchingComponent)
  },
  {
    path: 'aboutus',
    loadComponent: () =>
      import('./about-us/about-us.component').then((m) => m.AboutUsComponent)
  }
];
