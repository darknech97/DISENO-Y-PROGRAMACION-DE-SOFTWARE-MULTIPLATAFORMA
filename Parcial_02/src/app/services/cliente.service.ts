import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Cliente } from '../models/cliente';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // Traer los datos de firebase 
  datosFirebase: AngularFireList<any>;

  //variable para lista de consultas
  datosFirebaseConsultas: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados, del tipo Product
  clienteSeleccionado: Cliente = new Cliente();
  consultaSeleccionada: Consulta = new Consulta();

  constructor(private firebase: AngularFireDatabase) { }

  listaClientes(){
    return this.datosFirebase = this.firebase.list('clientes');
  }

  buscarCliente(nombre_cliente: string){
    return this.datosFirebase =  this.firebase.list('clientes', ref => ref.orderByChild('nombre').equalTo(nombre_cliente));
  }

  listaConsultas(key_cliente: string){
    return this.datosFirebaseConsultas =  this.firebase.list('consultas', ref => ref.orderByChild('key_cliente').equalTo(key_cliente));
  }

  //crear una nueva consulta
  insertConsulta(consulta : Consulta){
    this.datosFirebaseConsultas.push(
      {
        key_cliente: consulta.key_cliente,
        mascota: consulta.mascota,
        tratamiento: consulta.tratamiento,
        medicamento: consulta.medicamento,
        costo: consulta.costo
      }
    );
  }


  // crear un nuevo producto  , recibiendo un parametro de tipo Product
  insertCliente(cliente: Cliente) {
    // agregar un dato al final de la lista, como recibe un objeto del tipo Product , puede acceder a sus propiedades
    this.datosFirebase.push({
      nombre: cliente.nombre,
      dui: cliente.dui
    });
  }


  // Actualiza un producto, recibiendo un parametro de tipo Product
  updateCliente(cliente: Cliente) {
    // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
    this.datosFirebase.update(cliente.$key, {
      nombre: cliente.nombre,
      dui: cliente.dui
    });
  }

  //actualizar consulta
  updateConsulta(consulta: Consulta){
    this.datosFirebaseConsultas.update(consulta.$key,{
      mascota: consulta.mascota,
      tratamiento: consulta.tratamiento,
      medicamento: consulta.medicamento,
      costo: consulta.costo
    });
  }


  // Elimina un producto, recibiendo como parametro la clave , utilizando el metodo remove de firebase
  deleteCliente($key: string) {
    this.datosFirebase.remove($key);
  }

  //eliminar consulta
  deleteConsulta($key: string){
    this.datosFirebaseConsultas.remove($key);
  }

}
