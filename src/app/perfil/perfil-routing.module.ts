import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { InfoComponent } from './info/info.component';
import { PostComponent } from './Post/Post.component';
import { comentariosComponent } from './comentarios/comentarios.component';
const routes: Routes = [
  {
    path: '',
    component: PerfilComponent,
    children: [
      { path: 'info', component: InfoComponent },
      {path: 'Post', component: PostComponent},
      {path: 'comentarios', component: comentariosComponent},
      { path: '', redirectTo: 'info', pathMatch: 'full' } // Redirige por defecto
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule {}