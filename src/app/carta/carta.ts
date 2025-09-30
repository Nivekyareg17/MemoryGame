import { Component,ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-carta',
  standalone: false,
  templateUrl: './carta.html',
  styleUrls: ['./carta.css']
})
export class Carta {
  interrogacion = "https://copilot.microsoft.com/th/id/BCO.2cbff5eb-4d76-49c2-ac87-548c6b3a108c.png";

  getImagen(index: number): string {
    const nombre = this.configuracion[index];
    const imagenes: { [key: string]: string } = {
      gunsNroses: "https://copilot.microsoft.com/th/id/BCO.7843156f-f80f-4998-8bf8-6ab64cd040c3.png",
      metallica: "https://copilot.microsoft.com/th/id/BCO.90c92acc-5928-4781-80b0-af41b990dcb6.png",
      mago0z: "https://copilot.microsoft.com/th/id/BCO.87cb6085-2ca3-4a56-90cf-54f2da8ff337.png",
      acdc: "https://copilot.microsoft.com/th/id/BCO.c40d4224-fb06-4a45-9104-0b90a1a18721.png",
      babymetal: "https://copilot.microsoft.com/th/id/BCO.914e3de4-34aa-4f7d-a176-62e16ea4be82.png",
      nirvana: "https://copilot.microsoft.com/th/id/BCO.9232d17d-68ea-486a-ae15-2c7c75d6470b.png",
      greenday: "https://copilot.microsoft.com/th/id/BCO.d8711803-f82c-4aa7-b33c-6c4c0fc9d1cc.png",
      succubus: "https://copilot.microsoft.com/th/id/BCO.ec196513-dc6d-43c4-9151-6ff6afd601cc.png"
    };
    return imagenes[nombre] || this.interrogacion;
  }



  VolteaNumero1 = false;
  VolteaNumero2 = false;
  VolteaNumero3 = false;
  VolteaNumero4 = false;
  VolteaNumero5 = false;
  VolteaNumero6 = false;
  VolteaNumero7 = false;
  VolteaNumero8 = false;
  VolteaNumero9 = false;
  VolteaNumero10 = false;
  VolteaNumero11 = false;
  VolteaNumero12 = false;
  VolteaNumero13 = false;
  VolteaNumero14 = false;
  VolteaNumero15 = false;
  VolteaNumero16 = false;

  

  matched: boolean[] = new Array(17).fill(false);
  processing = false;

  cartasSeleccionadas: { id: number, nombre: string }[] = [];
  intentos: number = 0;

