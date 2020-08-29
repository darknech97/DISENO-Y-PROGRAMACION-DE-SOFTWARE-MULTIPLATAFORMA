import { Component, OnInit } from '@angular/core';

//Import de modulos necesarios
import {FormsModule} from '@angular/forms';
import {BrowserModule}from '@angular/platform-browser';

@Component({
  selector: 'app-ejercicio1',
  templateUrl: './ejercicio1.component.html',
  styleUrls: ['./ejercicio1.component.css']
})
export class Ejercicio1Component implements OnInit {
  //Arreglo y contenedor temporal de informacion de arreglo
  empleado:any;
  empleados=[];

  //Atributos de empleado
  nombre:string;
  salario:number;
  isss:number;
  renta:number;
  afp:number;
  salario_neto:number;
  
  //Contador para activacion de tabla
  contador:number;

  //Constructor de clase
  constructor() { }

  //Procesos en inicio
  ngOnInit(): void {
    //Declaracion de variables en limpio
    this.contador = 0;
    
    this.isss = 0;
    this.renta = 0;
    this.afp = 0;
    this.salario_neto = 0;
  }
  
  //Funcion para calcular salario de empleado ingresado
  calcularSalario(){
    //Calculo de ISSS, Renta, AFP y Salario Neto
    this.isss = this.salario * 0.073;
    this.renta = this.salario * 0.11;
    this.afp = this.salario * 0.051;
    this.salario_neto = this.salario - this.isss - this.renta - this.afp;

    //Nuevo empleado agregado a arreglo
    this.empleado={"nombre":this.nombre,"salario":this.salario,"isss":this.isss,"renta":this.renta,"afp":this.afp,"salario_neto":this.salario_neto};
    this.empleados.push(this.empleado);

    //Suma de contador
    this.contador++;
  }

  onSubmit(){
    alert(this.nombre);
  }
}
