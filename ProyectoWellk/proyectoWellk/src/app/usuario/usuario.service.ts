import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Endpoint del Backend
  private backendURL: string = "http://localhost:8080/preguntas/usuario";
  
  constructor(
    //HttpClient para proporcionar métodos que reciben datos del backend
    private httpClient: HttpClient
    ) { }

  //Methods
  //Para cada uno de ellos usamos uno de los métodos request HTTP
  //GET
  findAllUsers(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.backendURL}`);
  }

  //POST
  createUser(usuarioNew: Usuario): Observable<Object>{
    return this.httpClient.post(`${this.backendURL}`, usuarioNew);
  }
}
