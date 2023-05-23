import { Component, OnInit } from '@angular/core';
import { Pregunta } from '../pregunta.service';
import { PreguntaService } from '../pregunta.service';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class PreguntaComponent implements OnInit {
  preguntas: Pregunta[] = [];
  usuario: Usuario = new Usuario();

  preguntaActual: number = 999;

  form = {
    email: '',
    edad: null,
  };

  public progressPorcentaje = 0;

  haySeleccion = false;

  conversorLlamado = false;

  public isLoggedIn: boolean = false;
  primerasSegundasSeleccionadas: boolean | undefined;
  tercerasCuartasSeleccionadas: boolean | undefined;

  constructor(
    private preguntaService: PreguntaService,
    private https: HttpClient,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.preguntas = this.preguntaService.getPreguntas();
  }

  ngAfterViewChecked(): void {
    if (
      this.preguntaActual === this.preguntas.length &&
      !this.conversorLlamado
    ) {
      this.conversor();
      this.conversorLlamado = true;
    }
  }

  seleccionarRespuesta(pregunta: Pregunta, opcionSeleccionada: string) {
    pregunta.seleccionado = pregunta.seleccionado || [];

    // Verificar si ya hay una opción seleccionada
    if (pregunta.seleccionado.length > 0) {
      // Desmarcar la opción anterior
      pregunta.seleccionado = [opcionSeleccionada];
    } else {
      // Agregar la opción seleccionada
      pregunta.seleccionado.push(opcionSeleccionada);
    }

    this.verificarSeleccion();
    this.progressPorcentaje =
      ((this.preguntaActual + 1) / this.preguntas.length) * 100;
  }

  verificarSeleccion() {
    const preguntaActual = this.preguntas[this.preguntaActual];

    if (this.preguntaActual === 3) {
      const opcionesSeleccionadas = preguntaActual.seleccionado.length;
      const primerasSegundasOpcionesSeleccionadas = preguntaActual.respuesta
        .slice(0, 2)
        .every((opcion) => preguntaActual.seleccionado.includes(opcion.opcion));
      const tercerasCuartasOpcionesSeleccionadas = preguntaActual.respuesta
        .slice(2, 4)
        .every((opcion) => preguntaActual.seleccionado.includes(opcion.opcion));
      this.primerasSegundasSeleccionadas =
        opcionesSeleccionadas === 2 && primerasSegundasOpcionesSeleccionadas;
      this.tercerasCuartasSeleccionadas =
        opcionesSeleccionadas === 2 && tercerasCuartasOpcionesSeleccionadas;
      this.haySeleccion = opcionesSeleccionadas > 0;
    } else if (!preguntaActual['esMultiple']) {
      // Si la pregunta no es de selección múltiple
      this.haySeleccion = preguntaActual.seleccionado.length === 1;
    } else {
      // Pregunta de selección múltiple
      this.haySeleccion = preguntaActual.seleccionado.length > 0;
    }
  }

  // Agrega un método para validar las opciones seleccionadas en la cuarta pregunta
  validarOpcionesSeleccionadas(pregunta: Pregunta): boolean {
    const opcionesSeleccionadas = pregunta.seleccionado.length;
    const primerasSegundasOpcionesSeleccionadas = pregunta.respuesta
      .slice(0, 2)
      .every((opcion) => pregunta.seleccionado.includes(opcion.opcion));
    const tercerasCuartasOpcionesSeleccionadas = pregunta.respuesta
      .slice(2, 4)
      .every((opcion) => pregunta.seleccionado.includes(opcion.opcion));
    return (
      opcionesSeleccionadas === 2 &&
      !primerasSegundasOpcionesSeleccionadas &&
      !tercerasCuartasOpcionesSeleccionadas
    );
  }

  // Resto del código omitido

  seleccionarVarias(pregunta: Pregunta, opcion: string, seleccionado: boolean) {
    if (seleccionado) {
      pregunta.seleccionado.push(opcion);
    } else {
      let index = pregunta.seleccionado.indexOf(opcion);
      if (index > -1) {
        pregunta.seleccionado.splice(index, 1);
      }
    }
    this.verificarSeleccion();
  }

  siguiente() {
    if (
      this.preguntaActual === 3 &&
      this.preguntas[this.preguntaActual].seleccionado.length < 2
    ) {
      return; // No avanza si no se han seleccionado al menos dos opciones en la cuarta pregunta
    }
    this.progressPorcentaje =
      ((this.preguntaActual + 1) / this.preguntas.length) * 100;
    this.preguntaActual++;
    this.verificarSeleccion();
  }

  onSubmit() {
    this.preguntaActual = 0;
    this.isLoggedIn = true;
  }

  bukatu() {
    this.preguntaActual = 999;
    this.isLoggedIn = false;
  }
  
  conversor() {
    const respuesta1 = this.preguntas[0].seleccionado[0];
    const respuesta2 = this.preguntas[1].seleccionado[0];
    const respuesta3 = this.preguntas[2].seleccionado.join(', '); // Unir las respuestas en un solo string separado por comas
    const respuesta4 = this.preguntas[3].seleccionado.join(', ');
    const respuesta5 = this.preguntas[4].seleccionado[0];
    const respuesta6 = this.preguntas[5].seleccionado[0];

    // Obtener email y edad del formulario
    const email = this.form.email;
    const edad = this.form.edad;

    // Verificar si la edad no es nula antes de asignarla
    const usuario = new Usuario();
    usuario.email = email;
    if (edad !== null) {
      usuario.edad = edad;
    }
    usuario.respuesta1 = respuesta1;
    usuario.respuesta2 = respuesta2;
    usuario.respuesta3 = respuesta3;
    usuario.respuesta4 = respuesta4;
    usuario.respuesta5 = respuesta5;
    usuario.respuesta6 = respuesta6;

    console.log(usuario);
    this.usuarioService.createUser(usuario).subscribe(
      (userData) => {
        console.log(userData);
      },
      (error) => console.log(error)
    );
  }
}
