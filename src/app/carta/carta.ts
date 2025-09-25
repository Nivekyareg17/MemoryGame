import { Component } from '@angular/core';

@Component({
  selector: 'app-carta',
  standalone: false,
  templateUrl: './carta.html',
  styleUrls: ['./carta.css']
})
export class Carta {

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

  aumentar1()  { this.selectCard(1,  'gunsNroses'); }
  aumentar2()  { this.selectCard(2,  'metallica'); }
  aumentar3()  { this.selectCard(3,  'gunsNroses'); }
  aumentar4()  { this.selectCard(4,  'mago0z'); }
  aumentar5()  { this.selectCard(5,  'acdc'); }
  aumentar6()  { this.selectCard(6,  'babymetal'); }
  aumentar7()  { this.selectCard(7,  'metallica'); }
  aumentar8()  { this.selectCard(8,  'nirvana'); }
  aumentar9()  { this.selectCard(9,  'greenday'); }
  aumentar10() { this.selectCard(10, 'mago0z'); }
  aumentar11() { this.selectCard(11, 'greenday'); }
  aumentar12() { this.selectCard(12, 'succubus'); }
  aumentar13() { this.selectCard(13, 'acdc'); }
  aumentar14() { this.selectCard(14, 'babymetal'); }
  aumentar15() { this.selectCard(15, 'succubus'); }
  aumentar16() { this.selectCard(16, 'nirvana'); }

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


}
