import { Injectable } from '@angular/core';

export interface Opcion {
  opcion: string;
}

export interface Pregunta {
  pregunta: string;
  respuesta: Opcion[];
  esMultiple: Boolean;
  seleccionado: string[];
}


@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  preguntas: Pregunta[] = [
    {
      pregunta: 'Oraintxe bertan zer nolako sasoian zaudela esango zenuke?',
      respuesta: [
        { opcion: 'Sasoi txarrean'},
        { opcion: 'Sasoi onean'},
        { opcion: 'Sasoi oso onean'},
        { opcion: 'Sasoi betean'},
      ],
      esMultiple:false,
      seleccionado: []
    },
    {
      pregunta:'Zenbat egunetan egin duzu jarduera fisikoaren bat azken astean?',
      respuesta: [
        { opcion: 'Aste honetan ez'},
        { opcion: 'Hiru baino gutxiago'},
        { opcion: 'Hiru edo lau egun'},
        { opcion: 'Bost edo sei egun'},
        { opcion: 'Egunero'},
      ],
      esMultiple:false,
      seleccionado: []
    },
    {
      pregunta: 'Aukeratu gustukuen dituzun kirolak:',
      respuesta: [
        { opcion: 'Bizikleta'},
        { opcion: 'Fitness'},
        { opcion: 'Futbol'},
        { opcion: 'Running'},
        { opcion: 'Igeriketa'},
        { opcion: 'Basketball'},
        { opcion: 'Paseoa'},
        { opcion: 'Yoga'},
        { opcion: 'Crossfit'},
        { opcion: 'Beste bat?'},
      ],
      esMultiple:true,
      seleccionado: []
    },
    {
      pregunta: 'Non eta nola nahiago duzu kirola? Bi opzio aukeratu behar dira, bakoitzetik bat',
      respuesta: [
        { opcion: 'Bakarrik'},
        { opcion: 'Gende gehiagorekin'},
        { opcion: 'Barne ekintzak'},
        { opcion: 'Kanpo ekintzak'},
      ],
      esMultiple:true,
      seleccionado: []
    },
    {
      pregunta:
        'Eguneko zein momentuan egin ohi duzu (edo egin dezakezu) kirola?',
      respuesta: [
        { opcion: 'Goizean'},
        { opcion: 'Eguerdian'},
        { opcion: 'Arratsaldean'},
        { opcion: 'Gauean'},
      ],
      esMultiple:false,
      seleccionado: []
    },
    {
      pregunta: 'Zein helbururekin egiten duzu kirol-jarduera?',
      respuesta: [
        { opcion: 'Ohitura osasuntsuak'},
        { opcion: 'Mantenimendua'},
        { opcion: 'Pisua aldatzeko'},
        { opcion: 'Sasoi hobea lortzeko'},
      ],
      esMultiple:false,
      seleccionado: []
    },
  ];
  constructor() {}

  getPreguntas() {
    return this.preguntas;
  }
}
