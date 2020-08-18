/*
    3- Crear una clase Empleado, con las propiedades nombre, salario, añadiremos un
    constructor al que le pasaremos los valores anteriores cuando instanciemos el
    objeto. Y también debe de tener un método que calcule deducciones salariales,
    Este método devolverá el salario después de los descuentos.
*/

/*Objeto de Empleado*/
class Empleado {
    /*
    Nomenclatura:
        a_ = Atributos
        p_ = Parametros
    */

    /*Atributos de objeto*/
    a_Nombre:string = "";
    a_Salario:number = 0;

    /*Constructor de objecto*/
    constructor(p_Nombre?:string, p_Salario?:number) {
        this.a_Nombre = p_Nombre;
        this.a_Salario = p_Salario;
    }

    /*Funcion para calcular salario final*/
    calcularSalario(){
        /*Declaro y creo valores de renta y afp*/
        var renta = this.a_Salario * 0.10;
        var afp = this.a_Salario * 0.03;
        /*Retorno de salario menos renta y afp*/
        return (this.a_Salario - renta - afp);
    }
}

/*Crear objeto con parametros 'German Caceres' y 1200*/
let empleado1 = new Empleado("German Caceres",1200);

/*Imprimir salario final*/
console.log(empleado1.calcularSalario());