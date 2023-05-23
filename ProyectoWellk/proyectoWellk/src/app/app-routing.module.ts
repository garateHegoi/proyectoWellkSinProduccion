import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PreguntaComponent } from './pregunta/pregunta.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'pregunta', component: PreguntaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
