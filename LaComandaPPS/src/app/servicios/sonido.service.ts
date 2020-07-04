import { Injectable } from '@angular/core';
import { Howl } from 'howler';

export interface Track {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class SonidoService {

  playlist: Track[] = [
    {
      name: 'campanita',
      path: '../assets/sonidos/campanita.mp3'
    }
  ];

  trackActivo: Track = null;
  player: Howl = null;  
  sonidoActivado: boolean = true;

  constructor() { }

  start(track : Track){
    if(this.player){
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path]
    });
    if(this.sonidoActivado){
      this.player.play();
    }
  }

  stop(){
    if(this.player){
      this.player.stop();
    }  
  }  
}
