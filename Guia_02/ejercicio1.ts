/*
    1- Crear la clase Rombo, la cual debe tener dos propiedades: DiagonalVertical y
    DiagonalHorizontal. añadiremos un constructor al que le pasaremos los valores
    anteriores cuando instanciemos el objeto. Y también debe de tener un método que
    calcule el area, que será la multiplicación de DiagonalVertical * DiagonalHorizontal.
    Este método devolverá un número.
*/

/*Objeto de Rombo*/
class Rombo {
    /*
    Nomenclatura:
        a_ = Atributos
        p_ = Parametros
    */

    /*Atributos de objeto*/
    a_DiagonalVertical:number = 0;
    a_DiagonalHorizontal:number = 0;

    /*Constructor de objecto*/
    constructor(p_DiagonalVertical?:number, p_DiagonalHorizontal?:number) {
        this.a_DiagonalVertical = p_DiagonalVertical;
        this.a_DiagonalHorizontal = p_DiagonalHorizontal;
    }

    /*Funcion para calcular area de rombo*/
    calcularArea(){
        return this.a_DiagonalHorizontal * this.a_DiagonalVertical;
    }
}

/*Crear objeto con parametros 4 y 5*/
let rombo = new Rombo(4,5);

/*Imprimir resultado de area*/
console.log(rombo.calcularArea);