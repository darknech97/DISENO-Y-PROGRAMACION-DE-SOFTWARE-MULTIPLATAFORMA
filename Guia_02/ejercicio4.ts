/*
    4- Crear una clase Calculadora, con las propiedades numero1, numero1, Le añadiremos
    un constructor al que le pasaremos los valores anteriores cuando instanciemos el
    objeto. Y también debe de tener un método operaciones básicas (+ , -, * , /), Este
    método debe imprimir en pantalla todas las operaciones realizadas.
*/

/*Objeto de Empleado*/
class Calculadora {
    /*
    Nomenclatura:
        a_ = Atributos
        p_ = Parametros
    */

    /*Atributos de objeto*/
    a_Numero1:number = 0;
    a_Numero2:number = 0;

    /*Constructor de objecto*/
    constructor(p_Numero1?:number, p_Numero2?:number) {
        this.a_Numero1 = p_Numero1;
        this.a_Numero2 = p_Numero2;
    }

    /*Funcion para calcular suma*/
    calcularSuma(){
        /*Retorno de suma*/
        return this.a_Numero1 + this.a_Numero2;
    }

    /*Funcion para calcular resta*/
    calcularResta(){
        /*Retorno de resta*/
        return this.a_Numero1 - this.a_Numero2;
    }

    /*Funcion para calcular multiplicacion*/
    calcularMultiplicacion(){
        /*Retorno de multiplicacion*/
        return this.a_Numero1 * this.a_Numero2;
    }

    /*Funcion para calcular division*/
    calcularDivision(){
        /*Retorno de division*/
        return this.a_Numero1 / this.a_Numero2;
    }
}

/*Crear objeto nuevo con parametros 2 y 3*/
let calculadora = new Calculadora(2,3);

/*Imprimir resultados de cada calculo (suma, resta, division y multiplicacion)*/
console.log("Suma: "+calculadora.calcularSuma());
console.log("Resta: "+calculadora.calcularResta());
console.log("Multiplicacion: "+calculadora.calcularMultiplicacion());
console.log("Division: "+calculadora.calcularDivision());