  // cartas activas del juego
  configuracion: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.iniciarJuegoConRandom(); // arranca ya con random
  }

  private selectCard(id: number, nombre: string) {
    if (this.processing) return;
    if ((this as any)[`VolteaNumero${id}`]) return;
    if (this.matched[id]) return;

    (this as any)[`VolteaNumero${id}`] = true;
    this.cartasSeleccionadas.push({ id, nombre });

    if (this.cartasSeleccionadas.length === 2) {
      this.processing = true;
      this.verificarPareja();
    }
  }

  // cada aumentar usa configuracion[], no se sobreescribe nunca
  aumentar1() { this.selectCard(1, this.configuracion[0]); }
  aumentar2() { this.selectCard(2, this.configuracion[1]); }
  aumentar3() { this.selectCard(3, this.configuracion[2]); }
  aumentar4() { this.selectCard(4, this.configuracion[3]); }
  aumentar5() { this.selectCard(5, this.configuracion[4]); }
  aumentar6() { this.selectCard(6, this.configuracion[5]); }
  aumentar7() { this.selectCard(7, this.configuracion[6]); }
  aumentar8() { this.selectCard(8, this.configuracion[7]); }
  aumentar9() { this.selectCard(9, this.configuracion[8]); }
  aumentar10() { this.selectCard(10, this.configuracion[9]); }
  aumentar11() { this.selectCard(11, this.configuracion[10]); }
  aumentar12() { this.selectCard(12, this.configuracion[11]); }
  aumentar13() { this.selectCard(13, this.configuracion[12]); }
  aumentar14() { this.selectCard(14, this.configuracion[13]); }
  aumentar15() { this.selectCard(15, this.configuracion[14]); }
  aumentar16() { this.selectCard(16, this.configuracion[15]); }

  verificarPareja() {
    const [c1, c2] = this.cartasSeleccionadas;
    if (!c1 || !c2) {
      this.cartasSeleccionadas = [];
      this.processing = false;
      return;
    }

    if (c1.nombre === c2.nombre) {
      this.matched[c1.id] = true;
      this.matched[c2.id] = true;
      this.cartasSeleccionadas = [];
      this.processing = false;

      const todasCompletas = this.matched.slice(1).every(m => m);
      if (todasCompletas) {
        this.stopTime();
        alert("Felicidades por ganar el juego");
      }
    } else {
      this.intentos++;
      setTimeout(() => {
        (this as any)[`VolteaNumero${c1.id}`] = false;
        (this as any)[`VolteaNumero${c2.id}`] = false;
        this.cartasSeleccionadas = [];
        this.processing = false;
      }, 1000);
    }
  }

  // 🎲 genera random y reinicia el juego
  iniciarJuegoConRandom() {
    const num = Math.floor(Math.random() * 3) + 1;

    if (num === 1) {
      this.configuracion = [
        'gunsNroses', 'metallica', 'gunsNroses', 'mago0z',
        'acdc', 'babymetal', 'metallica', 'nirvana',
        'greenday', 'mago0z', 'greenday', 'succubus',
        'acdc', 'babymetal', 'succubus', 'nirvana'
      ];
    } else if (num === 2) {
      this.configuracion = [
        'metallica', 'gunsNroses', 'nirvana', 'acdc',
        'succubus', 'babymetal', 'greenday', 'mago0z',
        'metallica', 'gunsNroses', 'nirvana', 'acdc',
        'succubus', 'babymetal', 'greenday', 'mago0z'
      ];
    } else {
      this.configuracion = [
        'succubus', 'acdc', 'nirvana', 'metallica',
        'mago0z', 'greenday', 'babymetal', 'gunsNroses',
        'succubus', 'acdc', 'nirvana', 'metallica',
        'mago0z', 'greenday', 'babymetal', 'gunsNroses'
      ];
    }

    // reiniciar estado de juego
    this.matched.fill(false);
    for (let i = 1; i <= 16; i++) {
      (this as any)[`VolteaNumero${i}`] = false;
    }
    this.cartasSeleccionadas = [];
    this.intentos = 0;
    this.temporizadorMinutos = 0;
    this.temporizadorSegundos = 0;
    this.stopTime();
  }

  temporizadorSegundos: number = 0;
  temporizadorMinutos: number = 0;
  intervalo: any;
  juegoIniciado: boolean = false;

  startTime() {
    if (this.juegoIniciado) return;
    this.juegoIniciado = true;

    this.intervalo = setInterval(() => {
      this.temporizadorSegundos++;
      if (this.temporizadorSegundos === 60) {
        this.temporizadorMinutos++;
        this.temporizadorSegundos = 0;
      }
    }, 1000);
  }

  stopTime() {
    clearInterval(this.intervalo);
    this.intervalo = null;
    this.juegoIniciado = false;
  }


  
  iniciogame() {
  this.VolteaNumero1 = true;
this.VolteaNumero2 = true;
this.VolteaNumero3 = true;
this.VolteaNumero4 = true;
this.VolteaNumero5 = true;
this.VolteaNumero6 = true;
this.VolteaNumero7 = true;
this.VolteaNumero8 = true;
this.VolteaNumero9 = true;
this.VolteaNumero10 = true;
this.VolteaNumero11 = true;
this.VolteaNumero12 = true;
this.VolteaNumero13 = true;
this.VolteaNumero14 = true;
this.VolteaNumero15 = true;
this.VolteaNumero16 = true;
this.cdr.detectChanges();

    setTimeout(() => {
  
this.VolteaNumero1 = false; this.VolteaNumero2 = false; this.VolteaNumero3 = false; this.VolteaNumero4 = false; this.VolteaNumero5 = false; this.VolteaNumero6 = false; this.VolteaNumero7 = false; this.VolteaNumero8 = false; this.VolteaNumero9 = false; this.VolteaNumero10 = false; this.VolteaNumero11 = false; this.VolteaNumero12 = false; this.VolteaNumero13 = false; this.VolteaNumero14 = false; this.VolteaNumero15 = false; this.VolteaNumero16 = false;
 
this.cdr.detectChanges()
}, 1000);
 
  }
}
