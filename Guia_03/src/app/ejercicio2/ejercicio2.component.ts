import { Component, OnInit } from '@angular/core';
import { isNumber } from 'util';

@Component({
  selector: 'app-ejercicio2',
  templateUrl: './ejercicio2.component.html',
  styleUrls: ['./ejercicio2.component.css']
})
export class Ejercicio2Component implements OnInit {

  //Atributos de empleado
  gasolina:string;
  cantidad:number = 0;
  precio:number = 0.00;

  constructor() { }

  ngOnInit(): void {
  }

  calcularPrecio(){
    if(this.gasolina === "regular"){
      this.precio = this.cantidad * 4.05;
    }
    else if(this.gasolina === "especial"){
      this.precio = this.cantidad * 4.25;
    }
    else if(this.gasolina === "diesel"){
      this.precio = this.cantidad * 3.96;
    }
  }

}
